import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
  Text,
  useToast,
  Tag,
  HStack,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../../hooks/useAuth";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
  }, [isAuthenticated, navigate]);

  const handleAddTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/posts`, {
        title,
        content,
        tags,
        is_published: true,
      });

      toast({
        title: "Post created successfully",
        description: "Your post has been published to the community",
        status: "success",
        duration: 3000,
      });
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      toast({
        title: "Error creating post",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="4xl" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          Create New Post
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Content</FormLabel>
              <HStack mb={2}>
                <Button
                  size="sm"
                  onClick={() => setPreview(!preview)}
                  colorScheme={preview ? "blue" : "gray"}
                >
                  {preview ? "Edit" : "Preview"}
                </Button>
              </HStack>
              {preview ? (
                <Box p={4} borderWidth={1} borderRadius="md">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Box>
              ) : (
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content using Markdown"
                  minH="200px"
                />
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Tags</FormLabel>
              <HStack mb={2}>
                <Input
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button onClick={handleAddTag}>Add</Button>
              </HStack>
              <HStack spacing={2} wrap="wrap">
                {tags.map((t) => (
                  <Tag key={t} colorScheme="blue" size="md">
                    <TagLabel>{t}</TagLabel>
                    <TagCloseButton onClick={() => handleRemoveTag(t)} />
                  </Tag>
                ))}
              </HStack>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              isLoading={loading}
            >
              Create Post
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
}

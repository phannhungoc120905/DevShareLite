import {
  Box,
  VStack,
  Heading,
  Text,
  HStack,
  Tag,
  Divider,
  Button,
  Textarea,
  useToast,
  Card,
  CardBody,
  Avatar,
  Spinner,
  Center,
  Container,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

interface Comment {
  id: number;
  content: string;
  created_at: string;
  user?: {
    name: string;
  };
}

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  tags: string[];
  comments: Comment[];
  user?: {
    name: string;
  };
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const toast = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    // Fetch post data and comments separately
    const fetchPost = axios.get(
      `${import.meta.env.VITE_API_URL}/api/posts/${id}`
    );
    const fetchComments = axios.get(
      `${import.meta.env.VITE_API_URL}/api/posts/${id}/comments`
    );

    Promise.all([fetchPost, fetchComments])
      .then(([postResponse, commentsResponse]) => {
        if (postResponse.data?.post) {
          setPost({
            ...postResponse.data.post,
            comments: commentsResponse.data || [],
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [id]);

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !id) return;

    setSubmitting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts/${id}/comments`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Fetch updated comments after posting
      const commentsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/${id}/comments`
      );

      // Update the post with new comments
      if (post) {
        setPost({
          ...post,
          comments: commentsResponse.data || [],
        });
      }

      setNewComment("");
      toast({
        title: "Comment posted successfully",
        status: "success",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({
        title: "Error posting comment",
        status: "error",
        duration: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!post) {
    return (
      <Container maxW="800px" mx="auto" py={8}>
        <Center h="400px">
          <VStack spacing={4}>
            <Spinner size="xl" color="blue.500" thickness="4px" />
            <Text color="gray.600" fontSize="lg">
              Loading post...
            </Text>
          </VStack>
        </Center>
      </Container>
    );
  }

  return (
    <Container maxW="800px" mx="auto" py={6} px={4}>
      <VStack spacing={6} align="stretch">
        {/* Post Content */}
        <VStack align="start" spacing={4}>
          <Heading size={{ base: "lg", md: "xl" }} lineHeight="shorter">
            {post.title}
          </Heading>

          {post.tags && post.tags.length > 0 && (
            <HStack spacing={2} flexWrap="wrap">
              {post.tags.map((tag, index) => (
                <Tag key={index} colorScheme="blue" size="sm">
                  {tag}
                </Tag>
              ))}
            </HStack>
          )}

          <HStack spacing={3}>
            <Avatar size="sm" name={post.user?.name || "Anonymous"} />
            <VStack spacing={0} align="start">
              <Text fontWeight="bold" fontSize="sm">
                {post.user?.name || "Anonymous"}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {new Date(post.created_at).toLocaleDateString()}
              </Text>
            </VStack>
          </HStack>
        </VStack>

        <Divider />

        <Box>
          <Text whiteSpace="pre-wrap" fontSize="md" lineHeight="tall">
            {post.content}
          </Text>
        </Box>

        <Divider />

        {/* Comments Section */}
        <VStack spacing={4} align="stretch">
          <Heading size="md">Comments ({post.comments?.length || 0})</Heading>

          {/* New Comment Form */}
          {user && (
            <VStack align="stretch" spacing={3}>
              <Textarea
                value={newComment}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setNewComment(e.target.value)
                }
                placeholder="Write a comment..."
                size="sm"
                resize="vertical"
                minH="80px"
              />
              <Button
                colorScheme="blue"
                onClick={handleSubmitComment}
                isLoading={submitting}
                size="sm"
                alignSelf="flex-end"
                isDisabled={!newComment.trim()}
              >
                Post Comment
              </Button>
            </VStack>
          )}

          {/* Comments List */}
          {post.comments && post.comments.length > 0 ? (
            <VStack spacing={3} align="stretch" maxH="400px" overflowY="auto">
              {post.comments.map((comment) => (
                <Card key={comment.id} size="sm" variant="outline">
                  <CardBody p={4}>
                    <VStack align="stretch" spacing={2}>
                      <HStack justify="space-between" align="start">
                        <HStack spacing={2}>
                          <Avatar
                            size="xs"
                            name={comment.user?.name || "Anonymous"}
                          />
                          <Text fontWeight="bold" fontSize="sm">
                            {comment.user?.name || "Anonymous"}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="gray.500" flexShrink={0}>
                          {new Date(comment.created_at).toLocaleDateString()}
                        </Text>
                      </HStack>
                      <Text fontSize="sm" lineHeight="base" pl={6}>
                        {comment.content}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          ) : (
            <Box bg="gray.50" p={6} borderRadius="lg" textAlign="center">
              <Text color="gray.500" fontSize="sm">
                No comments yet. Be the first to comment!
              </Text>
            </Box>
          )}
        </VStack>
      </VStack>
    </Container>
  );
}

import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  Button,
  SimpleGrid,
  Icon,
  Card,
  CardBody,
  CardHeader,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaCode, FaQuestion, FaLightbulb, FaBookmark } from "react-icons/fa";

interface Post {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  tags: string[];
  user?: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  };
}

interface Stats {
  totalPosts: number;
  totalComments: number;
  contributions: number;
}

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    totalComments: 0,
    contributions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [communityPosts, setCommunityPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // First, get user's posts
        const postsRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/posts`
        );
        if (postsRes.data?.data && Array.isArray(postsRes.data.data)) {
          setRecentPosts(postsRes.data.data.slice(0, 5));
          console.log("Recent posts set:", postsRes.data.data);
        }

        // Then get user's profile/stats
        const statsRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/profile`
        );
        if (statsRes.data) {
          setStats({
            totalPosts: statsRes.data.total_posts || 0,
            totalComments: statsRes.data.total_comments || 0,
            contributions: statsRes.data.contributions || 0,
          });
        }

        // Get all posts
        const allPostsRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts`
        );
        // The posts are nested in posts.data array
        if (
          allPostsRes.data?.posts?.data &&
          Array.isArray(allPostsRes.data.posts.data)
        ) {
          // Set all posts for the footer
          setCommunityPosts(allPostsRes.data.posts.data);
          console.log("Community posts set:", allPostsRes.data.posts.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setRecentPosts([]);
        setCommunityPosts([]);
        setStats({
          totalPosts: 0,
          totalComments: 0,
          contributions: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && user) {
      fetchDashboardData();
    }
  }, [isAuthenticated, user]);

  const quickActions = [
    {
      title: "Share Knowledge",
      icon: FaCode,
      description: "Create a technical post or tutorial",
      link: "/posts/create",
      color: "blue",
    },
    {
      title: "Ask Question",
      icon: FaQuestion,
      description: "Get help from the community",
      link: "/posts/create?type=question",
      color: "green",
    },
    {
      title: "Start Discussion",
      icon: FaLightbulb,
      description: "Initiate a technical discussion",
      link: "/posts/create?type=discussion",
      color: "purple",
    },
    {
      title: "Saved Posts",
      icon: FaBookmark,
      description: "View your bookmarked content",
      link: "/bookmarks",
      color: "orange",
    },
  ];

  return (
    <Box p={8}>
      <Grid templateColumns={{ base: "1fr", lg: "3fr 1fr" }} gap={8}>
        <GridItem>
          <VStack spacing={8} align="stretch">
            {/* Welcome Section */}
            <Box>
              <Heading size="lg">Welcome back, {user?.name}! 👋</Heading>
              <Text color="gray.600" mt={2}>
                Ready to share your technical expertise or learn something new?
              </Text>
            </Box>

            {/* Quick Actions */}
            <Box>
              <Heading size="md" mb={4}>
                Quick Actions
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {quickActions.map((action) => (
                  <Card key={action.title} as={Link} to={action.link}>
                    <CardBody>
                      <HStack spacing={4}>
                        <Icon
                          as={action.icon}
                          boxSize={6}
                          color={`${action.color}.500`}
                        />
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="bold">{action.title}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {action.description}
                          </Text>
                        </VStack>
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>

            {/* Activity Stats */}
            <Box>
              <Heading size="md" mb={4}>
                Your Activity
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                <Card>
                  <CardBody>
                    <Stat>
                      <StatLabel>Total Posts</StatLabel>
                      <StatNumber>{stats.totalPosts}</StatNumber>
                      <StatHelpText>Your technical contributions</StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <Stat>
                      <StatLabel>Comments</StatLabel>
                      <StatNumber>{stats.totalComments}</StatNumber>
                      <StatHelpText>Community interactions</StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <Stat>
                      <StatLabel>Helpful Answers</StatLabel>
                      <StatNumber>{stats.contributions}</StatNumber>
                      <StatHelpText>Knowledge shared</StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
              </SimpleGrid>
            </Box>

            {/* Recent Posts */}
            <Box>
              <Heading size="md" mb={4}>
                Your Recent Posts
              </Heading>
              <VStack spacing={4} align="stretch">
                {loading ? (
                  <>
                    <Card>
                      <CardBody>
                        <Skeleton height="20px" mb={2} />
                        <SkeletonText noOfLines={2} spacing={2} />
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        <Skeleton height="20px" mb={2} />
                        <SkeletonText noOfLines={2} spacing={2} />
                      </CardBody>
                    </Card>
                  </>
                ) : (
                  recentPosts.map((post) => (
                    <Card key={post.id}>
                      <CardBody>
                        <VStack align="start" spacing={2}>
                          {" "}
                          <Link to={`/posts/${post.id}`}>
                            <Text
                              fontWeight="bold"
                              color="blue.600"
                              _hover={{ textDecoration: "underline" }}
                            >
                              {post.title}
                            </Text>
                          </Link>
                          <HStack>
                            {post.tags.map((tag) => (
                              <Tag key={tag} size="sm" colorScheme="blue">
                                {tag}
                              </Tag>
                            ))}
                          </HStack>
                          <Text fontSize="sm" color="gray.500">
                            Posted on{" "}
                            {new Date(post.created_at).toLocaleDateString()}
                          </Text>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))
                )}
                {recentPosts.length === 0 && !loading && (
                  <Text color="gray.600">
                    You haven't created any posts yet.{" "}
                    <Link to="/posts/create" style={{ color: "blue" }}>
                      Create your first post!
                    </Link>
                  </Text>
                )}
              </VStack>
            </Box>
          </VStack>
        </GridItem>

        {/* Sidebar */}
        <GridItem display={{ base: "none", lg: "block" }}>
          <VStack spacing={6} align="stretch">
            <Card>
              <CardHeader>
                <Heading size="md">Pro Tips 💡</Heading>
              </CardHeader>
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Text>• Use Markdown for better code formatting</Text>
                  <Text>• Add relevant tags to reach the right audience</Text>
                  <Text>• Share code snippets with proper context</Text>
                  <Text>• Engage with others' questions</Text>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <Heading size="md">Trending Topics 🔥</Heading>
              </CardHeader>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <Tag size="md" colorScheme="blue">
                    React
                  </Tag>
                  <Tag size="md" colorScheme="green">
                    Node.js
                  </Tag>
                  <Tag size="md" colorScheme="purple">
                    TypeScript
                  </Tag>
                  <Tag size="md" colorScheme="orange">
                    Laravel
                  </Tag>
                  <Tag size="md" colorScheme="red">
                    DevOps
                  </Tag>
                </VStack>
              </CardBody>
            </Card>

            {/* Community Posts */}
          </VStack>
        </GridItem>
      </Grid>

      {/* All Posts Section */}
      <Box mt={8}>
        <Divider mb={8} />
        <Heading size="lg" mb={6}>
          All Community Posts 🌟
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {loading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardBody>
                    <Skeleton height="20px" mb={2} />
                    <SkeletonText noOfLines={3} spacing={2} />
                  </CardBody>
                </Card>
              ))}
            </>
          ) : (
            communityPosts.map((post) => (
              <Card key={post.id}>
                <CardBody>
                  <VStack align="start" spacing={3}>
                    <Link to={`/posts/${post.id}`}>
                      <Heading
                        size="md"
                        color="blue.600"
                        _hover={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        {post.title}
                      </Heading>
                    </Link>
                    <HStack wrap="wrap" spacing={2}>
                      {post.tags.map((tag) => (
                        <Tag key={tag} size="sm" colorScheme="blue">
                          {tag}
                        </Tag>
                      ))}
                    </HStack>
                    <HStack spacing={2} width="100%" justify="space-between">
                      <Text fontSize="sm" fontWeight="bold" color="gray.600">
                        {post.user?.name}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {new Date(post.created_at).toLocaleDateString()}
                      </Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))
          )}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Grid,
  GridItem,
  Icon,
  Container,
  Flex,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  FiUsers,
  FiMessageSquare,
  FiBookOpen,
  FiCode,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
      });
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Grid templateColumns={{ base: "1fr", lg: "400px 1fr" }} minH="100vh">
        {/* Left Column - Login Form (Fixed Width) */}
        <GridItem bg="white" position="relative" overflow="hidden">
          {/* Subtle background pattern */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            opacity="0.03"
            backgroundImage="radial-gradient(circle, #000 1px, transparent 1px)"
            backgroundSize="20px 20px"
          />

          <Flex
            align="center"
            justify="center"
            minH="100vh"
            p={6}
            position="relative"
          >
            <Box maxW="sm" w="full">
              <VStack spacing={6} align="stretch">
                {/* Header */}
                <Box textAlign="center">
                  <Badge
                    colorScheme="blue"
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                    mb={4}
                    fontSize="xs"
                  >
                    <Icon as={FiShield} mr={1} />
                    Secure Login
                  </Badge>
                  <Heading
                    size="xl"
                    mb={2}
                    bgGradient="linear(to-r, blue.600, blue.800)"
                    bgClip="text"
                    fontWeight="800"
                  >
                    DevShare Lite
                  </Heading>
                  <Text color="gray.600" fontSize="md">
                    Welcome back! Please sign in to continue.
                  </Text>
                </Box>

                {/* Login Form */}
                <Box
                  bg="white"
                  p={6}
                  borderRadius="2xl"
                  boxShadow="0 10px 40px rgba(0, 0, 0, 0.1)"
                  border="1px solid"
                  borderColor="gray.100"
                >
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={5}>
                      <FormControl isRequired>
                        <FormLabel color="gray.700" fontWeight="600" mb={2}>
                          Email Address
                        </FormLabel>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          size="md"
                          bg="gray.50"
                          border="2px solid"
                          borderColor="gray.200"
                          borderRadius="xl"
                          _hover={{ borderColor: "blue.300" }}
                          _focus={{
                            borderColor: "blue.500",
                            bg: "white",
                            boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.6)",
                          }}
                          transition="all 0.2s"
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel color="gray.700" fontWeight="600" mb={2}>
                          Password
                        </FormLabel>
                        <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          size="md"
                          bg="gray.50"
                          border="2px solid"
                          borderColor="gray.200"
                          borderRadius="xl"
                          _hover={{ borderColor: "blue.300" }}
                          _focus={{
                            borderColor: "blue.500",
                            bg: "white",
                            boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.6)",
                          }}
                          transition="all 0.2s"
                        />
                      </FormControl>

                      <Button
                        type="submit"
                        size="md"
                        width="full"
                        isLoading={loading}
                        bgGradient="linear(to-r, blue.500, blue.600)"
                        color="white"
                        borderRadius="xl"
                        _hover={{
                          bgGradient: "linear(to-r, blue.600, blue.700)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 10px 25px rgba(66, 153, 225, 0.4)",
                        }}
                        _active={{
                          transform: "translateY(0)",
                        }}
                        transition="all 0.2s"
                        rightIcon={<Icon as={FiArrowRight} />}
                      >
                        Sign In
                      </Button>
                    </VStack>
                  </form>
                </Box>

                {/* Register Link */}
                <Box textAlign="center">
                  <Divider mb={3} />
                  <Text color="gray.600" fontSize="sm">
                    Don't have an account?{" "}
                    <Box
                      as={Link}
                      to="/register"
                      color="blue.500"
                      fontWeight="600"
                      _hover={{
                        color: "blue.600",
                        textDecoration: "underline",
                      }}
                      transition="all 0.2s"
                    >
                      Create one here
                    </Box>
                  </Text>
                </Box>
              </VStack>
            </Box>
          </Flex>
        </GridItem>

        {/* Right Column - Full Screen Description */}
        <GridItem
          bgGradient="linear(135deg, blue.600 0%, purple.600 50%, blue.800 100%)"
          position="relative"
          overflow="hidden"
          display={{ base: "none", lg: "block" }}
        >
          {/* Animated Background Elements */}
          <Box
            position="absolute"
            top="-10%"
            right="-5%"
            width="30%"
            height="30%"
            borderRadius="full"
            bg="purple.400"
            opacity="0.1"
            animation="float 6s ease-in-out infinite"
          />
          <Box
            position="absolute"
            bottom="-5%"
            left="-5%"
            width="25%"
            height="25%"
            borderRadius="full"
            bg="blue.400"
            opacity="0.1"
            animation="float 4s ease-in-out infinite reverse"
          />
          <Box
            position="absolute"
            top="30%"
            left="10%"
            width="15%"
            height="15%"
            borderRadius="full"
            bg="purple.300"
            opacity="0.08"
            animation="float 8s ease-in-out infinite"
          />

          <Container maxW="full" h="100vh" p={4}>
            <Flex align="center" justify="center" h="100%" overflow="hidden">
              <VStack
                spacing={{ base: 6, md: 8 }}
                align="stretch"
                color="white"
                maxW="6xl"
                w="full"
                maxH="100vh"
                overflow="auto"
                py={4}
              >
                {/* Main Header */}
                <Box textAlign="center">
                  <Badge
                    colorScheme="whiteAlpha"
                    variant="solid"
                    px={4}
                    py={2}
                    borderRadius="full"
                    mb={4}
                    fontSize="sm"
                    bg="whiteAlpha.200"
                    backdropFilter="blur(10px)"
                  >
                    ✨ Premium IT Community Platform
                  </Badge>
                  <Heading
                    size={{ base: "xl", md: "2xl", lg: "3xl" }}
                    mb={4}
                    fontWeight="900"
                    lineHeight="shorter"
                  >
                    Join Our Global IT Community
                  </Heading>
                  <Text
                    fontSize={{ base: "md", md: "lg", lg: "xl" }}
                    opacity={0.9}
                    lineHeight="tall"
                    maxW="2xl"
                    mx="auto"
                  >
                    DevShare Lite is a premium online forum where IT
                    professionals share knowledge, solve technical challenges,
                    collaborate on projects, and grow their careers together in
                    a supportive community.
                  </Text>
                </Box>

                {/* Features Grid - Responsive */}
                <Grid
                  templateColumns={{
                    base: "1fr",
                    md: "repeat(2, 1fr)",
                    xl: "repeat(4, 1fr)",
                  }}
                  gap={4}
                  w="full"
                >
                  <Box
                    bg="whiteAlpha.100"
                    p={6}
                    borderRadius="2xl"
                    backdropFilter="blur(20px)"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    textAlign="center"
                    _hover={{
                      bg: "whiteAlpha.200",
                      transform: "translateY(-4px)",
                    }}
                    transition="all 0.3s ease"
                  >
                    <Icon as={FiBookOpen} boxSize={8} color="blue.200" mb={3} />
                    <Heading size="md" mb={2}>
                      Share Knowledge
                    </Heading>
                    <Text opacity={0.8} fontSize="sm">
                      Post articles, tutorials, and share your technical
                      expertise with thousands of developers worldwide.
                    </Text>
                  </Box>

                  <Box
                    bg="whiteAlpha.100"
                    p={6}
                    borderRadius="2xl"
                    backdropFilter="blur(20px)"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    textAlign="center"
                    _hover={{
                      bg: "whiteAlpha.200",
                      transform: "translateY(-4px)",
                    }}
                    transition="all 0.3s ease"
                  >
                    <Icon
                      as={FiMessageSquare}
                      boxSize={8}
                      color="purple.200"
                      mb={3}
                    />
                    <Heading size="md" mb={2}>
                      Ask Questions
                    </Heading>
                    <Text opacity={0.8} fontSize="sm">
                      Get expert help with technical challenges and learn from
                      experienced developers in real-time discussions.
                    </Text>
                  </Box>

                  <Box
                    bg="whiteAlpha.100"
                    p={6}
                    borderRadius="2xl"
                    backdropFilter="blur(20px)"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    textAlign="center"
                    _hover={{
                      bg: "whiteAlpha.200",
                      transform: "translateY(-4px)",
                    }}
                    transition="all 0.3s ease"
                  >
                    <Icon as={FiUsers} boxSize={8} color="blue.200" mb={3} />
                    <Heading size="md" mb={2}>
                      Build Network
                    </Heading>
                    <Text opacity={0.8} fontSize="sm">
                      Connect with IT professionals globally, build meaningful
                      relationships, and advance your career.
                    </Text>
                  </Box>

                  <Box
                    bg="whiteAlpha.100"
                    p={6}
                    borderRadius="2xl"
                    backdropFilter="blur(20px)"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    textAlign="center"
                    _hover={{
                      bg: "whiteAlpha.200",
                      transform: "translateY(-4px)",
                    }}
                    transition="all 0.3s ease"
                  >
                    <Icon as={FiCode} boxSize={8} color="purple.200" mb={3} />
                    <Heading size="md" mb={2}>
                      IT Focused
                    </Heading>
                    <Text opacity={0.8} fontSize="sm">
                      Specialized platform dedicated exclusively to IT
                      discussions, coding challenges, and technology trends.
                    </Text>
                  </Box>
                </Grid>

                {/* Community Stats - Enhanced */}
                <Box
                  bg="whiteAlpha.100"
                  borderRadius="2xl"
                  p={6}
                  backdropFilter="blur(20px)"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                >
                  <Grid
                    templateColumns={{
                      base: "repeat(3, 1fr)",
                      md: "repeat(6, 1fr)",
                    }}
                    gap={4}
                  >
                    <Box textAlign="center">
                      <Heading size="lg" mb={1} color="blue.200">
                        10K+
                      </Heading>
                      <Text opacity={0.8} fontSize="xs">
                        Active Users
                      </Text>
                    </Box>
                    <Box textAlign="center">
                      <Heading size="lg" mb={1} color="purple.200">
                        50K+
                      </Heading>
                      <Text opacity={0.8} fontSize="xs">
                        Questions Solved
                      </Text>
                    </Box>
                    <Box textAlign="center">
                      <Heading size="lg" mb={1} color="blue.200">
                        500+
                      </Heading>
                      <Text opacity={0.8} fontSize="xs">
                        Expert Contributors
                      </Text>
                    </Box>
                    <Box textAlign="center">
                      <Heading size="lg" mb={1} color="purple.200">
                        1M+
                      </Heading>
                      <Text opacity={0.8} fontSize="xs">
                        Code Snippets
                      </Text>
                    </Box>
                    <Box textAlign="center">
                      <Heading size="lg" mb={1} color="blue.200">
                        24/7
                      </Heading>
                      <Text opacity={0.8} fontSize="xs">
                        Community Support
                      </Text>
                    </Box>
                    <Box textAlign="center">
                      <Heading size="lg" mb={1} color="purple.200">
                        100+
                      </Heading>
                      <Text opacity={0.8} fontSize="xs">
                        Tech Topics
                      </Text>
                    </Box>
                  </Grid>
                </Box>

                {/* Call to Action */}
                <Box textAlign="center">
                  <Text fontSize="md" opacity={0.8}>
                    🚀 Ready to accelerate your IT career? Join thousands of
                    developers already growing with us!
                  </Text>
                </Box>
              </VStack>
            </Flex>
          </Container>
        </GridItem>
      </Grid>

      {/* Global CSS for animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
    </Box>
  );
}

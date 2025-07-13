import {
  Box,
  Button,
  Flex,
  Spacer,
  useColorMode,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navigation() {
  const { user, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box bg={colorMode === "dark" ? "blue.700" : "blue.500"} px={4} py={2}>
      <Flex alignItems="center">
        <Link to="/posts">
          <Text color="white" fontSize="xl" fontWeight="bold">
            DevShare
          </Text>
        </Link>
        <Spacer />
        <Button
          onClick={toggleColorMode}
          size="sm"
          variant="ghost"
          color="white"
          mr={4}
          _hover={{ bg: colorMode === "dark" ? "blue.600" : "blue.400" }}
        >
          {colorMode === "dark" ? "🌞" : "🌙"}
        </Button>
        {user ? (
          <>
            <Button
              as={Link}
              to="/posts/create"
              colorScheme="blue"
              variant="outline"
              color="white"
              mr={4}
              _hover={{ bg: "blue.600" }}
            >
              Create Post
            </Button>
            <Menu>
              <MenuButton as={Button} colorScheme="blue">
                {user.name}
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem as={Link} to="/my-posts">
                  My Posts
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <>
            <Button as={Link} to="/login" colorScheme="blue" mr={2}>
              Login
            </Button>
            <Button
              as={Link}
              to="/register"
              colorScheme="blue"
              variant="outline"
            >
              Register
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
}

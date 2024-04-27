import React, { useState } from "react";
import { Box, Text, Input, Button, FormControl, FormLabel, useToast } from "@chakra-ui/react";

function AdminPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid username or password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoggedIn) {
    return (
      <Box p={5}>
        <Text fontSize="xl">Welcome to the Admin Panel</Text>
        <Text>You are now logged in!</Text>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button mt={4} colorScheme="blue" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
}

export default AdminPanel;

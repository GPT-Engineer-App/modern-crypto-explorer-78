import React, { useState, useContext, createContext, useReducer } from "react";
import { Box, Text, Input, Button, FormControl, FormLabel, useToast, Checkbox } from "@chakra-ui/react";

const AdminStoreContext = createContext();

const adminReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MENU_ITEM":
      return { ...state, menuItems: [...state.menuItems, action.payload] };
    case "UPDATE_MENU_ITEM":
      return {
        ...state,
        menuItems: state.menuItems.map((item) => (item.label === action.payload.label ? { ...item, content: action.payload.content } : item)),
      };
    case "REMOVE_MENU_ITEM":
      return {
        ...state,
        menuItems: state.menuItems.filter((item) => item.label !== action.payload),
      };
    default:
      return state;
  }
};

const AdminStoreProvider = ({ children }) => {
  const initialState = {
    menuItems: [
      { label: "Market", content: "Market data content" },
      { label: "Favorites", content: "Favorite items content" },
    ],
  };
  const [state, dispatch] = useReducer(adminReducer, initialState);

  const addMenuItem = (menuItem) => dispatch({ type: "ADD_MENU_ITEM", payload: menuItem });
  const updateMenuItem = (label, content) => dispatch({ type: "UPDATE_MENU_ITEM", payload: { label, content } });
  const removeMenuItem = (label) => dispatch({ type: "REMOVE_MENU_ITEM", payload: label });

  return <AdminStoreContext.Provider value={{ state, addMenuItem, updateMenuItem, removeMenuItem }}>{children}</AdminStoreContext.Provider>;
};

const useAdminStore = () => useContext(AdminStoreContext);

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

  const [settings, setSettings] = useState({ themeColor: "", showNews: false, showMarketData: false });
  const handleSettingsChange = (e) => {
    const { name, value, checked, type } = e.target;
    setSettings((prevSettings) => ({ ...prevSettings, [name]: type === "checkbox" ? checked : value }));
  };

  if (isLoggedIn) {
    return (
      <Box p={5}>
        <Text fontSize="xl">Welcome to the Admin Panel</Text>
        <Text>You are now logged in!</Text>
        <FormControl mt={4}>
          <FormLabel htmlFor="themeColor">Theme Color</FormLabel>
          <Input id="themeColor" type="text" value={settings.themeColor} name="themeColor" onChange={handleSettingsChange} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel htmlFor="showNews">Show News</FormLabel>
          <Checkbox id="showNews" isChecked={settings.showNews} name="showNews" onChange={handleSettingsChange} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel htmlFor="showMarketData">Show Market Data</FormLabel>
          <Checkbox id="showMarketData" isChecked={settings.showMarketData} name="showMarketData" onChange={handleSettingsChange} />
        </FormControl>
        {settings.menuItems.map((item, index) => (
          <Box key={index} mt={4}>
            <Text fontWeight="bold">{item.label}</Text>
            <Input value={item.content} onChange={(e) => useAdminStore.getState().updateMenuItem(item.label, e.target.value)} />
            <Button colorScheme="red" onClick={() => useAdminStore.getState().removeMenuItem(item.label)}>
              Remove
            </Button>
          </Box>
        ))}
        <Button
          mt={4}
          colorScheme="blue"
          onClick={() => {
            toast({
              title: "Settings Updated",
              description: "Your settings have been saved successfully.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }}
        >
          Save Settings
        </Button>
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

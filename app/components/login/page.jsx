"use client";
import React, { useState } from "react";
import {
  ChakraProvider,
  FormControl,
  Input,
  Stack,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import api from "@/app/utils/api";
import { useRouter } from "next/navigation";

const Login = () => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handleForgotPassword = async () => {
    console.log("Forgot Password Email: ", loginEmail);
    try {
      const response = await api.forgotPassword(loginEmail);
      console.log("second");
      if (response.success || response?.data?.success) {
        toast({
          title: "Success",
          description: response?.message || response?.data?.message,
          status: "success",
          duration: 1500,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error.",
          description: response.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error.",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogin = async () => {
    const body = {
      email: loginEmail,
      password: loginPassword,
    };
    try {
      const response = await api.login(body);
      if (response.success || response?.data?.success) {
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 1500,
          isClosable: true,
        });
        localStorage.setItem("userData", JSON.stringify(response.data));
        setTimeout(() => {
          router.push("/expenses");
        }, 2000);
      } else {
        toast({
          title: "Error.",
          description: response.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error.",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Stack spacing={8}>
        <Text fontSize="2xl" textAlign={"center"} fontWeight={"600"}>
          Login to App
        </Text>
        <FormControl>
          <Input
            type="email"
            value={loginEmail}
            placeholder="abc@mail.com"
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="password"
          />
        </FormControl>
        <Button
          onClick={handleLogin}
          color="blue.500"
          _hover={{ color: "blue.700" }}
          _focus={{ outline: "none" }}
        >
          Login
        </Button>
        <Button
          variant="link"
          color="blue.500"
          _hover={{ color: "blue.700" }}
          _focus={{ outline: "none" }}
          onClick={handleForgotPassword}
        >
          Forgot Password
        </Button>
      </Stack>
    </ChakraProvider>
  );
};

export default Login;

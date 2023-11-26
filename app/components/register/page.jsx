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

const Register = ({ setFlow }) => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const toast = useToast();
  const handleRegistration = async () => {
    const body = {
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    };
    try {
      const response = await api.register(body);
      if (response.success || response?.data?.success) {
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          setFlow(true);
        }, 3500);
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
          Register an Account
        </Text>
        <FormControl>
          <Input
            type="text"
            value={registerName}
            placeholder="Your Name"
            onChange={(e) => setRegisterName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Input
            type="email"
            value={registerEmail}
            placeholder="abc@mail.com"
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Input
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            placeholder="password"
          />
        </FormControl>
        <Button
          onClick={handleRegistration}
          variant="link"
          color="blue.500"
          _hover={{ color: "blue.700" }}
          _focus={{ outline: "none" }}
        >
          Register
        </Button>
      </Stack>
    </ChakraProvider>
  );
};

export default Register;

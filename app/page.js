"use client";
import Login from "./components/login/page";
import { Button, ChakraProvider, Text } from "@chakra-ui/react";
import Register from "./components/register/page";
import { useState } from "react";

export default function Home() {
  const [toggleRegister, setToggleRegisterFlow] = useState(true);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {toggleRegister ? (
        <Login />
      ) : (
        <Register setFlow={setToggleRegisterFlow} />
      )}

      <ChakraProvider>
        {toggleRegister ? (
          <>
            <Text>
              Dont have an account?
              <Button
                variant="link"
                color="blue.500"
                _hover={{ color: "blue.700" }}
                _focus={{ outline: "none" }}
                onClick={() => setToggleRegisterFlow(false)}
                ms={"2"}
              >
                Register
              </Button>
            </Text>
          </>
        ) : (
          <>
            <Text>
              Already have an account?
              <Button
                variant="link"
                color="blue.500"
                _hover={{ color: "blue.700" }}
                _focus={{ outline: "none" }}
                onClick={() => setToggleRegisterFlow(true)}
                ms={"2"}
              >
                Login
              </Button>
            </Text>
          </>
        )}
      </ChakraProvider>
    </main>
  );
}

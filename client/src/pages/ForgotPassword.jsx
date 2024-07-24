import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Container,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useForgetPassword, useResetPassword } from "../hooks/useAuth";
import { getQuestion } from "../api/auth";
import {
  useMutation,
  MutationCache,
  useQueryClient,
} from "@tanstack/react-query";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(null);
  const [token, setToken] = useState("");
  const resetPasswordMutation = useResetPassword();
  const [newPassword, setNewPassword] = useState("");
  const forgotPasswordMutation = useForgetPassword({
    onSuccess: (data) => {
      setToken(data.token);
    },
  });

  console.log(token);

  const getQuestionmutate = useMutation({
    mutationFn: getQuestion,
    onSuccess: (data) => {
      setQuestion(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      securityAnswer: answer,
    };
    forgotPasswordMutation.mutate(userData);
  };

  const handleFindAccount = async (e) => {
    e.preventDefault();
    const userData = {
      email,
    };
    getQuestionmutate.mutate(userData);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const userData = {
      token,
      newPassword,
    };
    resetPasswordMutation.mutate(userData);
  };

  return (
    <Container maxW={"container.xl"} h={"100vh"} p={"16"}>
      <form onSubmit={handleSubmit}>
        <VStack
          alignItems={"stretch"}
          spacing={"8"}
          w={["full", "96"]}
          m={"auto"}
          my={"auto"}
        >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <Button
            colorScheme="teal"
            mt="4"
            display={"block"}
            onClick={handleFindAccount}
          >
            Find my Account
          </Button>

          {question != null ? (
            <>
              <FormControl>
                <FormLabel>{question}</FormLabel>
                <Input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
              </FormControl>

              <Button type="submit" colorScheme="teal" mt="4" display={"block"}>
                Reset Password
              </Button>
            </>
          ) : (
            <></>
          )}
          {token !== "" ? (
            <FormControl>
              <FormLabel>NewPassword</FormLabel>
              <Input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Button
                colorScheme="teal"
                mt="4"
                display={"block"}
                onClick={handleReset}
              >
                Reset Password
              </Button>
            </FormControl>
          ) : (
            <></>
          )}
        </VStack>
      </form>
    </Container>
  );
};

export default ForgotPassword;

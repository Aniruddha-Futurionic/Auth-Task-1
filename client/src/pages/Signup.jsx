// import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Container,
  VStack,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import { useSignup } from "../hooks/useAuth";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const signupMutation = useSignup();

  console.log(email);
  console.log(password);
  console.log(question);
  console.log(answer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
      securityQuestion: question,
      securityAnswer: answer,
    };
    signupMutation.mutate(userData);
  };

  // const signupMutate = useMutation({
  //   mutationFn : signup,
  //   onSuccess: (data) => {
  //     console.log('Sign up successful!', data);
  //   }

  // })

  return (
    <Container
      rounded="md"
      bg="white"
      maxWidth={"container.xl"}
      h={"100vh"}
      p={"16"}
    >
        <VStack
          alignItems={"stretch"}
          spacing={"8"}
          w={["full", "96"]}
          m={"auto"}
          my={"auto"}
        >
          <Heading textAlign={"center"}>Welcomes</Heading>
          <Avatar alignSelf={"center"} boxSize={"32"} />
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                focusBorderColor={'teal.500'}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                focusBorderColor={'teal.500'}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                focusBorderColor={'teal.500'}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Security Question ?</FormLabel>
              <Input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                focusBorderColor={'teal.500'}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Answer</FormLabel>
              <Input
                type="password"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
                focusBorderColor={'teal.500'}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" mt="4">
              Sign Up
            </Button>
          </form>
        </VStack>
    </Container>
  );
};

export default Signup;

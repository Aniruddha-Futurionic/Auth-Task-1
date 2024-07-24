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
import { useLogin } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState("");
  const [error, setError] = useState("");
  

  const loginMutation = useLogin({onSuccess: (data) => {
    setLoginData(data.token);
  }, onError : (error) => {
    setError(error.response.data.error)
    console.log(error.response.data.error)
  } });

  const notify = (text) => toast.success(text);

  // const loginMutation = useMutation({
  //   mutationFn : login,
  //   onSuccess : (data) => {
  //     console.log("logged in successfully", data);
  //   }
  // })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    loginMutation.mutate(userData);
    if(loginData !== ""){
      toast.success("Logged in Sucessfully")
    }

    if(error !== ""){
      toast.error(error)
    }
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
          <Heading>Welcome Back</Heading>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>

          <Button variant={"link"} colorScheme={"teal"} alignSelf={"flex-end"}>
            <Link to={"/forget-password"} target={"_blank"}>
              Forget password?
            </Link>
          </Button>

          <Button type={"submit"} colorScheme={"teal"}>
            Login
          </Button>

          <Text textAlign={"right"}>
            New User ?{" "}
            <Button
              variant={"link"}
              colorScheme={"teal"}
              alignSelf={"flex-end"}
            >
              <Link to={"/signup"}>Sign Up</Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </Container>
  );
};

export default Login;

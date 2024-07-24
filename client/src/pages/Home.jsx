import { Button, Container, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Container
    spacing={"8"}
    w={["full", "96"]}
    m={"auto"}
    my={"auto"}>
    <HStack justifyContent={"space-evenly"} >
        <Link to={"/signup"}>
            <Button colorScheme={"teal"} >Signup</Button>
        </Link>
        <Link to={"/login"}>
            <Button colorScheme={"teal"}>Login</Button>
        </Link>
    </HStack>
    </Container>
  )
}

export default Home
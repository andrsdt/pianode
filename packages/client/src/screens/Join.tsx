import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validate } from 'shared'

export function Join() {
  const navigate = useNavigate()

  const [username, setUsername] = useState(sessionStorage.getItem('username') || '')
  const [room, setRoom] = useState(sessionStorage.getItem('room') || '')

  const handleSubmit = () => {
    sessionStorage.setItem('username', username)
    navigate(`/rooms/${room}`)
  }

  const errors = {
    username: validate.username(username),
    room: validate.room(room),
  }

  return (
    <ChakraProvider>
      <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Join a room
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              and start playing right away 🎹
            </Text>
          </Stack>
          <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <FormControl id="username" isRequired isInvalid={!errors.username.isValid}>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <FormErrorMessage>{errors.username?.toast?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="room" isRequired>
                <FormLabel>Room</FormLabel>
                <HStack>
                  <PinInput placeholder={'0'} size={'lg'} value={room} onChange={(v) => setRoom(v.toString())}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Joining..."
                  size="lg"
                  bg={'green.400'}
                  color={'white'}
                  _hover={{
                    bg: 'green.500',
                  }}
                  disabled={!errors.username.isValid || !errors.room.isValid}
                  type="submit"
                  onClick={handleSubmit}>
                  Join
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </ChakraProvider>
  )
}

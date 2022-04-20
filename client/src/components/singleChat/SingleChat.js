import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getSender, getSenderFull } from '../../config/ChatLogics'
import { ChatState } from '../../context/ChatProvider'
import ProfileModal from '../miscellaneous/profileModal/ProfileModal'
import UpdateGroupChatModal from '../miscellaneous/updateGroupChatModal/UpdateGroupChatModal'
import ScrollableChat from '../scrollableChat/ScrollableChat'
import './singleChat.css'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState('')

  const { user, selectedChat, setSelectedChat } = ChatState()
  const toast = useToast()

  const fetchMessages = async () => {
    if (!selectedChat) return
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      setLoading(true)
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      )
      setMessages(data)
      setLoading(false)
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to load the messages',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [selectedChat])

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
        const { data } = await axios.post(
          '/api/message',
          { content: newMessage, chatId: selectedChat._id },
          config
        )
        setNewMessage('')
        setMessages([...messages, data])
      } catch (error) {
        toast({
          title: 'Error Occured!',
          description: 'Failed to send the message',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      }
    }
  }
  const typingHandler = (e) => {
    setNewMessage(e.target.value)
    //Typing indicator
  }

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '28px', md: '30px' }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: 'space-between' }}
            alignItems="center"
          >
            <IconButton
              d={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat('')}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                {
                  <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                  />
                }
              </>
            )}
          </Text>
          <Box
            d="flex"
            flexDir={'column'}
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius={'lg'}
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size={'xl'}
                w={20}
                h={20}
                alignItems="center"
                margin={'auto'}
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant="filled"
                bg={'#E0E0E0'}
                placeholder="Enter a message"
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize={'3xl'} fontFamily="Work sans" pb={3}>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  )
}

export default SingleChat

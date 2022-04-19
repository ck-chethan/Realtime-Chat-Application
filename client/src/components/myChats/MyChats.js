import { useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { ChatState } from '../../context/ChatProvider'

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState()
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState()

  const toast = useToast()

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get('/api/chat', config)
      if (!chats.find((c) => c.id === data._id)) {
        setChats([data, ...chats])
      }
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to load the chats',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      })
    }
  }

  return <div>MyChats</div>
}

export default MyChats

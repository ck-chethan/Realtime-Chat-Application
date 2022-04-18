import { Box } from '@chakra-ui/react'
import SideDrawer from '../../components/miscellaneous/sideDrawer/SideDrawer'
import { ChatState } from '../../context/ChatProvider'
import '../chatPage/chatPage.css'
import ChatBox from '../../components/chatBox/ChatBox'
import MyChats from '../../components/myChats/MyChats'

const ChatPage = () => {
  const { user } = ChatState()
  return (
    <div style={{ width: '100%' }}>
      {user && <SideDrawer />}
      <Box
        d="flex"
        justifyContent={'space-between'}
        w="100%"
        h="91.5vh"
        p={'10px'}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  )
}

export default ChatPage

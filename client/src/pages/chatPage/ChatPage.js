import { Box } from '@chakra-ui/react'
import SideDrawer from '../../components/miscellaneous/sideDrawer/SideDrawer'
import { ChatState } from '../../context/ChatProvider'
import '../chatPage/chatPage.css'

const ChatPage = () => {
  const { user } = ChatState()
  return (
    <div style={{ width: '100%' }}>
      {user && <SideDrawer />}
      <Box>
        {/* {user && <MyChats/>} */}
        {/* {user && <ChatBox/>} */}
      </Box>
    </div>
  )
}

export default ChatPage

import { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const ChatContext = createContext()

const ChatProvider = ({ childern }) => {
  const [user, setUser] = useState()
  const history = useHistory()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    setUser(userInfo)
    if (!userInfo) {
      history.push('/')
    }
  }, [history])

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {childern}
    </ChatContext.Provider>
  )
}
export const ChatState = () => {
  useContext(ChatContext)
}
export default ChatProvider

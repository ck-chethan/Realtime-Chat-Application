import './App.css'
import { Route } from 'react-router-dom'
import Homepage from './pages/homePage/Homepage'
import ChatPage from './pages/chatPage/ChatPage'

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Homepage} />
      <Route path="/chats" component={ChatPage} />
    </div>
  )
}

export default App

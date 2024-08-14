import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const URL = 'http://127.0.0.1:8000/api';

  const getConversations = async () => {
    const response = await axios.get(URL);
    setConversations(response.data.data.map((d) => ({ id: d.id, context: d.context })));
  };

  const handleChangeConversation = async (conversationId) => {
    setCurrentConversationId(conversationId);
    const response = await axios.get(`${URL}/${conversationId}`);
    setMessages(response.data.data.messages.map((c) => ({
      user: c.is_user_message ? 'You' : 'Virtual Assistant',
      text: c.content,
    })));
  };

  const newChat = () => {
    setMessages([]);
    setCurrentConversationId(null);
  };

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = input.trim();

      const response = await axios.post(URL, {
        conversation_id: currentConversationId,
        message: userMessage,
      });

      setCurrentConversationId(response.data.data.conversation_id);
      getConversations();
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 'You', text: userMessage },
      ]);

      const assistantResponse = response.data.data.reply;
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 'Virtual Assistant', text: assistantResponse },
      ]);

      setInput('');
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="sidebar">
          <div className="sidebar-title">
            <h3>Chat</h3>
            <button id="new-chat-btn" onClick={newChat}>New</button>
          </div>
          {conversations.map((conversation, index) => (
            <div key={index} className="conversation-item">
              <button
                onClick={() => handleChangeConversation(conversation.id)}
              >
                {conversation.context}
              </button>
            </div>
          ))}
        </div>

        <div className="chat-box-container">
          <div className="chat-box">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.user === 'You' ? 'user-message' : 'assistant-message'}`}
              >
                <strong>{msg.user}: </strong>{msg.text}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

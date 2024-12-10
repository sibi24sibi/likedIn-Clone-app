'use client'

import { useState } from 'react'
import { ArrowLeft, Send } from 'react-feather'
import { Link, useParams } from 'react-router-dom'


export default function ChatPage() {

  const { id } = useParams();

  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there!", sender: 'them', timestamp: '10:00 AM' },
    { id: 2, text: "Hi! How are you?", sender: 'me', timestamp: '10:02 AM' },
    { id: 3, text: "I'm doing great, thanks for asking!", sender: 'them', timestamp: '10:05 AM' },
    { id: 4, text: "That's wonderful to hear!", sender: 'me', timestamp: '10:07 AM' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: newMessage,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setNewMessage('')
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center">
        <Link to="/messages" className="mr-4">
          <ArrowLeft className="text-gray-600 dark:text-gray-300" />
        </Link>
        <img src={`https://i.pravatar.cc/40?img=${id}`} alt="User" className="w-10 h-10 rounded-full mr-3" />
        <div>
          <h2 className="font-semibold text-gray-800 dark:text-white">John Doe</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white'
            }`}>
              <p>{message.text}</p>
              <p className="text-xs mt-1 text-gray-200 dark:text-gray-400">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSend} className="bg-white dark:bg-gray-800 p-4 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <Send size={20} />
        </button>
      </form>
    </div>
  )
}


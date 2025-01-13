'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, Send } from 'react-feather'
import { Link, useParams } from 'react-router-dom'
import { firestore } from "../Firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../Api/AuthApi';
import { listenToSingleUser } from '../Api/UploadApi';
import moment from 'moment';

export default function ChatPage() {
  const { id } = useParams(); // The ID of the user you're chatting with
  const { userData } = useAuth(); // Authenticated user data
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const chatId = userData.userID < id ? `chat_${userData.userID}_${id}` : `chat_${id}_${userData.userID}`;
  const messagesCollection = collection(firestore, 'chats', chatId, 'messages');

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const grouped = [];
    let currentDate = null;

    messages.forEach((message) => {
      const messageDate = moment(message.timestamp.toDate()).format('YYYY-MM-DD');
      if (messageDate !== currentDate) {
        currentDate = messageDate;
        let dateLabel = '';
        if (moment(currentDate).isSame(moment(), 'day')) {
          dateLabel = 'Today';
        } else if (moment(currentDate).isSame(moment().subtract(1, 'day'), 'day')) {
          dateLabel = 'Yesterday';
        } else {
          dateLabel = moment(currentDate).format('MMM D');
        }
        grouped.push({ dateLabel, messages: [] });
      }
      grouped[grouped.length - 1].messages.push(message);
    });

    return grouped;
  };

  useEffect(() => {
    const q = query(messagesCollection, orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(groupMessagesByDate(allMessages));
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        await addDoc(messagesCollection, {
          text: newMessage,
          sender: userData.userID,
          timestamp: serverTimestamp(),
        });
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = listenToSingleUser(setUser, id);
    return () => unsubscribe();
  }, [id]);

  return (
    <div className=' h-screen lg:h-[28rem] bg-red-700'>
      <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center">
          <Link to="/messages" className="mr-4">
            <ArrowLeft className="text-gray-600 dark:text-gray-300" />
          </Link>
          <img
            src={user?.profilePic}
            alt="User"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="font-semibold text-gray-800 dark:text-white">{user?.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((group, idx) => (
            <div key={idx}>
              <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-sm">
                  {group.dateLabel}
                </span>
              </div>
              {group.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === userData.userID ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 my-1 min-w-20 rounded-lg ${message.sender === userData.userID
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white'
                      }`}
                  >
                    <p>{message.text}</p>
                    {message.timestamp && (
                      <p className="text-[10px] mt-0.5 text-gray-200  float-right dark:text-gray-400">
                        {new Date(message.timestamp.toDate()).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    )}

                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
      <form onSubmit={handleSend} className="bg-white lg:relative lg:w-auto w-screen lg:bottom-0 fixed bottom-14 dark:bg-gray-800 p-4 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Send size={20} />
        </button>
      </form>

    </div>
  );
}

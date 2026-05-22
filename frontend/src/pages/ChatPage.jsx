import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatInput } from '../components/chat/ChatInput';
import { fakeMessages } from '../data/fakeMessages';

export function ChatPage() {
  const [messages, setMessages] = useState(fakeMessages);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (content) => {
    const newMessage = {
      id: Date.now(),
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "I'm processing your request. Since I'm currently a UI placeholder, I don't have real backend capabilities yet!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full relative bg-transparent">
      <div className="flex-1 overflow-y-auto scroll-smooth pb-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="sticky bottom-0 w-full z-10 pt-4 bg-gradient-to-t from-[#0f172a] via-[#0f172a] to-transparent">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}

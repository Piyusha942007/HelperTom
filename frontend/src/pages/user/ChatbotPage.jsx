import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Mic, Sparkles, User } from 'lucide-react';
import { fakeChatMessages } from '../../data/fakeData';
import { cn } from '../../components/layout/Sidebar';

const ChatbotPage = () => {
  const [messages, setMessages] = useState(fakeChatMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Fake AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: 'I understand. Let me check the details for you. Is there anything else you need help with?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Header */}
      <div className="h-16 border-b border-border bg-white flex items-center px-6 gap-3 shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="text-primary w-5 h-5" />
        </div>
        <div>
          <h2 className="font-semibold text-text-primary">AI Support Assistant</h2>
          <p className="text-xs text-text-muted flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 block"></span> Online
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((msg, idx) => {
          const isAi = msg.sender === 'ai';
          return (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-4 max-w-3xl", isAi ? "mr-auto" : "ml-auto flex-row-reverse")}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm",
                isAi ? "bg-primary text-white" : "bg-blue-500 text-white"
              )}>
                {isAi ? <Sparkles size={16} /> : <User size={16} />}
              </div>
              
              <div className={cn("flex flex-col gap-1", isAi ? "items-start" : "items-end")}>
                <div className={cn(
                  "px-5 py-3 rounded-2xl shadow-sm text-[15px] leading-relaxed",
                  isAi 
                    ? "bg-white text-text-primary border border-border rounded-tl-sm" 
                    : "bg-slate-900 text-white rounded-tr-sm"
                )}>
                  {msg.text}
                </div>
                <span className="text-[11px] text-text-muted px-1">{msg.time}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-border shrink-0">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-end gap-2 bg-gray-50 border border-border rounded-3xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <button type="button" className="p-2 text-text-muted hover:text-text-primary transition-colors">
            <Paperclip size={20} />
          </button>
          
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 py-2.5 text-text-primary placeholder:text-text-muted custom-scrollbar"
            rows="1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />

          <div className="flex items-center gap-1">
            <button type="button" className="p-2 text-text-muted hover:text-text-primary transition-colors">
              <Mic size={20} />
            </button>
            <button 
              type="submit" 
              disabled={!inputValue.trim()}
              className="p-2.5 bg-primary text-white rounded-full hover:bg-primary-hover disabled:opacity-50 disabled:hover:bg-primary transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
        <p className="text-center text-xs text-text-muted mt-3">
          AI Assistant can make mistakes. Consider verifying important information.
        </p>
      </div>
    </div>
  );
};

export default ChatbotPage;

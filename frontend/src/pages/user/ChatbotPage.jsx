import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Mic, Sparkles, User, FileText, ChevronDown, BookOpen, AlertCircle } from 'lucide-react';
import { fakeChatMessages } from '../../data/fakeData';
import { cn } from '../../components/layout/Sidebar';
import { chatService } from '../../services/chatService';

const ChatbotPage = () => {
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem('helpertom_messages');
    return saved ? JSON.parse(saved) : fakeChatMessages;
  });
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [expandedSources, setExpandedSources] = useState({}); // Track expanded citation state by message ID
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClearChat = () => {
    setMessages(fakeChatMessages);
    sessionStorage.removeItem('helpertom_messages');
    setErrorMsg('');
  };

  useEffect(() => {
    sessionStorage.setItem('helpertom_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || loading) return;

    setErrorMsg('');
    const promptText = inputValue.trim();
    setInputValue('');

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: promptText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const data = await chatService.sendMessage(promptText);
      
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        text: data.response,
        sources: data.sources,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      console.error(err);
      const errMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        isError: true,
        text: "⚠️ **Connection Failure**: I failed to reach the HelperTom AI Engine on port 8000.\n\nPlease check if your Python backend is active by running:\n`uvicorn main_api:app --reload` inside the `backend/` folder.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errMessage]);
      setErrorMsg('FastAPI connection error. Please verify the Python server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestClick = (promptText) => {
    setInputValue(promptText);
    setTimeout(() => {
      // Small timeout to allow input value update before calling
      const fakeEvent = { preventDefault: () => {} };
      // Call with prompt text directly
      setMessages((prev) => [...prev, {
        id: Date.now(),
        sender: 'user',
        text: promptText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setLoading(true);
      
      chatService.sendMessage(promptText)
        .then((data) => {
          setMessages((prev) => [...prev, {
            id: Date.now() + 1,
            sender: 'ai',
            text: data.response,
            sources: data.sources,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        })
        .catch((err) => {
          setMessages((prev) => [...prev, {
            id: Date.now() + 1,
            sender: 'ai',
            isError: true,
            text: "⚠️ **Connection Failure**: I failed to reach the HelperTom AI Engine on port 8000.\n\nPlease check if your Python backend is active by running:\n`uvicorn main_api:app --reload` inside the `backend/` folder.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
          setErrorMsg('FastAPI connection error. Please verify the Python server is running.');
        })
        .finally(() => {
          setLoading(false);
          setInputValue('');
        });
    }, 50);
  };

  const toggleSources = (msgId) => {
    setExpandedSources((prev) => ({
      ...prev,
      [msgId]: !prev[msgId]
    }));
  };

  // Basic markdown formatter to render line breaks, bolding, and lists cleanly
  const renderMessageText = (msg) => {
    const text = msg.text || '';
    return text.split('\n').map((line, idx) => {
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="font-semibold text-slate-900">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const content = parts.length > 0 ? parts : line;

      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <li key={idx} className="list-disc list-inside ml-2 my-1 text-text-primary">
            {line.trim().substring(2)}
          </li>
        );
      }
      return <p key={idx} className="my-1 min-h-[1.2rem]">{content}</p>;
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Header */}
      <div className="h-16 border-b border-border bg-white flex items-center px-6 justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="text-primary w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="font-semibold text-text-primary">AI Support Assistant (HelperTom)</h2>
            <p className="text-xs text-text-muted flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 block"></span> Connected
            </p>
          </div>
        </div>
        
        <button 
          onClick={handleClearChat}
          className="px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 bg-white border border-border hover:border-rose-200 hover:bg-rose-50 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          Clear History
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/50">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          const isError = msg.isError;
          const showSources = expandedSources[msg.id];

          return (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-4 max-w-3xl", isAi ? "mr-auto" : "ml-auto flex-row-reverse")}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-md",
                isAi 
                  ? "bg-gradient-to-br from-violet-600 to-blue-500 text-white" 
                  : "bg-slate-900 text-white"
              )}>
                {isAi ? <Sparkles size={14} /> : <User size={14} />}
              </div>
              
              <div className={cn("flex flex-col gap-1.5", isAi ? "items-start" : "items-end")}>
                <div className={cn(
                  "px-5 py-3.5 rounded-2xl shadow-sm text-[15px] leading-relaxed border",
                  isAi 
                    ? isError
                      ? "bg-red-50 text-red-900 border-red-200 rounded-tl-sm"
                      : "bg-white text-text-primary border-border rounded-tl-sm" 
                    : "bg-slate-900 text-white border-transparent rounded-tr-sm shadow-blue-500/5"
                )}>
                  <div className="space-y-1">{renderMessageText(msg)}</div>

                  {/* RAG citations citation renderer */}
                  {isAi && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3.5 pt-2.5 border-t border-slate-100 text-xs">
                      <button
                        onClick={() => toggleSources(msg.id)}
                        className="flex items-center gap-1 font-semibold text-primary hover:text-primary-hover transition-colors focus:outline-none"
                      >
                        <BookOpen size={12} />
                        <span>RAG Knowledge References ({msg.sources.length})</span>
                        <ChevronDown size={12} className={cn("transition-transform duration-300", showSources && "rotate-180")} />
                      </button>

                      {showSources && (
                        <div className="mt-2 space-y-2 max-h-40 overflow-y-auto pr-1">
                          {msg.sources.map((src, idx) => (
                            <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600 leading-normal">
                              <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-0.5">
                                <FileText size={10} className="text-primary" />
                                <span className="truncate max-w-[150px]">{src.source}</span>
                                <span className="text-[9px] text-slate-400 font-medium px-1 bg-slate-200/50 rounded-full ml-auto">
                                  Score: {src.score}
                                </span>
                              </div>
                              <p className="italic">"{src.text}"</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-text-muted px-1">{msg.time}</span>
              </div>
            </motion.div>
          );
        })}

        {/* Bouncing Typing Animation */}
        {loading && (
          <div className="flex gap-4 max-w-3xl mr-auto">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-blue-500 text-white flex items-center justify-center shrink-0 shadow-md animate-pulse">
              <Sparkles size={14} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="px-5 py-3.5 rounded-2xl bg-white border border-border rounded-tl-sm text-sm text-slate-400 flex items-center gap-2 shadow-sm font-medium">
                <span>HelperTom is processing</span>
                <div className="flex gap-1 items-center mt-1 shrink-0">
                  <div className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompts Block */}
      {!loading && messages.length <= 4 && (
        <div className="px-6 py-2 bg-[#F8FAFC] border-t border-slate-100 flex flex-wrap gap-2 justify-center">
          {[
            "What is your Refund Policy?",
            "How do I track my order?",
            "What electronics gadgets do you sell?",
            "Which pet supplies are available?"
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestClick(prompt)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-primary bg-white border border-border hover:border-primary/40 hover:bg-primary/5 rounded-full transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <span>✨</span>
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-border shrink-0 z-10 shadow-md">
        {errorMsg && (
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 py-1.5 px-4 rounded-xl max-w-max mx-auto mb-3 shadow-sm animate-pulse">
            <AlertCircle size={14} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-end gap-2 bg-gray-50 border border-border rounded-3xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <button type="button" className="p-2 text-text-muted hover:text-text-primary transition-colors">
            <Paperclip size={20} />
          </button>
          
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
            placeholder={loading ? "HelperTom is formulating a response..." : "Type a support question..."}
            className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 py-2.5 text-text-primary placeholder:text-text-muted custom-scrollbar disabled:opacity-50"
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
              disabled={!inputValue.trim() || loading}
              className="p-2.5 bg-primary text-white rounded-full hover:bg-primary-hover disabled:opacity-50 disabled:hover:bg-primary transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
        <p className="text-center text-[10px] text-text-muted mt-2">
          HelperTom AI retrieves context from pre-loaded shop documents. Answers are derived from verified policies.
        </p>
      </div>
    </div>
  );
};

export default ChatbotPage;


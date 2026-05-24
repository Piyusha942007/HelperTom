import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatInput } from '../components/chat/ChatInput';
import { fakeMessages } from '../data/fakeMessages';
import { chatService } from '../services/chatService';
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export function ChatPage() {
  const [messages, setMessages] = useState(fakeMessages);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (content) => {
    if (!content.trim() || loading) return;

    setErrorMsg('');
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const data = await chatService.sendMessage(content.trim());
      
      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.response,
        sources: data.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      console.error(err);
      const errBubble = {
        id: Date.now() + 1,
        role: 'assistant',
        isError: true,
        content: "⚠️ **Connection Failure**: I failed to reach the HelperTom AI Engine on port 8000.\n\nPlease ensure your Python backend is active by running:\n`uvicorn main_api:app --reload` inside the `backend/` directory.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errBubble]);
      setErrorMsg('FastAPI connection error. Please verify the Python server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestClick = (promptText) => {
    handleSend(promptText);
  };

  return (
    <div className="flex flex-col h-full relative bg-transparent">
      {/* Messages Viewport */}
      <div className="flex-1 overflow-y-auto scroll-smooth pb-4 pr-1">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          
          {/* Custom Bouncing Typing Loader */}
          {loading && (
            <div className="flex justify-start mb-6 items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white flex items-center justify-center animate-pulse">
                <Sparkles size={14} />
              </div>
              <div className="glass-panel text-slate-400 px-5 py-3 rounded-2xl text-[14px] flex items-center gap-2 border border-white/5 shadow-md">
                <span className="font-medium">HelperTom is thinking</span>
                <div className="flex gap-1 items-center mt-1">
                  <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Prompts & Input Bar */}
      <div className="sticky bottom-0 w-full z-10 pt-4 bg-gradient-to-t from-[#0f172a] via-[#0f172a] to-transparent">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          
          {/* suggested prompts - only shown when chat has no loading state */}
          {!loading && messages.length <= 4 && (
            <div className="flex flex-wrap gap-2.5 justify-center mb-1">
              {[
                "What is your Refund Policy?",
                "How do I track my order?",
                "What electronics gadgets do you sell?",
                "Which pet supplies are available?"
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestClick(prompt)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 glass-panel border border-white/10 rounded-full hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  ✨ {prompt}
                </button>
              ))}
            </div>
          )}

          {errorMsg && (
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-rose-400 bg-rose-950/20 border border-rose-500/10 py-2 px-4 rounded-xl max-w-max mx-auto shadow-inner shadow-black/20">
              <AlertCircle size={14} />
              <span>{errorMsg}</span>
            </div>
          )}

          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}


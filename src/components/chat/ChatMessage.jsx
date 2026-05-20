import { User, Bot } from 'lucide-react';

export function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 shadow-lg
          ${isUser 
            ? 'bg-slate-800 text-slate-300 border border-white/10' 
            : 'bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-violet-500/30'}
        `}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        <div className="flex flex-col min-w-0">
          <div className={`
            px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed border shadow-sm
            ${isUser 
              ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-tr-sm border-transparent shadow-violet-500/20' 
              : 'glass-panel text-slate-200 rounded-tl-sm border-white/10 shadow-black/5'}
          `}>
            {message.content}
          </div>
          <span className={`text-[11px] text-slate-500 mt-1.5 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}

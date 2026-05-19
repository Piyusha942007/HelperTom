import { User, Bot } from 'lucide-react';

export function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1
          ${isUser 
            ? 'bg-gray-100 text-gray-600' 
            : 'bg-[var(--color-primary)] text-white'}
        `}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        <div className="flex flex-col min-w-0">
          <div className={`
            px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed
            ${isUser 
              ? 'bg-[var(--color-primary)] text-white rounded-tr-sm' 
              : 'bg-gray-100 text-gray-800 rounded-tl-sm'}
          `}>
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
}

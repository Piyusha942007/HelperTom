import { User, Bot, FileText, ChevronDown, BookOpen } from 'lucide-react';
import { useState } from 'react';

export function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  const [showSources, setShowSources] = useState(false);

  // Simple formatter for bullet points, bolding, and line breaks to mimic markdown support
  const formatContent = (text) => {
    if (!text) return '';
    return text.split('\n').map((line, idx) => {
      let formattedLine = line;
      // Handle simple markdown-like bolding **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="font-bold text-white">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const content = parts.length > 0 ? parts : formattedLine;

      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <li key={idx} className="list-disc list-inside ml-2 my-1 text-slate-200">
            {line.trim().substring(2)}
          </li>
        );
      }
      return <p key={idx} className="my-1.5 min-h-[1.2rem]">{content}</p>;
    });
  };

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
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
              : message.isError 
                ? 'bg-rose-950/40 border-rose-500/30 text-rose-200 rounded-tl-sm'
                : 'glass-panel text-slate-200 rounded-tl-sm border-white/10 shadow-black/5'}
          `}>
            <div className="space-y-1">{formatContent(message.content)}</div>

            {/* RAG Sources Citations Section */}
            {!isUser && message.sources && message.sources.length > 0 && (
              <div className="mt-4 pt-3 border-t border-white/10">
                <button 
                  onClick={() => setShowSources(!showSources)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors focus:outline-none"
                >
                  <BookOpen size={12} />
                  <span>References ({message.sources.length})</span>
                  <ChevronDown size={12} className={`transition-transform duration-300 ${showSources ? 'rotate-180' : ''}`} />
                </button>

                {showSources && (
                  <div className="mt-2.5 space-y-2 max-h-48 overflow-y-auto pr-1">
                    {message.sources.map((src, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300">
                        <div className="flex items-center gap-2 font-medium text-violet-300 mb-1">
                          <FileText size={12} />
                          <span>{src.source}</span>
                          <span className="text-[10px] text-slate-400 bg-white/10 px-1.5 py-0.5 rounded-full ml-auto">
                            Match: {Math.max(0, Math.round((1 - src.score) * 100))}%
                          </span>
                        </div>
                        <p className="italic text-slate-400 leading-normal line-clamp-3">"{src.text}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <span className={`text-[11px] text-slate-500 mt-1.5 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}


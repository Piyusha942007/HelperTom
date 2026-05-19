import { Send } from 'lucide-react';
import { useState } from 'react';

export function ChatInput({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <form 
          onSubmit={handleSubmit}
          className="flex items-end gap-2 bg-white border border-gray-300 rounded-xl p-2 shadow-sm focus-within:border-[var(--color-primary)] focus-within:ring-1 focus-within:ring-[var(--color-primary)] transition-all"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 max-h-32 min-h-[40px] bg-transparent border-none outline-none resize-none py-2 px-2 text-gray-900 placeholder:text-gray-400"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          
          <button 
            type="submit" 
            disabled={!input.trim()}
            className={`
              p-2.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer
              ${input.trim() 
                ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]' 
                : 'bg-gray-100 text-gray-400'}
            `}
          >
            <Send size={18} className={input.trim() ? 'ml-0.5' : ''} />
          </button>
        </form>
      </div>
    </div>
  );
}

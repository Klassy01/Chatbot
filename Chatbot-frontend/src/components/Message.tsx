import type { Message } from '../types/types';

interface MessageProps {
  message: Message;
}

export default function MessageComponent({ message }: MessageProps) {
  return (
    <div className={`flex mb-6 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-3xl rounded-xl px-4 py-3 ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
        <div className="whitespace-pre-wrap text-base">{message.content}</div>
        <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase()}
        </div>
      </div>
    </div>
  );
}
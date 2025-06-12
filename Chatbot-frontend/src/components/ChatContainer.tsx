import type { Message } from '../types/types';
import MessageComponent from './Message';
import ChatInput from './ChatInput';

interface ChatContainerProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isSidebarOpen: boolean;
}

export default function ChatContainer({ 
  messages, 
  onSendMessage,
  isSidebarOpen 
}: ChatContainerProps) {
  return (
    <div
      className={`
        fixed top-0 right-0 h-full flex flex-col transition-all duration-300 
        ${isSidebarOpen ? 'ml-64' : 'ml-0'} 
        w-full ${isSidebarOpen ? 'md:w-[calc(100%-16rem)]' : 'md:w-full'}
        bg-gray-50
      `}
    >
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="max-w-md mx-auto">
              <img 
                src="/assets/chatbot.png" 
                alt="DeepSeek Logo" 
                className="w-16 h-16 mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">How can I help you today?</h2>
              <p className="text-gray-500">
                Ask me anything, from creative ideas to technical explanations.
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <MessageComponent key={message.id} message={message} />
          ))
        )}
      </div>

      <div className="border-t border-gray-200 p-4 bg-white">
        <ChatInput onSend={onSendMessage} />
      </div>
    </div>
  );
}

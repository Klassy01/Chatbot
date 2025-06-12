import type { Chat } from '../types/types';

interface RecentChatsProps {
  chats: Chat[];
  activeChatId: string | null;
  onChatSelect: (id: string) => void;
}

export default function RecentChats({ chats, activeChatId, onChatSelect }: RecentChatsProps) {
  return (
    <div className="overflow-y-auto h-[calc(100%-180px)] px-2">
      <h3 className="px-2 py-2 text-sm font-medium text-gray-500">Recent Chats</h3>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            <button
              onClick={() => onChatSelect(chat.id)}
              className={`w-full text-left px-2 py-3 rounded-lg ${
                activeChatId === chat.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {chat.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

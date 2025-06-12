import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RecentChats from './RecentChats';
import type { Chat } from '../types/types';
import {
  Menu,
  X,
  Plus,
  Settings,
  User,
  Shield,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onNewChat: () => void;
  chats: Chat[];
  setActiveChat: (id: string) => void;
  activeChatId: string | null;
}

export default function Sidebar({
  isOpen,
  toggleSidebar,
  onNewChat,
  chats,
  setActiveChat,
  activeChatId,
}: SidebarProps) {
  const [localChats, setLocalChats] = useState<Chat[]>(chats);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLocalChats(chats);
  }, [chats]);

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: Chat = {
      id: newChatId,
      title: `New Chat ${localChats.length + 1}`,
      lastMessage: '',
      updatedAt: new Date(),
    };
    const updatedChats = [newChat, ...localChats];
    setLocalChats(updatedChats);
    onNewChat();
    setActiveChat(newChatId);
    navigate(`/chat/${newChatId}`);
    if (window.innerWidth < 768 && isOpen) {
      toggleSidebar();
    }
  };

  const toggleSettings = () => setShowSettings(prev => !prev);

  const navigateTo = (path: string) => {
    setShowSettings(false);
    navigate(path);
    if (window.innerWidth < 768 && isOpen) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow hover:bg-gray-100 focus:outline-none transition-all duration-200 ${
          isOpen ? 'md:hidden' : ''
        }`}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-800" />
        ) : (
          <Menu className="w-6 h-6 text-gray-800" />
        )}
      </button>

      {/* Overlay for Mobile */}
      {isOpen && <div onClick={toggleSidebar} className="fixed inset-0 z-40 bg-black bg-opacity-30 md:hidden" />}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:shadow-none`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold">DeepSeek Chat</h1>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        {/* Chat List */}
        <div className="overflow-y-auto h-[calc(100%-220px)]">
          <RecentChats
            chats={localChats}
            activeChatId={activeChatId}
            onChatSelect={(id) => {
              setActiveChat(id);
              navigate(`/chat/${id}`);
              if (window.innerWidth < 768 && isOpen) {
                toggleSidebar();
              }
            }}
          />
        </div>

        {/* Settings Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <button
            onClick={toggleSettings}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 w-full transition-colors duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-700" />
            </div>
            <span className="font-medium">User Settings</span>
            <svg
              className={`w-4 h-4 ml-auto transition-transform duration-200 ${showSettings ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Options */}
          {showSettings && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="space-y-1">
                {[
                  { path: '/settings', icon: <Settings className="w-4 h-4" />, label: 'Settings' },
                  { path: '/profile', icon: <User className="w-4 h-4" />, label: 'Profile' },
                  { path: '/privacy', icon: <Shield className="w-4 h-4" />, label: 'Privacy' },
                ].map(({ path, icon, label }) => (
                  <button
                    key={path}
                    onClick={() => navigateTo(path)}
                    className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center gap-2 transition-colors duration-200 ${
                      location.pathname === path ? 'bg-gray-100' : ''
                    }`}
                  >
                    {icon}
                    {label}
                  </button>
                ))}

                <button
                  onClick={() => navigateTo('/logout')}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center gap-2 text-red-500 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                <p className="mb-1">DeepSeek Chat v1.0.0</p>
                <p>&copy; {new Date().getFullYear()} DeepSeek</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

import Sidebar from "./components/Sidebar";
import ChatContainer from "./components/ChatContainer";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

import type { Chat, Message } from "./types/types";

import SettingsPage from "./pages/settings";
import ProfilePage from "./pages/profile";
import PrivacyPage from "./pages/privacy";
import LogoutPage from "./pages/logout";

export default function App() {
  const { isAuthenticated } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Getting started",
      lastMessage: "Hello! How can I help you today?",
      updatedAt: new Date(),
    },
  ]);
  const [activeChatId, setActiveChatId] = useState<string>("1");
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "1",
        content: "Hello! How can I help you today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ],
  });

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: Chat = {
      id: newChatId,
      title: `New Chat ${chats.length + 1}`,
      lastMessage: "",
      updatedAt: new Date(),
    };

    setChats([newChat, ...chats]);
    setActiveChatId(newChatId);
    setMessages((prev) => ({
      ...prev,
      [newChatId]: [],
    }));
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim() || !activeChatId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), userMessage],
    }));

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, lastMessage: content, updatedAt: new Date() }
          : chat
      )
    );

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm DeepSeek Chat. How can I assist you further?",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), botMessage],
      }));
    }, 1000);
  };

  if (!isAuthenticated) {
    return showSignUp ? (
      <SignUp onSwitchToSignIn={() => setShowSignUp(false)} />
    ) : (
      <SignIn onSwitchToSignUp={() => setShowSignUp(true)} />
    );
  }

  return (
    <div className="relative h-screen bg-gray-50 text-gray-900 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onNewChat={handleNewChat}
        chats={chats}
        setActiveChat={setActiveChatId}
        activeChatId={activeChatId}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ChatContainer
              messages={messages[activeChatId] || []}
              onSendMessage={handleSendMessage}
              isSidebarOpen={sidebarOpen}
            />
          }
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

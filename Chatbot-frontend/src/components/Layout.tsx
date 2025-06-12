import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import type { ReactNode } from 'react';

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    document.title = `${title} | DeepSeek Chat`;
  }, [title]);

  return (
    <div className="flex min-h-screen bg-gray-50 transition-colors duration-200">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onNewChat={() => {}}
        chats={[]}
        setActiveChat={() => {}}
        activeChatId={null}
      />

      <main
        className={`flex-1 p-4 md:p-6 overflow-y-auto ${
          isSidebarOpen ? 'md:ml-64' : ''
        }`}
      >
        {children}
      </main>
    </div>
  );
}

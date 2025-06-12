import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function SettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return 'system';
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    document.title = 'Settings | DeepSeek Chat';

    // Always apply light theme
    const root = document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    localStorage.setItem('theme', 'light');
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onNewChat={() => {}}
        chats={[]}
        setActiveChat={() => {}}
        activeChatId={null}
      />

      <main className="flex-1 p-6 md:ml-64">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Language Preferences */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Language Preferences</h3>
              <select className="border rounded-md p-2 w-full max-w-xs">
                <option>English</option>
                <option>中文</option>
                <option>Español</option>
                <option>Français</option>
              </select>
            </div>
          </section>

          {/* Theme Options */}
          <section>
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Theme</h3>
              <div className="flex gap-4">
                {['light', 'dark', 'system'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handleThemeChange(mode as 'light' | 'dark' | 'system')}
                    className={`p-2 px-4 border rounded-md hover:bg-gray-100 ${
                      theme === mode ? 'bg-blue-100 border-blue-300' : ''
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section>
            <div>
              <h3 className="font-medium mb-2">Notifications</h3>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="notifications"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="notifications" className="text-sm text-gray-700">
                  Enable notifications
                </label>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

import { useTheme } from '../utils/ThemeContext'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme('light')}
        className={`px-3 py-1 rounded-md ${
          theme === 'light' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 dark:bg-gray-700'
        }`}
      >
        Light
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`px-3 py-1 rounded-md ${
          theme === 'dark' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 dark:bg-gray-700'
        }`}
      >
        Dark
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`px-3 py-1 rounded-md ${
          theme === 'system' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 dark:bg-gray-700'
        }`}
      >
        System
      </button>
    </div>
  )
}
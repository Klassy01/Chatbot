// src/utils/theme.ts

export const setTheme = (theme: 'light' | 'dark' | 'system') => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else if (theme === 'light') {
    root.classList.remove('dark');
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', prefersDark);
  }
  localStorage.setItem('theme', theme);
};

export const loadTheme = () => {
  const saved = localStorage.getItem('theme') || 'system';
  setTheme(saved as 'light' | 'dark' | 'system');
};

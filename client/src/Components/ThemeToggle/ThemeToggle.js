import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className="theme-toggle" onClick={toggleTheme} title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
      {isDark ? (
        <LightModeIcon />
      ) : (
        <DarkModeIcon />
      )}
    </div>
  );
};

export default ThemeToggle;

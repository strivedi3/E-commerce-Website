import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Moon, SunMedium } from '../utilities/icons';

const DarkModeToggler = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button 
  onClick={toggleDarkMode} 
  className="p-[0.4rem] rounded-md bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
>
  {darkMode ? <SunMedium  className="h-5 w-5" /> : <Moon  className="h-5 w-5" />}
</button>

  );
};

export default DarkModeToggler;

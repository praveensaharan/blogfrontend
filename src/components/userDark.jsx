import React from "react";
import second from "../Assets/light-mode.png";

function DarkModeButton() {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      className="rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none"
      onClick={toggleDarkMode}
    >
      <img className="w-6 h-6" src={second} alt="mode" />
    </button>
  );
}

export default DarkModeButton;

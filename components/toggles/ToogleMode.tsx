"use client"
import { useState } from "react";
import { Moon, Sun } from "../icons";
import { Button } from "../tags/Button";

export function ToogleMode() {
  const [themeMode, setThemeMode] = useState(false);

  const toggleTheme = () => {
    setThemeMode(!themeMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      {!themeMode ? (
        <Button onClick={toggleTheme}>
          <Sun className="w-4 h-4 text-black"/>
        </Button>
      ) : (
        <Button onClick={toggleTheme}>
          <Moon className="w-4 h-4 text-black"/>
        </Button>
      )}
    </>
  );
}

"use client"
import { useState } from "react";
import { Moon, Sun } from "../icons";
import { Button } from "../tags/button";

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
          <Sun className="w-5 h-5 text-smokeWhite"/>
        </Button>
      ) : (
        <Button onClick={toggleTheme}>
          <Moon className="w-5 h-5 text-smokeWhite"/>
        </Button>
      )}
    </>
  );
}

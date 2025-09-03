import { useState } from "react";
import { Button } from "./tags";

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
          <>a</>
        </Button>
      ) : (
        <Button onClick={toggleTheme}>
          <>A</>
        </Button>
      )}
    </>
  );
}

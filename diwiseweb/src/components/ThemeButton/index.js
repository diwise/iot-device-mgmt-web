import { useState, useEffect } from "react";
import "./themebutton.css";

function ThemeButton() {
  const [darkMode, setDarkMode] = useState(getInitialMode());
  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode() {
    const isReturningUser = "dark" in localStorage;
    const savedMode = JSON.parse(localStorage.getItem("dark"));
    const userPrefersDark = getPrefColorScheme();
    if (isReturningUser) {
      return savedMode;
    } else if (userPrefersDark) {
      return true;
    } else {
      return false;
    }
  }

  function getPrefColorScheme() {
    if (!window.matchMedia) return;

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function enableDarkMode(dark) {
    if (dark == true) { 
      document.body.classList.add("darkTheme");
      document.body.classList.remove("lightTheme")
      return "grey"
    }

    document.body.classList.add("lightTheme");
    document.body.classList.remove("darkTheme")

    return "orange"
  }


  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <div className="toggle-container">
        <span style={{ color: darkMode ? "grey" : "orange" }}>☀︎</span>
        <span className="toggle">
          <input
            checked={darkMode}
            onChange={() => setDarkMode((prevMode) => !prevMode)}
            id="checkbox"
            className="checkbox"
            type="checkbox"
          />
          <label htmlFor="checkbox" />
        </span>

        <span
          style={{
            color: darkMode
              ? enableDarkMode(true)
              : enableDarkMode(false),
          }}
        >
          ☾
        </span>
      </div>
    </div>
  );
}
export default ThemeButton;

import React from "react";
import styles from "../styles/DarkModeToggle.module.css";
import { FaMoon } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { FiSun } from "react-icons/fi";

export default function DarkModeToggle({
  template,
  setTemplate,
  darkModeTemplate,
  lightModeTemplate,
}) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode === true) {
      setTemplate(darkModeTemplate);
    } else {
      setTemplate(lightModeTemplate);
    }
  }, [darkMode]);
  return (
    <div
      style={{
        height: "30px",
        width: "60px",
        background: "red",
        borderRadius: "30%",
      }}
    >
      <div
        style={{
          margin: "0",
          display: "flex",
        }}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? (
          <FiSun
            style={{
              color: template.textColor,
              margin: "auto 0 auto 30px",
            }}
          />
        ) : (
          <FaMoon
            style={{
              color: template.textColor,
              margin: "auto 0 auto 30px",
            }}
          />
        )}
      </div>
    </div>
  );
}

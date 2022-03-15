import React from "react";
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
      onClick={() => setDarkMode(!darkMode)}
      style={{
        position: "relative",
        height: "30px",
        width: "50px",
        background: template.secondaryBackgroundColor,
        border: `1px solid ${template.borderColor}`,
        borderRadius: "30px",
        margin: "auto auto auto 60px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          margin: "0",
          display: "flex",
          height: "30px",
          width: "30px",
          display: "flex",
          borderRadius: "30px",
          background: template.primaryColor,
          position: "absolute",
          left: darkMode ? 20 : 0,
          transition: "0.3s",
        }}
      >
        {darkMode ? (
          <FiSun
            style={{
              color: "white",
              margin: "auto",
            }}
          />
        ) : (
          <FaMoon
            style={{
              color: "white",
              margin: "auto",
              fontSize: "14px",
            }}
          />
        )}
      </div>
    </div>
  );
}

import React from "react";
import { useState, useEffect } from "react";

export default function OptionSelectorCard({
  value,
  template,
  updateOptions,
  selectedOptions,
  option,
}) {
  const [backgroundColor, setBackgroundColor] = useState(
    template.secondaryBackgroundColor
  );
  const [borderColor, setBorderColor] = useState(template.borderColor);
  const [textColor, setTextColor] = useState(template.setTextColor);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (selectedOptions[option.name] === value.name || hovered) {
      setBackgroundColor(template.primaryColor);
      setBorderColor(template.primaryColor);
      setTextColor("white");
    } else {
      setBackgroundColor(template.secondaryBackgroundColor);
      setBorderColor(template.borderColor);
      setTextColor("black");
    }
  }, [selectedOptions, hovered, template]);

  return (
    <div style={{ width: "33.33%" }}>
      <div
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        onClick={() => updateOptions(option.name, value.name)}
        style={{
          border: `1px solid ${template.borderColor}`,
          borderColor: borderColor,
          background: backgroundColor,
          color: textColor,
          margin: "0 10px 0 0",
          height: "50px",
          display: "flex",
          borderRadius: "7px",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        <p style={{ margin: "auto" }}>{value.name}</p>
      </div>
    </div>
  );
}

import React from "react";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { useEffect } from "react";

export default function LinkButton({
  loading,
  name,
  action,
  template,
  actionParam,
}) {
  const [hovered, setHovered] = useState(false);
  const [textColor, setBackgroundColor] = useState(template.primaryColor);

  useEffect(() => {
    if (hovered || loading) {
      setBackgroundColor(template.primaryColorHover);
    } else {
      setBackgroundColor(template.primaryColor);
    }
  }, [hovered, loading]);
  return (
    <button
      onClick={() => action(actionParam)}
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseOut={() => {
        setHovered(false);
      }}
      style={{
        color: textColor,
      }}
      className="linkButton"
    >
      {name}
    </button>
  );
}

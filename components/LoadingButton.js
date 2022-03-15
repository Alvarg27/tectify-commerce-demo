import React from "react";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { useEffect } from "react";

export default function LoadingButton({
  loading,
  name,
  loadingText,
  width,
  action,
  template,
  margin,
}) {
  const [hovered, setHovered] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(template.primaryColor);

  useEffect(() => {
    if (hovered || loading) {
      setBackgroundColor(template.primaryColorHover);
    } else {
      setBackgroundColor(template.primaryColor);
    }
  }, [hovered, loading, template]);
  return (
    <button
      onClick={() => action()}
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseOut={() => {
        setHovered(false);
      }}
      style={{
        margin: margin ? margin : "15px 0 0 0",
        width: width ? width : "auto",
        background: backgroundColor,
        cursor: loading ? "auto" : "pointer",
        display: "flex",
        justifyContent: "center",
      }}
      className="primaryButton"
    >
      <p style={{ margin: "auto 0" }}>
        {loading ? (loadingText ? loadingText : "Cargando") : name}
      </p>
      {loading ? (
        <div
          style={{
            margin: "auto 10px",
            opacity: ".5",
            transform: "translateY(2px)",
          }}
        >
          <BeatLoader color="white" size={10} />
        </div>
      ) : (
        ""
      )}
    </button>
  );
}

import React from "react";
import { BeatLoader } from "react-spinners";

export default function LoadingButton({
  loading,
  name,
  loadingText,
  width,
  action,
}) {
  return (
    <button
      onClick={() => action()}
      style={{
        margin: "15px 0 0 0",
        width: width ? width : "auto",
        background: loading ? "#0067dd " : "#0077ff",
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

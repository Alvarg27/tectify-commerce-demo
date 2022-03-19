import React from "react";
import { BeatLoader } from "react-spinners";

export default function LoadingComponent({ template, height }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        background: template.secondaryBackgroundColor,
        borderRadius: "7px",
        height: height,
      }}
    >
      <div style={{ margin: "auto" }}>
        <BeatLoader color={template.borderColor} />
      </div>
    </div>
  );
}

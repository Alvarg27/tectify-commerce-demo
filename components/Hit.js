import React from "react";

export default function Hit({ hit }) {
  console.log(hit);
  return (
    <div style={{ display: "flex", background: "white" }}>
      <img src={hit.images[0].file.url} style={{ height: "40px" }} />
      <p>{hit.name}</p>
    </div>
  );
}

import React from "react";

export default function Headline(props) {
  return (
    <div
      className={`grid grid-cols-12 gap-2 pb-4 items-center ${props.className}`}
    >
      <div className="col-span-8 text-2rem">{props.title || "Section"}</div>
      <div className="col-span-4 justify-self-end">{props.children}</div>
    </div>
  );
}

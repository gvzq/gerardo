import React from "react";

export default function BrandLogo({ className = "" }) {
  return (
    <span
      className={`self-center whitespace-nowrap text-xl font-extrabold dark:text-white ${className}`}
      style={{
        fontFamily:
          "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, monospace",
      }}
    >
      fCTO.
    </span>
  );
}

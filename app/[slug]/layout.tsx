import { ReactNode } from "react";
// import "../../globals.css";

export default function SlugLayout({ children }: { children: ReactNode }) {
  return (
    <div className="gh-article post">
      <div className="gh-canvas">{children}</div>
    </div>
  );
}

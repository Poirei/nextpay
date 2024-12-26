import { type JSX } from "react";

export function Card({
  className,
  title,
  children, 
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className={className + " px-8 py-7 bg-violet-900/20 rounded-md"}>
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <div>{children}</div>
    </div>
  );
}

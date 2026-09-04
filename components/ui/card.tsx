import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  href?: string;
  as?: "div" | "article";
};

export function Card({ children, href, as: Tag = "div", className, ...props }: CardProps) {
  const classes = [
    "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm",
    href ? "block transition-colors hover:border-zinc-300 hover:bg-zinc-50" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
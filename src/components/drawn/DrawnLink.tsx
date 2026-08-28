import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { ImageSlotKey } from "@/lib/images";
import { drawnLook, type DrawMode } from "./look";

type DrawnLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
  slot: ImageSlotKey;
  file?: string | null;
  mode?: DrawMode;
  children?: ReactNode;
  label?: string;
  hideSlot?: boolean;
};

export function DrawnLink({
  slot,
  file,
  mode = "background",
  className,
  style,
  children,
  label,
  hideSlot = false,
  href = "#",
  ...rest
}: DrawnLinkProps) {
  const look = drawnLook({
    slot,
    file,
    mode,
    className,
    extraClass: "drawn-link",
    hideSlot,
  });

  return (
    <a
      href={href}
      className={look.className}
      style={{ ...look.style, ...style }}
      {...rest}
    >
      {look.replace ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="drawn__art" src={look.src} alt="" />
          <span className="sr-only">{label ?? children}</span>
        </>
      ) : (
        children
      )}
    </a>
  );
}

import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ImageSlotKey } from "@/lib/images";
import { drawnLook, type DrawMode } from "./look";

type DrawnButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  slot: ImageSlotKey;
  file?: string | null;
  mode?: DrawMode;
  children?: ReactNode;
  label?: string;
  hideSlot?: boolean;
};

export function DrawnButton({
  slot,
  file,
  mode = "background",
  className,
  style,
  children,
  label,
  hideSlot = false,
  type = "button",
  ...rest
}: DrawnButtonProps) {
  const look = drawnLook({
    slot,
    file,
    mode,
    className,
    extraClass: "drawn-button",
    hideSlot,
  });

  return (
    <button
      type={type}
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
    </button>
  );
}

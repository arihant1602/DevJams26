import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import type { ImageSlotKey } from "@/lib/images";
import { drawnLook, type DrawMode } from "./look";

export type { DrawMode };

type DrawnSurfaceProps = {
  slot: ImageSlotKey;
  /** Filename in /public/Images, overrides the slot registry. Pass null to force no image. */
  file?: string | null;
  as?: ElementType;
  mode?: DrawMode;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** Accessible name when mode is replace (the drawing is the visible UI). */
  label?: string;
  /** Hide the dashed slot outline even when no image is set. */
  hideSlot?: boolean;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "style" | "children">;

export function DrawnSurface({
  slot,
  file,
  as: Tag = "div",
  mode = "background",
  className,
  style,
  children,
  label,
  hideSlot = false,
  ...rest
}: DrawnSurfaceProps) {
  const look = drawnLook({ slot, file, mode, className, hideSlot });

  return (
    <Tag className={look.className} style={{ ...look.style, ...style }} {...rest}>
      {look.replace ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="drawn__art" src={look.src} alt="" />
          <span className="sr-only">{label ?? children}</span>
        </>
      ) : (
        children
      )}
    </Tag>
  );
}

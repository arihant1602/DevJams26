import type { CSSProperties } from "react";
import { slotSrc, type ImageSlotKey } from "@/lib/images";

export type DrawMode = "background" | "replace";

export function drawnLook({
  slot,
  file,
  mode = "background",
  className,
  extraClass,
  hideSlot = false,
}: {
  slot: ImageSlotKey;
  file?: string | null;
  mode?: DrawMode;
  className?: string;
  extraClass?: string;
  hideSlot?: boolean;
}): {
  src: string | undefined;
  hasImage: boolean;
  replace: boolean;
  className: string;
  style: CSSProperties;
} {
  const src = slotSrc(slot, file);
  const hasImage = Boolean(src);
  const replace = hasImage && mode === "replace";
  const showOutline = !hasImage && !hideSlot;

  const style: CSSProperties =
    hasImage && mode === "background"
      ? {
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
        }
      : {};

  return {
    src,
    hasImage,
    replace,
    style,
    className: [
      "drawn",
      extraClass,
      showOutline ? "drawn--slot" : null,
      hasImage && mode === "background" ? "drawn--bg" : null,
      replace ? "drawn--replace" : null,
      className,
    ]
      .filter(Boolean)
      .join(" "),
  };
}

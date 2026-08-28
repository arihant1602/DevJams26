/**
 * Image slots for KitchenOS.
 *
 * Drop drawings into /public/Images (served as /Images/...).
 * Set `file` to the filename including extension, e.g. "logo.png".
 * Leave `file` as null until the drawing exists — the UI shows a faint slot outline.
 *
 * Every visible control on the landing page is a Drawn* component that reads these slots.
 */
export type ImageSlot = {
  file: string | null;
};

export const imageSlots = {
  page: { file: null },
  nav: { file: null },
  logo: { file: null },
  navCta: { file: null },
  hero: { file: null },
  heroTitle: { file: null },
  heroLead: { file: "discPf.png" },
  heroCta: { file: null },
  featureFridge: { file: null },
  featurePlate: { file: null },
  featureReceipt: { file: null },
  featureRecipes: { file: null },
  featureDashboard: { file: "discPf.png" },
  close: { file: null },
  footer: { file: null },
  footerCta: { file: null },
} as const satisfies Record<string, ImageSlot>;

export type ImageSlotKey = keyof typeof imageSlots;

export function publicImagePath(file: string): string {
  const name = file.replace(/^\/+/, "").replace(/^Images\//, "");
  return `/Images/${name}`;
}

export function slotFile(
  slot: ImageSlotKey,
  override?: string | null,
): string | null {
  if (override !== undefined) return override;
  return imageSlots[slot].file;
}

export function slotSrc(
  slot: ImageSlotKey,
  override?: string | null,
): string | undefined {
  const file = slotFile(slot, override);
  return file ? publicImagePath(file) : undefined;
}

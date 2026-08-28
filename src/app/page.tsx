import { FloatingFruits } from "@/components/FloatingFruits";
import { CtaButtons } from "@/components/CtaButtons";

export default function HomePage() {
  return (
    <main className="page">
      <FloatingFruits />
      <CtaButtons />
      <h1 className="bottom-left-title kitchenos-title">
        KitchenOS
      </h1>
    </main>
  );
}

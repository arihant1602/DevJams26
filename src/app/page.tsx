import { DrawnLink, DrawnSurface } from "@/components/drawn";

const features: {
  slot:
    | "featureFridge"
    | "featurePlate"
    | "featureReceipt"
    | "featureRecipes"
    | "featureDashboard";
  text: string;
}[] = [
  {
    slot: "featureFridge",
    text: "Photograph your fridge — get a live inventory and spoilage alerts before food dies at the back of the shelf.",
  },
  {
    slot: "featurePlate",
    text: "Photograph your plate — get precise macro and micronutrient logging, even for home-cooked meals barcode-based apps can't read.",
  },
  {
    slot: "featureReceipt",
    text: "Photograph your receipt — get automatic, categorized grocery spend tracking with zero manual entry.",
  },
  {
    slot: "featureRecipes",
    text: "Get recipes built from what's already about to expire, not a generic recipe database.",
  },
  {
    slot: "featureDashboard",
    text: "See what you buy, eat, spend, and waste on one connected dashboard, not four separate ones.",
  },
];

export default function HomePage() {
  return (
    <DrawnSurface slot="page" as="main" className="page" hideSlot>
      <div className="shell">
        <DrawnSurface slot="nav" as="header" className="nav" hideSlot>
          <DrawnLink slot="logo" href="/" className="logo kitchenos-title" hideSlot>
            KitchenOS
          </DrawnLink>
          <DrawnLink slot="navCta" href="#waitlist">
            Waitlist
          </DrawnLink>
        </DrawnSurface>

        <DrawnSurface slot="hero" as="section" className="hero" hideSlot>
          <DrawnSurface slot="heroTitle" as="h1" hideSlot>
            <span className="kitchenos-title">KitchenOS</span> is the operating system for your food life.
          </DrawnSurface>
          <DrawnSurface slot="heroLead" as="p" className="lead" hideSlot>
            Right now you&apos;re running five disconnected systems — memory for
            your fridge, a diet app for calories, a banking app for grocery
            spend, and nothing at all for waste. KitchenOS replaces all of it
            with one camera.
          </DrawnSurface>
          <div className="cta-row">
            <DrawnLink slot="heroCta" href="#waitlist">
              Three photos a day
            </DrawnLink>
          </div>
        </DrawnSurface>

        <ul className="features">
          {features.map((feature) => (
            <DrawnSurface
              key={feature.slot}
              slot={feature.slot}
              as="li"
              className="feature"
            >
              <p>{feature.text}</p>
            </DrawnSurface>
          ))}
        </ul>

        <DrawnSurface slot="close" as="section" className="close">
          <p>
            No logging fatigue, no spreadsheets, no guessing where the grocery
            budget went. Three photos a day replace every food-tracking app
            you&apos;ve abandoned — and quietly save you money and food every
            week.
          </p>
        </DrawnSurface>

        <DrawnSurface slot="footer" as="footer" className="footer" id="waitlist" hideSlot>
          <DrawnLink slot="footerCta" href="mailto:hello@kitchenos.app">
            Join the waitlist
          </DrawnLink>
        </DrawnSurface>
      </div>
    </DrawnSurface>
  );
}

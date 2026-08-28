"use client";

export function CtaButtons() {
  return (
    <div className="center-cta-container">
      {/* Orange Main CTA - Get Started */}
      <a href="#get-started" className="cta-btn cta-btn-orange">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Images/Orange_Button.png"
          alt="Get Started"
          className="cta-btn-bg"
        />
        <span className="cta-btn-text kitchenos-title">Get Started</span>
      </a>

      {/* Green Secondary CTA - What it is */}
      <a href="#what-it-is" className="cta-btn cta-btn-green">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Images/Green_Button.png"
          alt="What it is"
          className="cta-btn-bg"
        />
        <span className="cta-btn-text kitchenos-title">What it is</span>
      </a>
    </div>
  );
}

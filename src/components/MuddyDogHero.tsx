"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type HeroStage = "muddy" | "shake" | "grooming" | "clean";

const stageLabels: Record<HeroStage, string> = {
  muddy: "Ready for a transformation",
  shake: "Incoming mud!",
  grooming: "Spa treatment in progress",
  clean: "Fresh, fluffy, and magnificent"
};

export function MuddyDogHero() {
  const [stage, setStage] = useState<HeroStage>("muddy");
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (skipped || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage("clean");
      return;
    }

    const timers = [
      window.setTimeout(() => setStage("shake"), 1500),
      window.setTimeout(() => setStage("grooming"), 3500),
      window.setTimeout(() => setStage("clean"), 6500)
    ];

    return () => timers.forEach(window.clearTimeout);
  }, [skipped]);

  const skipAnimation = () => {
    setSkipped(true);
    setStage("clean");
  };

  return (
    <section className={`dog-hero dog-hero--${stage}`} aria-labelledby="hero-title">
      <nav className="public-nav" aria-label="Website navigation">
        <Link className="public-brand" href="/">Tail<span>OS</span></Link>
        <div className="public-nav-links">
          <a href="#services">Services</a>
          <a href="#experience">Our salon</a>
          <Link href="/dashboard">Owner login</Link>
          <a className="nav-book" href="#booking">Book appointment</a>
        </div>
      </nav>

      <div className="hero-copy">
        <p className="hero-kicker">Gentle care. Remarkable transformations.</p>
        <h1 id="hero-title">From muddy to magnificent.</h1>
        <p className="hero-description">
          Professional grooming that leaves every pet looking, feeling, and smelling their best.
        </p>
        <div className="hero-actions">
          <a className="hero-primary" href="#booking">Book a groom</a>
          <a className="hero-secondary" href="#services">View services</a>
        </div>
        <div className="hero-trust" aria-label="Salon benefits">
          <span>Locally trusted</span>
          <span>Gentle handling</span>
          <span>Easy online booking</span>
        </div>
      </div>

      <div className="dog-stage" aria-label={`Animated Great Pyrenees: ${stageLabels[stage]}`}>
        <div className="sun-glow" />
        <div className="dog-shadow" />
        <div className="dog-character" role="img" aria-label={stage === "clean" ? "Clean fluffy Great Pyrenees" : "Playful muddy Great Pyrenees"}>
          <div className="dog-ears"><span /><span /></div>
          <div className="dog-head">
            <div className="dog-eyes"><span /><span /></div>
            <div className="dog-muzzle"><span className="dog-nose" /></div>
          </div>
          <div className="dog-body">
            <div className="dog-bandana" />
            <div className="dog-paws"><span /><span /></div>
          </div>
          <div className="dog-tail" />
          <div className="mud-patches" aria-hidden="true">
            <span /><span /><span /><span /><span />
          </div>
        </div>

        <div className="mud-splatter" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => <span key={index} />)}
        </div>
        <div className="grooming-bubbles" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, index) => <span key={index} />)}
        </div>
        <p className="stage-label" aria-live="polite">{stageLabels[stage]}</p>
      </div>

      {stage !== "clean" && (
        <button className="skip-animation" type="button" onClick={skipAnimation}>
          Skip animation
        </button>
      )}
    </section>
  );
}

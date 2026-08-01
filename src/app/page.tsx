import { MuddyDogHero } from "@/components/MuddyDogHero";

const services = [
  { title: "Signature groom", description: "Bath, haircut, nails, ears, finishing spray, and a photo-ready finish." },
  { title: "Bath + deshed", description: "Deep clean, coat conditioning, blowout, brushing, nails, and tidy-up." },
  { title: "Puppy's first visit", description: "A calm introduction designed to build confidence and positive grooming habits." }
];

export default function HomePage() {
  return (
    <>
      <MuddyDogHero />
      <main className="marketing-main">
        <section className="marketing-section" id="services">
          <p className="hero-kicker">Care built around the dog</p>
          <h2>Everything they need to leave happy.</h2>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <span className="service-paw">✦</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div>
            <p className="hero-kicker">The boutique salon experience</p>
            <h2>Clean, calm, transparent care.</h2>
          </div>
          <p>
            Every pet receives a profile with preferences, sensitivities, grooming history, and before-and-after photos so each visit gets better.
          </p>
        </section>

        <section className="booking-section" id="booking">
          <p className="hero-kicker">Ready for the glow-up?</p>
          <h2>Book their next transformation.</h2>
          <p>Online booking will connect directly to the TailOS scheduling and pet CRM workflow.</p>
          <button className="hero-primary" type="button">Start booking</button>
        </section>
      </main>
    </>
  );
}

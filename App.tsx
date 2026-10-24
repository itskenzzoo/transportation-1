import { FormEvent, useState } from "react";
import enrouteLogo from "./assets/enroute-logo.png";

type IconName =
  | "plane"
  | "bed"
  | "car"
  | "transfer"
  | "arrow"
  | "check"
  | "user"
  | "menu"
  | "close"
  | "chat"
  | "shield"
  | "globe"
  | "support"
  | "building"
  | "mail"
  | "phone"
  | "instagram"
  | "sparkle";

const images = {
  hero: "https://images.unsplash.com/photo-1765475467677-579353b25ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1800",
  flight:
    "https://images.unsplash.com/photo-1603792835233-f4f7c2497d4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  hotel:
    "https://images.unsplash.com/photo-1761377197584-2eed555e2b0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  car: "https://images.unsplash.com/photo-1696339058184-2e6d1da36ad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  transfer:
    "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  lagos:
    "https://images.unsplash.com/photo-1559833064-6f4573ec1ac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  nigeriaHotel:
    "https://images.unsplash.com/photo-1745725427804-4d94df0c5eb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
};

const services = [
  {
    id: "flight",
    short: "Flights",
    title: "Flight Bookings",
    text: "Local and international flight requests, thoughtfully coordinated around your schedule and preferences.",
    icon: "plane" as IconName,
    image: images.flight,
    alt: "A Black woman travelling with luggage",
    action: "Request a flight",
  },
  {
    id: "hotel",
    short: "Stays",
    title: "Hotels & Apartments",
    text: "Hotels and short-stay apartments selected to suit your destination, budget and style of travel.",
    icon: "bed" as IconName,
    image: images.hotel,
    alt: "A Black traveller with a suitcase in a premium hotel lobby",
    action: "Find a stay",
  },
  {
    id: "car",
    short: "Cars",
    title: "Car Rentals",
    text: "Flexible vehicle requests for business, leisure and everything your itinerary calls for.",
    icon: "car" as IconName,
    image: images.car,
    alt: "A car driving along a modern bridge road in Lagos, Nigeria",
    action: "Request a car",
  },
  {
    id: "transfer",
    short: "Transfers",
    title: "Airport Transfers",
    text: "Pre-arranged airport pickup and drop-off so your journey stays seamless after you land.",
    icon: "transfer" as IconName,
    image: images.transfer,
    alt: "A traveller arriving at an airport with luggage",
    action: "Arrange a transfer",
  },
];

const formFields: Record<
  string,
  { label: string; placeholder: string; type?: string; wide?: boolean }[]
> = {
  flight: [
    { label: "From", placeholder: "City or airport" },
    { label: "To", placeholder: "Where are you going?" },
    { label: "Departure", placeholder: "", type: "date" },
    { label: "Return", placeholder: "", type: "date" },
    { label: "Travellers", placeholder: "1 passenger", type: "select" },
    { label: "Cabin", placeholder: "Economy", type: "select" },
  ],
  hotel: [
    { label: "Destination", placeholder: "City or property", wide: true },
    { label: "Check in", placeholder: "", type: "date" },
    { label: "Check out", placeholder: "", type: "date" },
    { label: "Guests", placeholder: "2 guests", type: "select" },
    { label: "Rooms", placeholder: "1 room", type: "select" },
  ],
  car: [
    { label: "Pickup location", placeholder: "City, airport or address", wide: true },
    { label: "Pickup date", placeholder: "", type: "date" },
    { label: "Pickup time", placeholder: "", type: "time" },
    { label: "Return date", placeholder: "", type: "date" },
    { label: "Vehicle type", placeholder: "Any vehicle", type: "select" },
  ],
  transfer: [
    { label: "Airport", placeholder: "Arrival airport" },
    { label: "Destination", placeholder: "Hotel or address" },
    { label: "Pickup date", placeholder: "", type: "date" },
    { label: "Pickup time", placeholder: "", type: "time" },
    { label: "Passengers", placeholder: "1 passenger", type: "select" },
    { label: "Vehicle type", placeholder: "Standard", type: "select" },
  ],
};

const faqs = [
  ["How do I make a booking?", "Choose the service you need, complete the request form and submit it. Our team will confirm availability, pricing and the next steps with you."],
  ["Can I book local and international flights?", "Yes. EnRoute supports requests for both local and international travel. Live inventory will be added as supplier integrations become available."],
  ["Do you offer airport pickup?", "Yes. You can arrange a pickup or drop-off in advance by sharing your airport, destination, arrival time and passenger details."],
  ["How will I receive my confirmation?", "Once your request is processed and payment is confirmed, your booking summary and reference will be sent by email and/or WhatsApp."],
  ["Can I change or cancel a booking?", "Change and cancellation rules vary by airline, hotel or service provider. Contact us promptly and we will explain the applicable terms before processing your request."],
  ["Do I need an account to make a request?", "You can begin a request without an account. Creating an account will eventually let you view trip history, payment status and booking references in one place."],
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    plane: <><path d="m3 21 18-9L3 3v7l13 2-13 2v7Z" /><path d="M9 12v7" /></>,
    bed: <><path d="M3 5v14M21 19v-8a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v8M3 15h18M7 9V7a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" /></>,
    car: <><path d="m5 17-2-2v-4l2-5h14l2 5v4l-2 2H5Z" /><path d="M7 17v2M17 17v2M3 11h18M7 14h.01M17 14h.01" /></>,
    transfer: <><path d="M4 17h16M6 17V9h12v8M8 9l2-4h4l2 4M8 13h.01M16 13h.01M7 17v2M17 17v2" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    chat: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 2-5a7 7 0 0 1-2-5V8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v7Z" /><path d="M8 10h.01M12 10h.01M16 10h.01" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
    support: <><path d="M4 13a8 8 0 0 1 16 0M4 13v5h4v-6H4M20 13v5h-4v-6h4M16 20c-1 1-2 1-4 1" /></>,
    building: <><path d="M4 22V4h16v18M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2M2 22h20" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    phone: <path d="M6 2h4l2 5-3 2a16 16 0 0 0 6 6l2-3 5 2v4a4 4 0 0 1-4 4C9 21 3 15 2 6a4 4 0 0 1 4-4Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    sparkle: <><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Logo({ light = false, header = false }: { light?: boolean; header?: boolean }) {
  return (
    <a href="#top" className={`logo ${light ? "logo-light" : ""} ${header ? "logo-header" : ""}`} aria-label="EnRoute home">
      <img className={header ? "logo-header-image" : undefined} src={enrouteLogo} alt="EnRoute" />
    </a>
  );
}

function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "white" | "ghost";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const className = `button button-${variant}`;
  if (href) return <a href={href} className={className}>{children}</a>;
  return <button type={type} className={className} onClick={onClick}>{children}</button>;
}

function SectionTitle({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className={`section-title ${light ? "section-title-light" : ""}`}>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {text && <span>{text}</span>}
    </div>
  );
}

function BookingPanel() {
  const [active, setActive] = useState("flight");
  const [tripType, setTripType] = useState("Round trip");
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="booking-panel" id="booking">
      <div className="booking-tabs" role="tablist" aria-label="Travel services">
        {services.map((service) => (
          <button
            key={service.id}
            role="tab"
            aria-selected={active === service.id}
            className={active === service.id ? "active" : ""}
            onClick={() => { setActive(service.id); setSubmitted(false); }}
          >
            <Icon name={service.icon} size={19} />
            <span>{service.short}</span>
          </button>
        ))}
      </div>
      {submitted ? (
        <div className="request-success">
          <span><Icon name="check" size={24} /></span>
          <div>
            <h3>Your request is ready for the next step.</h3>
            <p>This preview does not send data yet. Connect the form to the EnRoute backend to create a secure request and customer reference.</p>
          </div>
          <Button variant="secondary" onClick={() => setSubmitted(false)}>Edit request</Button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <div className="booking-heading">
            <div>
              <span>Plan your journey</span>
              <h3>{services.find((item) => item.id === active)?.title}</h3>
            </div>
            {active === "flight" && (
              <div className="segmented">
                {["Round trip", "One way"].map((type) => (
                  <button key={type} type="button" className={tripType === type ? "active" : ""} onClick={() => setTripType(type)}>{type}</button>
                ))}
              </div>
            )}
          </div>
          <div className="field-grid">
            {formFields[active].map((field) => (
              <label key={field.label} className={field.wide ? "field-wide" : ""}>
                <span>{field.label}</span>
                {field.type === "select" ? (
                  <select defaultValue="">
                    <option value="" disabled>{field.placeholder}</option>
                    <option>{field.label === "Cabin" ? "Economy" : field.label === "Vehicle type" ? "Standard" : "1"}</option>
                    <option>{field.label === "Cabin" ? "Business" : field.label === "Vehicle type" ? "SUV" : "2"}</option>
                    <option>{field.label === "Cabin" ? "First class" : field.label === "Vehicle type" ? "Luxury" : "3+"}</option>
                  </select>
                ) : (
                  <input type={field.type || "text"} placeholder={field.placeholder} required />
                )}
              </label>
            ))}
            <Button type="submit">
              Send request <Icon name="arrow" size={18} />
            </Button>
          </div>
          <p className="form-note"><Icon name="support" size={16} /> No live prices yet. Our travel team will review your request and confirm the best available options.</p>
        </form>
      )}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const [infoPage, setInfoPage] = useState<string | null>(null);
  const [inquirySent, setInquirySent] = useState(false);

  const scrollToBooking = (service: string) => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      const tab = document.querySelector(`[role="tab"]:nth-child(${services.findIndex((s) => s.id === service) + 1})`) as HTMLButtonElement;
      tab?.click();
    }, 400);
  };

  return (
    <main id="top">
      <header className="header">
        <div className="container nav-wrap">
          <Logo header />
          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>Why EnRoute</a>
            <a href="#corporate" onClick={() => setMenuOpen(false)}>Corporate</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>FAQs</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <div className="nav-actions">
            <button className="login-button" onClick={() => setLoginOpen(true)}><Icon name="user" size={18} /> Log in</button>
            <Button onClick={() => scrollToBooking("flight")}>Plan my trip</Button>
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>

      <section className="hero">
        <img src={images.hero} alt="A modern bridge crossing the Lagos waterfront" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
            <div className="eyebrow-light"><span /> From Nigeria to everywhere</div>
            <h1>Travel made simple.<br />From booking to arrival.</h1>
            <p>Flights, accommodation, car rentals and airport transfers — thoughtfully arranged through one convenient travel partner.</p>
            <div className="hero-actions">
              <Button variant="white" onClick={() => scrollToBooking("flight")}>Start planning <Icon name="arrow" size={18} /></Button>
              <Button variant="ghost" href="#services">Explore services</Button>
            </div>
          </div>
          <div className="hero-aside">
            <p>Lagos today. The world tomorrow.</p>
            <div className="route-line"><span>LOS</span><i /><Icon name="plane" size={18} /><i /><span>LHR</span></div>
            <small>Local and international travel support from one trusted team</small>
          </div>
        </div>
      </section>

      <div className="container booking-overlap"><BookingPanel /></div>

      <section className="service-section" id="services">
        <div className="container">
          <SectionTitle eyebrow="What we arrange" title="Everything your journey needs." text="Four core services, connected by one team that sees the whole trip." />
          <div className="service-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.id}>
                <div className="service-image">
                  <img src={service.image} alt={service.alt} />
                  <span>0{index + 1}</span>
                </div>
                <div className="service-body">
                  <div className="service-icon"><Icon name={service.icon} /></div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <button onClick={() => scrollToBooking(service.id)}>{service.action} <Icon name="arrow" size={17} /></button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="container about-grid">
          <div className="about-copy">
            <SectionTitle eyebrow="Why EnRoute" title="Tell us where you’re going. We’ll help put the journey together." />
            <p className="lead">Travel rarely stops at a ticket. You may need somewhere to stay, a car when you arrive, and a reliable pickup from the airport. EnRoute brings those moving parts into one clear plan.</p>
            <div className="benefit-grid">
              {[
                ["Convenient booking", "Multiple travel needs, one point of contact."],
                ["Personal assistance", "Real support before, during and after booking."],
                ["Reliable coordination", "Every part considered as one connected journey."],
                ["Local & international", "Support for trips within Nigeria and beyond."],
              ].map(([title, text]) => (
                <div className="benefit" key={title}>
                  <span><Icon name="check" size={16} /></span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="journey-card">
            <div className="journey-top">
              <span>Your journey</span>
              <strong>Owerri → Lagos</strong>
              <small>Coordinated through EnRoute</small>
            </div>
            <div className="journey-steps">
              {services.map((service, index) => (
                <div key={service.id}>
                  <span><Icon name={service.icon} /></span>
                  <p><strong>{service.short}</strong><small>{index === 0 ? "OWR to LOS" : index === 1 ? "3 nights in Victoria Island" : index === 2 ? "Compact SUV" : "Airport to hotel"}</small></p>
                  <i><Icon name="check" size={14} /></i>
                </div>
              ))}
            </div>
            <Button variant="secondary" onClick={() => scrollToBooking("flight")}>Plan a journey like this <Icon name="arrow" size={17} /></Button>
          </div>
        </div>
      </section>

      <section className="platform-strip">
        <div className="container platform-grid">
          <div className="platform-intro">
            <p>Built for today. Ready for what’s next.</p>
            <h2>A smarter travel platform in the making.</h2>
          </div>
          {[
            ["shield", "Secure by design", "Customer and payment data belong behind protected systems — never in frontend code."],
            ["globe", "Supplier flexible", "Prepared to connect with Wakanow or other travel inventory without redesigning the experience."],
            ["support", "Human when it matters", "Automation where it helps, personal travel support whenever it is needed."],
          ].map(([icon, title, text]) => (
            <div className="platform-point" key={title}>
              <Icon name={icon as IconName} size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="deals-section">
        <div className="container">
          <div className="deals-heading">
            <SectionTitle eyebrow="Travel opportunities" title="Worth going somewhere for." text="Promotions will be published only when availability and terms are verified by our team." />
            <Button variant="secondary" onClick={() => scrollToBooking("flight")}>Ask about current offers</Button>
          </div>
          <div className="deal-grid">
            <article className="deal-main">
              <img src={images.lagos} alt="The Lagos skyline beside the waterfront" />
              <div><span>From Lagos and beyond</span><h3>Planning ahead can open up better options.</h3><p>Tell us your route and flexible dates. We’ll check available fares and come back with real options.</p></div>
            </article>
            <article className="deal-side">
              <img className="deal-side-image" src={images.nigeriaHotel} alt="A premium hotel property surrounded by palm trees in Nigeria" />
              <span><Icon name="bed" /></span>
              <div><small>Luxury stays in Nigeria</small><h3>Business stays, city breaks and extended visits.</h3><p>Share your destination and budget for a tailored shortlist of verified options.</p></div>
              <button onClick={() => scrollToBooking("hotel")}><Icon name="arrow" /></button>
            </article>
          </div>
        </div>
      </section>

      <section className="corporate-section" id="corporate">
        <div className="container corporate-grid">
          <div>
            <SectionTitle light eyebrow="EnRoute for business" title="Business travel, without the loose ends." text="A coordinated travel desk for staff movements, executives, visiting guests, meetings and group transport." />
            <div className="corporate-list">
              {["Staff & executive travel", "Hotels for visiting guests", "Airport pickups & car rentals", "Meetings & group arrangements"].map((item) => <span key={item}><Icon name="check" size={15} />{item}</span>)}
            </div>
            <Button variant="white" href="#contact">Discuss corporate travel <Icon name="arrow" size={17} /></Button>
          </div>
          <div className="corporate-card">
            <span><Icon name="building" size={28} /></span>
            <p>One travel partner</p>
            <h3>Clear requests.<br />Coordinated bookings.<br />Reliable support.</h3>
            <small>Built to grow into managed travel reporting, approvals and dedicated company profiles.</small>
          </div>
        </div>
      </section>

      <section className="mission-section">
        <div className="container mission-grid">
          <div><span>Our mission</span><p>“To remove the stress, uncertainty and unnecessary complexity from travel by connecting people to the services they need to move, stay and arrive with confidence.”</p></div>
          <div><span>Our vision</span><p>“To build a travel platform that becomes the trusted starting point for every journey — connecting people, places and possibilities through simpler, smarter and more accessible travel.”</p></div>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="container faq-grid">
          <div>
            <SectionTitle eyebrow="Frequently asked" title="Good questions, clear answers." text="Everything you need to understand how travel requests work with EnRoute today." />
            <Button variant="secondary" href="#contact">Ask us something else</Button>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <div className={`faq-item ${faqOpen === index ? "open" : ""}`} key={question}>
                <button onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}><span>{question}</span><i>{faqOpen === index ? "−" : "+"}</i></button>
                {faqOpen === index && <p>{answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container contact-grid">
          <div className="contact-copy">
            <SectionTitle light eyebrow="Talk to EnRoute" title="Let’s put your next journey together." text="Send us your travel request or reach the team directly. WhatsApp is the fastest way to get assistance." />
            <div className="contact-methods">
              <a href="https://wa.me/2348135458426"><span><Icon name="chat" /></span><div><small>WhatsApp</small><strong>+234 813 545 8426</strong></div></a>
              <a href="tel:+2349025641390"><span><Icon name="phone" /></span><div><small>Call us</small><strong>+234 902 564 1390</strong></div></a>
              <a href="mailto:Enroutebookingsng@gmail.com"><span><Icon name="mail" /></span><div><small>Email</small><strong>Enroutebookingsng@gmail.com</strong></div></a>
              <a href="https://instagram.com/Enroute_Travelsng"><span><Icon name="instagram" /></span><div><small>Instagram</small><strong>@Enroute_Travelsng</strong></div></a>
            </div>
          </div>
          <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setInquirySent(true); }}>
            {inquirySent ? (
              <div className="contact-success">
                <span><Icon name="check" size={25} /></span>
                <h3>Your enquiry is ready.</h3>
                <p>Backend delivery is not connected in this preview. For immediate assistance, send the same details to EnRoute on WhatsApp.</p>
                <Button href="https://wa.me/2348135458426">Continue on WhatsApp</Button>
                <button type="button" onClick={() => setInquirySent(false)}>Send another enquiry</button>
              </div>
            ) : (
              <>
                <div><p>Quick enquiry</p><h3>How can we help?</h3></div>
                <label><span>Your name</span><input required type="text" placeholder="Full name" /></label>
                <label><span>Email or phone</span><input required type="text" placeholder="How should we reach you?" /></label>
                <label><span>Service needed</span><select defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.id}>{service.title}</option>)}</select></label>
                <label><span>Trip details</span><textarea required placeholder="Tell us where you’re going, your dates and what you need." /></label>
                <Button type="submit">Send enquiry <Icon name="arrow" size={17} /></Button>
                <small>Submitting here creates a preview only until the secure EnRoute backend is connected.</small>
              </>
            )}
          </form>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-wrap">
          <div><span>Ready when you are</span><h2>Planning your next trip?</h2><p>Let EnRoute help you put the journey together.</p></div>
          <div><Button variant="white" onClick={() => scrollToBooking("flight")}>Book now</Button><Button variant="ghost" onClick={() => scrollToBooking("flight")}>Get a quote</Button><Button variant="ghost" href="https://wa.me/2348135458426"><Icon name="chat" size={18} /> WhatsApp</Button></div>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div className="footer-brand"><Logo light /><p>Your trusted starting point for flights, stays, cars and airport transfers.</p><a href="https://wa.me/2348135458426"><Icon name="chat" size={18} /> Chat with EnRoute on WhatsApp</a></div>
          <div><h3>Services</h3>{services.map((service) => <button key={service.id} onClick={() => scrollToBooking(service.id)}>{service.title}</button>)}</div>
          <div><h3>Company</h3><a href="#about">About EnRoute</a><a href="#corporate">Corporate travel</a><a href="#faq">FAQs</a><button onClick={() => setLoginOpen(true)}>Customer login</button></div>
          <div><h3>Legal</h3>{["Privacy policy", "Terms & conditions", "Refund & cancellation"].map((item) => <button key={item} onClick={() => setInfoPage(item)}>{item}</button>)}</div>
          <div><h3>Contact</h3><a href="mailto:Enroutebookingsng@gmail.com"><Icon name="mail" size={16} /> Enroutebookingsng@gmail.com</a><a href="tel:+2348135458426"><Icon name="phone" size={16} /> +234 813 545 8426</a><a href="tel:+2349025641390"><Icon name="phone" size={16} /> +234 902 564 1390</a><a href="https://instagram.com/Enroute_Travelsng"><Icon name="instagram" size={16} /> @Enroute_Travelsng</a></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} EnRoute Travel & Lifestyle.</span><span>Travel well. Arrive ready.</span></div>
      </footer>

      <button className="assistant-launcher" onClick={() => setAssistantOpen(!assistantOpen)} aria-label="Open EnRoute travel assistant">
        <Icon name={assistantOpen ? "close" : "sparkle"} size={22} />
        {!assistantOpen && <span>Ask EnRoute</span>}
      </button>
      {assistantOpen && (
        <aside className="assistant-panel">
          <div className="assistant-head"><span><Icon name="sparkle" /></span><div><h3>EnRoute Assistant</h3><small>Travel guidance, not live pricing</small></div><button onClick={() => setAssistantOpen(false)}><Icon name="close" /></button></div>
          <div className="assistant-body">
            <p>Hello. I can help you choose the right EnRoute service, understand the booking process or find human support.</p>
            <div>{["I need help planning a trip", "How do booking requests work?", "Connect me to support"].map((item) => <button key={item}>{item}<Icon name="arrow" size={15} /></button>)}</div>
            <small>I won’t invent prices, availability or confirmations. Live details must come from the booking system or our team.</small>
          </div>
        </aside>
      )}

      {loginOpen && (
        <div className="modal-backdrop" onMouseDown={() => setLoginOpen(false)}>
          <div className="modal" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setLoginOpen(false)}><Icon name="close" /></button>
            <span className="modal-icon"><Icon name="user" /></span>
            <p>Welcome to EnRoute</p>
            <h2>Your journeys, all in one place.</h2>
            <small>Customer accounts are prepared for secure backend connection. Once enabled, your profile, requests and booking history can stay connected to your unique customer ID.</small>
            <label><span>Email address</span><input type="email" placeholder="you@example.com" /></label>
            <label><span>Password</span><input type="password" placeholder="Enter your password" /></label>
            <Button>Log in securely</Button>
            <div className="modal-foot">New to EnRoute? <button>Create an account</button></div>
          </div>
        </div>
      )}

      {infoPage && (
        <div className="modal-backdrop" onMouseDown={() => setInfoPage(null)}>
          <div className="modal info-modal" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setInfoPage(null)}><Icon name="close" /></button>
            <p>EnRoute policies</p><h2>{infoPage}</h2>
            <div className="policy-copy">
              <p>This page provides a clear foundation for EnRoute’s full legal policy. Final policy text should be reviewed for the business’s operating jurisdictions before launch.</p>
              <h3>{infoPage === "Privacy policy" ? "Your information" : infoPage === "Terms & conditions" ? "Using our services" : "Changes, cancellations and refunds"}</h3>
              <p>{infoPage === "Privacy policy" ? "EnRoute may collect names, contact details, account information and travel details to process requests, provide support and maintain booking history. Payment credentials should be handled by approved payment providers and never stored in frontend code." : infoPage === "Terms & conditions" ? "Bookings remain subject to availability, price confirmation and the terms of airlines, hotels and other travel suppliers. Customers are responsible for accurate traveller information, documents and timely payment." : "Eligibility, timelines and fees depend on the fare or supplier terms attached to each booking. EnRoute will explain known conditions before confirmation and support customers when a supplier changes or cancels a service."}</p>
              <p>EnRoute will use reasonable safeguards, communicate material terms clearly and provide a contact route for questions or requests.</p>
            </div>
            <Button onClick={() => setInfoPage(null)}>Close policy</Button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;

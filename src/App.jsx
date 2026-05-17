import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Camera,
  Car,
  CheckCircle2,
  ChevronDown,
  Clock,
  Heart,
  Hotel,
  Loader2,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  Plane,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";
import Reveal from "./components/Reveal";

const assets = {
  boatHero: "/assets/boat-hero.png",
  monogram: "/assets/fk-monogram.png",
  palace: "/assets/feriye-palace-illustration.png",
  couple: "/assets/photo_2026-05-12_12-43-48.jpg",
  gallery: [
    "/assets/gallery-01.jpg",
    "/assets/gallery-02.jpg",
    "/assets/gallery-03.jpg",
  ],
  flowerHouse: "/assets/flower-house-logo.png",
};

const RSVP_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwpnqei76z4T85STSA2Lx8TM1vpXGcRN6kTJryzMmMPd4F8i3186HRzdmYWcRMIbQFx/exec";

const event = {
  bride: "Fadwa Dannawi",
  groom: "Kayahan Karahisar",
  couple: "Fadwa & Kayahan",
  date: "Friday, June 26, 2026",
  city: "Istanbul, Türkiye",
  venue: "Feriye Palace",
  address:
    "Yıldız Mahallesi Çırağan Caddesi No:44, Beşiktaş, Istanbul, 34347, Türkiye",
  time: "18:30",
  endTime: "00:00",
  rsvpPhone: "03253718",
  mapUrl: "https://maps.app.goo.gl/ng7agmBkAkrKUkYd7?g_st=ic",
};

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Details", href: "#details" },
  { label: "RSVP", href: "#rsvp" },
  { label: "Story", href: "#story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Travel", href: "#travel" },
  { label: "FAQ", href: "#faq" },
];

const timeline = [
  { time: "18:30", title: "Cocktail & Guest Arrival", icon: Sparkles },
  { time: "19:50", title: "First Dance", icon: Heart },
  { time: "20:00", title: "Dinner", icon: Utensils },
  { time: "23:00", title: "Cake Cutting", icon: Camera },
  { time: "00:00", title: "Party & Dancing", icon: Sparkles },
];

const guestRules = [
  {
    q: "What is the dress code?",
    a: "Formal, elegant evening attire is requested. Please avoid wearing white.",
  },
  {
    q: "Are children welcome?",
    a: "With love, children are not welcome at this celebration.",
  },
  {
    q: "May I bring a plus-one?",
    a: "A plus-one is allowed if included with your invitation.",
  },
  {
    q: "Can guests take photos and videos?",
    a: "Yes, photography and video are allowed throughout the evening.",
  },
  {
    q: "Is parking available?",
    a: "Yes, parking is available at the venue.",
  },
  {
    q: "When should guests arrive?",
    a: "Guests are kindly asked to arrive at 18:30. Late arrivals should find the hostess and go to their table.",
  },
  {
    q: "Is the event outdoors?",
    a: "Yes, the event is outdoors. No bad weather backup plan has been confirmed yet.",
  },
  {
    q: "Who is the contact person?",
    a: "Please contact Dorsa, the wedding planner, for urgent event questions.",
  },
];

const travelCards = [
  {
    icon: <Plane size={22} />,
    title: "Airports",
    lines: [
      "Istanbul Airport — around 1 hour from city center",
      "Sabiha Gökçen Airport — around 1 hour from city center",
    ],
  },
  {
    icon: <Hotel size={22} />,
    title: "Hotel",
    lines: [
      "Radisson Blu Bosphorus",
      "Special hotel rate available, booking instructions TBD",
      "Hotel contact TBD",
      "Distance to venue around 1 minute",
    ],
  },
  {
    icon: <Car size={22} />,
    title: "Travel Tip",
    lines: [
      "No shuttle provided",
      "Cards are accepted almost everywhere in Istanbul.",
    ],
  },
];

const placesToVisit = [
  "Dolmabahçe Palace",
  "Topkapı Palace",
  "Hagia Sophia",
  "Sultan Ahmed Mosque",
];

function getCountdown() {
  const target = new Date("2026-06-26T18:30:00+03:00").getTime();
  const distance = Math.max(target - Date.now(), 0);
  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  return {
    days: Math.floor(distance / day),
    hours: Math.floor((distance % day) / hour),
    minutes: Math.floor((distance % hour) / minute),
  };
}

function SectionLabel({ children, light = false }) {
  return (
    <div
      className={`mb-5 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] sm:tracking-[0.32em] ${
        light ? "text-[#ead9aa]" : "text-[#7a663a]"
      }`}
    >
      <span className={`h-px w-10 sm:w-12 ${light ? "bg-[#ead9aa]/70" : "bg-[#b69b5d]"}`} />
      {children}
      <span className={`h-px w-10 sm:w-12 ${light ? "bg-[#ead9aa]/70" : "bg-[#b69b5d]"}`} />
    </div>
  );
}

function Monogram({ size = "small", light = false }) {
  const sizeClass =
    size === "large" ? "h-24 w-24 sm:h-32 sm:w-32" : "h-12 w-12";

  return (
    <div
      className={`relative flex ${sizeClass} shrink-0 items-center justify-center overflow-hidden rounded-full border ${
        light ? "border-white/45 bg-white/16" : "border-[#b69b5d]/55 bg-[#fffaf1]/90"
      } shadow-[0_18px_48px_rgba(57,43,32,0.16)] backdrop-blur-xl`}
    >
      <span className={`absolute font-serif text-xl font-semibold ${light ? "text-white" : "text-[#4a4034]"}`}>
        FK
      </span>
      <img
        src={assets.monogram}
        alt="FK Monogram"
        className="relative z-10 h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}

function PrimaryButton({ href, children, dark = false }) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] transition duration-300 hover:-translate-y-0.5 ${
        dark
          ? "bg-[#2d2925] text-white shadow-[0_18px_42px_rgba(45,41,37,0.22)] hover:bg-[#6d5a32]"
          : "bg-[#d8bf7b] text-[#241f1a] shadow-[0_16px_36px_rgba(159,135,77,0.26)] hover:bg-white"
      }`}
    >
      {children}
    </a>
  );
}

function DetailTile({ icon, label, children, delay = 0 }) {
  return (
    <Reveal
      delay={delay}
      className="rounded-[1.35rem] border border-[#d8c796]/75 bg-white/86 p-6 shadow-[0_20px_60px_rgba(63,48,36,0.09)] backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white"
    >
      <div className="mb-5 inline-flex rounded-full bg-[#f0e5c9] p-3 text-[#756239]">
        {icon}
      </div>
      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#6f624f]">
        {label}
      </p>
      <div className="mt-3 font-serif text-3xl leading-tight text-[#29231f]">
        {children}
      </div>
    </Reveal>
  );
}

function createCalendarHref() {
  const title = encodeURIComponent(`${event.couple} Wedding`);
  const location = encodeURIComponent(`${event.venue}, ${event.address}`);
  const details = encodeURIComponent(
    "Guests are kindly asked to arrive at 18:30. The celebration takes place at Feriye Palace and ends at 00:00."
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260626T153000Z/20260626T210000Z&details=${details}&location=${location}`;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [countdown, setCountdown] = useState(getCountdown);
  const [plusOne, setPlusOne] = useState("");

  const calendarHref = useMemo(createCalendarHref, []);

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new URLSearchParams();
    formData.append("fullName", form.fullName.value.trim());
    formData.append("phone", form.phone.value.trim());
    formData.append("attendance", form.attendance.value);
    formData.append("plusOne", form.plusOne.value);
    formData.append("plusOneName", form.plusOneName?.value.trim() || "");
    formData.append("flyingInfo", form.flyingInfo.value.trim());
    formData.append("arrivalAirport", form.arrivalAirport.value);
    formData.append("arrivalDateTime", form.arrivalDateTime.value);
    formData.append("dietary", form.dietary.value.trim());
    formData.append("message", form.message.value.trim());

    try {
      await fetch(RSVP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      setSubmitted(true);
      setPlusOne("");
      form.reset();
    } catch (error) {
      console.error(error);
      setSubmitError(
        "Something went wrong. Please try again or contact Dorsa, the wedding planner."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf6eb] text-[#29231f] antialiased">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/15 bg-[#2b2521]/82 px-4 py-3 text-white shadow-[0_10px_35px_rgba(23,16,12,0.16)] backdrop-blur-2xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <Monogram light />
            <div>
              <p className="font-serif text-lg tracking-[0.08em] sm:text-xl">
                {event.couple}
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/65">
                {event.venue} · {event.city}
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-white/82 transition duration-300 hover:text-[#ead9aa]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#rsvp"
            className="hidden rounded-full border border-[#ead9aa]/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ead9aa] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ead9aa] hover:text-[#2f2924] md:inline-flex"
          >
            RSVP
          </a>

          <button
            className="rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur transition hover:bg-white/20 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mx-auto mt-4 grid max-w-7xl gap-1 rounded-[1.35rem] border border-white/15 bg-[#2f2924]/95 p-3 shadow-2xl backdrop-blur-2xl lg:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm text-white/78 hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <section id="home" className="relative min-h-screen overflow-hidden">
        <img
          src={assets.boatHero}
          alt="Watercolor Bosphorus wedding artwork"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,29,24,0.74)_0%,rgba(35,29,24,0.66)_45%,rgba(35,29,24,0.42)_100%)] md:bg-[linear-gradient(90deg,rgba(35,29,24,0.9)_0%,rgba(35,29,24,0.72)_44%,rgba(35,29,24,0.26)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#fbf6eb] to-transparent" />

        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-20 pt-28 sm:px-6 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-3xl text-white">
            <Reveal variant="scale-in" delay={80} className="mb-7 flex items-center gap-4">
              <Monogram size="large" light />
              <div className="h-px w-20 bg-[#ead9aa]/75 sm:w-24" />
            </Reveal>

            <Reveal as="p" variant="soft-blur" delay={220} className="max-w-2xl text-xl leading-10 text-[#f8ead0] md:text-2xl" dir="rtl">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
            </Reveal>

            <Reveal as="h1" delay={360} className="mt-5 font-serif text-5xl leading-[0.94] text-white sm:text-7xl md:text-8xl lg:text-9xl">
              Fadwa
              <span className="block text-[#ead9aa]">& Kayahan</span>
            </Reveal>

            <Reveal as="div" delay={500} className="mt-7 space-y-2 text-lg leading-8 text-white/90 md:text-xl">
              <p>{event.date}</p>
              <p>{event.venue} · Istanbul</p>
            </Reveal>

            <Reveal delay={640} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="#rsvp">
                <Sparkles size={18} />
                RSVP
              </PrimaryButton>
              <a
                href="#details"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#302a24]"
              >
                View Details
              </a>
            </Reveal>
          </div>

          <Reveal variant="scale-in" delay={760} className="hidden justify-end lg:flex">
            <div className="relative w-full max-w-xl">
              <div className="absolute -inset-5 rounded-[2rem] border border-white/16 bg-white/10 blur-sm" />
              <img
                src={assets.boatHero}
                alt="Fadwa and Kayahan Istanbul invitation artwork"
                className="relative aspect-[4/5] w-full rounded-[1.5rem] border border-white/25 object-cover shadow-[0_34px_110px_rgba(0,0,0,0.36)]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="invitation" className="px-5 py-16 md:px-8 md:py-24">
        <Reveal className="mx-auto max-w-5xl rounded-[1.75rem] border border-[#d8c796]/70 bg-white/72 px-5 py-12 text-center shadow-[0_28px_90px_rgba(63,48,36,0.1)] backdrop-blur-2xl md:px-12">
          <div className="mb-8 flex justify-center">
            <Monogram />
          </div>
          <SectionLabel>Save the Date</SectionLabel>
          <p className="mx-auto max-w-3xl text-2xl leading-[2.2] text-[#51483d]" dir="rtl">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
          </p>
          <h2 className="mt-7 font-serif text-4xl leading-tight sm:text-5xl md:text-7xl">
            {event.date}
          </h2>
          <p className="mt-4 text-xl text-[#51483d]">
            {event.venue} · {event.city}
          </p>

          <div className="mx-auto mt-9 grid max-w-2xl grid-cols-3 gap-3">
            {[
              ["Days", countdown.days],
              ["Hours", countdown.hours],
              ["Minutes", countdown.minutes],
            ].map(([label, value], index) => (
              <Reveal
                key={label}
                delay={index * 110}
                variant="scale-in"
                className="rounded-[1.25rem] border border-[#e1d4ae] bg-[#fffdf8] px-3 py-5 shadow-[0_14px_38px_rgba(63,48,36,0.08)]"
              >
                <p className="font-serif text-4xl text-[#4d432f]">{value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#6f624f]">
                  {label}
                </p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="details" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel>Event Details</SectionLabel>
            <h2 className="text-center font-serif text-5xl md:text-7xl">
              The Celebration
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DetailTile icon={<CalendarDays size={24} strokeWidth={1.6} />} label="Date" delay={0}>
              {event.date}
            </DetailTile>
            <DetailTile icon={<Clock size={24} strokeWidth={1.6} />} label="Time" delay={110}>
              Guest Arrival {event.time}
              <br />
              Ends {event.endTime}
            </DetailTile>
            <DetailTile icon={<MapPin size={24} strokeWidth={1.6} />} label="Venue" delay={220}>
              {event.venue}
              <br />
              Istanbul
            </DetailTile>
            <DetailTile icon={<Navigation size={24} strokeWidth={1.6} />} label="Address" delay={330}>
              <span className="text-2xl">{event.address}</span>
            </DetailTile>
          </div>

          <Reveal delay={180} className="mt-8 flex justify-center">
            <PrimaryButton href={event.mapUrl} dark>
              <Navigation size={18} />
              Open in Maps
            </PrimaryButton>
          </Reveal>
        </div>
      </section>

      <section id="timeline" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel light>Timeline</SectionLabel>
          </Reveal>
          <div className="grid overflow-hidden rounded-[1.75rem] bg-[#302a24] text-white shadow-[0_34px_110px_rgba(48,42,36,0.24)] lg:grid-cols-[0.82fr_1.18fr]">
            <Reveal variant="fade-right" className="p-7 md:p-12">
              <Heart className="text-[#ead9aa]" size={34} strokeWidth={1.4} />
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.3em] text-[#ead9aa]">
                Evening Flow
              </p>
              <h3 className="mt-4 font-serif text-5xl leading-none md:text-6xl">
                A night by the Bosphorus
              </h3>
              <p className="mt-6 max-w-md leading-8 text-white/68" dir="rtl">
                حضوركم يسعدنا ويشرّفنا، وبه تكتمل فرحتنا
              </p>
            </Reveal>

            <div className="relative grid border-t border-white/10 lg:border-l lg:border-t-0">
              <span className="absolute bottom-8 left-[2.15rem] top-8 hidden w-px bg-[#ead9aa]/22 sm:block" />
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal
                    key={item.title}
                    delay={index * 120}
                    variant={index % 2 === 0 ? "fade-left" : "fade-up"}
                    className="relative grid gap-4 border-b border-white/10 p-6 last:border-b-0 sm:grid-cols-[86px_1fr] sm:gap-6 md:p-8"
                  >
                    <div className="flex items-center gap-4 sm:block">
                      <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#ead9aa]/40 bg-[#3b332d] text-[#ead9aa] shadow-[0_12px_26px_rgba(0,0,0,0.2)]">
                        <Icon size={18} />
                      </span>
                      <p className="mt-0 font-serif text-3xl text-[#ead9aa] sm:mt-4">
                        {item.time}
                      </p>
                    </div>
                    <div className="self-center">
                      <p className="text-xl font-semibold">{item.title}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="rsvp" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal variant="fade-right" className="lg:sticky lg:top-28">
            <SectionLabel>RSVP</SectionLabel>
            <h2 className="font-serif text-5xl leading-none md:text-7xl">
              Confirm Attendance
            </h2>
            <p className="mt-6 text-xl leading-9 text-[#51483d]" dir="rtl">
              لطفًا، يُرجى تأكيد الحضور عبر النموذج أو الرقم {event.rsvpPhone}
            </p>
            <p className="mt-5 leading-8 text-[#51483d]">
              Please confirm your attendance and share your travel details so the
              evening can be prepared with care.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href={`tel:${event.rsvpPhone}`}
                className="inline-flex items-center gap-3 rounded-[1.1rem] border border-[#d8c796]/70 bg-white/78 px-5 py-4 font-semibold text-[#29231f] shadow-[0_12px_35px_rgba(63,48,36,0.07)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                <Phone size={18} />
                Call RSVP Number
              </a>
              <a
                href={`https://wa.me/${event.rsvpPhone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-[1.1rem] border border-[#d8c796]/70 bg-white/78 px-5 py-4 font-semibold text-[#29231f] shadow-[0_12px_35px_rgba(63,48,36,0.07)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                <MessageCircle size={18} />
                WhatsApp Contact
              </a>
            </div>
          </Reveal>

          <Reveal variant="fade-left" className="rounded-[1.75rem] border border-[#d8c796]/70 bg-white/90 p-5 shadow-[0_30px_100px_rgba(63,48,36,0.15)] backdrop-blur-2xl md:p-8">
            {submitted ? (
              <div className="rounded-[1.35rem] border border-[#e2d6b1] bg-[#fbf6eb] p-8 text-center">
                <CheckCircle2 className="mx-auto mb-5 text-[#7d6a42]" size={44} />
                <h3 className="font-serif text-4xl">Thank you.</h3>
                <p className="mx-auto mt-4 max-w-md leading-8 text-[#51483d]">
                  Your RSVP has been received with gratitude. We look forward to
                  celebrating this special evening with you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <input required name="fullName" placeholder="Full name" className="form-field" />
                <input required name="phone" placeholder="Phone / WhatsApp" className="form-field" />
                <select required name="attendance" className="form-field">
                  <option value="">Will you attend?</option>
                  <option value="Yes">Yes, I will attend</option>
                  <option value="No">No, I cannot attend</option>
                </select>
                <select
                  required
                  name="plusOne"
                  value={plusOne}
                  onChange={(e) => setPlusOne(e.target.value)}
                  className="form-field"
                >
                  <option value="">Will you bring a plus-one?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {plusOne === "Yes" && (
                  <Reveal variant="soft-blur" className="rounded-[1.1rem] border border-[#c6aa68]/70 bg-[#fffaf0] p-2">
                    <input
                      required
                      name="plusOneName"
                      placeholder="Plus-one name"
                      className="form-field w-full border-[#c6aa68]/70 bg-white"
                    />
                  </Reveal>
                )}
                {plusOne !== "Yes" && (
                  <input name="plusOneName" type="hidden" value="" readOnly />
                )}
                <textarea
                  name="flyingInfo"
                  rows={3}
                  placeholder="Flying information"
                  className="form-field"
                />
                <select name="arrivalAirport" className="form-field">
                  <option value="">Arrival airport</option>
                  <option value="Istanbul Airport">Istanbul Airport</option>
                  <option value="Sabiha Gökçen Airport">Sabiha Gökçen Airport</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  name="arrivalDateTime"
                  type="datetime-local"
                  aria-label="Arrival date / time"
                  className="form-field"
                />
                <textarea
                  name="dietary"
                  rows={3}
                  placeholder="Dietary restrictions"
                  className="form-field"
                />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Message to the couple"
                  className="form-field"
                />

                {submitError && (
                  <p className="rounded-[1.1rem] bg-red-50 px-5 py-3 text-sm text-red-700">
                    {submitError}
                  </p>
                )}

                <button
                  disabled={isSubmitting}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#6d5a32] px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_16px_40px_rgba(102,84,46,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#29241f] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                  {isSubmitting ? "Sending..." : "Submit RSVP"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <section id="story" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal variant="fade-right" className="overflow-hidden rounded-[1.75rem] border border-white/75 bg-white/75 p-3 shadow-[0_28px_90px_rgba(63,48,36,0.13)]">
            <img
              src={assets.couple}
              alt="Fadwa and Kayahan"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[1.25rem] object-cover"
            />
          </Reveal>
          <Reveal variant="fade-left">
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="font-serif text-5xl leading-none md:text-7xl">
              A beginning in Istanbul
            </h2>
            <p className="mt-7 max-w-xl text-xl leading-9 text-[#51483d]">
              They met in Istanbul when Fadwa came as a tourist. What began as a
              moment in the city became the beginning of a shared journey.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="gallery" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel>Gallery</SectionLabel>
            <h2 className="text-center font-serif text-5xl md:text-7xl">
              Moments Together
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-[#51483d]">
              A few memories from the journey that brought them here.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-6 md:auto-rows-[150px] lg:auto-rows-[180px]">
            {assets.gallery.map((src, index) => (
              <Reveal
                key={src}
                delay={index * 130}
                variant="scale-in"
                className={`group overflow-hidden rounded-[1.35rem] border border-white/75 bg-white/75 p-3 shadow-[0_22px_70px_rgba(63,48,36,0.12)] ${
                  index === 0
                    ? "md:col-span-4 md:row-span-2"
                    : index === 1
                      ? "md:col-span-2 md:row-span-3"
                      : "md:col-span-4 md:row-span-2"
                }`}
              >
                <img
                  src={src}
                  alt={`Wedding gallery ${index + 1}`}
                  loading="lazy"
                  className="h-full min-h-[300px] w-full rounded-[1rem] object-cover transition duration-700 group-hover:scale-[1.035] md:min-h-0"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="venue" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel>Venue</SectionLabel>
          </Reveal>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <Reveal variant="fade-right">
              <h2 className="font-serif text-5xl leading-none md:text-7xl">
                {event.venue}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#51483d]">
                A timeless waterfront palace setting for an elegant outdoor
                celebration in Istanbul.
              </p>
              <p className="mt-5 max-w-xl leading-8 text-[#51483d]">
                {event.address}
              </p>
              <p className="mt-5 max-w-xl font-semibold text-[#6d5a32]">
                Guests are kindly asked to arrive at 18:30.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href={event.mapUrl} dark>
                  <Navigation size={18} />
                  Open in Maps
                </PrimaryButton>
                <PrimaryButton href={calendarHref}>
                  <CalendarDays size={18} />
                  Add to Calendar
                </PrimaryButton>
              </div>
            </Reveal>

            <Reveal variant="scale-in" delay={140} className="overflow-hidden rounded-[1.75rem] border border-[#d8c796]/70 bg-white/84 p-3 shadow-[0_28px_90px_rgba(63,48,36,0.13)]">
              <img
                src={assets.palace}
                alt="Feriye Palace illustration"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-[1.25rem] bg-[#f7eedf] object-contain p-2 sm:p-4"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="travel" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel>Travel & Stay</SectionLabel>
            <h2 className="text-center font-serif text-5xl md:text-7xl">
              Istanbul Notes
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {travelCards.map((card, index) => (
              <Reveal
                key={card.title}
                delay={index * 120}
                className="rounded-[1.35rem] border border-[#d8c796]/70 bg-white/84 p-6 shadow-[0_20px_58px_rgba(63,48,36,0.08)]"
              >
                <div className="mb-5 inline-flex rounded-full bg-[#eadfbd] p-3 text-[#6d5a32]">
                  {card.icon}
                </div>
                <h3 className="font-serif text-3xl">{card.title}</h3>
                <div className="mt-4 space-y-3 text-[#51483d]">
                  {card.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-4 rounded-[1.35rem] border border-[#d8c796]/70 bg-white/84 p-6 shadow-[0_20px_58px_rgba(63,48,36,0.08)]">
            <h3 className="font-serif text-3xl">Places to Visit</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {placesToVisit.map((place, index) => (
                <Reveal
                  key={place}
                  delay={index * 80}
                  variant="soft-blur"
                  className="rounded-[1rem] border border-[#d8c796]/70 bg-[#fffaf2] px-4 py-4 text-[#51483d]"
                >
                  {place}
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <SectionLabel>Guest Rules</SectionLabel>
            <h2 className="text-center font-serif text-5xl md:text-7xl">FAQ</h2>
          </Reveal>

          <div className="mt-10 grid gap-3">
            {guestRules.map((item, index) => (
              <Reveal key={item.q} delay={index * 70}>
                <details className="group rounded-[1.25rem] border border-[#d8c796]/70 bg-white/84 p-5 shadow-[0_14px_42px_rgba(63,48,36,0.06)] backdrop-blur-2xl transition duration-300 hover:bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#29231f]">
                    {item.q}
                    <ChevronDown className="shrink-0 text-[#6d5a32] transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 leading-7 text-[#51483d]">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-5 pb-8 pt-10 md:px-8">
        <Reveal className="mx-auto max-w-7xl rounded-[1.75rem] bg-[#302a24] px-6 py-14 text-center text-white shadow-[0_30px_100px_rgba(48,42,36,0.22)] md:px-12">
          <div className="mb-7 flex justify-center">
            <Monogram light />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ead9aa]">
            With Love
          </p>
          <h2 className="mt-4 font-serif text-5xl md:text-7xl">
            {event.couple}
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-8 text-white/68">
            {event.date} · {event.venue}
          </p>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-white/68" dir="rtl">
            حضوركم يسعدنا ويشرّفنا
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-center justify-center gap-4 border-t border-white/10 pt-7 text-left">
            <img
              src={assets.flowerHouse}
              alt="Flower House Design logo"
              loading="lazy"
              className="h-10 w-10 rounded-full object-contain opacity-70"
            />
            <p className="text-sm text-white/58">
              Wedding planning by Flower House Design
            </p>
          </div>
        </Reveal>
      </footer>
    </main>
  );
}

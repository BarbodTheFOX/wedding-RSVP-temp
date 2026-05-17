import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
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
  X,
} from "lucide-react";

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
  city: "Istanbul, Turkey",
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
  { time: "18:30", title: "Cocktail & Guest Arrival" },
  { time: "19:50", title: "First Dance" },
  { time: "20:00", title: "Dinner" },
  { time: "23:00", title: "Cake Cutting" },
  { time: "00:00", title: "Party & Dancing" },
];

const guestRules = [
  {
    q: "What is the dress code?",
    a: "Formal, elegant evening attire is requested. Please avoid wearing white.",
  },
  {
    q: "Are children welcome?",
    a: "With love, this will be an adults-only celebration.",
  },
  {
    q: "May I bring a plus-one?",
    a: "A plus-one is welcome when it is included with your invitation.",
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
    a: "Please arrive at 18:30. If you arrive late, kindly find the hostess and proceed to your table.",
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
    title: "Recommended Airports",
    lines: [
      "Istanbul Airport — around 1 hour from city center",
      "Sabiha Gökçen Airport — around 1 hour from city center",
    ],
  },
  {
    icon: <Hotel size={22} />,
    title: "Recommended Hotel",
    lines: [
      "Radisson Blu Bosphorus",
      "Special hotel rate: Yes, booking instructions TBD",
      "Hotel contact: TBD",
      "Distance to venue: around 1 minute",
    ],
  },
  {
    icon: <Car size={22} />,
    title: "Transportation",
    lines: ["No shuttle provided", "Cards are accepted almost everywhere in Istanbul."],
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

function SectionLabel({ children }) {
  return (
    <div className="mb-5 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#6f5d34] sm:tracking-[0.32em]">
      <span className="h-px w-10 bg-[#9f874d] sm:w-12" />
      {children}
      <span className="h-px w-10 bg-[#9f874d] sm:w-12" />
    </div>
  );
}

function Monogram({ size = "small", light = false }) {
  const sizeClass = size === "large" ? "h-28 w-28 sm:h-32 sm:w-32" : "h-12 w-12";

  return (
    <div
      className={`relative flex ${sizeClass} shrink-0 items-center justify-center overflow-hidden rounded-full border ${
        light
          ? "border-white/40 bg-white/18"
          : "border-[#9f874d]/55 bg-[#fffaf0]/90"
      } shadow-[0_14px_40px_rgba(68,45,32,0.14)] backdrop-blur-xl`}
    >
      <span
        className={`absolute font-serif text-xl font-semibold ${
          light ? "text-white" : "text-[#4d432f]"
        }`}
      >
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

function DetailTile({ icon, label, children }) {
  return (
    <div className="rounded-[1.75rem] border border-[#d9c99d]/70 bg-white/84 p-6 shadow-[0_18px_50px_rgba(72,50,35,0.08)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white">
      <div className="mb-5 text-[#6f5d34]">{icon}</div>
      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#675c49]">
        {label}
      </p>
      <div className="mt-3 font-serif text-3xl leading-tight text-[#25201d]">
        {children}
      </div>
    </div>
  );
}

function PrimaryButton({ href, children, dark = false }) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] transition duration-300 hover:-translate-y-0.5 ${
        dark
          ? "bg-[#29241f] text-white shadow-[0_16px_40px_rgba(48,42,36,0.18)] hover:bg-[#66542e]"
          : "bg-[#d8bd78] text-[#211d19] shadow-[0_14px_35px_rgba(159,135,77,0.24)] hover:bg-white"
      }`}
    >
      {children}
    </a>
  );
}

function createCalendarHref() {
  const title = encodeURIComponent(`${event.couple} Wedding`);
  const location = encodeURIComponent(`${event.venue}, ${event.address}`);
  const details = encodeURIComponent(
    "Guest arrival begins at 18:30. The celebration takes place at Feriye Palace and ends at 00:00."
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260626T153000Z/20260626T210000Z&details=${details}&location=${location}`;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [countdown, setCountdown] = useState(getCountdown);

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
    formData.append("plusOneName", form.plusOneName.value.trim());
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
    <main className="min-h-screen overflow-x-hidden bg-[#f8f2e8] text-[#25201d] antialiased">
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
                className="text-sm text-white/82 transition duration-300 hover:text-[#e6d3a2]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#rsvp"
            className="hidden rounded-full border border-[#e6d3a2]/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#e6d3a2] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e6d3a2] hover:text-[#2f2924] md:inline-flex"
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
          <div className="mx-auto mt-4 grid max-w-7xl gap-1 rounded-3xl border border-white/15 bg-[#2f2924]/95 p-3 shadow-2xl backdrop-blur-2xl lg:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-3 py-3 text-sm text-white/78 hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <section id="home" className="relative min-h-[88vh] overflow-hidden sm:min-h-[92vh]">
        <img
          src={assets.boatHero}
          alt="Watercolor Bosphorus wedding artwork"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,27,24,0.92)_0%,rgba(31,27,24,0.7)_46%,rgba(31,27,24,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#f8f2e8] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl items-center px-5 pb-16 pt-28 sm:min-h-[92vh] sm:px-6 md:px-8">
          <div className="max-w-3xl text-white">
            <div className="mb-7 flex items-center gap-4">
              <Monogram size="large" light />
              <div className="h-px w-20 bg-[#e6d3a2]/75 sm:w-24" />
            </div>

            <p className="max-w-2xl text-xl leading-10 text-[#f8ead0] md:text-2xl" dir="rtl">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
            </p>

            <h1 className="mt-5 font-serif text-5xl leading-[0.94] text-white sm:text-7xl md:text-8xl lg:text-9xl">
              Fadwa
              <span className="block text-[#e6d3a2]">& Kayahan</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/88 md:text-xl">
              Together with their families, they invite you to an elegant evening
              at Feriye Palace in Istanbul.
            </p>

            <div className="mt-8 grid max-w-2xl gap-3 text-sm text-white/92 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/18 bg-white/10 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl">
                <CalendarDays className="mb-3 text-[#e6d3a2]" size={20} />
                {event.date}
              </div>
              <div className="rounded-3xl border border-white/18 bg-white/10 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl">
                <Clock className="mb-3 text-[#e6d3a2]" size={20} />
                Guest Arrival · {event.time}
              </div>
              <div className="rounded-3xl border border-white/18 bg-white/10 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl">
                <MapPin className="mb-3 text-[#e6d3a2]" size={20} />
                {event.venue}
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="#rsvp">
                <Sparkles size={18} />
                RSVP
              </PrimaryButton>
              <a
                href="#details"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#302a24]"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="invitation" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-8 flex justify-center">
            <Monogram />
          </div>
          <SectionLabel>Save the Date</SectionLabel>
          <p className="mx-auto max-w-3xl text-2xl leading-[2.2] text-[#4f463d]" dir="rtl">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
            لِّتَسْكُنُوا إِلَيْهَا
          </p>
          <h2 className="mt-7 font-serif text-4xl leading-tight sm:text-5xl md:text-7xl">
            {event.date}
          </h2>
          <p className="mt-4 text-xl text-[#4f463d]">
            {event.venue} · {event.city}
          </p>

          <div className="mx-auto mt-9 grid max-w-2xl grid-cols-3 gap-3">
            {[
              ["Days", countdown.days],
              ["Hours", countdown.hours],
              ["Minutes", countdown.minutes],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[1.5rem] border border-white/75 bg-white/70 px-3 py-5 shadow-[0_14px_40px_rgba(72,50,35,0.07)]"
              >
                <p className="font-serif text-4xl text-[#4d432f]">{value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#675c49]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="details" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Event Details</SectionLabel>
          <h2 className="text-center font-serif text-5xl md:text-7xl">
            The Celebration
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DetailTile icon={<CalendarDays size={26} strokeWidth={1.6} />} label="Date">
              {event.date}
            </DetailTile>
            <DetailTile icon={<Clock size={26} strokeWidth={1.6} />} label="Time">
              Guest Arrival {event.time}
              <br />
              Ends {event.endTime}
            </DetailTile>
            <DetailTile icon={<MapPin size={26} strokeWidth={1.6} />} label="Venue">
              {event.venue}
              <br />
              {event.city}
            </DetailTile>
            <DetailTile icon={<Navigation size={26} strokeWidth={1.6} />} label="Address">
              <span className="text-2xl">{event.address}</span>
            </DetailTile>
          </div>

          <div className="mt-8 flex justify-center">
            <PrimaryButton href={event.mapUrl} dark>
              <Navigation size={18} />
              Open Directions
            </PrimaryButton>
          </div>
        </div>
      </section>

      <section id="timeline" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Timeline</SectionLabel>
          <div className="grid overflow-hidden rounded-[2rem] bg-[#302a24] text-white shadow-[0_30px_100px_rgba(48,42,36,0.22)] lg:grid-cols-[0.85fr_1.15fr]">
            <div className="p-7 md:p-12">
              <Heart className="text-[#e6d3a2]" size={34} strokeWidth={1.4} />
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.3em] text-[#e6d3a2]">
                Evening Flow
              </p>
              <h3 className="mt-4 font-serif text-5xl leading-none md:text-6xl">
                A night by the Bosphorus
              </h3>
              <p className="mt-6 max-w-md leading-8 text-white/68" dir="rtl">
                حضوركم يسعدنا ويشرّفنا، وبه تكتمل فرحتنا
              </p>
            </div>

            <div className="grid border-t border-white/10 lg:border-l lg:border-t-0">
              {timeline.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-3 border-b border-white/10 p-6 last:border-b-0 sm:grid-cols-[110px_1fr] sm:gap-5 md:grid-cols-[150px_1fr] md:p-8"
                >
                  <p className="font-serif text-2xl text-[#e6d3a2]">{item.time}</p>
                  <p className="text-lg font-semibold">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="rsvp" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionLabel>RSVP</SectionLabel>
            <h2 className="font-serif text-5xl leading-none md:text-7xl">
              Confirm Attendance
            </h2>
            <p className="mt-6 text-xl leading-9 text-[#4f463d]" dir="rtl">
              لطفًا، يُرجى تأكيد الحضور عبر النموذج أو الرقم {event.rsvpPhone}
            </p>
            <p className="mt-5 leading-8 text-[#4f463d]">
              Please confirm your attendance and share your travel details so the
              evening can be prepared with care.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href={`tel:${event.rsvpPhone}`}
                className="inline-flex items-center gap-3 rounded-2xl border border-[#d9c99d]/70 bg-white/78 px-5 py-4 font-semibold text-[#25201d] shadow-[0_12px_35px_rgba(72,50,35,0.07)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                <Phone size={18} />
                Call RSVP Number
              </a>
              <a
                href={`https://wa.me/${event.rsvpPhone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl border border-[#d9c99d]/70 bg-white/78 px-5 py-4 font-semibold text-[#25201d] shadow-[0_12px_35px_rgba(72,50,35,0.07)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                <MessageCircle size={18} />
                WhatsApp Contact
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#d9c99d]/70 bg-white/88 p-5 shadow-[0_28px_90px_rgba(72,50,35,0.14)] backdrop-blur-2xl md:p-8">
            {submitted ? (
              <div className="rounded-[1.5rem] bg-[#f8f2e8] p-8 text-center">
                <CheckCircle2 className="mx-auto mb-5 text-[#7d6a42]" size={44} />
                <h3 className="font-serif text-4xl">Thank you.</h3>
                <p className="mx-auto mt-4 max-w-md leading-8 text-[#4f463d]">
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
                <select required name="plusOne" className="form-field">
                  <option value="">Will you bring a plus-one?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <input
                  name="plusOneName"
                  placeholder="Plus-one name, if applicable"
                  className="form-field"
                />
                <textarea
                  name="flyingInfo"
                  rows={3}
                  placeholder="Flying information, if any"
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
                  <p className="rounded-2xl bg-red-50 px-5 py-3 text-sm text-red-700">
                    {submitError}
                  </p>
                )}

                <button
                  disabled={isSubmitting}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#66542e] px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_16px_40px_rgba(102,84,46,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#29241f] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                  {isSubmitting ? "Sending..." : "Submit RSVP"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section id="story" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="overflow-hidden rounded-[2rem] border border-white/75 bg-white/75 p-3 shadow-[0_26px_80px_rgba(72,50,35,0.13)]">
            <img
              src={assets.couple}
              alt="Fadwa and Kayahan"
              className="aspect-[4/5] w-full rounded-[1.35rem] object-cover"
            />
          </div>
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="font-serif text-5xl leading-none md:text-7xl">
              A beginning in Istanbul
            </h2>
            <p className="mt-7 max-w-xl text-xl leading-9 text-[#4f463d]">
              They met in Istanbul when Fadwa came as a tourist. What began as a
              moment in the city became the beginning of a shared journey.
            </p>
          </div>
        </div>
      </section>

      <section id="gallery" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Gallery</SectionLabel>
          <h2 className="text-center font-serif text-5xl md:text-7xl">
            Moments & Mood
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {assets.gallery.map((src, index) => (
              <div
                key={src}
                className={`overflow-hidden rounded-[1.75rem] border border-white/75 bg-white/75 p-3 shadow-[0_20px_60px_rgba(72,50,35,0.1)] ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <img
                  src={src}
                  alt={`Wedding gallery ${index + 1}`}
                  className={`w-full rounded-[1.2rem] object-cover ${
                    index === 0 ? "aspect-[16/11]" : "aspect-[4/5]"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="venue" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Venue</SectionLabel>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div>
              <h2 className="font-serif text-5xl leading-none md:text-7xl">
                {event.venue}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#4f463d]">
                A timeless waterfront palace setting for an elegant outdoor
                celebration in Istanbul.
              </p>
              <p className="mt-5 max-w-xl leading-8 text-[#4f463d]">
                {event.address}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href={event.mapUrl} dark>
                  <Navigation size={18} />
                  Open Directions
                </PrimaryButton>
                <PrimaryButton href={calendarHref}>
                  <CalendarDays size={18} />
                  Add to Calendar
                </PrimaryButton>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-[#d9c99d]/70 bg-white/84 p-3 shadow-[0_26px_80px_rgba(72,50,35,0.13)]">
              <img
                src={assets.palace}
                alt="Feriye Palace illustration"
                className="aspect-[4/3] w-full rounded-[1.35rem] bg-[#f4ead8] object-contain p-2 sm:p-4"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="travel" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Travel & Stay</SectionLabel>
          <h2 className="text-center font-serif text-5xl md:text-7xl">
            Istanbul Notes
          </h2>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {travelCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[1.75rem] border border-[#d9c99d]/70 bg-white/84 p-6 shadow-[0_18px_50px_rgba(72,50,35,0.08)]"
              >
                <div className="mb-5 inline-flex rounded-full bg-[#eadbb9] p-3 text-[#66542e]">
                  {card.icon}
                </div>
                <h3 className="font-serif text-3xl">{card.title}</h3>
                <div className="mt-4 space-y-3 text-[#4f463d]">
                  {card.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-[1.75rem] border border-[#d9c99d]/70 bg-white/84 p-6 shadow-[0_18px_50px_rgba(72,50,35,0.08)]">
            <h3 className="font-serif text-3xl">Places to Visit</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {placesToVisit.map((place) => (
                <div
                  key={place}
                  className="rounded-2xl border border-[#d9c99d]/70 bg-[#fbf7ef] px-4 py-4 text-[#4f463d]"
                >
                  {place}
                </div>
              ))}
            </div>
            <p className="mt-6 text-[#4f463d]">
              Emergency contact: Dorsa, event planner.
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>Guest Rules</SectionLabel>
          <h2 className="text-center font-serif text-5xl md:text-7xl">FAQ</h2>

          <div className="mt-10 grid gap-3">
            {guestRules.map((item) => (
              <details
                key={item.q}
                className="group rounded-[1.5rem] border border-[#d9c99d]/70 bg-white/84 p-5 shadow-[0_14px_40px_rgba(72,50,35,0.06)] backdrop-blur-2xl transition duration-300 hover:bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#25201d]">
                  {item.q}
                  <ChevronDown className="shrink-0 text-[#66542e] transition group-open:rotate-180" />
                </summary>
                <p className="mt-4 leading-7 text-[#4f463d]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-5 pb-8 pt-10 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#302a24] px-6 py-14 text-center text-white shadow-[0_28px_90px_rgba(48,42,36,0.2)] md:px-12">
          <div className="mb-7 flex justify-center">
            <Monogram light />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e6d3a2]">
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
              className="h-10 w-10 rounded-full object-contain opacity-75"
            />
            <p className="text-sm text-white/58">
              Wedding planning by Flower House Design
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

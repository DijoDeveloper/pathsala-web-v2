import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/ui/button/Button";
import HeroCarousel from "../components/common/HeroCarousel";

const PublicHome: React.FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<string>("home");

  // Robust scrollspy using scroll position and header offset
  useEffect(() => {
    const ids = ["home", "services", "about", "contact", "review", "faq"];
    const headerOffset = 96; // sticky header height allowance
    const handler = () => {
      let current = "home";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top - headerOffset <= 0) {
          current = id;
        }
      });
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Bar / Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/images/logo/pathshala_logo.png" alt="Pathshala" className="h-8 w-auto" />
              <span className="text-lg font-semibold">Pathshala</span>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  // reset URL to root without hashes or subroutes
                  window.history.replaceState(null, "", "/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setActive("home");
                }}
                className={`pb-2 border-b-2 ${active === "home" ? "border-brand-500 text-brand-700" : "border-transparent text-gray-700 hover:text-gray-900"
                  }`}
              >
                HOME
              </a>
              <a
                href="#services"
                onClick={() => setActive("services")}
                className={`pb-2 border-b-2 ${active === "services" ? "border-brand-500 text-brand-700" : "border-transparent text-gray-700 hover:text-gray-900"
                  }`}
              >
                SERVICES
              </a>
              <a
                href="#about"
                onClick={() => setActive("about")}
                className={`pb-2 border-b-2 ${active === "about" ? "border-brand-500 text-brand-700" : "border-transparent text-gray-700 hover:text-gray-900"
                  }`}
              >
                ABOUT US
              </a>
              <a
                href="#contact"
                onClick={() => setActive("contact")}
                className={`pb-2 border-b-2 ${active === "contact" ? "border-brand-500 text-brand-700" : "border-transparent text-gray-700 hover:text-gray-900"
                  }`}
              >
                CONTACT US
              </a>
              <a
                href="#review"
                onClick={() => setActive("review")}
                className={`pb-2 border-b-2 ${active === "review" ? "border-brand-500 text-brand-700" : "border-transparent text-gray-700 hover:text-gray-900"
                  }`}
              >
                REVIEW
              </a>
              <a
                href="#faq"
                onClick={() => setActive("faq")}
                className={`pb-2 border-b-2 ${active === "faq" ? "border-brand-500 text-brand-700" : "border-transparent text-gray-700 hover:text-gray-900"
                  }`}
              >
                FAQ
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Button size="sm" variant="outline" onClick={() => navigate("/signin")}>
                <span className="inline-flex items-center gap-1">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10 6H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5" strokeWidth="1.5" /><path d="M13 16l4-4-4-4" strokeWidth="1.5" /><path d="M17 12H9" strokeWidth="1.5" /></svg>
                  LOGIN
                </span>
              </Button>
              <Button size="sm" onClick={() => navigate("/signup")}>SIGN UP</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 scroll-mt-24">
        <HeroCarousel
          slides={[
            {
              image:
                "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2069&auto=format&fit=crop",
              title: "Start Your Journey Today",
              subtitle: "Advance Notification and Messaging",
              ctaText: "GET STARTED",
              onCta: () => navigate("/signup"),
            },
            {
              image:
                "https://images.unsplash.com/photo-1584697964161-73b546a4c09a?q=80&w=2069&auto=format&fit=crop",
              title: "Manage Your School Seamlessly",
              subtitle: "Timetables, Attendance, Results — all in one place",
              ctaText: "GET STARTED",
              onCta: () => navigate("/signup"),
            },
            {
              image:
                "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2069&auto=format&fit=crop",
              title: "Empower Teachers and Students",
              subtitle: "Smart tools designed for better outcomes",
              ctaText: "GET STARTED",
              onCta: () => navigate("/signup"),
            },
          ]}
          intervalMs={5000}
        />
      </section>



      {/* Features */}
      <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-center text-title-md font-semibold">Why Choose Pathshala?</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[{
            title: "Contact Us Today",
            desc: "Register with Us Todays for demo",
            icon: (
              <svg className="h-6 w-6 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="1.5" /><polygon points="10 8 16 12 10 16 10 8" strokeWidth="1.5" /></svg>
            )
          }, {
            title: "Personalized Application",
            desc: "One Stop Solution For All School Needs",
            icon: (
              <svg className="h-6 w-6 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 5h16v14H4z" strokeWidth="1.5" /><path d="M8 9h8M8 13h5" strokeWidth="1.5" /></svg>
            )
          }, {
            title: "Special Offers",
            desc: "Send An Enquiry Today to Us for more details",
            icon: (
              <svg className="h-6 w-6 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 17l-3.5 1 1-3.5L5 10l3.5-1L12 5l3.5 4L19 9l-4.5 4.5 1 3.5z" strokeWidth="1.5" /></svg>
            )
          }].map((card, idx) => (
            <div key={idx} className="rounded-xl border border-gray-200 bg-white p-6 shadow-theme-xs">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-brand-50 p-3">{card.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-1 text-gray-600">{card.desc}</p>
                  <button className="mt-5 inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium">
                    LEARN MORE
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 5l7 7-7 7" strokeWidth="1.5" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Review anchor section */}
      <section id="review" className="scroll-mt-24" />

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-2xl bg-brand-500/90 text-white p-8 sm:p-10 shadow-theme-lg">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
            {[{
              value: "10K+",
              label: "Students Registered"
            }, {
              value: "500+",
              label: "Schools Enrolled"
            }, {
              value: "99%",
              label: "Satisfaction Rate"
            }].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="mb-3 h-12 w-12 rounded-full bg-white/20" />
                <div className="text-3xl font-semibold">{s.value}</div>
                <div className="mt-1 text-white/90">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Contact anchor sections */}
      <section id="about" className="scroll-mt-24" />
      <section id="contact" className="scroll-mt-24" />

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-theme-lg">
          <h3 className="text-title-sm font-semibold text-gray-900">Ready to Enroll?</h3>
          <p className="mt-2 text-gray-600">Join hundred of schools who are already using our application .</p>
          <div className="mt-6 flex justify-center">
            <Button size="md" onClick={() => navigate("/signup")}>
              ENROLL NOW
              <span className="ml-1 inline-flex">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 5l7 7-7 7" strokeWidth="1.5" /></svg>
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {/* <div className="flex h-8 w-8 items-center justify-center rounded bg-brand-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path d="M4 6l8-3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z" strokeWidth="1.5"/></svg>
                </div> */}
                <span className="text-lg font-semibold">Pathshala</span>
              </div>
              <p className="text-gray-600">Empowering the next generation of learners with quality education, accessible anywhere.</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900">Quick Links</h4>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li><a className="hover:text-gray-900" href="#home">Home</a></li>
                <li><a className="hover:text-gray-900" href="#about">About Us</a></li>
                <li><a className="hover:text-gray-900" href="#contact">Contact Us</a></li>
                <li><button onClick={() => navigate("/signin")} className="hover:text-gray-900">Login</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900">Legal</h4>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li><a className="hover:text-gray-900" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-gray-900" href="#">Terms of Service</a></li>
                <li><a className="hover:text-gray-900" href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900">Follow Us</h4>
              <div className="mt-3 flex items-center gap-3 text-gray-600">
                <a href="#" aria-label="Facebook" className="hover:text-gray-900">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4z" /></svg>
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-gray-900">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.87-2.36 8.5 8.5 0 0 1-2.7 1.03A4.25 4.25 0 0 0 12 8.24c0 .33.04.66.11.97A12.06 12.06 0 0 1 3.1 4.9a4.25 4.25 0 0 0 1.32 5.67 4.2 4.2 0 0 1-1.92-.53v.06a4.25 4.25 0 0 0 3.4 4.17 4.26 4.26 0 0 1-1.91.07 4.25 4.25 0 0 0 3.97 2.95A8.52 8.52 0 0 1 2 19.54 12.04 12.04 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.34 8.34 0 0 0 22.46 6z" /></svg>
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-gray-900">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" /></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-gray-900">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0zM8 8h4.8v2.2h.1c.7-1.2 2.4-2.5 5-2.5 5.3 0 6.3 3.5 6.3 8v9.3h-5V16.5c0-2.2 0-5-3-5s-3.5 2.3-3.5 4.8V24H8z" /></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
            © 2025 Pathshala. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicHome;

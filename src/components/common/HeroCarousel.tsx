import React, { useEffect, useMemo, useRef, useState } from "react";
import Button from "../ui/button/Button";

export type HeroSlide = {
  image: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCta?: () => void;
};

type Props = {
  slides: HeroSlide[];
  intervalMs?: number;
};

const HeroCarousel: React.FC<Props> = ({ slides, intervalMs = 5000 }) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const safeSlides = useMemo(() => (slides && slides.length > 0 ? slides : []), [slides]);

  const start = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeSlides.length);
    }, intervalMs);
  };

  useEffect(() => {
    if (safeSlides.length <= 1) return;
    start();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [safeSlides.length, intervalMs]);

  if (safeSlides.length === 0) return null;

  const current = safeSlides[index];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-900">
      {/* Slide image */}
      <img
        src={current.image}
        alt={current.title}
        className="h-[420px] w-full object-cover opacity-70"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 lg:px-16">
        <h1 className="text-white text-title-lg sm:text-title-xl font-semibold drop-shadow">
          {current.title}
        </h1>
        {current.subtitle ? (
          <p className="mt-3 max-w-xl text-white/90 text-theme-xl">{current.subtitle}</p>
        ) : null}
        {current.ctaText ? (
          <div className="mt-6">
            <Button size="md" onClick={current.onCta}>{current.ctaText}</Button>
          </div>
        ) : null}
      </div>

      {/* Dots */}
      {safeSlides.length > 1 ? (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {safeSlides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-all ${
                i === index ? "bg-white/90 w-3" : "bg-white/50"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default HeroCarousel;

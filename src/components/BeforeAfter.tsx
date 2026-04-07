import { useState, useRef, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
}

const BeforeAfterSlider = ({ beforeSrc, afterSrc, alt }: BeforeAfterSliderProps) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragging.current) updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-xl aspect-[4/3] cursor-col-resize select-none touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="slider"
      aria-label={`Before and after comparison: ${alt}`}
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 2));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 2));
      }}
    >
      {/* After image (full width behind) */}
      <img src={afterSrc} alt={`After: ${alt}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />

      {/* Before image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={beforeSrc} alt={`Before: ${alt}`} className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%" }} loading="lazy" />
      </div>

      {/* Slider line */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-card shadow-lg" style={{ left: `${position}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-card rounded-full shadow-lg flex items-center justify-center border-2 border-accent">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent">
            <path d="M5 3L1 8L5 13M11 3L15 8L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 bg-foreground/70 text-card text-xs font-semibold px-2 py-1 rounded">Before</span>
      <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">After</span>
    </div>
  );
};

const projects = [
  {
    before: "/before-after/roof-before.jpg",
    after: "/before-after/roof-after.jpg",
    alt: "Roof replacement project",
    label: "Roof Replacement",
  },
  {
    before: "/before-after/siding-before.jpg",
    after: "/before-after/siding-after.jpg",
    alt: "Siding installation project",
    label: "Siding Installation",
  },
];

const BeforeAfter = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="section-container section-padding">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">Transformations</p>
            <h2 className="text-3xl sm:text-4xl text-foreground">Before & After</h2>
            <p className="text-muted-foreground mt-3">Drag the slider to see the transformation</p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div>
                <BeforeAfterSlider beforeSrc={project.before} afterSrc={project.after} alt={project.alt} />
                <p className="text-center font-semibold text-foreground mt-3">{project.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;

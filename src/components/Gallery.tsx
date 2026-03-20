import ScrollReveal from "./ScrollReveal";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { src: gallery1, alt: "Completed home exterior with fresh siding" },
  { src: gallery2, alt: "Professional exterior painting work" },
  { src: gallery3, alt: "Siding installation before and after" },
  { src: gallery4, alt: "Interior painting with flawless finish" },
  { src: gallery5, alt: "Completed roof replacement" },
  { src: gallery6, alt: "Home exterior renovation" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 lg:py-28 bg-background">
      <div className="section-container section-padding">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">Our Work</p>
            <h2 className="text-3xl sm:text-4xl text-foreground">Projects We're Proud Of</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {images.map((img, i) => (
            <ScrollReveal key={i} delay={i * 70}>
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] group">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5 rounded-xl" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

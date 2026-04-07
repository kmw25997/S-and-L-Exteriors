import { Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const reviews = [
  {
    name: "Michelle & Kevin D.",
    text: "Ryan and his crew replaced our entire roof in two days. The quality is outstanding and the cleanup was spotless. We couldn't be happier with the result.",
    service: "Roofing",
    rating: 5,
  },
  {
    name: "Tom Beltran",
    text: "Had our siding replaced after storm damage. S and L came out fast, gave us a fair price, and the work looks incredible. Highly recommend.",
    service: "Siding",
    rating: 5,
  },
  {
    name: "Linda Kowalski",
    text: "We hired them to paint the interior of our entire first floor. They were punctual, neat, and the finish is perfect. Will definitely use again.",
    service: "Interior Painting",
    rating: 5,
  },
  {
    name: "James & Patricia N.",
    text: "Great experience from start to finish. Ryan was easy to communicate with and his team did a beautiful job on our exterior paint. Looks like a brand new house.",
    service: "Exterior Painting",
    rating: 5,
  },
];

const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

const Reviews = () => {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-secondary">
      <div className="section-container section-padding">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl text-foreground">What Our Customers Say</h2>
            {/* Aggregate rating badge */}
            <div className="mt-4 inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm">
              <div className="flex gap-0.5" aria-label={`Rated ${avgRating} out of 5 stars`}>
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" aria-hidden="true" />
                ))}
              </div>
              <span className="font-semibold text-foreground text-sm">{avgRating.toFixed(1)}</span>
              <span className="text-muted-foreground text-sm">reviews</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {reviews.map((review, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <article className="bg-card rounded-xl p-6 sm:p-8 shadow-sm border border-border h-full flex flex-col">
                <div className="flex gap-1 mb-4" role="img" aria-label={`${review.rating} out of 5 stars`}>
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < review.rating ? "fill-accent text-accent" : "text-muted"}`} aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-foreground/80 leading-relaxed mb-5 text-sm flex-1">
                  "{review.text}"
                </blockquote>
                <footer className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{review.name}</p>
                    <p className="text-muted-foreground text-xs">{review.service}</p>
                  </div>
                </footer>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

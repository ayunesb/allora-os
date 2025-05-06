import React, { Suspense, lazy } from "react";
// Lazy load testimonial component
const LazyTestimonial = lazy(() => import("@/components/home/Testimonial"));
// Testimonial data
const testimonials = [
  {
    quote:
      "Allora AI transformed our business strategy overnight. The executive insights were game-changing for our growth.",
    author: "Sarah Johnson",
    role: "CEO, TechInnovate",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    quote:
      "Working with the AI executive team feels like having a board of directors in my pocket. Incredible value for startups.",
    author: "Michael Chen",
    role: "Founder, Growth Ventures",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
  },
];
const Testimonials = () => {
  return (
    <div className="w-full bg-secondary/30 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          What Our Clients Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Suspense
              key={index}
              fallback={
                <div className="bg-card p-6 rounded-lg border border-border animate-pulse h-48"></div>
              }
            >
              <LazyTestimonial
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                avatar={testimonial.avatar}
                delay={index * 0.2}
              />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Testimonials;

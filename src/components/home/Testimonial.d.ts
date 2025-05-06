import React from "react";
interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  delay?: number;
}
declare const Testimonial: React.FC<TestimonialProps>;
export default Testimonial;

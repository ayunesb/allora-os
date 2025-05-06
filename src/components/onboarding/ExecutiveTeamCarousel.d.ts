interface Executive {
  id: string;
  name: string;
  role: string;
  title: string;
  specialty: string;
  avatar: string;
}
interface ExecutiveTeamCarouselProps {
  executives: Executive[];
}
export declare function ExecutiveTeamCarousel({
  executives,
}: ExecutiveTeamCarouselProps): JSX.Element;
export {};

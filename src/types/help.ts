
export type HelpContent = {
  title: string;
  description: string;
  steps?: { title: string; description: string }[];
  links?: { title: string; url: string }[];
  video?: string;
};

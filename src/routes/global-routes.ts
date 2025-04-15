
import { RouteObject } from "react-router-dom";

export const globalRoutes: RouteObject[] = [
  {
    path: "/404",
    async lazy() {
      const { default: NotFound } = await import("@/pages/NotFound");
      return { element: <NotFound /> };
    }
  },
  {
    path: "/legal",
    async lazy() {
      const { default: Legal } = await import("@/pages/Legal");
      return { element: <Legal /> };
    }
  },
  {
    path: "/faq",
    async lazy() {
      const { default: FAQ } = await import("@/pages/FAQ");
      return { element: <FAQ /> };
    }
  },
  {
    path: "/privacy",
    async lazy() {
      const { default: Privacy } = await import("@/pages/Privacy");
      return { element: <Privacy /> };
    }
  },
  {
    path: "/terms",
    async lazy() {
      const { default: TermsOfService } = await import("@/pages/TermsOfService");
      return { element: <TermsOfService /> };
    }
  },
  {
    path: "/contact",
    async lazy() {
      const { default: Contact } = await import("@/pages/Contact");
      return { element: <Contact /> };
    }
  },
  {
    path: "/security",
    async lazy() {
      const { default: Security } = await import("@/pages/Security");
      return { element: <Security /> };
    }
  }
];

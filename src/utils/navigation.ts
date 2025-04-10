
// A utility for navigation that doesn't depend on the useNavigate hook directly
// This will be used in contexts or services that need to navigate but can't access useNavigate

let navigateFunction: ((to: string, options?: { replace?: boolean; state?: any }) => void) | null = null;

export const registerNavigate = (
  navigate: (to: string, options?: { replace?: boolean; state?: any }) => void
) => {
  navigateFunction = navigate;
};

export const navigate = (
  to: string,
  options?: { replace?: boolean; state?: any }
) => {
  if (navigateFunction) {
    navigateFunction(to, options);
  } else {
    console.warn('Navigation function not registered yet.');
  }
};

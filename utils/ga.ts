declare global {
  interface Window {
    gtag: (p: string, q: string, r: object) => void;
  }
}

export const pageView = (url: string) => {
  if (!process.env.NEXT_PUBLIC_GA) return;
  window.gtag('config', process.env.NEXT_PUBLIC_GA, {
    page_path: url,
  });
};

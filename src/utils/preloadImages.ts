export const preloadImages = (imageSources: string[]): Promise<void[]> => {
  return Promise.all(
    imageSources.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
      });
    }),
  );
};

export const CRITICAL_IMAGES = [
  "/frame-home1.png",
  "/frame-home2.png",
  "/logo.svg",
];

/**
 * ASSET PREFETCHER UTILITY
 * Pre-caches case study images and embeds into browser cache
 * to ensure 0ms latency, zero buffering, and zero visual pop-in when modals open.
 */

const prefetchedUrls = new Set();

/**
 * Prefetch an image URL into browser cache using Image object + prefetch link
 */
export function prefetchImage(url) {
  if (!url || typeof url !== 'string' || prefetchedUrls.has(url)) return;
  prefetchedUrls.add(url);

  // 1. High-speed memory cache priming
  const img = new Image();
  img.decoding = 'async';
  img.src = url;

  // 2. Browser disk cache hint
  try {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  } catch (e) {
    // Graceful fallback
  }
}

/**
 * Prefetch all assets associated with a specific case study
 */
export function prefetchCaseStudy(caseStudy) {
  if (!caseStudy) return;

  if (caseStudy.vaultImage) prefetchImage(caseStudy.vaultImage);

  if (Array.isArray(caseStudy.content)) {
    caseStudy.content.forEach((block) => {
      if (!block) return;
      if (block.image) prefetchImage(block.image);
      if (block.src) prefetchImage(block.src);
      if (block.url && /\.(webp|png|jpg|jpeg|svg)$/i.test(block.url)) {
        prefetchImage(block.url);
      }
      if (Array.isArray(block.images)) {
        block.images.forEach((img) => {
          const u = typeof img === 'string' ? img : img?.src || img?.image;
          if (u) prefetchImage(u);
        });
      }
      if (Array.isArray(block.screens)) {
        block.screens.forEach((screen) => {
          if (Array.isArray(screen.images)) {
            screen.images.forEach((img) => prefetchImage(img));
          }
        });
      }
    });
  }
}

/**
 * Warm the cache for critical shelf case studies in idle time
 */
export function scheduleIdlePrefetch(caseStudies) {
  if (typeof window === 'undefined') return;

  const runWarmup = () => {
    if (!Array.isArray(caseStudies)) return;
    // Sequential idle prefetch with 150ms pauses to prevent network contention
    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= caseStudies.length) {
        clearInterval(interval);
        return;
      }
      prefetchCaseStudy(caseStudies[idx]);
      idx++;
    }, 150);
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(runWarmup, { timeout: 3000 });
  } else {
    setTimeout(runWarmup, 1800);
  }
}

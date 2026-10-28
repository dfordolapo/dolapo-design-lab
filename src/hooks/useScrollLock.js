import { useEffect } from 'react';

/**
 * Robust scroll lock hook:
 * Locks html, body, and custom scroll containers (.about-page-container)
 * to ensure no part of the page scrolls while a modal is open.
 * Also prevents touchmove chaining on mobile devices.
 */
export default function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;

    const body = document.body;
    const html = document.documentElement;
    const scrollContainer = document.querySelector('.about-page-container');

    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    const prevContainerOverflow = scrollContainer ? scrollContainer.style.overflow : '';

    // Lock page scrolling across document and app container
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    if (scrollContainer) {
      scrollContainer.style.overflow = 'hidden';
    }

    // Touch event guard for mobile: prevent rubber-band / background drags
    const handleTouchMove = (e) => {
      // Allow scrolling if the interaction is inside a scrollable modal container
      const target = e.target;
      if (
        target &&
        target.closest &&
        (target.closest('.workbench-info-card') || target.closest('.about-modal-container') || target.closest('.about-modal-backdrop'))
      ) {
        // If the modal content itself is scrollable, allow it
        return;
      }
      e.preventDefault();
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
      if (scrollContainer) {
        scrollContainer.style.overflow = prevContainerOverflow;
      }
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isLocked]);
}

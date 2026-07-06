import { useEffect } from 'react';

export default function usePageSEO({ title, description }) {
  useEffect(() => {
    // Update the browser tab title
    if (title) {
      document.title = `${title} | Dolapo's Design Lab`;
    }

    // Update the meta description tag
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      
      metaDescription.setAttribute('content', description);
    }

    // Optional: cleanup function to reset on unmount, but often left as-is for SPA
    return () => {
      document.title = "Dolapo's Design Lab — Enter the Experience";
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', "Enter the lab where digital products are researched, designed, written, prototyped, and built.");
      }
    };
  }, [title, description]);
}
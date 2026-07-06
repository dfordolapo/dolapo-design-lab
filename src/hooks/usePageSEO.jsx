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
      document.title = "Dolapo's Design Lab — Pushing Pixels & Boundaries";
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', "Where wireframes become real. Explore my cinematic vault of design and code.");
      }
    };
  }, [title, description]);
}
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import './styles/vault.css'
import './styles/caseStudy.css'

// Sitewide protection: ensure images cannot be downloaded, dragged, or saved
if (typeof window !== 'undefined') {
  const isImageTarget = (target) => {
    if (!target) return false;
    return (
      target.tagName === 'IMG' ||
      target.tagName === 'PICTURE' ||
      target.closest('img') ||
      target.closest('picture') ||
      (target instanceof HTMLElement && window.getComputedStyle(target).backgroundImage !== 'none')
    );
  };

  window.addEventListener('contextmenu', (e) => {
    if (isImageTarget(e.target)) {
      e.preventDefault();
      return false;
    }
  }, { capture: true });

  window.addEventListener('dragstart', (e) => {
    if (isImageTarget(e.target)) {
      e.preventDefault();
      return false;
    }
  }, { capture: true });

  const disableImgDrag = () => {
    document.querySelectorAll('img').forEach((img) => {
      if (img.getAttribute('draggable') !== 'false') {
        img.setAttribute('draggable', 'false');
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', disableImgDrag);
  } else {
    disableImgDrag();
  }

  const observer = new MutationObserver(() => {
    disableImgDrag();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

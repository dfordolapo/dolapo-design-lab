import React, { useEffect, useState, useRef } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export default function ScrambleText({ 
  text, 
  duration = 0.8, 
  delay = 0,
  className = '',
  as: Component = 'span' 
}) {
  const [displayText, setDisplayText] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);
  const originalText = useRef(text);

  useEffect(() => {
    originalText.current = text;
    setDisplayText('');
    setIsScrambling(false);
    
    const timeout = setTimeout(() => {
      setIsScrambling(true);
    }, delay * 1000);
    
    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    if (!isScrambling) return;

    let frame = 0;
    const totalFrames = Math.floor(duration * 60); // Assuming 60fps
    let animationFrame;

    const animate = () => {
      const progress = frame / totalFrames;
      
      if (progress >= 1) {
        setDisplayText(originalText.current);
        setIsScrambling(false);
        return;
      }

      let newText = '';
      for (let i = 0; i < originalText.current.length; i++) {
        // For spaces, keep them as spaces
        if (originalText.current[i] === ' ') {
          newText += ' ';
          continue;
        }
        
        // As progress increases, lock in the correct characters from left to right
        const charProgress = i / originalText.current.length;
        if (progress > charProgress + 0.1) {
          newText += originalText.current[i];
        } else {
          // Add a random character
          newText += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        }
      }

      setDisplayText(newText);
      frame++;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isScrambling, duration]);

  const finalDisplay = isScrambling ? displayText : (displayText || (delay === 0 ? text : ''));

  return <Component className={className}>{finalDisplay}</Component>;
}

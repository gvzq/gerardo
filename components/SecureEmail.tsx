'use client';

import { useEffect, useState } from 'react';

export default function SecureEmail() {
  const [cssLoaded, setCssLoaded] = useState(false);
  const [classNames, setClassNames] = useState<string[]>([]);

  useEffect(() => {
    const loadEmailStyles = async () => {
      try {
        // Fetch the CSS with cache busting
        const response = await fetch(`/api/email-styles?t=${Date.now()}`);
        const cssText = await response.text();
        
        // Extract class names from CSS (now looking for ep- prefix)
        const classMatches = cssText.match(/\.(ep-[a-z0-9]+)/g);
        if (classMatches) {
          const extractedClasses = classMatches.map(match => match.substring(1));
          setClassNames(extractedClasses);
        }
        
        // Create and inject style element
        const styleElement = document.createElement('style');
        styleElement.textContent = cssText;
        styleElement.id = 'secure-email-styles';
        
        // Remove existing styles if any
        const existing = document.getElementById('secure-email-styles');
        if (existing) {
          existing.remove();
        }
        
        document.head.appendChild(styleElement);
        setCssLoaded(true);
        
      } catch (error) {
        console.error('Failed to load email styles:', error);
      }
    };

    loadEmailStyles();
    
    // Cleanup on unmount
    return () => {
      const styleElement = document.getElementById('secure-email-styles');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  if (!cssLoaded) {
    return (
      <span className="inline-block">
        <span className="text-gray-400">Loading contact info...</span>
      </span>
    );
  }

  return (
    <span className="email-container">
      {classNames.map((className, index) => (
        <span key={index} className={className}></span>
      ))}
    </span>
  );
}

// Alternative simpler version without class name extraction
export function SimpleSecureEmail() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loadEmailStyles = async () => {
      try {
        const response = await fetch(`/api/email-styles?t=${Date.now()}`);
        const cssText = await response.text();
        
        const styleElement = document.createElement('style');
        styleElement.textContent = cssText;
        styleElement.id = 'simple-email-styles';
        
        const existing = document.getElementById('simple-email-styles');
        if (existing) existing.remove();
        
        document.head.appendChild(styleElement);
        setMounted(true);
        
      } catch (error) {
        console.error('Failed to load email styles:', error);
      }
    };

    loadEmailStyles();
    
    return () => {
      const styleElement = document.getElementById('simple-email-styles');
      if (styleElement) styleElement.remove();
    };
  }, []);

  if (!mounted) {
    return <span className="text-gray-400">Loading...</span>;
  }

  // These spans will be populated by CSS ::before content
  return (
    <span className="email-container">
      <span className="email-part-1"></span>
      <span className="email-part-2"></span>
      <span className="email-part-3"></span>
      <span className="email-part-4"></span>
      <span className="email-part-5"></span>
      <span className="email-part-6"></span>
      <span className="email-part-7"></span>
      <span className="email-part-8"></span>
    </span>
  );
}
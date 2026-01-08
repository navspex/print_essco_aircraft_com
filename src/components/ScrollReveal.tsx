import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  stagger?: boolean;
}

/**
 * ScrollReveal - Gamma-style fade-in + slide-up animation on scroll
 * 
 * Triggers when element enters viewport (80% visible threshold)
 * Animates ONCE per section (not on every scroll)
 * Preserves existing hover effects (bloom, glow, zoom)
 */
export default function ScrollReveal({ children, delay = 0, stagger = false }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add revealed class to trigger animation
            element.classList.add('scroll-revealed');
            
            // If stagger is enabled, add stagger class to children
            if (stagger) {
              const children = element.querySelectorAll('.scroll-reveal-item');
              children.forEach((child, index) => {
                setTimeout(() => {
                  child.classList.add('scroll-revealed');
                }, index * 100); // 100ms stagger delay
              });
            }
            
            // Stop observing after first reveal (animate once only)
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% visible (80% from bottom)
        rootMargin: '0px 0px -10% 0px', // Slight offset for better timing
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [stagger]);

  return (
    <div
      ref={ref}
      className="scroll-reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

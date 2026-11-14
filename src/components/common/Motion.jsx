import React, { useEffect, useRef, useState } from 'react';

const OPTS = { threshold: 0.15, rootMargin: '0px 0px -8% 0px' };

/** True once the element has scrolled into view (fires once). */
export function useInView(opts = OPTS) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return undefined;
    if (!('IntersectionObserver' in window)) {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, opts);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, seen];
}

/** Fade/slide wrapper. variant: up | left | right | zoom. */
export default function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', style, children, ...rest }) {
  const [ref, seen] = useInView();
  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={`${className}${seen ? ' is-visible' : ''}`.trim()}
      style={{ '--d': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Heading whose words slide up one by one when scrolled into view. */
export function SplitText({ text, as: Tag = 'h2', className = '', delay = 0 }) {
  const [ref, seen] = useInView();
  return (
    <Tag
      ref={ref}
      aria-label={text}
      className={`split ${className}${seen ? ' is-visible' : ''}`.trim()}
      style={{ '--d': `${delay}ms` }}
    >
      {text.split(' ').map((w, i) => (
        <React.Fragment key={i}>
          <span className="sw" aria-hidden="true">
            <span style={{ '--i': i }}>{w}</span>
          </span>{' '}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/** Slow parallax on the hero photo (writes --py on .hero__bg). */
export function useHeroParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const el = document.querySelector('.hero__bg');
    if (!el) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => el.style.setProperty('--py', `${Math.min(window.scrollY * 0.25, 220)}px`));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}

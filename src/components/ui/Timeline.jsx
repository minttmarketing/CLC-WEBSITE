import React, { useEffect, useRef } from 'react';
import { useInView } from '../common/Motion';

function Item({ n, item }) {
  const [ref, on] = useInView({ threshold: 0.4, rootMargin: '0px 0px -22% 0px' });
  return (
    <li ref={ref} className={on ? 'is-on' : ''}>
      <span className="timeline__dot">{n}</span>
      <div>
        {item.kicker && <small className="timeline__kicker">{item.kicker}</small>}
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    </li>
  );
}

/** Vertical timeline: red line fills as you scroll, each step lights up in turn. */
export default function Timeline({ items }) {
  const ol = useRef(null);
  useEffect(() => {
    const el = ol.current;
    if (!el) return undefined;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height));
      el.style.setProperty('--tp', p.toFixed(3));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <ol className="timeline" ref={ol}>
      {items.map((item, i) => (
        <Item key={item.title} n={i + 1} item={item} />
      ))}
    </ol>
  );
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router does not perform native anchor scrolling, so hash links such as
 * /#trending-repos only update the URL. This scrolls to the matching element
 * on every navigation and resets to the top when no hash is present.
 */
export function ScrollToHash() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    let frame = 0;

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const scrollToTarget = () => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      scrollToTarget();
      frame = requestAnimationFrame(scrollToTarget);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}

import { useEffect } from 'react';

type EditorEdgeDraggingScrollProps = {
  editorScrollEventActive: boolean;
  editorRef: React.RefObject<HTMLDivElement | null>;
  threshold?: number;
  speed?: number;
  debug?: boolean;
};

export function useEditorEdgeDraggingStore({
  editorScrollEventActive,
  editorRef,
  threshold = 200,
  speed = 10,
  debug = false,
}: EditorEdgeDraggingScrollProps) {
  useEffect(() => {
    if (!editorScrollEventActive) {
      if (debug) console.log('[EdgeScroll] abort: editorScrollEventActive=false');
      return;
    }
    if (!editorRef.current) {
      if (debug) console.log('[EdgeScroll] abort: editorRef.current is null');
      return;
    }

    const el = editorRef.current;
    let frameId: number;

    if (debug) {
      const canScrollX = el.scrollWidth > el.clientWidth;
      const canScrollY = el.scrollHeight > el.clientHeight;
      console.log('[EdgeScroll] mount', {
        threshold, speed,
        canScrollX, canScrollY,
        dims: {
          clientW: el.clientWidth, clientH: el.clientHeight,
          scrollW: el.scrollWidth, scrollH: el.scrollHeight,
        },
      });
    }

    const onMove = (e: MouseEvent | TouchEvent | DragEvent) => {
      let x = 0, y = 0;
      if ('clientX' in e) { x = e.clientX; y = e.clientY; }
      else if ('touches' in e && e.touches[0]) {
        x = e.touches[0].clientX; y = e.touches[0].clientY;
      }

      const rect = el.getBoundingClientRect();
      const distLeft   = x - rect.left;
      const distRight  = rect.right - x;
      const distTop    = y - rect.top;
      const distBottom = rect.bottom - y;

      const edge = {
        left:   distLeft   < threshold && distLeft   > 0,
        right:  distRight  < threshold && distRight  > 0,
        top:    distTop    < threshold && distTop    > 0,
        bottom: distBottom < threshold && distBottom > 0,
      };

      const before = { left: el.scrollLeft, top: el.scrollTop };

      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        // apply scrolling (one frame)
        if (edge.left)   el.scrollLeft -= speed;
        if (edge.right)  el.scrollLeft += speed;
        if (edge.top)    el.scrollTop  -= speed;
        if (edge.bottom) el.scrollTop  += speed;

        if (debug) {
          const after = { left: el.scrollLeft, top: el.scrollTop };
          console.log('[EdgeScroll] move', {
            pointer: { x, y },
            dists: { distLeft, distRight, distTop, distBottom },
            edge,
            before, after,
          });
        }
      });
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('touchmove', onMove, { passive: true });
    document.addEventListener('dragover', onMove);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('dragover', onMove);
      cancelAnimationFrame(frameId);
      if (debug) console.log('[EdgeScroll] cleanup');
    };
  }, [editorScrollEventActive, editorRef, threshold, speed, debug]);
}

import { useEffect, useRef } from 'react';

type UseMiddleWheelPanArgs = {
  editorRef: React.RefObject<HTMLDivElement | null>;
  cursorRef?: React.RefObject<{ x: number; y: number }>;
  isMobileScreen?: boolean;
  speed?: number;            // 1 = natural; >1 faster; <1 gentler
  useRafThrottle?: boolean;  // default true
  debug?: boolean;           // kept for API compatibility
};

export default function useMiddleWheelPan({
  editorRef,
  cursorRef,
  isMobileScreen = false,
  speed = 1,
  useRafThrottle = true,
  debug = false, // default off
}: UseMiddleWheelPanArgs) {
  const middleHeldRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pendingDeltaRef = useRef<{ dx: number; dy: number } | null>(null);

  useEffect(() => {
    const el = editorRef.current;
    if (!el || isMobileScreen) return;

    const applyDelta = (dx: number, dy: number) => {
      el.scrollLeft -= dx * speed;
      el.scrollTop  -= dy * speed;
    };

    const flushRaf = () => {
      rafIdRef.current = null;
      const d = pendingDeltaRef.current;
      if (!d) return;
      pendingDeltaRef.current = null;
      applyDelta(d.dx, d.dy);
    };

    // Always keep cursorRef in sync (even when not dragging)
    const onPointerMoveUpdateCursor = (e: PointerEvent) => {
      if (cursorRef?.current) {
        cursorRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button === 1) {
        middleHeldRef.current = true;
        lastPosRef.current = { x: e.clientX, y: e.clientY };
        if (cursorRef?.current) cursorRef.current = { x: e.clientX, y: e.clientY };
        el.setPointerCapture?.(e.pointerId);
        e.preventDefault(); // stop browser auto-scroll on middle click
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      // update cursor every move
      onPointerMoveUpdateCursor(e);

      // Only pan while middle button is held
      if (!(e.pointerType === 'mouse' && (e.buttons & 4))) return;
      if (!middleHeldRef.current || !lastPosRef.current) return;

      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      lastPosRef.current = { x: e.clientX, y: e.clientY };

      if (useRafThrottle) {
        const prev = pendingDeltaRef.current;
        pendingDeltaRef.current = prev
          ? { dx: prev.dx + dx, dy: prev.dy + dy }
          : { dx, dy };
        if (rafIdRef.current == null) {
          rafIdRef.current = requestAnimationFrame(flushRaf);
        }
      } else {
        applyDelta(dx, dy);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button === 1) {
        middleHeldRef.current = false;
        lastPosRef.current = null;
        el.releasePointerCapture?.(e.pointerId);
      }
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    // Also update cursorRef even if not dragging (cheap & helpful)
    el.addEventListener('pointermove', onPointerMoveUpdateCursor, { passive: true });

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointermove', onPointerMoveUpdateCursor);
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      pendingDeltaRef.current = null;
      middleHeldRef.current = false;
      lastPosRef.current = null;
    };
  }, [editorRef, cursorRef, isMobileScreen, speed, useRafThrottle, debug]);
}

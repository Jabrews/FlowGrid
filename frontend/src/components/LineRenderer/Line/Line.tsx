import { useEffect, useRef } from "react";

type LineProps = {
  startId: string;
  endId: string;
  containerRef: React.RefObject<HTMLElement | null>;
};

export function Line({ startId, endId, containerRef }: LineProps) {


  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
        const start = document.getElementById(startId);
        const end = document.getElementById(endId);
        if (!start || !end) return;

        const cRect = container.getBoundingClientRect();
        const a = start.getBoundingClientRect();
        const b = end.getBoundingClientRect();

        canvas.width = container.scrollWidth;
        canvas.height = container.scrollHeight;

        const x1 = a.left - cRect.left + container.scrollLeft + a.width / 2;
        const y1 = a.top - cRect.top + container.scrollTop + a.height / 2;
        const x2 = b.left - cRect.left + container.scrollLeft + b.width / 2;
        const y2 = b.top - cRect.top + container.scrollTop + b.height / 2;

        const viewLeft = container.scrollLeft;
        const viewTop = container.scrollTop;
        const viewRight = viewLeft + container.clientWidth;
        const viewBottom = viewTop + container.clientHeight;

        const lineLeft = Math.min(x1, x2);
        const lineRight = Math.max(x1, x2);
        const lineTop = Math.min(y1, y2);
        const lineBottom = Math.max(y1, y2);

        const isVisible =
            lineRight >= viewLeft &&
            lineLeft <= viewRight &&
            lineBottom >= viewTop &&
            lineTop <= viewBottom;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!isVisible) return;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.strokeStyle = "black";

        ctx.lineWidth = 2;
        ctx.stroke();

    };


    // initial draw
    draw();

    // redraw on scroll
    container.addEventListener("scroll", draw, { passive: true });
    window.addEventListener("resize", draw);

    return () => {
      container.removeEventListener("scroll", draw);
      window.removeEventListener("resize", draw);
    };
  }, [startId, endId, containerRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    />
  );
}

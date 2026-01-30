(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.getElementById("cursorTrail");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize(){
    const dpr = window.devicePixelRatio || 1;
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  resize();
  addEventListener("resize", resize);

  const dots = [];
  const MAX = 90;

  addEventListener("mousemove", e => {
    dots.push({ x: e.clientX, y: e.clientY, life: 1 });
    if (dots.length > MAX) dots.shift();
  }, { passive: true });

  function draw(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for (const d of dots) {
      d.life *= 0.92;

      ctx.beginPath();
      ctx.fillStyle = `rgba(80,160,255,${d.life})`;
      ctx.shadowColor = "rgba(80,160,255,0.9)";
      ctx.shadowBlur = 14;
      ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
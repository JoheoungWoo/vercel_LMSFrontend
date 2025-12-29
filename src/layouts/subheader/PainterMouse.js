import { useEffect, useRef } from "react";
import bgImgSrc from "../../images/2.jpg";
import mouseImgSrc from "../../images/mouse.png";

export default function PainterMouse() {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const imgBg = new Image();
    const imgMouse = new Image();

    imgBg.src = bgImgSrc;
    imgMouse.src = mouseImgSrc;

    let loadedCount = 0;

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === 2) {
        console.log(`Background size: ${imgBg.width}x${imgBg.height}`);
        console.log(`Mouse size: ${imgMouse.width}x${imgMouse.height}`);
        startAnimation();
      }
    };

    imgBg.onload = handleLoad;
    imgMouse.onload = handleLoad;

    function startAnimation() {
      const width = imgBg.width;
      const height = imgBg.height;
      canvas.width = width;
      canvas.height = height;

      // ─────────────────────────────
      // 1. 배경은 밑에 깔려 있고
      //    위에 흰 종이(cover) 레이어를 하나 더 둔다
      // ─────────────────────────────
      const coverCanvas = document.createElement("canvas");
      coverCanvas.width = width;
      coverCanvas.height = height;
      const coverCtx = coverCanvas.getContext("2d");

      // 처음엔 전체 흰색
      coverCtx.fillStyle = "#ffffff";
      coverCtx.fillRect(0, 0, width, height);

      // ─────────────────────────────
      // 2. 브러시 설정
      // ─────────────────────────────
      const brushRadius = Math.floor(width / 13); // 화면 비례 붓 크기

      function stampBrush(x, y) {
        coverCtx.save();
        // 흰 종이를 "지우기" 모드
        coverCtx.globalCompositeOperation = "destination-out";

        const gradient = coverCtx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          brushRadius
        );
        gradient.addColorStop(0, "rgba(0,0,0,1)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        coverCtx.fillStyle = gradient;
        coverCtx.beginPath();
        coverCtx.arc(x, y, brushRadius, 0, Math.PI * 2);
        coverCtx.fill();

        coverCtx.restore();
      }

      // ─────────────────────────────
      // 3. 화면 전체를 커버하는 "대각선 스캔 경로" 생성
      //    → 타일 아닌, 브러시 중심 포인트 리스트
      // ─────────────────────────────
      const step = brushRadius * 0.9; // 포인트 간 간격 (겹치도록)
      const cols = Math.ceil(width / step);
      const rows = Math.ceil(height / step);

      const points = [];
      // diag = row + col (0 ~ rows+cols-2)
      for (let diag = 0; diag <= rows + cols - 2; diag++) {
        for (let row = 0; row < rows; row++) {
          const col = diag - row;
          if (col < 0 || col >= cols) continue;

          const x = col * step;
          const y = row * step;

          if (x <= width && y <= height) {
            points.push({ x, y });
          }
        }
      }

      let pointIndex = 0;
      let prevX = null;
      let prevY = null;

      // ─────────────────────────────
      // 4. 쥐 이미지 설정 (브러시 위치 기준 오프셋)
      // ─────────────────────────────
      const mouseW = brushRadius * 3;
      const mouseH = brushRadius * 3;
      const offsetX = -mouseW * 0.7;
      const offsetY = -mouseH * 0.2;

      // 속도 조절
      let frameCount = 0;
      const FRAME_SKIP = 3; // 클수록 더 천천히

      function drawFrame() {
        frameCount++;
        if (frameCount % FRAME_SKIP !== 0) {
          requestRef.current = requestAnimationFrame(drawFrame);
          return;
        }

        if (pointIndex < points.length) {
          const { x, y } = points[pointIndex];

          // 이전 위치와 현재 위치 사이를 촘촘히 채워서 끊김 줄이기
          if (prevX !== null && prevY !== null) {
            const dx = x - prevX;
            const dy = y - prevY;
            const dist = Math.hypot(dx, dy);
            const stampStep = brushRadius * 0.5;
            const steps = Math.max(1, Math.floor(dist / stampStep));

            for (let i = 1; i <= steps; i++) {
              const t = i / steps;
              const ix = prevX + dx * t;
              const iy = prevY + dy * t;
              stampBrush(ix, iy);
            }
          } else {
            stampBrush(x, y);
          }

          prevX = x;
          prevY = y;
          pointIndex++;
        }

        // ─────────────────────────────
        // 5. 실제 캔버스에 그리기
        // ─────────────────────────────
        ctx.clearRect(0, 0, width, height);

        // 배경 먼저
        ctx.drawImage(imgBg, 0, 0, width, height);

        // 그 위에 흰 종이
        ctx.drawImage(coverCanvas, 0, 0, width, height);

        // 아직 다 안 그렸으면 쥐 그리기
        if (pointIndex < points.length && prevX !== null && prevY !== null) {
          ctx.drawImage(
            imgMouse,
            prevX + offsetX,
            prevY + offsetY,
            mouseW,
            mouseH
          );
          requestRef.current = requestAnimationFrame(drawFrame);
        } else {
          // 다 그렸으면 그냥 마지막 상태에서 멈춤
          // (뚝 하고 전체 배경으로 바꾸지 않음)
          // 필요하면 여기서 쥐만 안 그린 프레임 한 번 더 그려도 됨
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(imgBg, 0, 0, width, height);
        }
      }

      requestRef.current = requestAnimationFrame(drawFrame);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      imgBg.onload = null;
      imgMouse.onload = null;
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full bg-gray-100">
      <canvas
        ref={canvasRef}
        className="rounded-xl shadow-2xl border border-gray-300 object-contain"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  );
}

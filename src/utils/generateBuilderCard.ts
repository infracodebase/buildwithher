/**
 * Generates a shareable Builder Card image using Canvas API.
 * Returns a data URL (PNG) optimized for LinkedIn sharing (1080x1080).
 */
export async function generateBuilderCard(options: {
  name: string;
  role: string;
  country: string;
  company?: string;
  skills: string[];
  photoDataUrl?: string | null;
}): Promise<string> {
  const SIZE = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d")!;

  // Background gradient (navy → blue → green → warm orange)
  const bg = ctx.createLinearGradient(0, 0, SIZE, SIZE);
  bg.addColorStop(0, "#0a1628");
  bg.addColorStop(0.3, "#0f2847");
  bg.addColorStop(0.55, "#0d3b5e");
  bg.addColorStop(0.75, "#1a5c4c");
  bg.addColorStop(0.9, "#8b5c2a");
  bg.addColorStop(1, "#a0412e");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Subtle noise overlay
  ctx.globalAlpha = 0.04;
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * SIZE;
    const y = Math.random() * SIZE;
    ctx.fillStyle = Math.random() > 0.5 ? "#ffffff" : "#000000";
    ctx.fillRect(x, y, 1, 1);
  }
  ctx.globalAlpha = 1;

  // Top branding
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = "600 22px 'Space Grotesk', sans-serif";
  ctx.letterSpacing = "6px";
  ctx.fillText("BUILD WITH HER", SIZE / 2, 120);
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "400 14px 'Inter', sans-serif";
  ctx.fillText("Built by Oz", SIZE / 2, 152);

  // Profile photo or initial
  const centerX = SIZE / 2;
  const photoY = 310;
  const photoR = 110;

  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, photoY, photoR, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  if (options.photoDataUrl) {
    try {
      const img = await loadImage(options.photoDataUrl);
      ctx.drawImage(img, centerX - photoR, photoY - photoR, photoR * 2, photoR * 2);
    } catch {
      drawInitial(ctx, centerX, photoY, photoR, options.name);
    }
  } else {
    drawInitial(ctx, centerX, photoY, photoR, options.name);
  }
  ctx.restore();

  // Photo ring
  ctx.beginPath();
  ctx.arc(centerX, photoY, photoR + 3, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Name
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.97)";
  ctx.font = "700 42px 'Space Grotesk', sans-serif";
  ctx.fillText(truncate(options.name, 24), centerX, 510);

  // Role + Company
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "400 22px 'Inter', sans-serif";
  const roleText = options.company
    ? `${truncate(options.role, 28)} at ${truncate(options.company, 20)}`
    : truncate(options.role, 40);
  ctx.fillText(roleText, centerX, 555);

  // Country
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "400 20px 'Inter', sans-serif";
  ctx.fillText(options.country, centerX, 600);

  // Skills
  if (options.skills.length > 0) {
    const skillStr = options.skills.slice(0, 5).join("  ·  ");
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.font = "500 18px 'Inter', sans-serif";
    ctx.fillText(truncate(skillStr, 50), centerX, 660);
  }

  // Bottom branding
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.font = "400 14px 'Inter', sans-serif";
  ctx.fillText("buildwithher.dev", centerX, SIZE - 60);

  return canvas.toDataURL("image/png");
}

function drawInitial(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, name: string) {
  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.font = "700 72px 'Space Grotesk', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(name ? name.charAt(0).toUpperCase() : "?", cx, cy);
  ctx.textBaseline = "alphabetic";
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

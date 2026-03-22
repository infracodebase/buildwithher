/**
 * Generates a compact two-column builder profile card using Canvas API.
 * Fixed 630px width, dark navy aesthetic matching the profile page.
 * Returns a data URL (PNG).
 */

const W = 1260; // 630px * 2x for retina
const SIDEBAR_W = 460;
const CONTENT_W = W - SIDEBAR_W;
const PAD = 40;
const BANNER_H = 200;

const COLORS = {
  bg: "#0d1117",
  card: "#161b22",
  cardBorder: "#30363d",
  bannerStart: "#164e63",
  bannerEnd: "#065f46",
  primary: "#3b82f6",
  primaryMuted: "rgba(59,130,246,0.12)",
  primaryBorder: "rgba(59,130,246,0.3)",
  text: "#e6edf3",
  textMuted: "#8b949e",
  textDim: "#6e7681",
  accent: "#10b981",
  sectionBg: "#21262d",
  sectionBorder: "#30363d",
};

interface ProfileOptions {
  name: string;
  role: string;
  country: string;
  company?: string;
  photoUrl?: string | null;
  tags: string[];
  cloudPlatforms?: string[];
  building?: string[];
  bio?: string;
  motivation?: string;
  statement?: string;
  joinedYear: number;
}

export async function generateBuilderProfile(opts: ProfileOptions): Promise<string> {
  // Need a temp canvas to measure text for dynamic heights
  const measureCanvas = document.createElement("canvas");
  const measureCtx = measureCanvas.getContext("2d")!;

  // Pre-calculate content height
  const contentSections = buildContentSections(opts, measureCtx);
  const sidebarSections = buildSidebarSections(opts, measureCtx);

  const contentH = measureSections(contentSections);
  const sidebarH = measureSections(sidebarSections);
  const bodyH = Math.max(contentH, sidebarH) + PAD * 2;
  const H = BANNER_H + 80 + bodyH + 60; // banner + avatar overlap + body + footer

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Background
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, W, H);

  // Banner gradient
  const bannerGrad = ctx.createLinearGradient(0, 0, W, BANNER_H);
  bannerGrad.addColorStop(0, COLORS.bannerStart);
  bannerGrad.addColorStop(1, COLORS.bannerEnd);
  ctx.fillStyle = bannerGrad;
  ctx.fillRect(0, 0, W, BANNER_H);

  // Photo
  const photoR = 70;
  const photoX = PAD + photoR + 10;
  const photoY = BANNER_H - photoR + 30;

  if (opts.photoUrl) {
    try {
      const img = await loadImage(opts.photoUrl);
      ctx.save();
      ctx.beginPath();
      ctx.arc(photoX, photoY, photoR, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, photoX - photoR, photoY - photoR, photoR * 2, photoR * 2);
      ctx.restore();
    } catch {
      drawInitialCircle(ctx, photoX, photoY, photoR, opts.name);
    }
  } else {
    drawInitialCircle(ctx, photoX, photoY, photoR, opts.name);
  }

  // Photo ring
  ctx.beginPath();
  ctx.arc(photoX, photoY, photoR + 3, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 4;
  ctx.stroke();

  // Name (to the right of photo)
  const nameX = photoX + photoR + 30;
  const nameY = BANNER_H - 20;
  ctx.textAlign = "left";
  ctx.fillStyle = COLORS.text;
  ctx.font = "bold 40px 'Space Grotesk', system-ui, sans-serif";
  ctx.fillText(truncate(opts.name, 30), nameX, nameY);

  // Subtitle
  const subtitle = opts.company
    ? `${opts.role?.split(" at ")[0] || opts.role} · ${opts.company}`
    : opts.role;
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "400 22px 'Inter', system-ui, sans-serif";
  ctx.fillText(truncate(subtitle || "", 50), nameX, nameY + 32);

  // Badges row
  const badgeY = BANNER_H + photoR + 50;
  let badgeX = PAD;
  const badges = [
    opts.country,
    opts.tags[0] || "Cloud Engineering",
    `Joined ${opts.joinedYear}`,
    "Build With Her",
  ];

  for (const badge of badges) {
    const w = measureText(ctx, badge, "500 18px 'Inter', system-ui, sans-serif") + 24;
    drawPill(ctx, badgeX, badgeY, w, 32, COLORS.primaryMuted, COLORS.primaryBorder);
    ctx.fillStyle = COLORS.primary;
    ctx.font = "500 18px 'Inter', system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(badge, badgeX + 12, badgeY + 22);
    badgeX += w + 12;
  }

  // Two-column body
  const bodyY = badgeY + 56;

  // Sidebar
  let sy = bodyY;
  for (const section of sidebarSections) {
    sy = drawSection(ctx, PAD, sy, SIDEBAR_W - PAD * 1.5, section);
    sy += 20;
  }

  // Content
  let cy = bodyY;
  for (const section of contentSections) {
    cy = drawSection(ctx, SIDEBAR_W, cy, CONTENT_W - PAD, section);
    cy += 20;
  }

  // Footer branding
  const footerY = H - 40;
  ctx.textAlign = "center";
  ctx.fillStyle = COLORS.textDim;
  ctx.font = "400 16px 'Inter', system-ui, sans-serif";
  ctx.fillText("buildwithher.dev  ·  Powered by Infracodebase", W / 2, footerY);

  return canvas.toDataURL("image/png");
}

// ── Section types ──

interface CardSection {
  title: string;
  type: "text" | "tags" | "stats" | "blockquote" | "grid" | "buttons" | "highlight";
  content?: string;
  tags?: string[];
  stats?: { label: string; value: string }[];
  height: number;
}

function calcTagsHeight(tags: string[], maxW: number, ctx: CanvasRenderingContext2D): number {
  ctx.font = "500 16px 'Inter', system-ui, sans-serif";
  let tx = 0;
  let rows = 1;
  for (const tag of tags) {
    const tw = ctx.measureText(tag).width + 24 + 10;
    if (tx + tw > maxW && tx > 0) {
      rows++;
      tx = 0;
    }
    tx += tw;
  }
  return 50 + rows * 36;
}

function buildSidebarSections(opts: ProfileOptions, ctx: CanvasRenderingContext2D): CardSection[] {
  const sections: CardSection[] = [];
  const sidebarInnerW = SIDEBAR_W - PAD * 1.5 - 40;

  const platformCount = opts.cloudPlatforms?.length || opts.tags.length;
  const projectCount = opts.building?.length || 1;
  sections.push({
    title: "Builder Stats",
    type: "stats",
    stats: [
      { label: "Projects", value: String(projectCount) },
      { label: "Stacks", value: String(platformCount) },
      { label: "Focus", value: truncate(opts.tags[0] || "Cloud", 12) },
      { label: "Joined", value: String(opts.joinedYear) },
    ],
    height: 200,
  });

  const platforms = (opts.cloudPlatforms || opts.tags).slice(0, 6);
  sections.push({
    title: "Platforms",
    type: "tags",
    tags: platforms,
    height: calcTagsHeight(platforms, sidebarInnerW, ctx),
  });

  sections.push({
    title: "Actions",
    type: "buttons",
    height: 240,
  });

  return sections;
}

function buildContentSections(opts: ProfileOptions, ctx: CanvasRenderingContext2D): CardSection[] {
  const sections: CardSection[] = [];
  const contentInnerW = CONTENT_W - PAD - 40;

  // Builder Story
  const storyText = opts.bio || "Building cloud infrastructure and scaling the future.";
  const storyLines = Math.ceil(storyText.length / 55);
  sections.push({
    title: "Builder Story",
    type: "text",
    content: storyText,
    height: 60 + storyLines * 26,
  });

  // Cloud Focus
  const cloudTags = [...opts.tags, ...(opts.cloudPlatforms || []).filter(p => !opts.tags.includes(p))].slice(0, 8);
  sections.push({
    title: "Cloud Focus",
    type: "tags",
    tags: cloudTags,
    height: calcTagsHeight(cloudTags, contentInnerW, ctx),
  });

  // Infrastructure Projects
  if (opts.building && opts.building.length > 0) {
    sections.push({
      title: "Infrastructure Projects",
      type: "grid",
      tags: opts.building.slice(0, 4),
      height: 60 + Math.ceil((opts.building.slice(0, 4).length) / 2) * 60,
    });
  }

  // Motivation
  if (opts.motivation) {
    const motLines = Math.ceil(opts.motivation.length / 55);
    sections.push({
      title: "Why I Joined Build With Her",
      type: "text",
      content: opts.motivation,
      height: 60 + motLines * 26,
    });
  }

  // Built on Infracodebase
  sections.push({
    title: "Built on Infracodebase",
    type: "highlight",
    content: "Check out all the work I have done creating and managing cloud infrastructures on Infracodebase.",
    height: 120,
  });

  // Community Voice
  if (opts.statement) {
    const stmtLines = Math.ceil(opts.statement.length / 50);
    sections.push({
      title: "Community Voice",
      type: "blockquote",
      content: opts.statement,
      height: 70 + stmtLines * 26,
    });
  }

  // Builder Activity (visual heatmap)
  sections.push({
    title: "Builder Activity",
    type: "grid",
    height: 140,
  });

  return sections;
}

function measureSections(sections: CardSection[]): number {
  return sections.reduce((sum, s) => sum + s.height + 20, 0);
}

function drawSection(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, section: CardSection): number {
  const h = section.height;

  // Section card background
  roundRect(ctx, x, y, w, h, 16, COLORS.card, COLORS.cardBorder);

  // Title
  ctx.textAlign = "left";
  ctx.fillStyle = COLORS.text;
  ctx.font = "600 18px 'Space Grotesk', system-ui, sans-serif";
  if (section.title !== "Actions") {
    ctx.fillText(section.title.toUpperCase(), x + 20, y + 32);
  }

  const innerX = x + 20;
  const innerW = w - 40;
  let curY = y + 50;

  switch (section.type) {
    case "text":
      ctx.fillStyle = COLORS.textMuted;
      ctx.font = "400 18px 'Inter', system-ui, sans-serif";
      curY = wrapText(ctx, section.content || "", innerX, curY, innerW, 26);
      break;

    case "tags":
      if (section.tags) {
        let tx = innerX;
        let ty = curY;
        ctx.font = "500 16px 'Inter', system-ui, sans-serif";
        for (const tag of section.tags) {
          const tw = measureText(ctx, tag, "500 16px 'Inter', system-ui, sans-serif") + 24;
          if (tx + tw > x + w - 20) {
            tx = innerX;
            ty += 36;
          }
          drawPill(ctx, tx, ty - 12, tw, 30, COLORS.primaryMuted, COLORS.primaryBorder);
          ctx.fillStyle = COLORS.primary;
          ctx.font = "500 16px 'Inter', system-ui, sans-serif";
          ctx.textAlign = "left";
          ctx.fillText(tag, tx + 12, ty + 8);
          tx += tw + 10;
        }
      }
      break;

    case "stats":
      if (section.stats) {
        const cellW = (innerW - 12) / 2;
        const cellH = 70;
        section.stats.forEach((stat, i) => {
          const cx = innerX + (i % 2) * (cellW + 12);
          const cy = curY + Math.floor(i / 2) * (cellH + 10);
          roundRect(ctx, cx, cy, cellW, cellH, 12, COLORS.sectionBg, COLORS.sectionBorder);
          ctx.textAlign = "center";
          ctx.fillStyle = COLORS.text;
          ctx.font = "bold 24px 'Space Grotesk', system-ui, sans-serif";
          ctx.fillText(stat.value, cx + cellW / 2, cy + 34);
          ctx.fillStyle = COLORS.textDim;
          ctx.font = "400 14px 'Inter', system-ui, sans-serif";
          ctx.fillText(stat.label, cx + cellW / 2, cy + 56);
        });
      }
      break;

    case "blockquote":
      // Quote line
      ctx.fillStyle = COLORS.primary;
      ctx.fillRect(innerX, curY, 3, h - 60);
      ctx.fillStyle = COLORS.textMuted;
      ctx.font = "italic 18px 'Inter', system-ui, sans-serif";
      wrapText(ctx, `"${section.content || ""}"`, innerX + 16, curY + 6, innerW - 16, 26);
      break;

    case "grid":
      if (section.title === "Builder Activity") {
        // Draw heatmap
        drawHeatmap(ctx, innerX, curY, innerW, 80);
      } else if (section.tags) {
        const gCellW = (innerW - 12) / 2;
        section.tags.forEach((item, i) => {
          const gx = innerX + (i % 2) * (gCellW + 12);
          const gy = curY + Math.floor(i / 2) * 56;
          roundRect(ctx, gx, gy, gCellW, 48, 10, COLORS.sectionBg, COLORS.sectionBorder);
          ctx.textAlign = "left";
          ctx.fillStyle = COLORS.textMuted;
          ctx.font = "400 15px 'Inter', system-ui, sans-serif";
          ctx.fillText(truncate(item, 25), gx + 14, gy + 30);
        });
      }
      break;

    case "highlight":
      // Special gradient border
      roundRect(ctx, x + 4, y + 4, w - 8, h - 8, 14, "rgba(59,130,246,0.05)", COLORS.primaryBorder);
      ctx.fillStyle = COLORS.textMuted;
      ctx.font = "400 17px 'Inter', system-ui, sans-serif";
      wrapText(ctx, section.content || "", innerX, curY + 4, innerW, 24);
      break;

    case "buttons":
      const btnLabels = [
        "Connect on LinkedIn",
        "View Infrastructure Portfolio",
        "Share builder profile →",
        "Share Builder Card",
        "Create Your Builder Card",
      ];
      let by = y + 20;
      for (let i = 0; i < btnLabels.length; i++) {
        const isLast = i === btnLabels.length - 1;
        const isPrimary = i === 0;
        const bgColor = isLast ? COLORS.bannerStart : isPrimary ? COLORS.primary : COLORS.sectionBg;
        const borderColor = isLast ? COLORS.bannerEnd : isPrimary ? COLORS.primary : COLORS.sectionBorder;
        roundRect(ctx, innerX, by, innerW, 36, 10, bgColor, borderColor);
        ctx.textAlign = "center";
        ctx.fillStyle = isPrimary || isLast ? "#fff" : COLORS.textMuted;
        ctx.font = "500 15px 'Inter', system-ui, sans-serif";
        ctx.fillText(btnLabels[i], innerX + innerW / 2, by + 24);
        by += 44;
      }
      break;
  }

  ctx.textAlign = "left";
  return y + h;
}

// ── Helpers ──

function drawHeatmap(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const cols = 26;
  const rows = 7;
  const cellSize = Math.min((w - (cols - 1) * 3) / cols, (h - (rows - 1) * 3) / rows);
  const gap = 3;
  const levels = [
    COLORS.sectionBg,
    "rgba(59,130,246,0.2)",
    "rgba(59,130,246,0.4)",
    "rgba(59,130,246,0.6)",
    "rgba(59,130,246,0.8)",
  ];

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const seed = (c * 7 + r + 2025) % 17;
      const level = seed < 5 ? 0 : seed < 9 ? 1 : seed < 13 ? 2 : seed < 16 ? 3 : 4;
      const cx = x + c * (cellSize + gap);
      const cy = y + r * (cellSize + gap);
      ctx.fillStyle = levels[level];
      roundRectFill(ctx, cx, cy, cellSize, cellSize, 3);
    }
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string, stroke: string) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function roundRectFill(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}

function drawPill(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: string, stroke: string) {
  roundRect(ctx, x, y, w, h, h / 2, fill, stroke);
}

function drawInitialCircle(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, name: string) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(59,130,246,0.2)";
  ctx.fill();
  ctx.fillStyle = COLORS.text;
  ctx.font = "bold 56px 'Space Grotesk', system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(name ? name.charAt(0).toUpperCase() : "?", cx, cy);
  ctx.textBaseline = "alphabetic";
  ctx.restore();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lineH: number): number {
  const words = text.split(" ");
  let line = "";
  let curY = y;

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxW && line) {
      ctx.fillText(line, x, curY);
      line = word;
      curY += lineH;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, curY);
    curY += lineH;
  }
  return curY;
}

function measureText(ctx: CanvasRenderingContext2D, text: string, font: string): number {
  ctx.save();
  ctx.font = font;
  const w = ctx.measureText(text).width;
  ctx.restore();
  return w;
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
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

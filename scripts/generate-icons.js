const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Gradient: Deep Obsidian Void -->
    <radialGradient id="bgGlow" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#181a26" />
      <stop offset="45%" stop-color="#0c0d14" />
      <stop offset="100%" stop-color="#050508" />
    </radialGradient>

    <!-- Outer Rim Metallic Gradient -->
    <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5" />
      <stop offset="25%" stop-color="#38bdf8" stop-opacity="0.8" />
      <stop offset="65%" stop-color="#818cf8" stop-opacity="0.7" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.15" />
    </linearGradient>

    <!-- Left Pillar: Silver Chrome -->
    <linearGradient id="leftPillarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="40%" stop-color="#f1f5f9" />
      <stop offset="100%" stop-color="#94a3b8" />
    </linearGradient>

    <!-- Left Diagonal Fold: Luminous Electric Cyan -->
    <linearGradient id="leftDiagonalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>

    <!-- Right Diagonal Fold: Radiant Cyber Violet / Magenta -->
    <linearGradient id="rightDiagonalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e879f9" />
      <stop offset="50%" stop-color="#a855f7" />
      <stop offset="100%" stop-color="#6366f1" />
    </linearGradient>

    <!-- Right Pillar: Bright Platinum -->
    <linearGradient id="rightPillarGrad" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#e2e8f0" />
      <stop offset="100%" stop-color="#64748b" />
    </linearGradient>

    <!-- Ambient Center Bloom -->
    <radialGradient id="centerAura" cx="50%" cy="52%" r="40%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3" />
      <stop offset="50%" stop-color="#818cf8" stop-opacity="0.15" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <!-- Neon Drop Shadow for Depth -->
    <filter id="mDropShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.8" />
      <feDropShadow dx="0" dy="0" stdDeviation="20" flood-color="#38bdf8" flood-opacity="0.25" />
    </filter>

    <filter id="glowOnly" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Squircle Base Frame -->
  <rect x="28" y="28" width="456" height="456" rx="116" fill="url(#bgGlow)" stroke="url(#rimGrad)" stroke-width="4.5" />

  <!-- Inner Glass Bevel Highlight -->
  <rect x="36" y="36" width="440" height="440" rx="108" fill="none" stroke="rgba(255, 255, 255, 0.07)" stroke-width="1.5" />

  <!-- Center Energy Bloom -->
  <circle cx="256" cy="256" r="140" fill="url(#centerAura)" />

  <!-- THE 'M' ARCHITECTURAL MONOGRAM -->
  <g filter="url(#mDropShadow)">
    <!-- Left Column (Solid Silver Pillar with beveled rounded head) -->
    <path d="M 116 376 V 156 Q 116 132 140 132 H 176 V 376 H 116 Z" fill="url(#leftPillarGrad)" />

    <!-- Left Diagonal Chevron (Cyan to Sapphire Power Ribbon) -->
    <path d="M 176 132 L 256 264 L 256 324 L 176 192 Z" fill="url(#leftDiagonalGrad)" />

    <!-- Right Diagonal Chevron (Violet to Indigo Power Ribbon) -->
    <path d="M 256 264 L 336 132 H 372 L 256 324 Z" fill="url(#rightDiagonalGrad)" />

    <!-- Right Column (Solid Silver Pillar with beveled rounded head) -->
    <path d="M 336 132 H 372 Q 396 132 396 156 V 376 H 336 Z" fill="url(#rightPillarGrad)" />

    <!-- Nexus Prism Fold (Top valley light catch) -->
    <path d="M 256 264 L 220 205 L 256 226 L 292 205 Z" fill="#ffffff" opacity="0.32" />

    <!-- Central Micro-Nexus Jewel (Glowing Cyan Star) -->
    <circle cx="256" cy="264" r="5" fill="#ffffff" filter="url(#glowOnly)" />
    <circle cx="256" cy="264" r="3" fill="#38bdf8" />
  </g>
</svg>`;

async function run() {
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'app');

  // 1. Write SVG icons
  const svgPathPublic = path.join(publicDir, 'favicon.svg');
  const svgPathApp = path.join(appDir, 'icon.svg');
  fs.writeFileSync(svgPathPublic, svgCode, 'utf8');
  fs.writeFileSync(svgPathApp, svgCode, 'utf8');
  console.log('Created SVG icons in public/ and app/');

  const svgBuffer = Buffer.from(svgCode);

  // 2. Generate PNG 32x32 for favicon.ico
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), png32); // Modern browsers handle PNG-encoded .ico
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), png32);

  // 3. Generate Apple Touch Icon 180x180
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), png180);

  // 4. Generate Web App Manifest Icons (192 & 512)
  const png192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192);

  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);

  console.log('Generated all favicon and app icons successfully!');
}

run().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});

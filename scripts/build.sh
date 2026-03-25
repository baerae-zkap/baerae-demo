#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"

echo "=== Cleaning dist/ ==="
rm -rf "$DIST"
mkdir -p "$DIST/baerae-demo"

echo "=== Building landing page ==="
cd "$ROOT/landing"
npm install --silent
npm run build
cp -R out/* "$DIST/baerae-demo/"

echo "=== Building gyeonggi-civic-wallet ==="
cd "$ROOT/demos/gyeonggi-civic-wallet"
npm install --silent
npm run build
mkdir -p "$DIST/gyeonggi-civic-wallet-demo"
cp -R out/* "$DIST/gyeonggi-civic-wallet-demo/"

echo "=== Building zkap-app ==="
cd "$ROOT/demos/zkap-app"
npm install --silent
npm run build
mkdir -p "$DIST/zkap-app"
cp -R out/* "$DIST/zkap-app/"

echo "=== Building zkap-coin-detail ==="
cd "$ROOT/demos/zkap-coin-detail"
npm install --silent
npm run build
mkdir -p "$DIST/zkap-coin-detail"
cp -R out/* "$DIST/zkap-coin-detail/"

echo "=== Injecting home button ==="
HOME_BTN='<div id="baerae-home-btn" style="position:fixed;bottom:24px;right:24px;z-index:99999"><a href="/baerae-demo/" style="display:flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;background:rgba(0,0,0,0.65);box-shadow:0 2px 12px rgba(0,0,0,0.2);text-decoration:none;transition:transform 0.15s,background 0.15s;backdrop-filter:blur(8px)" onmouseover="this.style.background='"'"'rgba(0,0,0,0.8)'"'"'" onmouseout="this.style.background='"'"'rgba(0,0,0,0.65)'"'"'"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></a></div>'

find "$DIST/gyeonggi-civic-wallet-demo" -name "*.html" -exec sed -i '' "s|</body>|${HOME_BTN}</body>|" {} +
find "$DIST/zkap-app" -name "*.html" -exec sed -i '' "s|</body>|${HOME_BTN}</body>|" {} +
find "$DIST/zkap-coin-detail" -name "*.html" -exec sed -i '' "s|</body>|${HOME_BTN}</body>|" {} +

echo ""
echo "=== Build complete! ==="
echo "Output: $DIST"
echo ""
echo "To preview locally:"
echo "  npx serve $DIST -l 3000"
echo "  Open http://localhost:3000/baerae-demo/"

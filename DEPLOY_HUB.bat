@echo off
REM DEPLOY_HUB.bat -- ship personal hub v2 + HIPJOY systems subhub
REM Generated 2026-05-09 by Claude / Cowork

cd /d "%~dp0"

echo === Clearing stale .git/index.lock if present ===
if exist .git\index.lock del /q .git\index.lock

echo === Staging personal hub + archive backup ===
git add _archive/index.PRIOR-e6f9a67.html index.html
if errorlevel 1 goto :err

git commit -m "site: refresh personal hub v2 -- moss palette, og/twitter, favicon, canonical, link to /hipjoy/" -m "" -m "- replace index.html with v2 (Fraunces/Inter/JetBrains, paper background, moss accents)" -m "- add theme-color, OG/Twitter cards, inline-SVG favicon, canonical url" -m "- HIPJOY OS project links to ./hipjoy/ systems subhub" -m "- LinkedIn handle set to verified joey-barbush-115575403" -m "- eyebrow now reflects actual Pages url (no CNAME yet)" -m "- backup of prior index -> _archive/index.PRIOR-e6f9a67.html"
if errorlevel 1 goto :err

echo === Staging HIPJOY systems subhub ===
git add hipjoy/index.html
if errorlevel 1 goto :err

git commit -m "site: add HIPJOY systems subhub at /hipjoy/" -m "" -m "- new sub-hub: void/maroon/lux palette, eleven entities grid, three gateways, active seeds" -m "- live LUX bar with founder-signed equation tick (95.0 baseline, flux drift)" -m "- founder card -> ../ (back to personal hub root)" -m "- theme-color crimson, sigil favicon, canonical, og/twitter for /hipjoy/"
if errorlevel 1 goto :err

echo === Pushing to origin/main ===
git push origin main
if errorlevel 1 goto :err

echo.
echo === DONE ===
echo Live URLs (allow ~30-60s for Pages rebuild):
echo   https://joeybarbush.github.io/joeybarbush-hub/
echo   https://joeybarbush.github.io/joeybarbush-hub/hipjoy/
echo.
pause
exit /b 0

:err
echo.
echo === FAILED at last step. See output above. ===
pause
exit /b 1

@echo off
REM DEPLOY_SOCIAL.bat -- ship polished social/contact icons + Instagram + phone on both hubs
REM Generated 2026-05-09 by Claude / Cowork

cd /d "%~dp0"

echo === Clearing stale .git/index.lock if present ===
if exist .git\index.lock del /q .git\index.lock

echo === Staging both hub pages ===
git add index.html hipjoy/index.html
if errorlevel 1 goto :err

git commit -m "site: polish social/contact icons + add Instagram + phone" -m "" -m "- inline-SVG icons (LinkedIn, GitHub, X, Instagram, Email, Phone) on both hero strips" -m "- branded hover tints: LinkedIn #0A66C2, GitHub #181717, X #000, Instagram #E4405F" -m "- new Instagram entry (@joeybarbush, 4253 followers active) on both hubs" -m "- new phone entry ((331) 213-5614) on both hubs" -m "- personal hub: Public Signals card grid rebuilt with icon-top-left + moss hover border" -m "- hipjoy hub: Public Surfaces card grid rebuilt with LUX-gold icons -> crimson on hover" -m "- preserves 2025 founded / Plugin live 2026-04-26 inline meta on hipjoy hero"
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

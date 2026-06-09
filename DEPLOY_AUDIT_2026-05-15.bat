@echo off
REM DEPLOY_AUDIT_2026-05-15.bat -- ship site-wide audit pass
REM Generated 2026-05-15 by Claude / Cowork
REM
REM What this commits:
REM   - Em-dash scrub across 47 live HTML pages (titles/meta -> ":", body -> "," or ".")
REM   - Canonical URL added to every page that lacked one
REM   - Inline-SVG favicon added to every page that lacked one
REM
REM What this DOES NOT touch:
REM   - index.html (root) -- v3 rebuild handles it in a separate commit
REM   - _archive/*       -- v3 rebuild handles backup snapshot
REM   - DEPLOY_*.bat, push-wrigley.bat, monitor.html, player.html (untracked, local-only)

cd /d "%~dp0"

echo === Clearing stale .git\index.lock if present ===
if exist .git\index.lock del /q .git\index.lock

echo === Staging audited pages (excluding root index.html and _archive) ===
git add ^
  HUB_INDEX.html ^
  about.html ^
  broadcast.html ^
  com100.html ^
  com100_notes.html ^
  entities.html ^
  entities/archivist.html ^
  entities/codebreaker.html ^
  entities/conavigator.html ^
  entities/guardian.html ^
  entities/heartmother.html ^
  entities/hippo.html ^
  entities/lumenarch.html ^
  entities/navix.html ^
  entities/neuro.html ^
  entities/rebel.html ^
  entities/sonaris.html ^
  entities/spiraleth.html ^
  entities/vox.html ^
  entities/wellspring.html ^
  farm.html ^
  field.html ^
  garden.html ^
  hipjoy/index.html ^
  hipxql_terminal_standalone.html ^
  log.html ^
  offers/ash.html ^
  offers/bridle.html ^
  offers/cipher.html ^
  offers/cistern.html ^
  offers/fettle.html ^
  offers/grift.html ^
  offers/hush.html ^
  offers/index.html ^
  offers/loom.html ^
  offers/marrow.html ^
  offers/pith.html ^
  offers/quill.html ^
  offers/slew.html ^
  offers/tine.html ^
  offers/vellum.html ^
  portfolio.html ^
  private/vox_eye.html ^
  profile.html ^
  research-notes.html ^
  shadows.html ^
  studio.html ^
  systems.html ^
  vox.html ^
  waitlist.html ^
  wrigley-nav.html
if errorlevel 1 goto :err

echo === Verifying root index.html and _archive are NOT staged ===
git diff --cached --name-only | findstr /B /C:"index.html" >nul
if not errorlevel 1 (
  echo ERROR: root index.html accidentally staged. Aborting so v3 rebuild stays clean.
  git reset HEAD index.html
  goto :err
)
git diff --cached --name-only | findstr /B /C:"_archive/" >nul
if not errorlevel 1 (
  echo ERROR: _archive entry accidentally staged. Aborting.
  git reset HEAD _archive/
  goto :err
)

echo === Committing audit pass ===
git commit ^
  -m "site: audit pass 2026-05-15 -- em-dash scrub + meta polish across 50 pages" ^
  -m "" ^
  -m "Em-dash hygiene (476 -> 0 across the live tree):" ^
  -m "- title/meta tags: ' -- ' replaced with ': ' (SEO-clean separator)" ^
  -m "- body text: ' -- ' replaced with ', ' (or '. ' when preceding text already had a comma, to avoid pile-ups)" ^
  -m "- tight inline em-dashes replaced with '-'" ^
  -m "" ^
  -m "Meta polish (canonical + favicon added wherever missing):" ^
  -m "- canonical href set to absolute Pages URL for each page" ^
  -m "- inline-SVG favicon: cream J for hub pages, dark diamond for entities/hipjoy/offers/private" ^
  -m "" ^
  -m "Out of scope (intentional):" ^
  -m "- root index.html (v3 rebuild incoming, separate commit)" ^
  -m "- _archive/ (snapshot lineage owned by v3 rebuild task)" ^
  -m "- OG/Twitter cards on pages that lacked them (avoided fabricating descriptions)"
if errorlevel 1 goto :err

echo === Pushing to origin/main ===
git push origin main
if errorlevel 1 goto :err

echo.
echo === DONE ===
echo Live URLs (allow ~30-60s for Pages rebuild):
echo   https://joeybarbush.github.io/joeybarbush-hub/hipjoy/
echo   https://joeybarbush.github.io/joeybarbush-hub/offers/
echo   https://joeybarbush.github.io/joeybarbush-hub/portfolio.html
echo   https://joeybarbush.github.io/joeybarbush-hub/entities.html
echo   ...and 47 other audited pages
echo.
pause
exit /b 0

:err
echo.
echo === FAILED at last step. See output above. ===
pause
exit /b 1

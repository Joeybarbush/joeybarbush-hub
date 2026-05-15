@echo off
REM DEPLOY_HUB_V3.bat -- ship root portfolio hub v3 (warm earth mythos)
REM Generated 2026-05-15 by Claude / Cowork (Joey at sister's wedding)
REM
REM What this does:
REM   1. Clears any stale .git/index.lock
REM   2. Stages the new v3 index.html + v2 backup in _archive/
REM   3. Commits with message: "site: v3 portfolio hub . warm earth mythos . funnel design"
REM   4. Pushes to origin/main (GitHub Pages picks up in ~30-60s)
REM   5. Prints live URLs so Joey can verify
REM
REM Run from this folder. Safe to re-run. If commit fails because nothing changed,
REM the script will skip and try to push anyway.

setlocal ENABLEDELAYEDEXPANSION
cd /d "%~dp0"

echo.
echo ================================================================
echo  DEPLOY_HUB_V3  .  Joey Barbush portfolio hub
echo  warm earth mythos . sunset + sage + gold + dark earth
echo ================================================================
echo.

echo [1/5] Clearing stale .git\index.lock if present...
if exist .git\index.lock (
  del /q .git\index.lock
  echo       removed.
) else (
  echo       none found.
)
echo.

echo [2/5] Checking git status...
git status --short
echo.

echo [3/5] Staging v3 index.html + v2 backup...
git add _archive/index.v2-PRIOR-de0a4de.html
git add index.html
git add DEPLOY_HUB_V3.bat
if errorlevel 1 goto :err
echo       staged.
echo.

echo [4/5] Committing...
git commit -m "site: v3 portfolio hub . codebreaker x mythos . funnel design" -m "" -m "- replace root index.html with v3 (warm earth mythos palette pivot)" -m "- sunset orange, sage green, warm gold, dark earth ground" -m "- accessible copy: family + recruiter readable, mythos rich" -m "- single page funnel: hero, who, stack, research, tech, canon, reach, signature" -m "- 8 stack tiles routing to hipjoy, field, portfolio, com100, iron bloom, sovra, entities, studio" -m "- 11 canon entities each with plain English equivalent" -m "- mobile first responsive (<=480px clause), no em dashes (LUMEN floor)" -m "- backup of v2 at _archive/index.v2-PRIOR-de0a4de.html"
if errorlevel 1 (
  echo       commit failed or nothing to commit. trying push anyway...
)
echo.

echo [5/5] Pushing to origin/main...
git push origin main
if errorlevel 1 goto :err
echo.

echo ================================================================
echo  DEPLOY COMPLETE.  give GitHub Pages 30-60 seconds, then check:
echo ================================================================
echo.
echo    https://joeybarbush.github.io/joeybarbush-hub/
echo.
echo  Cross-check these surfaces still resolve:
echo    https://joeybarbush.github.io/joeybarbush-hub/hipjoy/
echo    https://joeybarbush.github.io/joeybarbush-hub/field.html
echo    https://joeybarbush.github.io/joeybarbush-hub/portfolio.html
echo    https://joeybarbush.github.io/joeybarbush-hub/com100.html
echo    https://joeybarbush.github.io/joeybarbush-hub/entities.html
echo    https://joeybarbush.github.io/joeybarbush-hub/studio.html
echo.
echo  v2 backup preserved at:
echo    ./_archive/index.v2-PRIOR-de0a4de.html
echo.
pause
exit /b 0

:err
echo.
echo ================================================================
echo  DEPLOY FAILED at last step. Read the output above.
echo  Common fixes:
echo    - sign in to git ( git config user.name / user.email )
echo    - check internet
echo    - verify origin URL ( git remote -v )
echo    - resolve any merge conflicts
echo ================================================================
echo.
pause
exit /b 1

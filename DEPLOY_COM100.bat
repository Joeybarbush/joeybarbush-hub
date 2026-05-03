@echo off
title DEPLOY COM 100  joeybarbush-hub
:: Always run from the actual repo root, no matter where this .bat lives
cd /d "%USERPROFILE%\joeybarbush-hub"
if errorlevel 1 (
  echo.
  echo  [!] could not cd into %USERPROFILE%\joeybarbush-hub
  pause
  exit /b 1
)

echo.
echo  +-----------------------------------------------------+
echo  ^|  COM 100 LIVE DEPLOY                                ^|
echo  ^|  Aiming AI at What Matters                          ^|
echo  +-----------------------------------------------------+
echo.
echo  working dir: %CD%

if not exist ".git" (
  echo.
  echo  [!] no .git folder here. this is not a git repo.
  echo      expected: %CD%\.git
  pause
  exit /b 1
)

if not exist "com100.html" (
  echo.
  echo  [!] com100.html not found in %CD%
  echo      something went wrong with file write. check the folder.
  pause
  exit /b 1
)

echo.
echo  [1/4] checking git status...
git status --short
echo.

echo  [2/4] adding com100.html and com100_notes.html...
git add com100.html com100_notes.html
echo.

echo  [3/4] committing...
git commit -m "ship com100 persuasive speech deck and cut-ready cards"
if errorlevel 1 (
  echo.
  echo  [!] commit failed. maybe nothing changed, or git not configured.
  echo      check:  git config user.email
  echo              git config user.name
  pause
  exit /b 1
)
echo.

echo  [4/4] pushing to origin...
git push
if errorlevel 1 (
  echo.
  echo  [!] push failed. check remote and auth.
  echo      try:    git remote -v
  pause
  exit /b 1
)

echo.
echo  +-----------------------------------------------------+
echo  ^|  DEPLOYED.                                          ^|
echo  ^|                                                     ^|
echo  ^|  Live URLs (after GH Pages rebuild, around 30 sec): ^|
echo  ^|                                                     ^|
echo  ^|  https://joeybarbush.github.io/joeybarbush-hub/     ^|
echo  ^|         com100.html        (slide deck)             ^|
echo  ^|         com100_notes.html  (script and cards)       ^|
echo  ^|                                                     ^|
echo  +-----------------------------------------------------+
echo.
pause

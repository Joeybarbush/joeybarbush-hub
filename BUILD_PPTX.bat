@echo off
title BUILD COM 100 BACKUP PPTX
cd /d "%USERPROFILE%\joeybarbush-hub"
echo.
echo  +-----------------------------------------------------+
echo  ^|  COM 100 BACKUP PPTX BUILDER                        ^|
echo  ^|  Aiming AI at What Matters                          ^|
echo  +-----------------------------------------------------+
echo.
if not exist "build_pptx.js" (
  echo  [!] build_pptx.js not found in %CD%
  pause
  exit /b 1
)
echo  [1/3] installing pptxgenjs ^(only on first run^)...
call npm install pptxgenjs --silent --no-fund --no-audit
if errorlevel 1 (
  echo.
  echo  [!] npm install failed. is Node.js installed? try:  node --version
  pause
  exit /b 1
)
echo        ok
echo.
echo  [2/3] building deck...
call node build_pptx.js
if errorlevel 1 (
  echo.
  echo  [!] build failed
  pause
  exit /b 1
)
echo.
echo  [3/3] opening folder ^(your file is COM100_Slides.pptx^)...
start "" "%CD%"
echo.
echo  +-----------------------------------------------------+
echo  ^|  DONE. COM100_Slides.pptx is in joeybarbush-hub.    ^|
echo  ^|                                                     ^|
echo  ^|  Open in PowerPoint, or upload to Google Slides     ^|
echo  ^|  via File ^> Import slides for an editable backup.  ^|
echo  +-----------------------------------------------------+
echo.
pause

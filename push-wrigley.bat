@echo off
cd /d C:\Users\joey\joeybarbush-hub
del /f .git\index.lock 2>nul
git add wrigley-nav.html
git commit -m "Live Wrigley nav page — Cubs vs Reds 5/4"
git push origin main
del /f push-wrigley.bat
pause

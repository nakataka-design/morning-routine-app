@echo off
chcp 65001 >nul
echo アプリを起動しています...
start "" "http://localhost:3456"
python -m http.server 3456

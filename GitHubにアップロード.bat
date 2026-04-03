@echo off
chcp 65001 >nul
echo.
echo ========================================
echo  朝ルーティンアプリ → GitHub公開スクリプト
echo ========================================
echo.

set GIT="C:\Program Files\Git\mingw64\bin\git.exe"
cd /d "%~dp0"

echo 【手順1】GitHubのユーザー名を入力してください
set /p GITHUB_USER=GitHubユーザー名:

echo.
echo 【手順2】GitHubでリポジトリを作成してください
echo.
echo  1. https://github.com/new を開く
echo  2. Repository name に「morning-routine-app」と入力
echo  3. Public を選択
echo  4. 「Create repository」をクリック
echo.
pause

echo.
echo GitHubに接続しています...
%GIT% remote add origin https://github.com/%GITHUB_USER%/morning-routine-app.git
%GIT% branch -M main
%GIT% push -u origin main

if %ERRORLEVEL% == 0 (
  echo.
  echo ========================================
  echo  アップロード成功！
  echo  https://github.com/%GITHUB_USER%/morning-routine-app
  echo ========================================
  echo.
  echo 次はVercelで公開します：
  echo  1. https://vercel.com にアクセス
  echo  2. 「GitHubでサインイン」
  echo  3. 「Add New Project」→ morning-routine-app を選択
  echo  4. 「Deploy」をクリック
  echo  5. URLが発行されたら完成！
  echo.
) else (
  echo.
  echo エラーが発生しました。
  echo GitHubのユーザー名とパスワードを確認してください。
  echo.
)
pause

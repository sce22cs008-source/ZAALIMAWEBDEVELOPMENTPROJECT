@echo off
echo 🚀 Launching CareerForge Pro...

:: Start Backend
start cmd /k "cd server && node server.js"

:: Start Frontend
start cmd /k "cd client && npm run dev"

echo ✅ Both servers are starting in separate windows.
echo 🌐 Once ready, open http://localhost:5173 
pause

#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "======================================"
echo " Jasmine Group Gelistirme Sunucusu Basliyor"
echo "======================================"

# Check if the Vite development server is already running.
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
    echo "Gelistirme sunucusu zaten calisiyor."
else
    echo "Gelistirme sunucusu baslatiliyor..."
    npm run dev -- --host 127.0.0.1 > /tmp/jasmine-group-vite.log 2>&1 &
    sleep 2
fi

echo "Tarayici aciliyor..."
open "http://127.0.0.1:5173/admin-login.html"

echo "Bu pencereyi kapatirsaniz sunucu calismaya devam eder."
echo "Iyi calismalar!"

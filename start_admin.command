#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "======================================"
echo " Jasmine Group Yonetim Paneli Basliyor"
echo "======================================"

# Check if port 8000 is in use
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "PHP Server zaten calisiyor."
else
    echo "PHP Server baslatiliyor..."
    php -d upload_max_filesize=50M -d post_max_size=50M -S localhost:8000 > /dev/null 2>&1 &
    sleep 2
fi

echo "Tarayici aciliyor..."
open "http://localhost:8000/admin/admin.php"

echo "Bu pencereyi kapatirsaniz sunucu calismaya devam eder."
echo "Iyi calismalar!"

#!/bin/bash

echo "🚀 Starting AR Football Predictions Local Server"
echo "================================================"
echo ""
echo "⚠️  IMPORTANT: AR requires HTTPS!"
echo ""
echo "This will start a local HTTP server on port 8080."
echo "To test AR on your phone, you need HTTPS via tunneling:"
echo ""
echo "Option 1 - ngrok (recommended):"
echo "  1. Install ngrok: https://ngrok.com/download"
echo "  2. In a new terminal, run: ngrok http 8080"
echo "  3. Copy the HTTPS URL and open on your phone"
echo ""
echo "Option 2 - Cloudflare Tunnel:"
echo "  1. Install cloudflared"
echo "  2. In a new terminal, run: cloudflared tunnel --url http://localhost:8080"
echo "  3. Copy the HTTPS URL and open on your phone"
echo ""
echo "================================================"
echo ""
echo "Starting local server..."
echo ""

# Try Python 3 first, fall back to Python 2
if command -v python3 &> /dev/null; then
    python3 -m http.server 8080
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8080
else
    echo "❌ Error: Python not found!"
    echo "Please install Python or use another HTTP server."
    exit 1
fi

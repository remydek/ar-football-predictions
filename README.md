# ⚽ AR Football Predictions

A web-based AR football prediction app that lets users create and share match predictions in augmented reality. No app installation required - works directly in mobile browsers!

## ✨ Features

- **Markerless AR**: Point your camera at any surface to see the prediction
- **Interactive Predictions**: Adjust scores (0-9) for both teams with +/- controls
- **3D Visual Effects**: Logos with depth effect, floating animations, and smooth rotations
- **Screenshot Capture**: Save and share your predictions
- **Mobile-First**: Optimized for iOS Safari and Android Chrome
- **No Installation**: Access via URL, works instantly in browser

## 🎮 How It Works

1. Open the app URL on your phone (must be HTTPS)
2. Grant camera permissions
3. Point camera at any flat surface
4. Two team logos appear floating in AR with editable scores
5. Adjust scores using the +/- buttons
6. Tap "SAVE PREDICTION" to capture and download screenshot
7. Share your prediction!

## 🚀 Quick Start

### Prerequisites

- A smartphone with camera (iOS Safari 11+ or Android Chrome 81+)
- HTTPS hosting (required for camera access)

### Local Development & Testing

Since AR requires HTTPS, you need to use a tunneling service for local testing:

#### Option 1: Using ngrok (Recommended)

1. Install ngrok: https://ngrok.com/download

2. Start a local server:
```bash
# Python 3
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

# Node.js (if you have http-server installed)
npx http-server -p 8080
```

3. In another terminal, create HTTPS tunnel:
```bash
ngrok http 8080
```

4. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`) and open it on your phone

#### Option 2: Using Cloudflare Tunnel

1. Install cloudflared: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/

2. Start local server (same as above)

3. Create tunnel:
```bash
cloudflared tunnel --url http://localhost:8080
```

4. Use the provided HTTPS URL on your phone

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy from project folder:
```bash
cd /path/to/predictions
vercel
```

3. Follow the prompts, Vercel will provide an HTTPS URL
4. Access the URL on your phone

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Deploy:
```bash
cd /path/to/predictions
netlify deploy --prod
```

3. Follow prompts, Netlify will provide an HTTPS URL

### Deploy to GitHub Pages

1. Create a new GitHub repository
2. Push this code to the repo:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/ar-predictions.git
git push -u origin main
```

3. Go to repo Settings → Pages
4. Set source to "main" branch
5. Access via `https://yourusername.github.io/ar-predictions/`

## 🎨 Customization

### Adding Team Logos

1. Get team logos as PNG files with transparent backgrounds
2. Recommended size: 512x512px or larger
3. Save as:
   - `assets/barcelona.png`
   - `assets/realmadrid.png`

### Changing Teams

Edit `index.html` to change teams:

1. Update team names in the UI controls section (~line 340)
2. Update logo file paths in A-Frame scene (~line 220)
3. Update team colors:
   - Barcelona: `#A50044` (maroon)
   - Real Madrid: `#00529F` (blue)

### Adjusting AR Position

Edit line 174 in `index.html`:
```html
<a-entity id="ar-content" position="0 0 -1.5">
```
- First number: left/right (negative = left)
- Second number: up/down (positive = up)
- Third number: depth (negative = away from camera)

Default: 1.5 meters in front of camera

## 📱 Browser Compatibility

### iOS
- ✅ Safari 11+
- ✅ Chrome (uses Safari engine)
- ✅ Firefox (uses Safari engine)

### Android
- ✅ Chrome 81+
- ✅ Firefox 68+
- ⚠️  Samsung Internet (may require enabling WebXR)

## 🐛 Troubleshooting

### Camera Not Working
- Ensure you're using HTTPS (not HTTP)
- Check camera permissions in browser settings
- Try reloading the page
- On iOS: Settings → Safari → Camera → Allow

### AR Content Not Appearing
- Point camera at a well-lit surface
- Move phone slowly to help AR tracking
- Ensure logos are loaded (check browser console)

### Logos Not Loading
- Verify logo files exist in `assets/` folder
- Check file names match exactly: `barcelona.png` and `realmadrid.png`
- Ensure files are accessible (check network tab in dev tools)

### Screenshot Not Saving
- Some browsers block auto-downloads
- Check browser permissions
- Try tapping "Save Prediction" again

## 🛠️ Tech Stack

- **A-Frame 1.4.2**: WebVR/AR framework
- **AR.js**: Markerless AR for the web
- **Vanilla JavaScript**: No framework dependencies
- **Glassmorphic UI**: Modern, blur-based design

## 📄 File Structure

```
predictions/
├── index.html              # Main app file (self-contained)
├── assets/
│   ├── LOGO_INSTRUCTIONS.txt
│   ├── barcelona.png      # Barcelona logo (add this)
│   └── realmadrid.png     # Real Madrid logo (add this)
└── README.md              # This file
```

## 🎯 MVP Goals

This is a minimal viable product to validate viral potential:
- ✅ Simple, one-file architecture
- ✅ No build process required
- ✅ Works instantly on mobile
- ✅ Easy to share predictions
- ✅ Memorable AR experience

## 📝 Next Steps / Future Enhancements

- Add more team options
- League/tournament templates
- Social sharing integration
- Leaderboard system
- Match result verification
- Custom team builder

## 🤝 Contributing

Found a bug or have a feature idea? Open an issue or submit a PR!

## 📄 License

MIT License - feel free to use this for your own projects

---

**✨ Built by Augmento** - Making AR predictions viral!

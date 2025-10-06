# 🚀 Quick Start Guide

Get your AR Football Predictions app running in 3 steps!

## Step 1: Add Team Logos

Add these two PNG files to the `assets/` folder:
- `barcelona.png` - Barcelona FC logo (transparent background, 512x512px+)
- `realmadrid.png` - Real Madrid FC logo (transparent background, 512x512px+)

## Step 2: Choose Your Testing Method

### Option A: Deploy to Vercel (Easiest - Recommended)

```bash
# Install Vercel CLI (one time only)
npm i -g vercel

# Deploy (from project folder)
vercel

# Follow prompts, get instant HTTPS URL
# Open URL on your phone → Works instantly! 🎉
```

### Option B: Local Testing with ngrok

```bash
# Terminal 1: Start local server
./start.sh
# Or: python3 -m http.server 8080

# Terminal 2: Create HTTPS tunnel
ngrok http 8080
# Copy the HTTPS URL → Open on your phone
```

### Option C: Local Testing with Cloudflare

```bash
# Terminal 1: Start local server
./start.sh

# Terminal 2: Create tunnel
cloudflared tunnel --url http://localhost:8080
# Copy the HTTPS URL → Open on your phone
```

## Step 3: Test on Your Phone

1. Open the HTTPS URL on your mobile phone
2. Grant camera permissions when prompted
3. Point camera at any flat surface
4. See logos appear in AR! 🎯
5. Adjust scores with +/- buttons
6. Tap "SAVE PREDICTION" to capture screenshot

## ⚠️ Important Notes

- **HTTPS Required**: AR needs HTTPS for camera access (no way around this)
- **Supported Browsers**: iOS Safari 11+, Android Chrome 81+
- **Camera Permissions**: Must allow camera access when prompted
- **Well-Lit Area**: AR tracking works best in good lighting

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Camera not working | Check HTTPS URL, reload page, grant permissions |
| AR not appearing | Point at flat surface, ensure good lighting |
| Logos missing | Verify files in `assets/` named correctly |
| Can't save screenshot | Check browser download permissions |

## 📱 Deployment Options Compared

| Method | Setup Time | Best For |
|--------|------------|----------|
| **Vercel** | 2 min | Quick sharing, production use |
| **Netlify** | 2 min | Alternative to Vercel |
| **GitHub Pages** | 5 min | Free permanent hosting |
| **ngrok** | 1 min | Local testing only |

## 🎨 Quick Customization

Want to change teams? Edit `index.html`:

```javascript
// Line 343: Change team names
<div class="team-name">Your Team</div>

// Line 255: Change logo paths
src="assets/yourteam.png"

// Line 250: Change team colors
color="#YOUR_COLOR"
```

## 📊 File Checklist

- ✅ `index.html` - Main app (ready to use)
- ✅ `assets/barcelona.png` - Add this
- ✅ `assets/realmadrid.png` - Add this
- ✅ `start.sh` - Local server script
- ✅ `vercel.json` - Deployment config
- ✅ `README.md` - Full documentation

## 🎯 Next Steps

1. Add your team logos to `assets/`
2. Test locally or deploy to Vercel
3. Share the URL with friends
4. Watch predictions go viral! 🚀

Need help? Check the full [README.md](README.md) for detailed docs.

---

**Built with ❤️ using AR.js + A-Frame**

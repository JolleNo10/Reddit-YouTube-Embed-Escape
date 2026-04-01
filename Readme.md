# Reddit YouTube Embed Escape

Open embedded YouTube videos directly on YouTube from Reddit.

---

## Why this exists

Reddit sometimes embeds YouTube videos in a way that blocks playback with:

> “Sign in to confirm you’re not a bot”

When that happens, you often can’t easily access the original YouTube link.

This extension helps that by adding a **direct “YouTube” button** to posts with embedded videos.

---

## What it does

- Detects Reddit posts with YouTube embeds  
- Extracts the video ID from post metadata  
- Adds a **YouTube badge next to the post flair**  
- Works on:
  - Front page / subreddit feeds  
  - Individual post pages  
- Handles dynamically loaded posts (infinite scroll)

---

## How it works

1. Scans for `shreddit-post` elements  
2. Reads the `content-href` attribute  
3. Extracts the YouTube video ID  
4. Injects a styled link into the flair section  

No API calls. No tracking. No external dependencies.

---

## Installation (Chrome)

### Option 1 — Load unpacked (development)

1. Clone this repo:
   ```bash
   git clone https://github.com/your-username/Reddit-YouTube-Embed-Escape.git
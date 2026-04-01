Use this exact block. I removed the nested fenced code blocks inside it, because that is what broke it.

```md
# Reddit YouTube Embed Escape

Open embedded YouTube videos directly on YouTube from Reddit.

---

## Why this exists

Reddit sometimes embeds YouTube videos in a way that blocks playback with:

> “Sign in to confirm you’re not a bot”

When that happens, you often can’t easily access the original YouTube link.

This extension fixes that by adding a **direct “YouTube” button** to posts with embedded videos.

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

       git clone https://github.com/your-username/Reddit-YouTube-Embed-Escape.git

2. Open Chrome and go to:

       chrome://extensions/

3. Enable **Developer mode** (top right)

4. Click **Load unpacked**

5. Select the project folder

### Option 2 — Chrome Web Store

Not published yet.

---

## Usage

- Open Reddit
- Find a post with an embedded YouTube video
- Look at the flair area
- Click the **“YouTube”** badge

You’ll be taken directly to the video on YouTube.

---

## Limitations

- Only supports YouTube links (`youtu.be`, `youtube.com`)
- Depends on Reddit’s current DOM structure (`shreddit-post`, `content-href`)
- May break if Reddit changes their frontend

---

## Development

Main file:

    content.js

Responsibilities:
- Detect posts
- Extract video IDs
- Inject UI

---

## Debugging

Debug logs are disabled by default.

To enable them, set:

    const DEBUG = true;

inside `content.js`.

---

## Roadmap / Ideas

- Support YouTube Shorts
- Support other platforms (Vimeo, etc.)
- Add “Copy link” button
- Settings toggle (enable/disable per site)

---

## License

MIT
```

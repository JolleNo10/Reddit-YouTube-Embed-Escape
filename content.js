(() => {
  const SEEN_ATTR = "data-ryee-seen";
  const LINK_CLASS = "ryee-open-link";
  const DEBUG = false;

  function debugLog(...args) {
    if (DEBUG) {
      console.log("[Reddit-YouTube-Embed-Escape]", ...args);
    }
  }

  function isSinglePostPage() {
    return /\/comments\/[^/]+/.test(window.location.pathname);
  }

  function extractYouTubeIdFromUrl(url) {
    if (!url) return null;

    const match = String(url).match(
      /(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube(?:-nocookie)?\.com\/embed\/)([a-zA-Z0-9_-]{11})/
    );

    return match ? match[1] : null;
  }

  function createYouTubeLink(videoId, singlePost) {
    const link = document.createElement("a");
    link.href = `https://www.youtube.com/watch?v=${videoId}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = `no-decoration ${LINK_CLASS}`;
    link.setAttribute("aria-label", "Open on YouTube");
    link.setAttribute("title", "Open on YouTube");

    link.style.display = "inline-flex";
    link.style.alignItems = "center";
    link.style.flex = "0 0 auto";
    link.style.position = "relative";
    link.style.zIndex = "20";
    link.style.pointerEvents = "auto";

    const span = document.createElement("span");

    if (singlePost) {
      span.className =
        "bg-tone-4 inline-block truncate max-w-full text-12 font-normal align-text-bottom box-border px-[6px] rounded-5 leading-4 text-global-black";
    } else {
      span.className =
        "bg-tone-4 inline-block truncate max-w-full text-12 font-normal align-text-bottom box-border px-[6px] rounded-5 leading-4 text-global-black relative top-[-0.25rem] xs:top-[-2px] my-2xs xs:mb-sm py-0";
    }

    span.style.backgroundColor = "#ff0000";
    span.style.color = "#ffffff";

    const div = document.createElement("div");
    div.className =
      "flair-content [&_.flair-image]:align-bottom max-w-full overflow-hidden whitespace-nowrap text-ellipsis";
    div.textContent = "YouTube";

    span.appendChild(div);
    link.appendChild(span);

    return link;
  }

  function injectLinkIntoFlair(postEl, videoId) {
    const flair = postEl.querySelector('shreddit-post-flair[slot="post-flair"]');
    if (!flair) {
      debugLog("flair not found");
      return false;
    }

    if (flair.querySelector(`.${LINK_CLASS}`)) {
      return true;
    }

    const existingBadgeLink = flair.querySelector("a");
    if (!existingBadgeLink) {
      debugLog("flair anchor not found");
      return false;
    }

    const singlePost = isSinglePostPage();

    flair.style.display = "inline-flex";
    flair.style.alignItems = "center";
    flair.style.gap = "6px";
    flair.style.verticalAlign = "middle";

    existingBadgeLink.style.display = "inline-flex";
    existingBadgeLink.style.alignItems = "center";
    existingBadgeLink.style.flex = "0 0 auto";

    const link = createYouTubeLink(videoId, singlePost);
    existingBadgeLink.insertAdjacentElement("afterend", link);

    return true;
  }

  function processShredditPost(postEl) {
    if (!(postEl instanceof Element)) return;
    if (postEl.tagName !== "SHREDDIT-POST") return;
    if (postEl.getAttribute(SEEN_ATTR) === "1") return;

    const contentHref = postEl.getAttribute("content-href") || "";
    const videoId = extractYouTubeIdFromUrl(contentHref);

    postEl.setAttribute(SEEN_ATTR, "1");

    if (!videoId) return;

    const injected = injectLinkIntoFlair(postEl, videoId);
    if (injected) {
      debugLog("injected link", videoId);
    }
  }

  function scanExistingPosts() {
    const posts = document.querySelectorAll("shreddit-post");
    for (const post of posts) {
      processShredditPost(post);
    }
  }

  function handleAddedNode(node) {
    if (!(node instanceof Element)) return;

    if (node.tagName === "SHREDDIT-POST") {
      processShredditPost(node);
    }

    const nestedPosts = node.querySelectorAll?.("shreddit-post");
    if (nestedPosts?.length) {
      for (const post of nestedPosts) {
        processShredditPost(post);
      }
    }
  }

  scanExistingPosts();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        handleAddedNode(node);
      }
    }
  });

  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  } else {
    debugLog("document.body not available");
  }
})();
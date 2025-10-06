/* theme: https://github.com/jawadnassar/jekyll-vim-theme */
// Vim-style keyboard navigation for scrolling & toggling sections + search focus
document.addEventListener("keydown", (e) => {
  if (
    e.target.tagName === "INPUT" ||
    e.target.tagName === "TEXTAREA" ||
    e.target.isContentEditable
  ) {
    return; // ignore if typing in inputs (including search)
  }

  const summaries = Array.from(document.querySelectorAll("summary"));
  const focusedElement = document.activeElement;

  // Scroll commands
  if (e.key === "j") window.scrollBy(0, 60);
  if (e.key === "k") window.scrollBy(0, -60);
  if (e.key === "g" && !e.shiftKey) window.scrollTo({ top: 0 });
  if (e.key === "G") window.scrollTo({ top: document.body.scrollHeight });

  // Toggle focused section open/close (o)
  if (e.key === "o") {
    if (focusedElement.tagName === "SUMMARY") {
      e.preventDefault();
      focusedElement.parentElement.open = !focusedElement.parentElement.open;
    }
  }

  // Open all sections (O)
  if (e.key === "O") {
    e.preventDefault();
    summaries.forEach((summary) => {
      summary.parentElement.open = true;
      const posts = summary.parentElement.querySelectorAll(".post");
      posts.forEach((post) => {
        post.style.display = ""; // Reset hidden posts
      });
    });
  }

  // Close all sections (C)
  if (e.key === "C") {
    e.preventDefault();
    summaries.forEach((summary) => {
      summary.parentElement.open = false;
    });
  }

  // Focus search input (/) key
  if (e.key === "/") {
    e.preventDefault();
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  }
});

// Keyboard toggle for <details> with Enter or Space
document.querySelectorAll("summary").forEach((summary) => {
  summary.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const details = summary.parentElement;
      details.open = !details.open;
    }
  });
});

// Clear and blur search input on Esc
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    e.preventDefault();
    searchInput.value = "";
    searchInput.blur();

    document.querySelectorAll(".post").forEach(p => p.style.display = "block");
    document.querySelectorAll("details").forEach(d => d.open = true);
  }
});

// search filter of posts by text
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const detailsList = document.querySelectorAll("details");

  detailsList.forEach((details) => {
    const posts = details.querySelectorAll(".post");
    let anyVisible = false;

    posts.forEach((post) => {
      const text = post.textContent.toLowerCase();
      const match = text.includes(query);
      post.style.display = match ? "" : "none";
      if (match) anyVisible = true;
    });

    // Open sections that have matches
    details.open = query.length > 0 ? anyVisible : details.open;
  });

  if (query.length === 0) {
    // Restore all posts and leave details sections as they are
    document.querySelectorAll(".post").forEach((post) => {
      post.style.display = "";
    });
  }
});

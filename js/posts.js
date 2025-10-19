// simplified Vim-style keyboard navigation for scrolling & toggling blog posts/pages
const home = "/";
document.addEventListener("keydown", e => {
    if (["INPUT","TEXTAREA"].includes(e.target.tagName) || e.target.isContentEditable) return;
    switch(e.key){
    case "j": window.scrollBy(0,60); break;
    case "k": window.scrollBy(0,-60); break;
    case "g": if(!e.shiftKey) window.scrollTo(0,0); break;
    case "G": window.scrollTo(0,document.body.scrollHeight); break;
    case "b": window.location = home; break;
  }
});

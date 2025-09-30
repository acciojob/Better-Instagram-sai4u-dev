//your code here
// script.js
document.addEventListener('DOMContentLoaded', () => {
  const tiles = Array.from(document.querySelectorAll('.image'));
  let dragSrcId = null;

  tiles.forEach(tile => {
    // Drag start
    tile.addEventListener('dragstart', (e) => {
      dragSrcId = tile.id;
      e.dataTransfer.setData('text/plain', tile.id);
      e.dataTransfer.effectAllowed = 'move';
      tile.classList.add('dragging');
    });

    // Drag end
    tile.addEventListener('dragend', (e) => {
      tile.classList.remove('dragging');
      tiles.forEach(t => t.classList.remove('over'));
      dragSrcId = null;
    });

    // When a draggable is over another tile we must preventDefault to allow drop
    tile.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      return false;
    });

    // Provide visual feedback when entering a potential drop target
    tile.addEventListener('dragenter', (e) => {
      if (tile.id !== dragSrcId) tile.classList.add('selected');
    });

    tile.addEventListener('dragleave', (e) => {
      tile.classList.remove('selected');
    });

    // On drop: swap the images (backgrounds) and accessible labels/text
    tile.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      tile.classList.remove('over');

      const srcId = e.dataTransfer.getData('text/plain');
      if (!srcId) return;
      if (srcId === tile.id) return; // dropped on itself, nothing to do

      const src = document.getElementById(srcId);
      const dest = tile;

      // Get computed background images
      const srcBg = window.getComputedStyle(src).backgroundImage;
      const destBg = window.getComputedStyle(dest).backgroundImage;

      // Swap inline styles so visuals update regardless of original CSS source
      src.style.backgroundImage = destBg;
      dest.style.backgroundImage = srcBg;

      // Swap visible text content (labels) if any
      const srcText = src.textContent;
      const destText = dest.textContent;
      src.textContent = destText;
      dest.textContent = srcText;

      // Swap titles and aria-labels for accessibility
      const srcTitle = src.getAttribute('title');
      const destTitle = dest.getAttribute('title');
      if (srcTitle !== null || destTitle !== null) {
        src.setAttribute('title', destTitle || '');
        dest.setAttribute('title', srcTitle || '');
      }

      const srcAria = src.getAttribute('aria-label');
      const destAria = dest.getAttribute('aria-label');
      if (srcAria !== null || destAria !== null) {
        src.setAttribute('aria-label', destAria || '');
        dest.setAttribute('aria-label', srcAria || '');
      }

    });
  });
});

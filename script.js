//your code here
document.addEventListener('DOMContentLoaded', () => {
  const tiles = document.querySelectorAll('.image');
  let dragged = null;

  tiles.forEach(tile => {
    tile.addEventListener('dragstart', () => {
      dragged = tile;
      tile.classList.add('dragging');
    });

    tile.addEventListener('dragend', () => {
      dragged = null;
      tile.classList.remove('dragging');
    });

    tile.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    tile.addEventListener('drop', (e) => {
      e.preventDefault();
      if (dragged && dragged !== tile) {
        // Swap <img> elements
        const draggedImg = dragged.querySelector('img');
        const targetImg = tile.querySelector('img');

        const tempSrc = draggedImg.src;
        const tempAlt = draggedImg.alt;

        draggedImg.src = targetImg.src;
        draggedImg.alt = targetImg.alt;

        targetImg.src = tempSrc;
        targetImg.alt = tempAlt;
      }
    });
  });
});

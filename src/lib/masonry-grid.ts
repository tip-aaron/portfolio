import imagesLoaded from "imagesloaded";
import Masonry from "masonry-layout";

let masonry: Masonry | undefined;

function initMasonry() {
  const grid = document.getElementById("grid");

  if (!grid) {
    // This means that we are not on the page
    // where the masonry grid is present,
    // since we are using the View
    // Transitions API. Thus, we
    // are rerunning this function on
    // every page load. Refer to the
    // event listener of "asto:page-load"
    // below
    return;
  }

  masonry = new Masonry(grid, {
    itemSelector: ".grid-item",
    columnWidth: ".grid-item",
    fitWidth: true,
    gutter: 25,
    stagger: 0,
    initLayout: false,
    transitionDuration: "250ms",
  });

  if (masonry) {
    masonry.once?.("layoutComplete", (items: any[]) => {
      items.forEach((item) => {
        item.element.setAttribute("data-finished", "true");
      });
    });

    if (masonry) {
      imagesLoaded(grid, () => {
        masonry?.layout?.();
      });
    }
  }
}

document.addEventListener("astro:after-swap", () => {
  if (masonry) {
    masonry.destroy?.();
    masonry = undefined;
  }
});

document.addEventListener("astro:page-load", initMasonry);

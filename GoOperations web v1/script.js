// Detect scroll direction and show/hide floating pill nav
let lastScroll = 0;

const header = document.querySelector(".top-header");
const pillNav = document.getElementById("floatingNav");

window.addEventListener("scroll", () => {
  const current = window.pageYOffset;
  const headerTop = header.getBoundingClientRect().top;

  // Scroll Down → hide top header, show pill nav immediately
  if (current > lastScroll && current > 10) {
    header.style.transform = "translateY(-100%)";
    pillNav.style.top = "20px";
  }

  // Scroll Up → normally we'd hide pill nav, but keep it visible
  // until the header reaches the top of the viewport.
  else if (current < lastScroll) {
    if (headerTop >= 0 || current < 50) {
      // Header is at the top (or we're very near top) → show header, hide pill nav
      header.style.transform = "translateY(0)";
      pillNav.style.top = "-80px";
    } else {
      // Header not yet reached top → keep pill nav visible
      header.style.transform = "translateY(-100%)";
      pillNav.style.top = "20px";
    }
  }

  // At very top → reset nav (ensure pill nav hidden when at top)
  if (current < 50) {
    header.style.transform = "translateY(0)";
    pillNav.style.top = "-80px";
  }

  lastScroll = current;
});

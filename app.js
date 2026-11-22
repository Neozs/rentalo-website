const RENTALO_WHATSAPP_NUMBER = "61426760173";

const page = document.body.dataset.page;
const messages = {
  cars: "Hi Rentalo, I’m interested in car hire. Could you tell me more?",
  ebikes: "Hi Rentalo, I’m interested in e-bike hire. Could you tell me more?",
};

const message = messages[page] ?? messages.cars;
const whatsappUrl = `https://wa.me/${RENTALO_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  link.href = whatsappUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.querySelectorAll(".vehicle-stage").forEach((carousel) => {
  const track = carousel.querySelector("[data-carousel-track]");
  const viewport = carousel.querySelector("[data-carousel-viewport]");
  const label = carousel.querySelector("[data-carousel-label]");
  const previous = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  const slides = Array.from(track.children);

  if (slides.length < 2) return;

  const cloneSlide = (slide) => {
    const clone = slide.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.inert = true;
    clone.querySelector("img")?.setAttribute("alt", "");
    return clone;
  };

  track.prepend(cloneSlide(slides[slides.length - 1]));
  track.append(cloneSlide(slides[0]));

  let trackIndex = 1;
  let activeIndex = 0;
  let isAnimating = false;
  let pointerStart = null;

  const placeTrack = () => {
    track.style.transform = `translateX(-${trackIndex * 100}%)`;
  };

  const syncActiveSlide = () => {
    slides.forEach((slide, index) => {
      slide.setAttribute("aria-hidden", String(index !== activeIndex));
    });
    label.textContent = slides[activeIndex].dataset.label;
    const primaryInquiry = document.querySelector("[data-primary-inquiry]");
    if (primaryInquiry) {
      const contactMessage = `Hi Juan, I’m interested in ${slides[activeIndex].dataset.inquiryName}. Could you confirm the current price and availability?`;
      primaryInquiry.href = `https://wa.me/${RENTALO_WHATSAPP_NUMBER}?text=${encodeURIComponent(contactMessage)}`;
    }
  };

  const setButtonsDisabled = (disabled) => {
    previous.disabled = disabled;
    next.disabled = disabled;
  };

  const move = (direction) => {
    if (isAnimating) return;
    isAnimating = true;
    setButtonsDisabled(true);
    trackIndex += direction;
    activeIndex = (activeIndex + direction + slides.length) % slides.length;
    syncActiveSlide();
    placeTrack();
  };

  trackIndex = 1;
  track.style.transform = "translateX(-100%)";
  track.classList.add("is-animated");
  syncActiveSlide();

  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));

  track.addEventListener("transitionend", (event) => {
    if (event.target !== track || event.propertyName !== "transform") return;

    if (trackIndex === 0) {
      trackIndex = slides.length;
    } else if (trackIndex === slides.length + 1) {
      trackIndex = 1;
    }

    track.classList.remove("is-animated");
    placeTrack();
    track.getBoundingClientRect();
    track.classList.add("is-animated");
    isAnimating = false;
    setButtonsDisabled(false);
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  });

  viewport.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener("pointerup", (event) => {
    if (!pointerStart || pointerStart.id !== event.pointerId) return;
    const deltaX = event.clientX - pointerStart.x;
    const deltaY = event.clientY - pointerStart.y;
    pointerStart = null;
    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    move(deltaX < 0 ? 1 : -1);
  });

  viewport.addEventListener("pointercancel", () => {
    pointerStart = null;
  });
});

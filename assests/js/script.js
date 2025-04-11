document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Toggle Hamburger Menu
  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  // Ensure Only One Dropdown Opens at a Time
  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");

    toggle.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent link from navigating

      // Close other dropdowns before opening this one
      dropdowns.forEach((item) => {
        if (item !== dropdown) item.classList.remove("active");
      });

      // Toggle the clicked dropdown
      dropdown.classList.toggle("active");
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (event) {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("active");
      }
    });
  });

  // Close Hamburger Menu When Clicking Outside
  document.addEventListener("click", function (event) {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
      navLinks.classList.remove("active");
    }
  });

  // Close menus using Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      navLinks.classList.remove("active");
      dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".process-box");

  boxes.forEach((box) => {
    box.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
      this.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
    });

    box.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.2)";
    });
  });
});
// Initialize Swiper Carousel
var swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay: { delay: 3000, disableOnInteraction: false },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  pagination: { el: ".swiper-pagination", clickable: true },
});
// Stats Counter Animation
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");
  let started = false;

  const startCount = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const increment = target / 200;

      const updateCount = () => {
        const current = +counter.innerText;

        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + "+";
        }
      };

      updateCount();
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          startCount();
          started = true;
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(document.querySelector("#stats"));
});
const cards = document.querySelectorAll(".testimonial-card");
const dotsContainer = document.querySelector(".testimonial-dots");

let current = 0;

// Create Dots
cards.forEach((_, index) => {
  const dot = document.createElement("span");
  if (index === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
});

// Update Slider
function showTestimonial(index) {
  cards.forEach((card) => card.classList.remove("active"));
  dotsContainer
    .querySelectorAll("span")
    .forEach((dot) => dot.classList.remove("active"));
  cards[index].classList.add("active");
  dotsContainer.querySelectorAll("span")[index].classList.add("active");
}

// Auto Slide
setInterval(() => {
  current = (current + 1) % cards.length;
  showTestimonial(current);
}, 4000);

// Clickable Dots
dotsContainer.querySelectorAll("span").forEach((dot, idx) => {
  dot.addEventListener("click", () => {
    current = idx;
    showTestimonial(current);
  });
});

//PARTNER-LOGO-SLIDDER
const track = document.getElementById("sliderTrack");
const dotContainer = document.getElementById("dotsContainer");
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

let currentIndex = 0;

// Create dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("button");
  dot.addEventListener("click", () => moveToSlide(i));
  dotContainer.appendChild(dot);
}
updateDots();

function updateDots() {
  const dots = dotContainer.querySelectorAll("button");
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

function moveToSlide(index) {
  currentIndex = index;
  track.style.transform = `translateX(-${100 * index}%)`;
  updateDots();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  moveToSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  moveToSlide(currentIndex);
}

// Auto slide every 5 seconds
setInterval(() => {
  nextSlide();
}, 5000);

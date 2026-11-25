// Grab the elements we need
const cards = document.querySelectorAll(".card");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dotsBox = document.getElementById("dots");

let current = 0;        // index of the card being shown
let isSliding = false;  // stops double-clicks during an animation

// Make one dot per card
cards.forEach(function () {
  const dot = document.createElement("span");
  dot.className = "dot";
  dotsBox.appendChild(dot);
});
const dots = document.querySelectorAll(".dot");

function updateDots() {
  dots.forEach(function (dot, i) {
    dot.classList.toggle("active", i === current);
  });
}

// Flip a card when it is clicked
cards.forEach(function (card) {
  card.addEventListener("click", function () {
    card.classList.toggle("flipped");
  });
});

// Move to another card. direction = 1 (next) or -1 (previous)
function slide(direction) {
  if (isSliding) return;
  isSliding = true;

  const oldCard = cards[current];
  current = (current + direction + cards.length) % cards.length;
  const newCard = cards[current];

  // Pick the animation names based on direction
  const outClass = direction === 1 ? "slide-out-left" : "slide-out-right";
  const inClass = direction === 1 ? "slide-in-right" : "slide-in-left";

  oldCard.classList.remove("active");
  oldCard.classList.add(outClass);

  newCard.classList.remove("flipped"); // always show the front first
  newCard.classList.add("active", inClass);

  updateDots();

  // Clean up once the animation is done
  setTimeout(function () {
    oldCard.classList.remove(outClass, "flipped");
    newCard.classList.remove(inClass);
    isSliding = false;
  }, 500);
}

prevBtn.addEventListener("click", function () { slide(-1); });
nextBtn.addEventListener("click", function () { slide(1); });

// Keyboard arrows work too
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") slide(-1);
  if (e.key === "ArrowRight") slide(1);
});

updateDots();

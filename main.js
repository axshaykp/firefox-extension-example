"use strict";

let open = false;
let slideshowInterval;

const gallery = document.querySelector(".gallery");
const modal = document.querySelector(".modal-wrapper");
const modalClose = document.querySelector(".close-modal");
const fileInput = document.getElementById("fileInput");
const modalImg = document.getElementById("modalImg");
const play = document.getElementById("play");

fileInput.addEventListener("change", handleFileSelection);

function handleFileSelection() {
  try {
    const files = fileInput.files;
    renderImages(files);
  } catch (error) {
    console.error("Error selecting files:", error);
  }
}

function renderImages(files) {
  gallery.innerHTML = "";

  for (const file of files) {
    const isSupportedFileType = /\.(jpg|jpeg|png|svg)$/i.test(file.name);
    if (isSupportedFileType) {
      const img = document.createElement("img");
      const url = URL.createObjectURL(file);
      img.classList.add("gallery-img");
      img.style.cursor = "pointer";
      img.src = url;
      img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = url;
        clearInterval(slideshowInterval); // Clear any ongoing slideshow when an image is clicked
      });
      gallery.appendChild(img);
    }
  }
}

modalClose.addEventListener("click", () => {
  modal.style.display = "";
  modalImg.src = "";
  clearInterval(slideshowInterval); // Stop the slideshow when the modal is closed
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    const images = document.querySelectorAll(".gallery-img");

    for (var i = 0; i < images.length; i++) {
      if (modalImg?.src === images[i]?.src) {
        let newIndex = event.key === "ArrowLeft" ? i - 1 : i + 1;

        newIndex =
          newIndex < 0
            ? images.length - 1
            : newIndex >= images.length
            ? 0
            : newIndex;

        modalImg.src = images[newIndex]?.src;
        clearInterval(slideshowInterval); // Stop the slideshow when an arrow key is pressed
        break;
      }
    }
  }
});

play.addEventListener("click", () => {
  const images = document.querySelectorAll(".gallery-img");
  let currentIndex = 0;

  modal.style.display = "flex"; // Show the modal on play click

  clearInterval(slideshowInterval); // Clear any ongoing slideshow

  // Start the slideshow with a 2-second interval
  slideshowInterval = setInterval(() => {
    modalImg.src = images[currentIndex]?.src;
    currentIndex = (currentIndex + 1) % images.length; // Loop back to the first image after reaching the last one
  }, 2000);
});

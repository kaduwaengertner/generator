let selectedColor = '#CCCCCC'; // Initial color
let username = ''; // Initial username
let bannerGenerated = false; // Flag to track if the banner has been generated
let selectedImage = null; // Variable to store the selected image

function generateBanner() {
  // Get the updated username
  username = document.getElementById('username').value;

  // Call the banner generation function
  updateBanner();

  // Set the flag to indicate that the banner has been generated
  bannerGenerated = true;

  // Show the download button
  document.getElementById('downloadButton').style.display = 'block';

  // Display username in the console
  console.log(`Username: ${username}`);
}

function handleImageUpload() {
  const imageInput = document.getElementById('imageInput');
  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      // Set the selected image source
      selectedImage = e.target.result;

      // Update the banner with the selected image
      updateBanner();
    };

    // Read the selected image as a data URL
    reader.readAsDataURL(file);
  }
}

function updateBanner() {
  const bannerPreview = document.getElementById('bannerPreview');

  // Update banner preview with the selected color, live username, and uploaded image
  bannerPreview.style.backgroundColor = selectedColor;
  bannerPreview.innerHTML = username;

  // Check if an image is selected
  if (selectedImage) {
    bannerPreview.style.backgroundImage = `url(${selectedImage})`;
  } else {
    bannerPreview.style.backgroundImage = 'none';
  }

  // Create or update the canvas in the generatedBannerContainer
  updateCanvas();
}

function updateCanvas() {
  const generatedBannerContainer = document.getElementById('generatedBannerContainer');

  // Check if canvas already exists
  let canvas = generatedBannerContainer.querySelector('canvas');

  if (canvas) {
    // If canvas exists, remove it to recreate
    generatedBannerContainer.removeChild(canvas);
  }

  // Create a new canvas
  canvas = document.createElement('canvas');
  canvas.width = 300; // Set your desired width
  canvas.height = 150; // Set your desired height
  generatedBannerContainer.appendChild(canvas);

  const context = canvas.getContext('2d');
  context.fillStyle = selectedColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the selected image
  if (selectedImage) {
    const image = new Image();
    image.src = selectedImage;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  }

  // Draw the username text on top of the image
  context.fillStyle = '#ffffff'; // Set the text color
  context.font = '20px Arial'; // Set the font size and type
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(username, canvas.width / 2, canvas.height / 2);
}

function updatePreview() {
  // Get the current username input value
  username = document.getElementById('username').value;

  // Update selectedColor with the color picker value
  selectedColor = document.getElementById('backgroundColor').value;

  // Update banner on color change only if the banner has been generated
  if (bannerGenerated) {
    updateBanner();
  }
}

function downloadImage() {
  const generatedBannerContainer = document.getElementById('generatedBannerContainer');
  const canvas = generatedBannerContainer.querySelector('canvas');

  if (canvas) {
    const url = canvas.toDataURL(); // Convert canvas content to data URL
    const link = document.createElement('a');
    link.href = url;
    link.download = 'generated-banner.png'; // Set the desired file name
    link.click();
  } else {
    console.error('Canvas not found. Banner may not have been generated.');
  }
}

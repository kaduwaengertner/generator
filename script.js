let selectedColor = '#CCCCCC'; // Initial color
let username = ''; // Initial username
let bannerGenerated = false; // Flag to track if the banner has been generated

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

function updateBanner() {
  const bannerPreview = document.getElementById('bannerPreview');

  // Update banner preview with the selected color and live username
  bannerPreview.style.backgroundColor = selectedColor;
  bannerPreview.innerHTML = username;

  // Create or update the canvas in the generatedBannerContainer
  updateCanvas();
}

function updateCanvas() {
  const generatedBannerContainer = document.getElementById('generatedBannerContainer');

  // Check if banner has been generated
  if (!bannerGenerated) {
    return;
  }

  // Check if canvas already exists
  let canvas = generatedBannerContainer.querySelector('canvas');

  if (!canvas) {
    // If not, create a new canvas
    canvas = document.createElement('canvas');
    canvas.width = 300; // Set your desired width
    canvas.height = 150; // Set your desired height
    generatedBannerContainer.appendChild(canvas);
  }

  const context = canvas.getContext('2d');
  context.fillStyle = selectedColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the username text
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

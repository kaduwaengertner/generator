let selectedColor = '#CCCCCC'; // Initial color
let username = ''; // Initial username

async function generateBanner() {
  // Get the updated username
  username = document.getElementById('username').value;

  // Update banner preview with the selected color and live username
  const bannerPreview = document.getElementById('bannerPreview');
  bannerPreview.style.backgroundColor = selectedColor;
  bannerPreview.innerHTML = username;

  // Create or update the canvas in the generatedBannerContainer
  updateCanvas();

  // Show the download button
  document.getElementById('downloadButton').style.display = 'block';

  // Display username in the console
  console.log(`Username: ${username}`);
}

function updateCanvas() {
  const generatedBannerContainer = document.getElementById('generatedBannerContainer');

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

  // Update banner preview with the selected color and live username
  document.getElementById('bannerPreview').style.backgroundColor = selectedColor;
  document.getElementById('bannerPreview').innerHTML = username;

  // Update the canvas in the generatedBannerContainer
  updateCanvas();
}

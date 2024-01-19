async function generateBanner() {
  const username = document.getElementById('username').value;
  const bannerPreview = document.getElementById('bannerPreview');
  const generatedBannerContainer = document.getElementById('generatedBannerContainer');
  const downloadButton = document.getElementById('downloadButton');

  // Call the serverless function
  const response = await fetch('/api/generateBanner', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });

  if (response.ok) {
    const result = await response.json();
    const { color } = result;

    // Update banner preview with the new color
    bannerPreview.style.backgroundColor = color;

    // Create a canvas and draw the banner
    const canvas = document.createElement('canvas');
    canvas.width = 300; // Set your desired width
    canvas.height = 150; // Set your desired height
    const context = canvas.getContext('2d');
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the username text
    context.fillStyle = '#ffffff'; // Set the text color
    context.font = '20px Arial'; // Set the font size and type
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(username, canvas.width / 2, canvas.height / 2);

    // Display the canvas in the generatedBannerContainer
    generatedBannerContainer.innerHTML = '';
    generatedBannerContainer.appendChild(canvas);

    // Show the download button
    downloadButton.style.display = 'block';

    // Display username in the console
    console.log(`Username: ${result.username}`);
  } else {
    console.error('Failed to generate banner');
  }
}

function downloadImage() {
  const canvas = document.querySelector('canvas');
  const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'generated_banner.png';
  link.click();
}

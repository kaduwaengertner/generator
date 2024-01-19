async function generateBanner() {
    const username = document.getElementById('username').value;
    const bannerPreview = document.getElementById('bannerPreview');
  
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
  
      // Display username in the console
      console.log(`Username: ${result.username}`);
    } else {
      console.error('Failed to generate banner');
    }
  }
  
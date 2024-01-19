module.exports = (req, res) => {
    const { username } = req.body;
  
    // Generate a random color (for simplicity)
    const randomColor = getRandomColor();
  
    // You can perform more complex image generation here
  
    res.status(200).json({
      username,
      color: randomColor,
    });
  };
  
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const bubbles = [];
const noiseStrength = 30;

function createBubbles() {
  for (let i = 0; i < 40; i++) {
    bubbles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 4 + Math.random() * 10,
      dx: Math.random() * 0.6 - 0.3,
      dy: Math.random() * -1 - 0.2,
      alpha: Math.random() * 0.5 + 0.3
    });
  }
}

function drawGradient() {
  const gradient = ctx.createRadialGradient(width/2, height/2, 100, width/2, height/2, width);
  gradient.addColorStop(0, '#ffe6f0'); // light pink center
  gradient.addColorStop(1, '#ffc0cb'); // pink outer
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawBubbles() {
  bubbles.forEach(b => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha})`;
    ctx.fill();

    b.x += b.dx;
    b.y += b.dy;

    if (b.y + b.r < 0) {
      b.y = height + b.r;
      b.x = Math.random() * width;
    }
  });
}

function addNoise() {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const rand = (Math.random() - 0.5) * noiseStrength;
    data[i] += rand;     // Red
    data[i + 1] += rand; // Green
    data[i + 2] += rand; // Blue
  }
  ctx.putImageData(imageData, 0, 0);
}

function animate() {
  drawGradient();
  drawBubbles();
  addNoise();
  requestAnimationFrame(animate);
}

createBubbles();
animate();

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

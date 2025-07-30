const canvas = document.getElementById("rippleCanvas");
const ctx = canvas.getContext("2d");
resizeCanvas();

let ripples = [];

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  ripples.push({
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    radius: 0,
    life: 0,
  });
});

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawGradient() {
  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    100,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width
  );
  gradient.addColorStop(0, "#ffe6f0");
  gradient.addColorStop(1, "#ffc6e0");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawNoise() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imageData.data.length; i += 4 * 1000) {
    const rand = Math.random() * 40;
    imageData.data[i] += rand;
    imageData.data[i + 1] += rand;
    imageData.data[i + 2] += rand;
  }
  ctx.putImageData(imageData, 0, 0);
}

function drawRipples() {
  for (let ripple of ripples) {
    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - ripple.life / 100})`;
    ctx.lineWidth = 2;
    ctx.stroke();
    ripple.radius += 2;
    ripple.life += 1;
  }
  ripples = ripples.filter((r) => r.life < 100);
}

function animate() {
  drawGradient();
  drawRipples();
  drawNoise();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", resizeCanvas);

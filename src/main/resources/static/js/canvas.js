console.log("canvas.js is working");

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width, height;
const stars = [];
const glowStars = [];
const numNeonStars = 200;
const numGlowStars = 100;
const text = "Guess the Baby's Gender";
const starImages = [];
const glowImage = new Image();

glowImage.src = '/img/glow-star.png';

for (let i = 1; i <= 5; i++) {
    const img = new Image();
    img.src = `/img/neonstar${i}.png`;
    starImages.push(img);
}

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    drawText();
}

function createNeonStar() {
    const textWidth = ctx.measureText(text).width;
    const textHeight = 70;
    const textXStart = (width - textWidth) / 2;
    const textYStart = height * 0.15 - (textHeight / 2);

    return {
        x: textXStart + Math.random() * textWidth,
        y: textYStart + Math.random() * textHeight,
        size: Math.random() * 10 + 5,
        opacity: Math.random() + 0.5,
        image: starImages[Math.floor(Math.random() * starImages.length)],
        velocityY: -2 - Math.random() * 2
    };
}

function drawNeonStar(star) {
    if (star.image) {
        ctx.globalAlpha = star.opacity;
        ctx.drawImage(star.image, star.x - star.size / 2, star.y - star.size / 2, star.size, star.size);
        ctx.globalAlpha = 1;
    } else {
        console.log("Error: Star image not loaded!");
    }
}

function createGlowStar() {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        opacity: Math.random()
    };
}

function drawGlowStar(star) {
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function drawText() {
    ctx.font = `70px "Luckiest Guy"`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(text, width / 2, height * 0.15);
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach(star => {
        star.y += star.velocityY;
        if (star.y < -star.size) {
            const textWidth = ctx.measureText(text).width;
            const textHeight = 70;
            const textXStart = (width - textWidth) / 2;
            const textYStart = height * 0.15 - (textHeight / 2);
            star.y = textYStart + Math.random() * textHeight;
            star.x = textXStart + Math.random() * textWidth;
            star.opacity = Math.random() + 0.5;
        }
        drawNeonStar(star);
    });

    glowStars.forEach(star => {
        star.y += 0.5;
        if (star.y > height) {
            star.y = -star.size;
            star.x = Math.random() * width;
            star.opacity = Math.random();
        }
        drawGlowStar(star);
    });
    drawText();
    requestAnimationFrame(animate);
}

function initialize() {
    resizeCanvas();
    Promise.all([...starImages.map(img => new Promise(resolve => img.onload = resolve)),
                 new Promise(resolve => glowImage.onload = resolve)])
        .then(() => {
            for (let i = 0; i < numNeonStars; i++) {
                stars.push(createNeonStar());
            }
            for (let i = 0; i < numGlowStars; i++) {
                glowStars.push(createGlowStar());
            }
            animate();
        });
}

window.addEventListener('resize', resizeCanvas);
document.addEventListener('DOMContentLoaded', initialize);
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player configuration
const player = {
  x: 200,
  y: 400,
  width: 30,
  height: 30,
  color: "blue",
  dx: 0,
  dy: 0,
  speed: 3,
};

// Bubbles array and enemies array
const bubbles = [];
const enemies = [
  { x: 100, y: 100, width: 30, height: 30, color: "red" },
  { x: 300, y: 150, width: 30, height: 30, color: "red" },
];

// Function to draw rectangles (player, bubbles, enemies)
function drawRect(entity) {
  ctx.fillStyle = entity.color;
  ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
}

// Draw player
function drawPlayer() {
  drawRect(player);
}

// Move player within bounds
function movePlayer() {
  player.x += player.dx;
  player.y += player.dy;

  // Prevent the player from going off the canvas
  if (player.x < 0) player.x = 0;
  if (player.y < 0) player.y = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

// Shoot bubbles from player position
function shootBubble() {
  bubbles.push({
    x: player.x + player.width / 2 - 5,
    y: player.y,
    width: 10,
    height: 10,
    color: "lightblue",
    dy: -5,
  });
}

// Move bubbles upward and remove bubbles that go off-screen
function moveBubbles() {
  bubbles.forEach((bubble, index) => {
    bubble.y += bubble.dy;
    if (bubble.y + bubble.height < 0) {
      bubbles.splice(index, 1);
    }
  });
}

// Detect collisions between bubbles and enemies
function checkCollisions() {
  enemies.forEach((enemy, enemyIndex) => {
    bubbles.forEach((bubble, bubbleIndex) => {
      if (
        bubble.x < enemy.x + enemy.width &&
        bubble.x + bubble.width > enemy.x &&
        bubble.y < enemy.y + enemy.height &&
        bubble.y + bubble.height > enemy.y
      ) {
        // Remove enemy and bubble on collision
        enemies.splice(enemyIndex, 1);
        bubbles.splice(bubbleIndex, 1);
      }
    });
  });
}

// Draw enemies
function drawEnemies() {
  enemies.forEach((enemy) => drawRect(enemy));
}

// Draw bubbles
function drawBubbles() {
  bubbles.forEach((bubble) => drawRect(bubble));
}

// Main update loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  movePlayer();
  moveBubbles();
  checkCollisions();

  drawPlayer();
  drawEnemies();
  drawBubbles();

  requestAnimationFrame(update);
}

// Handle keyboard input
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") player.dy = -player.speed;
  if (event.key === "ArrowDown") player.dy = player.speed;
  if (event.key === "ArrowLeft") player.dx = -player.speed;
  if (event.key === "ArrowRight") player.dx = player.speed;
  if (event.key === " ") shootBubble(); // Spacebar to shoot bubbles
});

document.addEventListener("keyup", (event) => {
  if (["ArrowUp", "ArrowDown"].includes(event.key)) player.dy = 0;
  if (["ArrowLeft", "ArrowRight"].includes(event.key)) player.dx = 0;
});

// Start game loop
update();
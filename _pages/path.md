---
layout: page
title: Path of Life
permalink: /path/
nav: false
#nav_order: 5
---

<style>
  .game-container {
    max-width: 900px;
    margin: 0 auto;
    font-family: system-ui, -apple-system, sans-serif;
  }

  .controls-panel {
    background-color: var(--global-bg-color, #f8f9fa);
    border: 1px solid var(--global-divider-color, #e0e0e0);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 25px;
  }

  .slider-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    gap: 15px;
  }

  .slider-group label {
    font-weight: 600;
    margin-bottom: 0;
    min-width: 180px;
  }

  .slider-group input[type="range"] {
    flex-grow: 1;
  }

  .slider-value {
    min-width: 30px;
    text-align: right;
    font-weight: bold;
  }

  .boards-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    margin-bottom: 20px;
  }

  .board-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .board-box h4 {
    margin-bottom: 10px;
    font-size: 1.1rem;
  }

  .grid-board {
    display: grid;
    gap: 1px;
    background-color: #ccc;
    border: 2px solid #333;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    user-select: none;
  }

  .grid-cell {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    transition: background-color 0.15s ease;
  }

  .grid-cell.alive {
    background-color: #111111;
  }

  .interactive .grid-cell {
    cursor: pointer;
  }

  .interactive .grid-cell:hover {
    opacity: 0.8;
  }

  .game-status {
    background-color: var(--global-bg-color, #f8f9fa);
    border-left: 4px solid var(--global-theme-color, #007bff);
    padding: 12px 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btn-action-group {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
  }

  .banner {
    padding: 15px;
    border-radius: 6px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    display: none;
    margin-top: 15px;
  }

  .banner.win {
    display: block;
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .banner.lose {
    display: block;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
</style>

{% raw %}
<div class="game-container">
  <p>Reach the <strong>Target Configuration</strong> in the given number of steps! Click on cells on the left grid to flip their state (up to your allowed flips limit per step) before moving to the next generation.</p>

  <!-- Controls Panel -->
  <div class="controls-panel">
    <div class="slider-group">
      <label for="sizeSlider">Grid Size (N x N):</label>
      <input type="range" id="sizeSlider" min="5" max="15" value="8">
      <span class="slider-value" id="sizeVal">8</span>
    </div>
    
    <div class="slider-group">
      <label for="stepsSlider">Steps Required:</label>
      <input type="range" id="stepsSlider" min="1" max="8" value="3">
      <span class="slider-value" id="stepsVal">3</span>
    </div>

    <div class="slider-group">
      <label for="flipsSlider">Flips Allowed per Step:</label>
      <input type="range" id="flipsSlider" min="0" max="5" value="2">
      <span class="slider-value" id="flipsVal">2</span>
    </div>

    <div style="text-align: center; margin-top: 15px;">
      <button class="btn btn-primary" id="btnNewGame">Generate New Game</button>
    </div>
  </div>

  <!-- Game Info / Status Bar -->
  <div class="game-status">
    <div>Step: <strong id="currentStepText">0</strong> / <strong id="totalStepsText">3</strong></div>
    <div>Flips remaining in this step: <strong id="flipsLeftText">2</strong></div>
  </div>

  <!-- Boards Side by Side -->
  <div class="boards-wrapper">
    <div class="board-box">
      <h4>Current State (Interactive)</h4>
      <div id="currentGrid" class="grid-board interactive"></div>
    </div>
    <div class="board-box">
      <h4>Target Goal</h4>
      <div id="targetGrid" class="grid-board"></div>
    </div>
  </div>

  <!-- Action Buttons -->
  <div class="btn-action-group">
    <button class="btn btn-secondary" id="btnResetStep">Reset Step Flips</button>
    <button class="btn btn-success" id="btnNextStep">Advance Step &rarr;</button>
  </div>

  <!-- Victory / Defeat Message -->
  <div id="resultBanner" class="banner"></div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function () {
  // Game parameters
  let gridSize = 8;
  let maxSteps = 3;
  let maxFlipsPerStep = 2;

  // Game state
  let currentStep = 0;
  let startGridState = [];   // initial grid state at step 0
  let targetGridState = [];  // target grid state at the final step
  let currentGrid = [];      // current user grid state
  let stepStartGrid = [];    // state at the beginning of current step
  let isGameOver = false;

  // DOM Elements
  const sizeSlider = document.getElementById("sizeSlider");
  const stepsSlider = document.getElementById("stepsSlider");
  const flipsSlider = document.getElementById("flipsSlider");
  
  const sizeVal = document.getElementById("sizeVal");
  const stepsVal = document.getElementById("stepsVal");
  const flipsVal = document.getElementById("flipsVal");

  const currentStepText = document.getElementById("currentStepText");
  const totalStepsText = document.getElementById("totalStepsText");
  const flipsLeftText = document.getElementById("flipsLeftText");

  const currentGridEl = document.getElementById("currentGrid");
  const targetGridEl = document.getElementById("targetGrid");
  
  const btnNewGame = document.getElementById("btnNewGame");
  const btnNextStep = document.getElementById("btnNextStep");
  const btnResetStep = document.getElementById("btnResetStep");
  const resultBanner = document.getElementById("resultBanner");

  // Sync sliders text
  sizeSlider.oninput = () => sizeVal.textContent = sizeSlider.value;
  stepsSlider.oninput = () => stepsVal.textContent = stepsSlider.value;
  flipsSlider.oninput = () => flipsVal.textContent = flipsSlider.value;

  // Game initialization
  btnNewGame.onclick = initGame;
  btnResetStep.onclick = resetCurrentStepFlips;
  btnNextStep.onclick = advanceStep;

  initGame();

  function initGame() {
    gridSize = parseInt(sizeSlider.value);
    maxSteps = parseInt(stepsSlider.value);
    maxFlipsPerStep = parseInt(flipsSlider.value);

    currentStep = 0;
    isGameOver = false;
    resultBanner.className = "banner";
    resultBanner.textContent = "";

    // Generate puzzle and target guarantees solvability
    generateSolvableInstance();

    // Copy start state
    currentGrid = cloneGrid(startGridState);
    stepStartGrid = cloneGrid(startGridState);

    updateUI();
    renderGrids();
  }

  function cloneGrid(grid) {
    return grid.map(row => [...row]);
  }

  // Conway's Game of Life rule logic
  function computeNextGeneration(grid) {
    const next = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        let neighbors = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize) {
              neighbors += grid[nr][nc];
            }
          }
        }
        if (grid[r][c] === 1) {
          next[r][c] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
        } else {
          next[r][c] = (neighbors === 3) ? 1 : 0;
        }
      }
    }
    return next;
  }

  // Generate a puzzle guaranteed to have a solution by working forward
  function generateSolvableInstance() {
    // 1. Random starting state (~35% filled)
    let grid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => Math.random() < 0.35 ? 1 : 0)
    );

    startGridState = cloneGrid(grid);

    // 2. Simulate forwards with random flips per step
    for (let s = 0; s < maxSteps; s++) {
      // Pick random number of flips (1 up to maxFlipsPerStep)
      const numFlips = Math.floor(Math.random() * maxFlipsPerStep) + 1;
      const coords = [];
      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) coords.push([r, c]);
      }

      for (let f = 0; f < numFlips; f++) {
        if (coords.length === 0) break;
        const idx = Math.floor(Math.random() * coords.length);
        const [fr, fc] = coords.splice(idx, 1)[0];
        grid[fr][fc] = 1 - grid[fr][fc]; // Flip cell
      }

      // Step Conway forward
      grid = computeNextGeneration(grid);
    }

    targetGridState = grid;
  }

  function getFlipsUsedInStep() {
    let flips = 0;
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (currentGrid[r][c] !== stepStartGrid[r][c]) {
          flips++;
        }
      }
    }
    return flips;
  }

  function handleCellClick(r, c) {
    if (isGameOver || currentStep >= maxSteps) return;

    const currentlyFlipped = currentGrid[r][c] !== stepStartGrid[r][c];
    const flipsUsed = getFlipsUsedInStep();

    if (!currentlyFlipped && flipsUsed >= maxFlipsPerStep) {
      // Max flips reached for this step
      return;
    }

    // Toggle cell
    currentGrid[r][c] = 1 - currentGrid[r][c];
    
    updateUI();
    renderInteractiveGrid();
  }

  function resetCurrentStepFlips() {
    if (isGameOver || currentStep >= maxSteps) return;
    currentGrid = cloneGrid(stepStartGrid);
    updateUI();
    renderInteractiveGrid();
  }

  function advanceStep() {
    if (isGameOver || currentStep >= maxSteps) return;

    // Advance Conway Game of Life logic
    currentGrid = computeNextGeneration(currentGrid);
    stepStartGrid = cloneGrid(currentGrid);
    currentStep++;

    updateUI();
    renderInteractiveGrid();

    // Check game end condition
    if (currentStep === maxSteps) {
      checkWinCondition();
    }
  }

  function checkWinCondition() {
    isGameOver = true;
    let isMatch = true;

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (currentGrid[r][c] !== targetGridState[r][c]) {
          isMatch = false;
          break;
        }
      }
      if (!isMatch) break;
    }

    if (isMatch) {
      resultBanner.textContent = "🎉 Victory! You reached the target configuration!";
      resultBanner.className = "banner win";
    } else {
      resultBanner.textContent = "❌ Game Over! The final grid did not match the target configuration.";
      resultBanner.className = "banner lose";
    }

    btnNextStep.disabled = true;
    btnResetStep.disabled = true;
  }

  function updateUI() {
    currentStepText.textContent = currentStep;
    totalStepsText.textContent = maxSteps;
    const flipsUsed = getFlipsUsedInStep();
    flipsLeftText.textContent = maxFlipsPerStep - flipsUsed;

    const canInteract = currentStep < maxSteps && !isGameOver;
    btnNextStep.disabled = !canInteract;
    btnResetStep.disabled = !canInteract;
  }

  function renderGrids() {
    renderInteractiveGrid();
    renderTargetGrid();
  }

  function renderInteractiveGrid() {
    currentGridEl.innerHTML = "";
    const cellSize = Math.min(320 / gridSize, 35);
    
    currentGridEl.style.gridTemplateColumns = `repeat(${gridSize}, ${cellSize}px)`;
    currentGridEl.style.gridTemplateRows = `repeat(${gridSize}, ${cellSize}px)`;

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const cell = document.createElement("div");
        cell.className = "grid-cell" + (currentGrid[r][c] === 1 ? " alive" : "");
        cell.onclick = () => handleCellClick(r, c);
        currentGridEl.appendChild(cell);
      }
    }
  }

  function renderTargetGrid() {
    targetGridEl.innerHTML = "";
    const cellSize = Math.min(320 / gridSize, 35);

    targetGridEl.style.gridTemplateColumns = `repeat(${gridSize}, ${cellSize}px)`;
    targetGridEl.style.gridTemplateRows = `repeat(${gridSize}, ${cellSize}px)`;

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const cell = document.createElement("div");
        cell.className = "grid-cell" + (targetGridState[r][c] === 1 ? " alive" : "");
        targetGridEl.appendChild(cell);
      }
    }
  }
});
</script>
{% endraw %}

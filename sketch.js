// 宣告全域變數，用於儲存載入的精靈圖
let spriteSheet;

// 精靈圖原始尺寸與幀數設定
const TOTAL_FRAMES = 6;       // 精靈圖總共有 6 張連續動作圖片
const SHEET_WIDTH = 769;      // 整張精靈圖的總寬度
const SHEET_HEIGHT = 190;     // 整張精靈圖的總高度
const FRAME_WIDTH = SHEET_WIDTH / TOTAL_FRAMES; // 計算單張畫格的原始寬度 (約 128.166 像素)
const FRAME_HEIGHT = SHEET_HEIGHT;              // 單張畫格的原始高度 (190 像素)

// 動畫播放控制變數
let currentFrame = 0;         // 目前播放到第幾張畫格 (索引值從 0 開始)
let frameCounter = 0;         // 遊戲迴圈計數器，用來控制動畫播放速度
const ANIMATION_SPEED = 8;    // 動畫速度控制：每經過 8 個螢幕刷新幀才切換下一張圖 (數字越大越慢)

// 預載入函式：在程式正式開始前，確保外部圖片資源已經完全載入記憶體
function preload() {
  // 載入位於 1/stop/stop.png 的圖片精靈檔案
  spriteSheet = loadImage('1/stop/stop.png');
}

// 初始化設定函式：程式啟動時只會執行一次
function setup() {
  // 建立一個符合目前瀏覽器視窗寬高的全螢幕畫布
  createCanvas(windowWidth, windowHeight);
}

// 繪圖迴圈函式：預設每秒執行約 60 次，負責畫面更新與動畫渲染
function draw() {
  // 設定畫布背景顏色為天空藍 (使用標準 CSS 顏色名稱 'skyblue' 或 RGB 色碼)
  background('skyblue');

  // --- 1. 計算角色1的響應式縮放尺寸 ---
  // 根據需求：角色1顯示出來的高度為整個畫布高度的 1/3
  let displayHeight = height / 3;
  
  // 計算高度的縮放比例 (顯示高度 / 原始單張圖片高度)
  let scaleRatio = displayHeight / FRAME_HEIGHT;
  
  // 依照相同的縮放比例計算顯示寬度，確保角色不會變形
  let displayWidth = FRAME_WIDTH * scaleRatio;

  // --- 2. 計算角色1在畫布上的座標位置 ---
  // 設定繪圖基準點為圖片的「底部中心」，這樣最容易對齊畫布底部與特定 X 軸比例
  imageMode(CENTER);
  
  // 角色1的 X 座標落在整個畫布寬度的 2/3 位置
  let posX = width * (2 / 3);
  
  // 因為 imageMode 為 CENTER，若要讓圖片「最底端」落在畫布最底端 (height)，
  // 圖片的中心點 Y 座標必須往上移半個角色高度 (height - displayHeight / 2)
  let posY = height - (displayHeight / 2);

  // --- 3. 計算目前要裁切的精靈圖區域 ---
  // 計算當前畫格在原始精靈圖上的 X 軸起點位置
  let sourceX = currentFrame * FRAME_WIDTH;
  // 原始精靈圖為單排橫向排列，因此 Y 軸起點固定為 0
  let sourceY = 0;

  // --- 4. 繪製角色1 ---
  // image(圖片來源, 畫布X, 畫布Y, 顯示寬度, 顯示高度, 裁切起點X, 裁切起點Y, 裁切寬度, 裁切高度)
  image(
    spriteSheet,
    posX,
    posY,
    displayWidth,
    displayHeight,
    sourceX,
    sourceY,
    FRAME_WIDTH,
    FRAME_HEIGHT
  );

  // --- 5. 更新動畫畫格狀態 ---
  // 每次 draw() 執行時讓計數器加 1
  frameCounter++;
  
  // 當計數器達到設定的動畫速度門檻時，切換至下一張圖片
  if (frameCounter >= ANIMATION_SPEED) {
    // 畫格索引加 1，並使用取餘數 (%) 運算子讓索引在 0 到 5 之間無限循環
    currentFrame = (currentFrame + 1) % TOTAL_FRAMES;
    // 重置計數器
    frameCounter = 0;
  }
}

// 視窗尺寸改變事件函式：當使用者調整瀏覽器視窗大小或旋轉手機螢幕時自動觸發
function windowResized() {
  // 重新調整畫布大小以符合新的視窗尺寸，實現跨載具自適應效果
  resizeCanvas(windowWidth, windowHeight);
}
const tokenList = document.querySelector('.tokenlist');
const deskmap = document.querySelector('.deskmap');
const mapContainer = document.querySelector(".map-container");

const widthInput = document.getElementById('mapX')
const heightInput = document.getElementById('mapY');

// Получение id кнопок
const createMapButton = document.querySelector('.createmap');
const createTokenButton = document.querySelector('.createtoken');
const zoomInButton = document.querySelector(".zoom-in");
const zoomOutButton = document.querySelector(".zoom-out");
const startGameButton = document.querySelector(".startGame");

// Обработка нажатий
createMapButton.addEventListener('click', createMap);
createTokenButton.addEventListener('click', createToken);
zoomOutButton.addEventListener("click", ZoomIN);
zoomInButton.addEventListener("click", ZoomOut);
startGameButton.addEventListener("click", startGame);

// Функции изменения масштаба карты
let scale = 1; // Начальный масштаб
function ZoomIN()
{
    if (scale > 0.1) {
        scale -= 0.1;
        deskmap.style.transform = `scale(${scale})`;
    }
}
function ZoomOut()
{
    scale += 0.1;
    deskmap.style.transform = `scale(${scale})`;
}

// Функция для создания карты
function createMap() 
{
    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);
    // Проверяем, что введены корректные числа
    if (!isNaN(width) && !isNaN(height) && width > 0 && height > 0) 
    {
        // Очищаем контейнер карты
        deskmap.innerHTML = '';

        deskmap.style.gridTemplateColumns = `repeat(${width}, 50px)`;
        deskmap.style.gridTemplateRows = `repeat(${height}, 50px)`;
    
        for (let i = 0; i < width * height; i++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            deskmap.appendChild(cell);
        }
    } else 
    {
        alert('Please enter valid width and height.');
    }
    
}

// Функция для создания токена
let tokenCounter = 1;
function createToken() 
{
    const token = document.createElement("div");
    token.classList.add("token");
    token.id = `token ${tokenCounter}`;
    token.draggable = true;
    token.textContent = tokenCounter; // Добавляем номер на фишку

    tokenList.appendChild(token);
    tokenCounter++;
}


// Функция начала игры
function startGame()
{
    const tokens = document.querySelectorAll('.token');
    const cells = document.querySelectorAll('.cell');

    let isDragging = false;
    let currentToken = null;

    tokens.forEach((token) => {
        token.addEventListener('dragstart', (e) => {
            isDragging = true;
            currentToken = e.target;
            e.dataTransfer.setData('text/plain', e.target.id);
            e.target.classList.add('dragging');
        });

        token.addEventListener('dragend', () => {
            isDragging = false;
            currentToken = null;
            token.classList.remove('dragging');
        });
    });

    cells.forEach((cell) => {
        cell.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        cell.addEventListener('drop', (e) => {
            e.preventDefault();
            if (isDragging) {
                const tokenId = e.dataTransfer.getData('text/plain');
                const token = document.getElementById(tokenId);
                cell.appendChild(token);
                token.style.left = '0';
                token.style.top = '0';
            }
        });
    });
}


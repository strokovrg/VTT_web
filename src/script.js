const createMapButton = document.querySelector('.createmap');
const createTokenButton = document.querySelector('.createtoken');
const tokenList = document.querySelector('.tokenlist');
const mapContainer = document.querySelector('.deskmap');


const widthInput = document.getElementById('mapX')
const heightInput = document.getElementById('mapY');

// Обработчик клика на кнопку "Создать карту"
createMapButton.addEventListener('click', createMap);

// Обработчик клика на кнопку "Создать токен"
createTokenButton.addEventListener('click', createToken);

// Функция для создания карты
function createMap() 
{
    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);
    // Проверяем, что введены корректные числа
    if (!isNaN(width) && !isNaN(height) && width > 0 && height > 0) 
    {
        // Очищаем контейнер карты
        mapContainer.innerHTML = '';

        // Создаем игровую карту с заданными размерами
        const map = document.createElement('table');
        for (let i = 0; i < height; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < width; j++) {
                const cell = document.createElement('td');
                row.appendChild(cell);
            }
            map.appendChild(row);
        }
        mapContainer.appendChild(map);
        alert('=)');
    } else 
    {
        alert('Please enter valid width and height.');
    }
    
}

// Функция для создания токена
function createToken() 
{
    const newTokenItem = document.createElement('li');
    newTokenItem.textContent = 'New Token'; 
    tokenList.appendChild(newTokenItem);
}





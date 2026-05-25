const memories = [
    { id: 1, text: "Ты всегда заставляешь меня улыбаться при встрече с тобой..." },
    { id: 2, text: "Твой смех — мой самый любимый звук на свете" },
    { id: 3, text: "С тобой даже обычные дни становятся особенными" },
    { id: 4, text: "Помню каждый день в школе с тобой" },
    { id: 5, text: "Ты — то самое хорошее, что случилось со мной" },
    { id: 6, text: "Каждый раз, когда я думаю о тебе, становится теплее на душе" }
];

let wateredCount = 0;
const totalFlowers = 6;

const flowerImages = [
    "flower-1.png",
    "flower-2.png",
    "flower-3.png",
    "flower-4.png",
    "flower-5.png",
    "flower-6.png"
];


function createFlower(index) {
    const container = document.getElementById('flowers');

    const img = document.createElement('img');
    img.src = flowerImages[index];
    img.className = 'flower';
    img.dataset.id = index + 1;

    container.appendChild(img);
}

function showMessage(memory, flowerElement) {
    const box = document.getElementById('messageBox');
    const text = document.getElementById('messageText');

    const counter = (wateredCount + 1) + "/" + totalFlowers;

    text.innerHTML = `
    <div class="counter">${counter}</div>
    ${memory.text}
  `;

    const rect = flowerElement.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    box.style.top = `${rect.top + scrollTop - 130}px`;
    box.style.left = `${rect.left + rect.width / 2}px`;
    box.style.transform = 'translate(-50%, 0)';

    box.classList.add('show');

    setTimeout(() => {
        box.classList.remove('show');
    }, 7000);
}

function openFinalFlower() {
    const bigFlower = document.getElementById('finalFlower');

    bigFlower.classList.add('active');

    // теперь текст НЕ показываем сразу
}

// Инициализация
function init() {
    for (let i = 0; i < totalFlowers; i++) {
        createFlower(i);
    }

    document.addEventListener('click', (e) => {
        const flower = e.target.closest('.flower');

        if (flower && !flower.classList.contains('watered')) {
            flower.style.transform = 'scale(1.38) rotate(12deg)';

            setTimeout(() => {
                showMessage(memories[wateredCount], flower);
                wateredCount++;

                if (wateredCount === totalFlowers) {
                    openFinalFlower();
                }
            }, 300);

            flower.classList.add('watered');
        }
    });

    // ✔️ ВОТ ЭТО ДОБАВЬ ТУТ
    const bigFlower = document.getElementById('finalFlower');
    const finalText = document.getElementById('finalText');

    let finalClicks = 0;

    bigFlower.addEventListener('click', () => {
        finalClicks++;

        if (finalClicks === 2) {
            finalText.classList.add('show');
        }
    });
}

window.onload = init;

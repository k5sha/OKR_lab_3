function changeHeaderColor(el) {
    el.style.color = "#2ecc71";
}

const mainHeader = document.getElementById('main-header');
if (mainHeader) {
    mainHeader.onclick = function() {
        this.style.transform = "scale(1.05)";
        console.log("Заголовок масштабовано");
    };
}

const promoCard = document.getElementById('special-promo-card');
if (promoCard) {
    promoCard.addEventListener('mouseenter', () => {
        promoCard.style.boxShadow = "0 20px 50px rgba(46, 204, 113, 0.3)";
    });

    let storeManager = {
        handleEvent(event) {
            alert("Акція активована на: " + event.currentTarget.id);
            promoCard.removeEventListener('click', storeManager);
        }
    };
    promoCard.addEventListener('click', storeManager);
}

const grid = document.getElementById('interactive-category-list');
if (grid) {
    grid.onclick = function(event) {
        let card = event.target.closest('.product-card');
        if (!card || !grid.contains(card)) return;
        Array.from(grid.children).forEach(c => c.classList.remove('highlight-item'));
        card.classList.add('highlight-item');
    };
}

const menu = document.getElementById('action-menu');
const methods = {
    showWelcome() { alert("Вітаємо в Світі Продуктів!"); },
    contactSupport() { alert("Менеджер онлайн."); },
    toggleTheme() { document.body.classList.toggle('dark-mode'); }
};

if (menu) {
    menu.onclick = function(event) {
        let btn = event.target.closest('button');
        if (btn && methods[btn.dataset.method]) methods[btn.dataset.method]();
    };
}

document.addEventListener('click', function(event) {
    if (event.target.dataset.counter !== undefined) {
        event.target.value++;
        event.target.style.background = "#2ecc71";
        event.target.style.color = "white";
    }
});

let currentDrag = null;
let shiftX, shiftY;
let appleCount = 0;
const MAX_APPLES = 3;

document.addEventListener('mousedown', function(event) {
    let dragElem = event.target.closest('.drag-item');
    if (!dragElem || event.button !== 0) return;

    event.preventDefault();
    currentDrag = dragElem;

    if (currentDrag.parentElement.id === 'drop-zone' && currentDrag.classList.contains('apple')) {
        appleCount--;
        updateStatus();
    }

    let coords = currentDrag.getBoundingClientRect();
    shiftX = event.clientX - coords.left;
    shiftY = event.clientY - coords.top;

    currentDrag.style.position = 'fixed';
    currentDrag.style.zIndex = 1000;
    document.body.append(currentDrag);

    moveAt(event.clientX, event.clientY);

    function moveAt(pageX, pageY) {
        currentDrag.style.left = pageX - shiftX + 'px';
        currentDrag.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.clientX, event.clientY);

        currentDrag.style.display = 'none';
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        currentDrag.style.display = 'flex';

        let dropZone = document.getElementById('drop-zone');
        if (elemBelow && elemBelow.closest('#drop-zone')) {
            if (currentDrag.classList.contains('apple')) {
                dropZone.style.background = "rgba(46, 204, 113, 0.2)";
                dropZone.style.borderColor = "#2ecc71";
            } else {
                dropZone.style.background = "rgba(231, 76, 60, 0.2)";
                dropZone.style.borderColor = "#e74c3c";
            }
        } else {
            dropZone.style.background = "white";
            dropZone.style.borderColor = "#ccc";
        }
    }

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function(e) {
        document.removeEventListener('mousemove', onMouseMove);
        
        currentDrag.style.display = 'none';
        let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        currentDrag.style.display = 'flex';

        let dropZone = document.getElementById('drop-zone');
        let itemsBox = document.getElementById('items-box');

        if (elemBelow && elemBelow.closest('#drop-zone') && currentDrag.classList.contains('apple')) {
            appleCount++;
            currentDrag.style.position = 'static';
            dropZone.append(currentDrag);
        } else {
            currentDrag.style.position = 'static';
            itemsBox.append(currentDrag);
        }
        
        updateStatus();
        dropZone.style.background = "white";
        dropZone.style.borderColor = "#ccc";
        document.onmouseup = null;
        currentDrag = null;
    };
});

function updateStatus() {
    const status = document.getElementById('game-status');
    const hint = document.getElementById('drop-hint');
    
    if (hint) hint.style.opacity = appleCount > 0 ? "0" : "1";

    if (appleCount >= MAX_APPLES) {
        status.innerHTML = "<span style='color: #2ecc71'>🎉 Кошик повний! Промокод: APPLE_PRO_2026</span>";
    } else {
        status.innerHTML = `Зібрано яблук: ${appleCount} з ${MAX_APPLES}`;
    }
}

document.ondragstart = () => false;

document.addEventListener('mouseover', function(event) {
    let target = event.target.closest('.drag-item');
    if (!target) return;

    target.style.transform = "scale(1.1) rotate(10deg)"; 
    target.style.background = "#f1c40f"; 
    target.style.transition = "all 0.3s";
    
    if (event.relatedTarget) {
        console.log(`Курсор прийшов з ${event.relatedTarget.tagName} на ${target.id}`);
    }
});

document.addEventListener('mouseout', function(event) {
    let target = event.target.closest('.drag-item');
    if (!target) return;

    target.style.transform = "scale(1) rotate(0deg)";
    if (target.classList.contains('apple')) {
        target.style.background = "#2ecc71";
    } else if (target.id.includes('lemon')) {
        target.style.background = "#f1c40f";
    } else {
        target.style.background = "#e67e22";
    }
});
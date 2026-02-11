// 1. Функція діалогу з циклами та умовами
function userDialogue() {
    let quantity = prompt("Скільки категорій продуктів ви хочете переглянути?", "3");
    
    for (let i = 1; i <= parseInt(quantity); i++) {
        console.log("Підготовка до показу категорії №" + i);
    }

    if (quantity > 0) {
        alert("Ми підготували для вас список з " + quantity + " категорій!");
    }
}

// 2. Інфо про розробника
function showDeveloperInfo(surname, firstName, position = "Fullstack Developer") {
    let devBlock = document.createElement("div");
    devBlock.style.cssText = "background: #2c3e50; color: white; padding: 15px; text-align: center; margin-top: 20px;";
    devBlock.innerHTML = `<strong>Розробник:</strong> ${surname} ${firstName} <br> <strong>Посада:</strong> ${position}`;
    
    document.body.append(devBlock);
}

// 3. Порівняння рядків
function compareStrings(str1, str2) {
    let result = (str1.length >= str2.length) ? str1 : str2;
    alert("Довший рядок: " + result);
}

// 4. Робота з DOM та BOM (Завдання 2)
function runDOMDemo() {
    const header = document.getElementById("main-header");
    
    console.log("Outer HTML заголовка:", header.outerHTML);
    console.log("Перший текстовий вузол (nodeValue):", header.firstChild.nodeValue);

    const welcomeNote = document.createElement("span");
    welcomeNote.textContent = "Вітаємо! ";
    header.prepend(welcomeNote); 

    const oldIntro = document.querySelector(".intro-text");
    const newIntro = document.createElement("p");
    newIntro.innerHTML = "<em>Оновлений опис: Найкраща якість у місті!</em>";
    if (oldIntro) oldIntro.replaceWith(newIntro);

    const newPromo = document.createElement("p");
    const promoText = document.createTextNode("📢 Акція: Купуй на 1000 грн — отримуй подарунок!");
    newPromo.append(promoText);

    newPromo.style.color = "red";
    newPromo.style.textAlign = "center";
    header.after(newPromo);

    let topLink = document.getElementById("top-link");
    setTimeout(() => {
        if(topLink) topLink.remove();
    }, 5000);

    setTimeout(() => {
        alert("Зараз вас буде перенаправлено на сторінку молочних продуктів");
        window.location.href = "./dairy.html";
    }, 15000);
}
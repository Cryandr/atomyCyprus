const categories = { monthsItem, health, hairnBody };

let currentLanguage = "ru"; // Текущий язык по умолчанию

// Переводы текста
const translations = {
    price: { ru: "Цена:", en: "Price:" },
    readMore: { ru: "Читать далее", en: "Read more" },
    details: { ru: "Подробнее", en: "Details" },
    addToCart: { ru: "В корзину", en: "Add to cart" },
    alertAddToCart: {
        ru: "Ваш товар \"{product}\" успешно добавлен в корзину!",
        en: "Your product \"{product}\" has been successfully added to the cart!"
    }
};

// Переключение языка
function toggleLanguage() {
    currentLanguage = currentLanguage === "ru" ? "en" : "ru";
    localStorage.setItem("language", currentLanguage); // Сохраняем текущий язык
    updateLanguage();
    renderProducts('all'); // Перерисовываем все товары
}

// Обновление языка статического текста
function updateLanguage() {
    const translatableElements = document.querySelectorAll("[data-ru], [data-en]");
    translatableElements.forEach(element => {
        const newText = element.getAttribute(`data-${currentLanguage}`);
        if (newText) {
            element.textContent = newText;
        }
    });
}

// Рендеринг продуктов
function renderProducts(category) {
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = ''; // Очищаем список продуктов

    const selectedCategories = category === 'all' ? Object.keys(categories) : [category];

    selectedCategories.forEach(cat => {
        categories[cat].forEach((product, index) => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");

            // Получение описания на текущем языке
            const description = product[2][currentLanguage];

            // Описание с сокращением
            const maxWords = 9;
            const words = description.split(' ');
            const truncatedDescription = words.length > maxWords ? words.slice(0, maxWords).join(' ') + '..' : description;

            // Вставка элементов продукта с использованием перевода
            productElement.innerHTML = `
                <img src="${product[4]}" alt="${product[0]}" />
                <h4>${product[0]}</h4>
                <p class="description">${truncatedDescription}</p>
                <a href="item.html" class="read-more" onclick="goToProductPage('${cat}', ${index})">${translations.readMore[currentLanguage]}</a>
                <p><strong>${translations.price[currentLanguage]}</strong> ${product[3]}</p>
                <button onclick="goToProductPage('${cat}', ${index})">${translations.details[currentLanguage]}</button>
                <button onclick="addToCart('${cat}', ${index})">${translations.addToCart[currentLanguage]}</button>
            `;

            productContainer.appendChild(productElement);
        });
    });
}

// Фильтрация по категориям
function filterProducts(category) {
    renderProducts(category);
}

// Переход на страницу продукта
function goToProductPage(category, index) {
    const product = categories[category][index];
    sessionStorage.setItem("currentProduct", JSON.stringify(product)); // Сохраняем продукт в sessionStorage
    window.location.href = "item.html"; // Перенаправляем на страницу продукта
}

// Добавление в корзину
function addToCart(category, index) {
    const product = categories[category][index];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Проверяем, есть ли продукт в корзине
    const existing = cart.find(item => item[0] === product[0]);

    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1; // Увеличиваем количество, если продукт уже есть
    } else {
        cart.push({ ...product, quantity: 1 }); // Добавляем продукт с количеством 1
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем корзину

    // Уведомление с использованием перевода
    const alertMessage = translations.alertAddToCart[currentLanguage].replace("{product}", product[0]);
    alert(alertMessage);
}

// Загрузка страницы
window.onload = () => {
    currentLanguage = localStorage.getItem("language") || "ru"; // Загружаем язык из localStorage
    updateLanguage(); // Обновляем статический текст
    renderProducts('all'); // Отображаем все продукты
};
let currentLanguage = "ru"; // Текущий язык по умолчанию

// Объект переводов
const translations = {
    emptyCart: {
        ru: "Ваша корзина сейчас пуста.",
        en: "Your cart is currently empty."
    },
    totalItems: {
        ru: "Всего предметов:",
        en: "Total items:"
    },
    totalPrice: {
        ru: "Итоговая цена:",
        en: "Total price:"
    },
    price: {
        ru: "Цена:",
        en: "Price:"
    },
    quantity: {
        ru: "Кол-во:",
        en: "Quantity:"
    },
    itemTotal: {
        ru: "Общая цена:",
        en: "Item total:"
    },
    removeButton: {
        ru: "Удалить с корзины",
        en: "Remove from cart"
    }
};

// Переключение языка
function toggleCartLanguage() {
    currentLanguage = currentLanguage === "ru" ? "en" : "ru";
    localStorage.setItem("language", currentLanguage); // Сохраняем язык
    updateLanguage();
    renderCart(); // Перерисовываем корзину с новым языком
}

// Обновление языка для статических элементов
function updateLanguage() {
    const translatableElements = document.querySelectorAll("[data-ru], [data-en]");
    translatableElements.forEach(element => {
        const newText = element.getAttribute(`data-${currentLanguage}`);
        if (newText) {
            element.textContent = newText;
        }
    });

    const languageToggle = document.getElementById("toogleCartLanguage");
    if (languageToggle) {
        languageToggle.textContent = currentLanguage === "ru" ? "EN" : "RU";
    }
}

// Функция отрисовки товаров в корзине
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');
    cartContainer.innerHTML = ''; // Очищаем контейнер

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p>${translations.emptyCart[currentLanguage]}</p>`;
        totalItemsElement.textContent = '';
        totalPriceElement.textContent = '';
        return;
    }

    cart.forEach((item, index) => {
        const priceWithSymbol = item[3] || "€0.00";
        const currencySymbol = priceWithSymbol.trim()[0];
        const price = parseFloat(priceWithSymbol.trim().slice(1));

        if (isNaN(price)) {
            console.error(`Invalid price for item at index ${index}:`, priceWithSymbol);
            return;
        }

        const quantity = item.quantity || 1;
        const itemTotal = price * quantity;

        totalItems += quantity;
        totalPrice += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <h4>${item[0]}</h4>
            <div style="display: flex; align-items: center;">
                <img class="cart-item-image" src="${item[4]}" alt="${item[0]}" style="width: 75px; height: 75px; margin-right: 10px;">
                <div class="cart-item-info">
                    <p>${item[1]}</p>
                    <p><strong>${translations.price[currentLanguage]}</strong> ${currencySymbol}${price.toFixed(2)}</p>
                    <p><strong>${translations.quantity[currentLanguage]}</strong> ${quantity}</p>
                    <p><strong>${translations.itemTotal[currentLanguage]}</strong> ${currencySymbol}${itemTotal.toFixed(2)}</p>
                </div>
            </div>
            <button onclick="removeFromCart(${index})">${translations.removeButton[currentLanguage]}</button>
        `;
        cartContainer.appendChild(itemDiv);
    });

    totalItemsElement.textContent = `${translations.totalItems[currentLanguage]} ${totalItems}`;
    totalPriceElement.textContent = `${translations.totalPrice[currentLanguage]} €${totalPrice.toFixed(2)}`;
}

// Удаление товара из корзины
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Загрузка языка при загрузке страницы
window.onload = () => {
    currentLanguage = localStorage.getItem("language") || "ru";
    updateLanguage();
    renderCart();
};
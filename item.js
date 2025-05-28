function renderItem() {
    // Defining the current language from the global variable currentLang
    const translations = {
        price: {
            ru: "Цена:",
            en: "Price:"
        },
        back: {
            ru: "Назад",
            en: "Back"
        },
        addToCart: {
            ru: "В корзину",
            en: "Add to cart"
        },
        productNotFound: {
            ru: "Продукт не найден. :(",
            en: "Product not found. :("
        },
        alertAddToCart: {
            ru: "Ваш товар \"{product}\" успешно добавлен в корзину!",
            en: "Your product \"{product}\" has been successfully added to the cart!"
        }
    };

    const product = JSON.parse(sessionStorage.getItem("currentProduct"));

    if (!product) {
        document.getElementById("item-container").innerHTML = `<p>${translations.productNotFound[currentLang]}</p>`;
        return;
    }

    // Preparing a description based on the current language
    const description = product[2][currentLang] || "Описание недоступно на этом языке.";
    document.getElementById("item-container").innerHTML = `
        <div class="item-details">
            <img class="item-image" src="${product[4]}" alt="${product[0]}" />
            <div class="item-info">
                <h2>${product[0]}</h2>
                <p>${description}</p>
                <p><strong>${translations.price[currentLang]}</strong> ${product[3]}</p>
                <button onclick="addToCart()">${translations.addToCart[currentLang]}</button>
                <button onclick="window.location.href='production.html';">${translations.back[currentLang]}</button>
            </div>
        </div>
    `;
}

function addToCart() {
    const translations = {
        alertAddToCart: {
            ru: "Ваш товар \"{product}\" успешно добавлен в корзину!",
            en: "Your product \"{product}\" has been successfully added to the cart!"
        }
    };

    const product = JSON.parse(sessionStorage.getItem("currentProduct"));

    if (!product) {
        alert("Error: Product data is missing.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item[0] === product[0]);

    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    const alertMessage = translations.alertAddToCart[currentLang].replace("{product}", product[0]);
    alert(alertMessage);
}

// Updating content when changing the language
document.addEventListener('languageChange', renderItem);

// Initializing the page
window.onload = renderItem;
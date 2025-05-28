let currentLang = 'ru'; // Default russian

// Mapping video links for different languages
const videoUrls = {
    ru: "https://www.youtube.com/embed/ZoxRHYclHhk?si=Ms6TAefhNQYJ3MMS", // Russian
    en: "https://www.youtube.com/embed/TnESvNxrJLM?si=e9JYqOnXktA3Ik9o"  // English
};

function toggleLanguage() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru'; //Switching between languages
    document.getElementById('languageToggle').textContent = currentLang === 'ru' ? 'EN' : 'RU'; // Changing the text of the button

    // Updating the iframe depending on the selected language
    document.getElementById('videoIframe').src = videoUrls[currentLang];

    // Switching the text on the page (if there are such elements)
    document.querySelectorAll('[data-ru][data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${currentLang}`);
    });

    // Calling the language change event
    const event = new Event('languageChange');
    document.dispatchEvent(event);
}
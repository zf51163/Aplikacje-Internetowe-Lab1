// script.ts

// Definicja interfejsu przechowującego informacje o stylach
interface StyleInfo {
    name: string;
    file: string;
}

// Stan aplikacji
const state = {
    currentStyle: 'default', // Domyślny styl
    styles: {
        default: 'styles/default.css', // Domyślny plik stylu
        alternate: 'styles/alternate.css', // Przykładowy inny plik stylu
        custom: 'styles/custom.css', // Nowy plik stylu
        // Dodaj więcej stylów według potrzeb
    } as Record<string, string>,
};

// Funkcja do dynamicznego zmieniania stylu strony
function changeStyle(newStyle: string) {
    const head = document.head;

    // Usuń stary styl
    const oldStyle = document.getElementById('current-style');
    if (oldStyle) {
        head.removeChild(oldStyle);
    }

    // Dodaj nowy styl
    const link = document.createElement('link');
    link.id = 'current-style';
    link.rel = 'stylesheet';
    link.href = state.styles[newStyle];
    head.appendChild(link);

    // Zaktualizuj stan
    state.currentStyle = newStyle;
}

// Wywołaj funkcję zmieniającą styl po załadowaniu strony
window.onload = () => {
    changeStyle(state.currentStyle);
};

// Przykładowe użycie: zmiana stylu po kliknięciu na link
const alternateStyleLink = document.getElementById('change-to-alternate-style');
if (alternateStyleLink) {
    alternateStyleLink.addEventListener('click', () => {
        changeStyle('alternate');
    });
}

// Dodaj nowe użycie: zmiana stylu po kliknięciu na inny link
const customStyleLink = document.getElementById('change-to-custom-style');
if (customStyleLink) {
    customStyleLink.addEventListener('click', () => {
        changeStyle('custom');
    });
}

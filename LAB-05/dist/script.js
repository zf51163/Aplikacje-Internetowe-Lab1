/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/


// script.ts
// Stan aplikacji
var state = {
  currentStyle: 'default',
  // Domyślny styl
  styles: {
    "default": 'styles/default.css',
    // Domyślny plik stylu
    alternate: 'styles/alternate.css',
    // Przykładowy inny plik stylu
    custom: 'styles/custom.css' // Nowy plik stylu
    // Dodaj więcej stylów według potrzeb
  }
};
// Funkcja do dynamicznego zmieniania stylu strony
function changeStyle(newStyle) {
  var head = document.head;
  // Usuń stary styl
  var oldStyle = document.getElementById('current-style');
  if (oldStyle) {
    head.removeChild(oldStyle);
  }
  // Dodaj nowy styl
  var link = document.createElement('link');
  link.id = 'current-style';
  link.rel = 'stylesheet';
  link.href = state.styles[newStyle];
  head.appendChild(link);
  // Zaktualizuj stan
  state.currentStyle = newStyle;
}
// Wywołaj funkcję zmieniającą styl po załadowaniu strony
window.onload = function () {
  changeStyle(state.currentStyle);
};
// Przykładowe użycie: zmiana stylu po kliknięciu na link
var alternateStyleLink = document.getElementById('change-to-alternate-style');
if (alternateStyleLink) {
  alternateStyleLink.addEventListener('click', function () {
    changeStyle('alternate');
  });
}
// Dodaj nowe użycie: zmiana stylu po kliknięciu na inny link
var customStyleLink = document.getElementById('change-to-custom-style');
if (customStyleLink) {
  customStyleLink.addEventListener('click', function () {
    changeStyle('custom');
  });
}
/******/ })()
;
// src/lib/stores/theme.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Bestem start-tema. Bruk 'dark' som standard hvis koden kjører på server.
const defaultValue = 'dark';
const initialValue = browser ? (window.localStorage.getItem('theme') ?? defaultValue) : defaultValue;

// Lag en "writable" store.
export const theme = writable(initialValue);

// Når verdien i store-en endres, oppdater localStorage og <html>-klassen.
theme.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('theme', value);
        if (value === 'light') {
            document.documentElement.classList.add('light-mode');
        } else {
            document.documentElement.classList.remove('light-mode');
        }
    }
});
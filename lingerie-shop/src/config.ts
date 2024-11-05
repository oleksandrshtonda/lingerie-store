// src/config.ts

// Определяем константы для базового URL и порта
const LOCAL_BASE_URL = "http://127.0.0.1";
const REMOTE_BASE_URL = "http://116.203.195.165";
const PORT = "8080";

// Переключение между локальным и удаленным URL
export const BASE_URL = `${LOCAL_BASE_URL}:${PORT}`;
// Если хотите переключиться на удаленный, замените строку выше на:
// export const BASE_URL = `${REMOTE_BASE_URL}:${PORT}`;

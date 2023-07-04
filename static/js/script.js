const socket = new WebSocket("ws://localhost:3000/index");

// Событие открытия соединения
socket.onopen = function() {
    console.log("Соединение установлено.");
};

// Событие получения сообщения
socket.onmessage = function(event) {
    console.log("Получено сообщение: " + event.data);
};

// Событие закрытия соединения
socket.onclose = function(event) {
    console.log("Соединение закрыто.", event);
};

// Событие ошибки
socket.onerror = function(error) {
    console.error("Произошла ошибка:", error);
};

// Отправка сообщения серверу
socket.send("Привет, сервер!");

// Закрытие соединения
socket.close();
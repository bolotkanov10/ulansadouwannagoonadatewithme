const express = require('express');  // Подключаем Express
const fetch = require('node-fetch');  // Подключаем node-fetch для отправки запросов в Telegram

const app = express();
const port = 3000;

// Middleware для парсинга JSON в теле запроса
app.use(express.json());

// Маршрут для обработки POST-запроса на отправку уведомления
app.post('/sendNotification', (req, res) => {
    const botToken = "7843397599:AAHaeF-Ubq_gHsPhJX1E5nyyZtLc7jiSyRA";  // Токен твоего бота
    const chatId = "395607796";  // chat_id для получения сообщений
    const message = req.body.message || "Сообщение не передано";  // Сообщение из тела запроса

    // Отправляем запрос в Telegram
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
        .then(response => response.json())  // Преобразуем ответ в формат JSON
        .then(data => {
            console.log("Уведомление отправлено:", data);
            res.json({ success: true, data });  // Отправляем успешный ответ клиенту
        })
        .catch(error => {
            console.error("Ошибка отправки сообщения:", error);
            res.status(500).json({ success: false, error: error.message });  // Отправляем ошибку клиенту
        });
});

// Запуск сервера на порту 3000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

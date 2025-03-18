const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const botToken = '7843397599:AAHaeF-Ubq_gHsPhJX1E5nyyZtLc7jiSyRA'; // Твой токен
const chatId = '395607796'; // Твой chat_id

// Настроим middleware для обработки JSON
app.use(express.json());

app.post('/sendNotification', async (req, res) => {
    const message = req.body.message || 'Привет, это уведомление!';

    try {
        const response = await axios.get(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            params: {
                chat_id: chatId,
                text: message
            }
        });

        if (response.data.ok) {
            res.status(200).send('Уведомление отправлено!');
        } else {
            res.status(500).send('Ошибка при отправке уведомления');
        }
    } catch (error) {
        res.status(500).send('Ошибка при запросе в Telegram API');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});


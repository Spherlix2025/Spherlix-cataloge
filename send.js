export default async function handler(req, res) {
  const { message } = req.query;

  const TELEGRAM_BOT_TOKEN = '7605499569:AAFgZHwE0DbXyCzQzFHGiS-Fogiw6_YrQfw';
  const CHAT_ID = '885250652';

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(telegramUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
    }),
  });

  const data = await response.json();

  if (data.ok) {
    res.status(200).json({ success: true, telegram_response: data });
  } else {
    res.status(500).json({ success: false, telegram_response: data });
  }
}

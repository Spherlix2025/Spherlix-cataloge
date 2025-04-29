export default async function handler(req, res) {
  const { imageBase64, caption } = req.body;

  const imgbbApiKey = "6c1fac77f9ae91fedcbd8ad0b7426a17";
  const telegramToken = "7605499569:AAFgZHwE0DbXyCzQzFHGiS-Fogiw6_YrQfw";
  const chatId = "885250652";

  if (!imageBase64) {
    return res.status(400).json({ error: "No imageBase64 provided" });
  }

  // 1. Загрузка на ImgBB
  const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
    method: "POST",
    body: new URLSearchParams({
      image: imageBase64,
    }),
  });

  const imgbbData = await imgbbResponse.json();

  if (!imgbbData.success) {
    return res.status(500).json({ error: "Failed to upload to ImgBB", details: imgbbData });
  }

  const imageUrl = imgbbData.data.url;

  // 2. Отправка в Telegram
  const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendPhoto`;
  const tgResponse = await fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      photo: imageUrl,
      caption: caption || "Новое изображение",
    }),
  });

  const tgData = await tgResponse.json();

  res.status(200).json({
    imgbbUrl: imageUrl,
    telegramResult: tgData,
  });
}

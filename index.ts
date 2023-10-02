const express = require("express");
const qrCode = require("qrcode");

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.post("/generate", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: "Data is required." });
  }

  try {
    qrCode.toDataURL(data, (err, url) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "QR Code generation failed." });
      }

      res.json({ qrCodeUrl: url });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

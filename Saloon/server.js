const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// Configurar email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "SEUEMAIL@gmail.com",
    pass: "SENHA_DE_APP"
  }
});

app.post("/agendar", async (req, res) => {
  const { nome, phone, service, date, msg } = req.body;

  const texto = `
Novo agendamento:

Nome: ${nome}
Telefone: ${phone}
Serviço: ${service}
Data: ${date}
Observações: ${msg}
  `;

  try {
    await transporter.sendMail({
      from: "SEUEMAIL@gmail.com",
      to: "contato@studiorodrigues.com.br",
      subject: "Novo agendamento",
      text: texto
    });

    res.json({ ok: true });
  } catch (erro) {
    res.json({ ok: false });
  }
});

app.listen(3000, () => console.log("Servidor rodando"));

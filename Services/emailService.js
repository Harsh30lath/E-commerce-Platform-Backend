const transporter = require('../Config/email');

const sendOrderEmail = async (to, orderId) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Order Confirmed ✅",
    html: `
      <h2>Order Confirmed</h2>
      <p>Your order <b>#${orderId}</b> is placed successfully.</p>
    `
  });
};

module.exports = { sendOrderEmail }
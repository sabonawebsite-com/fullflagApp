const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/chapa-initiate', async (req, res) => {
  try {
    const { amount, currency, email, first_name, last_name, tx_ref } = req.body;

    const response = await axios.post('https://api.chapa.co/v1/transaction/initialize', {
      amount,
      currency,
      email,
      first_name,
      last_name,
      tx_ref,
      callback_url: 'YOUR_CALLBACK_URL',
      return_url: 'YOUR_RETURN_URL',
    }, {
      headers: {
        Authorization: `Bearer YOUR_CHAPA_SECRET_KEY`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ checkout_url: response.data.data.checkout_url });
  } catch (error) {
    res.status(500).json({ message: error.response?.data?.message || error.message });
  }
});

module.exports = router;
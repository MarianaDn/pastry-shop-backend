const router = require("express").Router();
const STRIPE_KEY =
  "sk_test_51KqguWGlbe0fsJF1QsLWj7idW5dPF0b1cPJDlbDwyXdHj9Ylj3GSnDT75b2tdUEXepALKqZoyM13pfWk9i7EXryM002x1LiVb3";
const stripe = require("stripe")(STRIPE_KEY);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;

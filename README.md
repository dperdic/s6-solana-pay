# S6 - Solana Pay

Sixth assignment for the Solana Summer Fellowship 2024.

## Description

### Assignment

```
Build a Point-Of-Sale Web UI for adding products and checking out with Solana Pay.

The payment confirmation should be displayed after checkout.
```

### Description

The app simulates a POS machine where the user adds the items to the cart and when the `Buy` button is pressed, the order is created and a QR code for Solana Pay is displayed.

The user then has 30 seconds to scan the QR code and pay.

The transaction is checked every 5 seconds for verification.

After it has been verified, a notification will be displayed that the payment is successful.

If the transaction is not verified within the time limit a notification will be displayed that the transaction was not successful.

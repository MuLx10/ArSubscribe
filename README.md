# ArSubscribe: Listen to Chain Transactions with Ease! 🎧
🔗 Link: [ArSubscribe](https://arweave.net/kyDm6gDZM9ehMc1Rm1YtnGoY884MM8K0UYrNaGZEdvw)

## 💡 Inspiration
The inspiration behind ArSubscribe's on-chain transaction notification system was the growing need for individuals to stay informed and in control of their cryptocurrency activities within the decentralized finance (DeFi) ecosystem. As blockchain enthusiasts, we recognized the importance of real-time updates for wallet transactions in the ever-evolving world of cryptocurrencies.

## What it does
ArSubscribe offers a seamless solution to keep users updated on their on-chain transactions. By subscribing to our notification system, users receive instant email alerts whenever any transaction involving their wallet address occurs on the blockchain. Our user-friendly landing page provides a clear and concise explanation of our protocol, illustrating why it's an indispensable tool for anyone engaged in blockchain and DeFi.

## 🏗️ Building & Blasting Off:
🛠️ Clone the repo with Git: git clone https://github.com/MuLx10/ArSubscribe
```bash
 $ git clone https://github.com/MuLx10/ArSubscribe
```

### Running the ArSubscribe app
1. To run the app locally, install dependencies and build the app.
   ```bash
   $ cd app
   $ npm i
   $ npm run build
   ```
2. Start the app and point the browser to [localhost:5000](http://localhost:5000)
   ```bash
   $ npm start
   ```

### Building the email service:
The email service requires an email and password from which the email will be sent to subscribed users.

1. Create a .env file in the `cron-mailer` folder with the following properties:
   ```bash
   EMAIL_ID=<sender-email-id>
   EMAIL_PASSWORD=<password>
   ```
2. Run the build and run the mailer service.
   ```bash
   $ cd cron mailer
   $ npm i
   $ npm run build && npm start
   ```
Hurray 🎉! The service is started.

### Requirements:
1. node.js (>=16.15.0)
2. npm


## How we built it
The development of ArSubscribe's on-chain transaction notification system involved several key steps:
- **Subscription** - Using Arweave as DB the user subscription data is stored as a wallet - email pair. It uses Arweave transactions with the support of `tags` to store the subscription data.
- **Email service** - The service listens to the Arweave net via GraphQL queries for all the transactions happening pertaining to subscribed users, it pulls the transaction information including block details, and creates a notification email. The emails are sent using Arsubscribe753@gmail.com via `nodemailer`.
- **UI** - The App offers an intuitive way to subscribe to the notifications. TO login into the app users can connect with their ArConnect wallet.

## Challenges we ran into

One of the main challenges was to come up with a very light app (within 100Kb).

## Accomplishments that we're proud of
We are proud to have our app deployed to the [arweave.net](https://arweave.net) and ready to use 🍾.

## What we learned
The hackathon was a very fun experience with full of learnings.

## What's next for ArSubscribe
Looking ahead, we have exciting plans for ArSubscribe:

- **Customizable Alerts:** Enhancing the notification system to allow users to customize their alert preferences, including specific transaction types and thresholds.
- **Mobile App:** We are exploring the development of a dedicated mobile app to provide users with even more convenient access to transaction alerts on the go.
- **Instant Alert**: Currently alerts are fired when blocks are successfully mined, we want to add support for pending transactions as well.


ArSubscribe is all about helping out blockchain fans with up-to-the-minute info on their crypto moves. We're here to make sure you're always in the loop when it comes to the fast-paced universe of decentralized finance. Jump in now and keep up with all your crypto adventures

Snaps:
![image](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/557/361/datas/original.png)
![image](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/557/364/datas/original.png)
![259137707-7e2f853e-0d8b-4f6a-8b98-87fd3357a7f0](https://github.com/MuLx10/ArSubscribe/assets/23444642/87843623-8d88-4d84-a66c-db388468fefb)

# ArSubscribe: Listen to the transactions on chain
https://arweave.net/kyDm6gDZM9ehMc1Rm1YtnGoY884MM8K0UYrNaGZEdvw

## Inspiration
The inspiration behind ArSubscribe's on-chain transaction notification system was the growing need for individuals to stay informed and in control of their cryptocurrency activities within the decentralized finance (DeFi) ecosystem. As blockchain enthusiasts, we recognized the importance of real-time updates for wallet transactions in the ever-evolving world of cryptocurrencies.

## What it does
ArSubscribe offers a seamless solution to keep users updated on their on-chain transactions. By subscribing to our notification system, users receive instant email alerts whenever any transaction involving their wallet address occurs on the blockchain. Our user-friendly landing page provides a clear and concise explanation of our protocol, illustrating why it's an indispensable tool for anyone engaged in blockchain and DeFi.

## How we built it
The development of ArSubscribe's on-chain transaction notification system involved several key steps:
- **Subscription** - Using Arweave as DB the user subscription data is stored as wallet - email pair. It uses Arweave transactions with the support of `tags` to store the subscription data.
- **Email service** - The service listens to the Arweave net via GraphQL queries for all the transactions happening pertaining to subscribed users, it pulls the transaction information including block details and creates a notification email. The emails are send using Arsubscribe753@gmail.com via `nodemailer`.
- **UI** - The App offers an intutive way to susbscribe, it is connected with ArConnect wallet.

## Challenges we ran into
One of the main challenge was to come up with an app within 100Kb.

## Accomplishments that we're proud of

## What we learned

## What's next for ArSubscribe
Looking ahead, we have exciting plans for ArSubscribe:

- **Customizable Alerts:** Enhancing the notification system to allow users to customize their alert preferences, including specific transaction types and thresholds.

- **Mobile App:** We are exploring the development of a dedicated mobile app to provide users with even more convenient access to transaction alerts on the go.



ArSubscribe is dedicated to empowering blockchain enthusiasts with real-time insights into their cryptocurrency activities, ensuring they never miss a beat in the dynamic world of decentralized finance. Join us today and stay at the forefront of your crypto endeavors.
Snaps:
![image](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/557/361/datas/original.png)
![image](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/557/364/datas/original.png)
![image](https://github.com/MuLx10/ArSubscribe/assets/23444642/7e2f853e-0d8b-4f6a-8b98-87fd3357a7f0)

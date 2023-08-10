import Arweave from "arweave";
import {createTransport} from 'nodemailer';
import express from 'express';

var cron = require('node-cron');
require('dotenv').config()


interface ISubscriptionData {
  id: string;
  owner: string;
  address: string;
  email: string;
}

const INTERVAL = 5*60*1000; // 2mins
const EMAIL_ID = process.env.EMAIL_ID
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
});

// Nodemailer configuration
const transporter = createTransport({
  service: 'gmail', // e.g., 'gmail'
  auth: {
    user: EMAIL_ID,
    pass: EMAIL_PASSWORD,
  },
});

const subscriptionQuery = {
  query: `
    query {
      transactions(
        tags: [{name: "App-Name", values: ["ArSubscribe"]}]) 
      {
        edges {
          node {
            id,
            owner {
              address
            }
          }
        }
      }
    }`
}

function getTransactionOwnerQuery(address: string) {
  const query = {
    query: `
    query {
      transactions(
        owners: ["`+address+`"]
      ) {
        edges {
          node {
            id
            data {
              size
              type
            }
            recipient
            owner {
              address
            }
            block {
              height
              timestamp
            }
            tags {
              name
              value
            }
          }
        }
      }
    }`
  }
  return query
}

function getTransactionRecipientQuery(address: string) {
  const query = {
    query: `
    query {
      transactions(
        recipients: ["`+address+`"]
      ) {
        edges {
          node {
            id
            data {
              size
              type
            }
            recipient
            owner {
              address
            }
            block {
              height
              timestamp
            }
            tags {
              name
              value
            }
          }
        }
      }
    }`
  }
  return query
}

async function getAllSubscriptions(): Promise<ISubscriptionData[]> {
  const response = await arweave.api.post('/graphql', subscriptionQuery);
  const nodes = response.data.data.transactions.edges;
  if (nodes === null) return [];
  return new Promise(async (resolve, reject) => {
    const subscriptionData = [];
    for(let i=0;i<nodes.length;i++) {
      try {
        const id = nodes[i].node.id;
        const owner = nodes[i].node.owner.address
        const data = await arweave.api.get(id);
        const email = data.data.email;
        const address = data.data.address;
        if (email!=null && email.length != null && email.length > 8)
          subscriptionData.push({id, email, address, owner});
      }
      catch(e) {
        console.error(e)
      }
    }

    resolve(subscriptionData)
  })
}

// Function to format the timestamp to a readable date
function formatDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toISOString();
}

// Mail template
function getMailTemplate(data: any) {
  const mailTemplate = `
  Subject: Transaction Notification - ArSubscribe App

  We would like to inform you about a recent transaction on the ArSubscribe App.

  Transaction ID: ${data.id}
  Transaction Size: ${data.data.size} bytes
  Transaction Type: ${data.data.type || '[Not specified]'}

  Recipient Address: ${data.recipient}
  Owner Address: ${data.owner.address}

  Block Height: ${data.block.height}
  Timestamp: ${formatDate(data.block.timestamp)}

  Tags:
  ${data.tags.map((tag: any) => `- ${tag.name}: ${tag.value}`).join('\n')}

  Thank you for using ArSubscribe App.
  `;
  return mailTemplate;
}


async function getAllEmails(allSubsriptions: ISubscriptionData[], now: number) {
  const emails: { body: string; to: string; }[] = []

  for(let i=0;i<allSubsriptions.length;i++) {
    const address = allSubsriptions[i].address
    const response0 = await arweave.api.post('/graphql', getTransactionOwnerQuery(address));
    const nodes0 = response0.data.data.transactions.edges;

    const response1 = await arweave.api.post('/graphql', getTransactionRecipientQuery(address));
    const nodes1 = response1.data.data.transactions.edges;

    const nodes = [...nodes0, ...nodes1];

    const nodeValues = nodes.map((e: { node: any; }) => e.node);
    const filteredTxs = nodeValues.filter((e: { block: { timestamp: number; }; }) => {
      if (e.block) {
        const timestamp: number = e.block.timestamp;
        if (timestamp) {
          const diff = now-timestamp*1000;
          return diff <= INTERVAL;
        }
      }
      return false;
    })

    filteredTxs.map((e: any) => {
      emails.push({
        body: getMailTemplate(e),
        to: allSubsriptions[i].email
      })
    })
  }

  return emails;
}

async function main() {
  const now = Date.now()
  const allSubsriptions = await getAllSubscriptions();
  const emails = await getAllEmails(allSubsriptions, now);

  console.log(allSubsriptions)
  console.log(emails.length)

  emails.map(email => {
    const mailOptions = {
      from: EMAIL_ID,
      to: email.to,
      subject: '[ArSubscribe]: A transaction has occurred involving your wallet address.  ',
      text:  email.body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  })
}

cron.schedule('*/3 * * * *', () => {
  main();
});

const app = express()
app.get('/', (req, res) => {
  res.send("Hi from ArSubscribe mailer service");
})

const port = process.env.port || 80;
app.listen(port, function () {
  console.log("Example app listening at %s", port)
})

setInterval(() => {
  fetch('https://arsubscribe-cron.onrender.com')
    .then(() => {})
    .catch((e) => {
      console.log(e);
    })
}, INTERVAL);

main();
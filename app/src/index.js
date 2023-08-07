import { arweave } from "./arweave-init";
import { getDataForSubscription } from "./query";

let address = null;

function validateEmail() {
  const emailInput = document.getElementById('email');
  const emailValue = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailValue === '') {
    alert('Please enter your email address.');
    return false;
  } else if (!emailRegex.test(emailValue)) {
    alert('Please enter a valid email address.');
    return false;
  }
  return true;
}

async function arConnect(){
  if (!window.arweaveWallet) {
    throw Error('ArConnect not found!')
  }
  // Custom permissions
  const customPermissions = [
    'ACCESS_ADDRESS', 'ACCESS_ALL_ADDRESSES',
    'SIGN_TRANSACTION', 'DISPATCH',
    'ACCESS_PUBLIC_KEY', 'SIGNATURE' 
  ];

  // Get permissions
  let permissions = []
  try {
    permissions = await window.arweaveWallet.getPermissions()
  } catch (err) {
    console.error('arconnect', err)
    throw new Error('ArConnect: Error loading permissions ')
  }

  // Filter permissions
  const finalPermissions = [];
  for (let i = 0; i < customPermissions.length; i++) {
    if (permissions.indexOf(customPermissions[i]) < 0) {
      finalPermissions.push(customPermissions[i]);
    }
  }

  try {
    if (finalPermissions.length) {
      const host = arweave.api.config.host ? arweave.api.config.host : 'localhost';
      const port = arweave.api.config.port ? +arweave.api.config.port : 1984;
      const protocol = arweave.api.config.protocol ? arweave.api.config.protocol : 'http';

      await window.arweaveWallet.connect(
        finalPermissions,
        {
          name: 'Arcode Studio',
          logo: 'https://arweave.net/wJGdli6nMQKCyCdtCewn84ba9-WsJ80-GS-KtKdkCLg'
        },
        { 
          host: host,
          port: port,
          protocol: protocol
        }
      )
    }
    address = await arweave.wallets.getAddress()
    if (address) {
      const connet = document.getElementById('connectButtonContainer');
      if (connet != null) {
          connet.style.display = 'none'
      }

      const walletContainer = document.getElementById('walletAddressContainer');
      if (walletContainer!=null) {
          walletContainer.style.display = 'block'
      }

      const wallet = document.getElementById('walletAddress');
      if (wallet != null) {
          wallet.innerText = address
      }
  }
    
  } catch (error) {
    console.error('arconnect', error)
    throw new Error('ArConnect error address')
  }

  const email = await getDataForSubscription(address);
  console.log(email)

  // User is already subscribed.
  setValueAndDisable(email)
  return address
}
        
async function subscribe() {
  if (address ==null) {
    alert("Pleas login");
    return
  }

  const emailInput = document.getElementById('email');
  const emailValue = emailInput.value.trim();

  
  const subscriptionData = JSON.stringify({
    address,
    email: emailValue,
    timestamp: Date.now(),
  });

  try {
    // use arweave-js to create a transaction
  let tx = await arweave.createTransaction({ data: subscriptionData});

  // add some custom tags to the transaction
  tx.addTag('App-Name', 'App1')
  tx.addTag('Content-Type', 'application/json')
  tx.addTag('Version', '1.0.0')
  tx.addTag('Type', 'post')

  // use the browser wallet to dispatch() the transaction
  let result = await window.arweaveWallet.dispatch(tx);
  setValueAndDisable(null);
  console.log(result)
  } catch (error) {
    console.log('Error creating transaction:', error);
  }
}

function setValueAndDisable(value) {
  const emailInput = document.getElementById('email');
  if (emailInput != null) {
    emailInput.disabled = true;
    if (value) {
      emailInput.value = value
    }
  }
  const subscribeBtn = document.getElementById('subscribe')
  if (subscribeBtn != null) {
    subscribeBtn.innerText = 'Subscribed'
    subscribeBtn.disabled = true;
  }
}

document.getElementById('newsletterForm').addEventListener('submit', function(event) {
  event.preventDefault();
  if (validateEmail()) {
    subscribe();
  }
});

document.getElementById("connectButtonContainer").addEventListener("click", function(event){
  arConnect();
})

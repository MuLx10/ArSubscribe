import { arweave } from "./arweave-init"

function buildQuery(address) {
    const query = {
        query: `
        query {
            transactions(
              owners:["`+address+`"],
              tags: [{name: "App-Name", values: ["App1"]}]) 
            {
              edges {
                node {
                  id
                }
              }
            }
          }`
    }
    return query
}



export async function getDataForSubscription(address) {
    if (!address) return;

    try {
        const response = await arweave.api.post('/graphql', buildQuery(address));
        const nodes = response.data.data.transactions.edges;
        const ids = nodes.map(n => n.node.id);
        return new Promise(async (resolve, reject) => {
            for(let id in ids) {
                try{
                    const data = await arweave.api.get(ids[id]);
                    const email = data.data.email;
                    if (email.length>0) {
                        resolve(email);
                    }
                }
                catch(e) {
                    console.err(e);
                }
            }
            reject(null)
        });
    }
    catch(e) {
        console.err(e)
    }
}
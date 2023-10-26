const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

// Welcome sir/madame, your name please :)
const NAME = "Anna Stehr";

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const myMerkleTree = new MerkleTree(niceList);

  const root = myMerkleTree.getRoot();
  const index = niceList.findIndex( e => e == NAME);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof : myMerkleTree.getProof(index),
    name : NAME,
    
    // TODO: add request body parameters here!
  });

  console.log({ gift });
}

main();
const Web3 = require('web3');

function createWeb3() {
  if (typeof window.web3 === 'undefined'){
    throw new Error('No web3 provider found. Are you sure Metamask or Mist is installed?');
  }
  console.log("Using web3 version: " + Web3.version);

  return new Web3(window.web3.currentProvider);
}

export const web3 = createWeb3();

export async function getNetworkId() {
  return web3.eth.net.getId();
}

export async function getAccount() {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
}

export async function createContract(contractMetadata) {
  const netId = await getNetworkId();

  if (!(netId in contractMetadata.networks)) {
    throw new Error(
      `Network id ${netId} not found in contractMetadata.networks.
      Are you sure this contract is deployed on this network? If
      you've just deployed the contract, try restarting your server
    `);
  }

  const address = contractMetadata.networks[netId].address;

  return new web3.eth.Contract(contractMetadata.abi, address);
}

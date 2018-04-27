import { createContract, getAccount } from '../web3';
// const cryptotreesMetadata = require('../../contracts/CryptoTrees.json');
import { CryptoTreesCore } from 'cryptotrees-contracts';

console.log(CryptoTreesCore);

class CryptotreesContract {
  constructor(contract) {
    this.contract = contract;
  }

  getAccount = async () => {
    const address = await getAccount();
    return address;
  }

  getMyTrees = async () => {
    const address = await getAccount();
    document.account = address; // This is for convenient debugging, but TODO: improve it
    return this.contract.methods.getAllTokens(address).call({from: address});
  }

  getTreeMetadata = async (treeId) => {
    const jsonTree = await this.contract.methods.genome(treeId).call();
    return JSON.parse(jsonTree);
  }

  buildTokenId = async (tree, address) => {
    const metadata = JSON.stringify(tree);
    return this.contract.methods.buildTokenId(metadata, address).call();
  }

  getAllTrees = async () => {
    const ids = await this.contract.methods.allTrees().call();
    return ids;
  }

  getPartyingTrees = async () => {
    const address = await getAccount();
    const ids = await this.contract.methods.availableToParty().call({from: address});
    // Exclude all ids that are === "0" (those are non-partying trees)
    // We're using "0" (string) because web3 returns string instead of numbers...
    return ids.filter(i => i !== "0");
  }

  growNewTree = (address, tokenId, tree) => {
    // We DON'T WANT this function to be marked as async, because it would
    // force it to return a Promise, and we want to keep the original
    // PromiEvent that's returned by web3:
    const metadata = JSON.stringify(tree);
    return this.contract.methods.growNewTree(address, tokenId, metadata).send({from: address});
  }
}

export default async function createCryptotreesContract() {
  const contract = await createContract(CryptoTreesCore);
  document.contract = contract;  // This is for convenient debugging, but TODO: improve it
  return new CryptotreesContract(contract);
}

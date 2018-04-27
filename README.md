# CS359B Project CryptoTrees

Stanford trees are everyone. They are coming to get you. Well at least when they are not partying or being hungover. 

## Technologies used

* Solidity
* React

## Istallation intructions

### Development setup (one-time only)

The JSON file containing the ABI and address of our core smart contract
is packaged as a Node module, so that we can easily import it from our front-end.

However, since this module is not published on NPM, here's how to setup your
environment when you start developing on CryptoTrees (assuming your CWD is the
root of this repository):

```
cd smart-contracts
npm link
cd ../front
npm install # if you haven't run it before
npm link cryptotrees-contracts
```

This will symlink the Node package exporting your contracts in the node_modules
of the front-end app, which will enable live reload of the contracts
whenever you re-deploy them on your local dev environment.

### Development

Once you have performed the setup steps above, open two terminal windows and run:

```
cd smart-contracts
truffle develop
```

(the above assumes you want to use truffle development console, but using Ganache is fine too)

```
cd front
npm start
```

A browser window should open. If it doesn't, your front-end should be exposed at http://localhost:3000

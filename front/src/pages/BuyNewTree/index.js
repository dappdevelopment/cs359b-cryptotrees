import React from 'react';

import { Link } from 'react-router-dom';
import Card from 'material-ui/Card';
import Grid from 'material-ui/Grid';

import { getAccount } from 'data/web3';


import CryptoTree from 'components/CryptoTree';

const randomTree = () => {
  return {
    eyesSize: Math.round(-20 + 40 * Math.random()),
    eyesAsymmetricity: Math.round(-15 + 30 * Math.random()),
    eyesTilt: Math.round(-30 + 60 * Math.random()),
    legsSize: Math.round(-30 + 60 * Math.random()),
    mouthSize: Math.round(-30 + 60 * Math.random()),
    mouthTilt: Math.round(-30 + 60 * Math.random()),
    bodyWidth: Math.round(-100 + 200 * Math.random()),
    bodyColor: Math.round(-180 + 360 * Math.random()),
    mouthColor: Math.round(-180 + 360 * Math.random()),
    eyesColor: Math.round(-180 + 360 * Math.random()),
    legsColor: Math.round(-180 + 360 * Math.random()),
  };
}

export default class BuyNewTree extends React.Component {
  web3 = null;
  cryptotreesContract = null;

  state = {
    tokenId: null,
    trees: [],
    loadingTree: false,
    confirmed: null,
  }

  async componentDidMount() {
    this.cryptotreesContract = this.props.contract;

    const myTrees = await this.cryptotreesContract.getMyTrees();
    const metadataPromises = myTrees.map(this.cryptotreesContract.getTreeMetadata);
    const metadata = await Promise.all(metadataPromises);

    this.setState({trees: myTrees, metadata});
  }

  getTreeMetadata = async (treeId) => {
    const metadata = await this.cryptotreesContract.getTreeMetadata(treeId);
    const tree = JSON.parse(metadata);
    this.setState({ tree });
  }

  buyTree = async () => {
    const tree = randomTree();
    const address = await getAccount();

    // buildTokenId is a view function, that we can call for free. This allows
    // to save gas when actually buying the tree:
    const id = await this.cryptotreesContract.buildTokenId(tree, address);

    this.setState({ tokenId: id });

    try {

      const tx = this.cryptotreesContract.growNewTree(address, id, tree)

      tx.on('confirmation', (confirmationNumber) => {
        this.setState({ confirmed: confirmationNumber });
      })
      .then(() => {
        localStorage.setItem('token_id', id); // TODO: Get rid of this
        //this.getTreeMetadata(id);  // This fails because the promise returns when tx is submitted not mined.
      });
    } catch(er) {
      console.error(er);
    }
  }

  render() {
    return (
      <div>
        <h1>Your trees</h1>

        {
          this.state.loadingTree && "Your tree is growing..."
        }

        <Grid container spacing={16}>
          {
            !this.state.loadingTree && this.state.trees && this.state.trees && this.state.metadata && this.state.trees.map((t, i) => {
              const tree = this.state.metadata[i];
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={t}>
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Card style={{width: 300, display: 'flex', justifyContent: 'center'}}>
                      <Link to={`/${t}`} style={{display: 'block', textAlign: 'center'}}>
                        <CryptoTree tree={tree} size={245} />
                        <h4>Cardinal #{t}</h4>
                      </Link>
                    </Card>
                  </div>
                </Grid>
              );
            })
          }
        </Grid>

        {
          this.state.confirmed &&
            <div>confirmed {this.state.confirmed} times</div>
        }

        <div style={{marginBottom: 32, textAlign: 'center'}}>
          <button onClick={this.buyTree} style={{margin: '2em 0', padding: '1em 4em'}}>Buy a new tree</button>
        </div>
      </div>
    )
  }
}

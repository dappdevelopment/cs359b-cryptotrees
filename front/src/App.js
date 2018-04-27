import React from 'react';
import styled from 'styled-components';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import createCryptotreesContract from 'data/trees/contract';

import DnaExplorer from './pages/DnaExplorer';
import BuyNewTree from './pages/BuyNewTree';
import TreeDetails from './pages/TreeDetails';
import Party from './pages/Party';
import Campus from './pages/Campus';

const Header = styled.header`
  background-color: #222;
  height: 54px;
  padding: 5px 0;
  color: white;
`;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

const MenuItem = styled.span`
  position: relative;
  margin: 0 5px;

  a {
    color: black;
    text-decoration: none;
  }

  font-size: 20px;
  font-weight: bold;

  &:hover {
    color: black;
  }

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: black;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }

  &:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`;

class App extends React.Component {
  state = {
    address: null,
    contract: null,
    loading: false,
  }

  cryptotreesContract = null;

  loadEthereum = async () => {
    const contract = await createCryptotreesContract();
    this.setState({ contract: contract });
    const account = await contract.getAccount();
    this.setState({ account: account });
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const contract = await createCryptotreesContract();
    this.setState({ contract: contract });
    const account = await contract.getAccount();
    this.setState({ account: account });

    this.cryptotreesContract = this.state.contract;

    // Periodically check if the metamask account has changed
    var intervalId = setInterval( async () => { 
      const contract = await createCryptotreesContract(); // TODO: how to DRY?
      this.setState({ contract: contract });
      const account = await contract.getAccount();
      if (this.state.account !== account) {     // Why do I need this?
        this.setState({ loading: true });     // Why do I need this?
        this.setState({ loading: false });
      }
      this.setState({ account: account });  // Why is this not enough to re-render and I need the if above?
    }, 1000);
    this.setState({intervalId: intervalId});

    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading || this.cryptotreesContract == null) return <div>Loading...</div>;

    return (
      <Router>
        <div>
          <Header>
            <Container>
              <Link to="/"><h1 style={{fontSize: '1.5em'}}>Cryptotrees</h1></Link>
            </Container>
          </Header>
          <Container>
            <div style={{textAlign: 'center', padding: '20px 0'}}>
              <MenuItem><Link to="/">My trees</Link></MenuItem> |
              {/* <MenuItem>Adopt</MenuItem> |  */}
              <MenuItem><Link to="/campus">White Plaza</Link></MenuItem> | 
              <MenuItem><Link to="/party">Party</Link></MenuItem> |
              <MenuItem><Link to="/explorer">Bio-X</Link></MenuItem>
            </div>

            <Switch>
              <Route path="/explorer" render={(props) => <DnaExplorer {...props} contract={this.cryptotreesContract} />} />
              <Route path="/party" render={(props) => <Party {...props} contract={this.cryptotreesContract} />} />
              <Route path="/campus" render={(props) => <Campus {...props} contract={this.cryptotreesContract} />} />
              <Route path="/:id" render={(props) => <TreeDetails {...props} contract={this.cryptotreesContract} />} />
              <Route path="/" render={(props) => <BuyNewTree {...props} contract={this.cryptotreesContract} />} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }


}

export default App;
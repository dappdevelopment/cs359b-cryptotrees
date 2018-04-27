import React from 'react';

import AsyncCryptoTreesGrid from 'components/AsyncCryptoTreesGrid';

export default class Parties extends React.Component {
  state = {
    loading: false,
    partyingTrees: [],
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const partyingTrees = await this.props.contract.getPartyingTrees();
    this.setState({ loading: false, partyingTrees });
  }

  render() {
    return (
      <div>
        <h1>Party</h1>

        {
          this.state.loading ?
            <div>Loading...</div>
            :
            <AsyncCryptoTreesGrid ids={this.state.partyingTrees} contract={this.props.contract} />
        }
      </div>
    )
  }
}

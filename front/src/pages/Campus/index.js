import React from 'react';

import AsyncCryptoTreesGrid from 'components/AsyncCryptoTreesGrid';

export default class Campus extends React.Component {
  state = {
    loading: false,
    allTrees: [],
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const allTrees = await this.props.contract.getAllTrees();
    this.setState({ loading: false, allTrees });
  }

  render() {
    return (
      <div>
        <h1>White Plaza</h1>
        {
          this.state.loading ?
            <div>Loading...</div>
            :
            <AsyncCryptoTreesGrid ids={this.state.allTrees} contract={this.props.contract} />
        }
      </div>
    )
  }
}

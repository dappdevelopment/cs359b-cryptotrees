import React from 'react';

import CryptoTree from 'components/CryptoTree';

export default class AsyncCryptoTree extends React.Component {
  state = {
    tree: null,
    loading: false,
  }

  async componentDidMount() {
    this.setState({loading: true});
    const {contract, id} = this.props;
    if (!contract) throw new Error("A contract instance must be provided to AsyncCryptoTree");
    if (!id) throw new Error("A tree id must be provided to AsyncCryptoTree");

    const tree = await contract.getTreeMetadata(id);
    this.setState({loading: false, tree});
  }

  render() {
    const { size } = this.props;
    return (
      <div style={{width: size, height: size}}>
        {
          this.state.loading || this.state.tree == null ?
            <div>Loading</div>
            :
            <CryptoTree size={size || null} tree={this.state.tree} />
        }
      </div>
    )
  }
}

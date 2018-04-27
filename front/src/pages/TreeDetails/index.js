import React from 'react';

import Grid from 'material-ui/Grid';

import AsyncCryptoTree from 'components/AsyncCryptoTree';

export default class TreeDetails extends React.Component {
  render() {
    const { match, contract } = this.props;
    const selectedId = match.params.id;

    return (
      <div>
        <h1>Branchy boi</h1>

        <Grid container spacing={24}>
          <Grid item xs={12} md={6} lg={4}>
            <AsyncCryptoTree contract={contract} id={selectedId} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <div style={{float: 'right'}}>
              <button>Party!</button>
            </div>
            <ul>
              <li><strong>Level:</strong> 666</li>
              <li><strong>Hungover:</strong> 666</li>
            </ul>
          </Grid>
        </Grid>
      </div>
    )
  }
}

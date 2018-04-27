import React from 'react';

import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';
import {Link} from 'react-router-dom';

import AsyncCryptoTree from 'components/AsyncCryptoTree';

export default class AsyncCryptoTreesGrid extends React.Component {
  render() {
    return (
      <Grid container spacing={16}>
        {
          this.props.ids.map((id) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Card style={{width: 300, display: 'flex', justifyContent: 'center'}}>
                    <Link to={`/${id}`} style={{display: 'block', textAlign: 'center'}}>
                      <AsyncCryptoTree size={245} contract={this.props.contract} id={id} />
                      <h4>Cardinal #{id}</h4>
                    </Link>
                  </Card>
                </div>
              </Grid>
            );
          })
        }
      </Grid>
    )
  }
}

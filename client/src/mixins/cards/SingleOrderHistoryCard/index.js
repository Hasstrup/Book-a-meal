import React, { Component, Fragment } from 'react';
import SingleOrderHistoryCardMain from './components/SingleOrderMain';
import RenderOrderInFocus from './components/RenderOrderInFocus';
import Composer from '../../../helpers/multiplier';

class SingleOrderHistoryCard extends Component {
    state = { isInFocus: false }
    handleClose = () => this.setState({ isInFocus: false })
    render() {
      return (
        <Fragment>
          { this.state.isInFocus && <RenderOrderInFocus data={this.props.data} handleClose={this.handleClose} /> }
          { !this.state.isInFocus && <SingleOrderHistoryCardMain data={this.props.data} handleClick={() => this.setState({ isInFocus: !this.state.isInFocus })} />}
        </Fragment>
      );
    }
}

export default Composer(SingleOrderHistoryCard);
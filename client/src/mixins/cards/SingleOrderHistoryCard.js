import React, { Component, Fragment } from 'react';
import moment from 'moment';
import MultiplyComponents from '../../helpers/multiplier';
import DisplayOrderCard from './SingleOrderCard/';
import RenderModal from '../../mixins/modals/';

const SingleOrderHistoryCardMain = ({ data,  handleClick }) => {
  const target = data.Meals[0];
  const defaultUri = 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_inbody_900x506%2Fpublic%2F1502824044%2Froyal-farms-best-gas-station-food-FT-SS0817.jpg%3Fitok%3Dig79fdSU&w=700&q=85';
  return (
    <div className="order-story-card" onClick={handleClick }>
      <div className="order-top">
        <img src={target.image || defaultUri} className="order-random-image" />
        <div className="order-main-details">
          <p className="order-contents">{target.name}</p>
        </div>
      </div>
      <p className="show-order-date">{moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
    </div>
  );
};

const RenderOrderInFocus = ({ data, handleClose }) => (
  <RenderModal display="none" handleClose={handleClose}> 
    <DisplayOrderCard meals={data.Meals} style={{ height: '55%', width: '40%', zIndex: 1000, alignSelf: 'center', right: '-25%' }}/>
  </RenderModal>
);
class SingleOrderHistoryCard extends Component {
  state = { isInFocus: false }
  handleClose = () => this.setState({ isInFocus: false })
  render() {
    return (
      <Fragment> 
        { this.state.isInFocus && <RenderOrderInFocus data={this.props.data} handleClose={this.handleClose} /> }
        { !this.state.isInFocus && <SingleOrderHistoryCardMain  data={this.props.data} handleClick={() => this.setState({ isInFocus: !this.state.isInFocus })} />}
      </Fragment>
    )
  }
}

export default MultiplyComponents(SingleOrderHistoryCard);

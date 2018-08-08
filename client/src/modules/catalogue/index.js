import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/catalogue.scss';
import { MainCatalogue } from '../../mixins/cards/singleMenu';
import { FetchCatalogue } from '../../actions/menus/';


class Catalogue extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    menus: PropTypes.arrayOf(PropTypes.object).isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount = () => {
    if (!this.props.menus) return this.fetchMenus();
  }

  fetchMenus = () => this.props.dispatch(FetchCatalogue(this.props.history));

  render = () => (
    <div className="main-body">
      <CatalogueFirstRow />
      <Selectors />
      <CatalogueGridMain history={this.props.history} menus={this.props.menus || []} />
    </div>
  );
}

/*= ========== Components ============================ */

const CatalogueFirstRow = () => (
  <div className="introductory-grid">
    <div className="side-one-IT">
      <div className="side-one-child-1">
        <p className="side-one-IT-cat"> Catalogue </p>
        <div className="side-one-trending"> Today</div>
      </div>
      <p className="side-one-IT-option"> <span> 237 </span> Menus </p>
      <p className="side-one-IT-option"> <span> 1034</span> Meal options </p>
      <p className="side-one-IT-option"> <span> 101 </span> Vendors</p>
    </div>

    <div className="side-two-IT">
      <p className="side-two-IT-info">
                Sharing a menu is super easy! There's no restrictions
                whatsoever, all you have to do set up your kitchen/catering
                service, add some meal options, set up a menu and we're good
                to go .
      </p>
      <p className="side-two-IT-info" id="side-two-share-button"> Share your menu now</p>
    </div>
  </div>
);


const Selectors = () => (
  <div className="options-grid">
    <p> Top </p>
    <p> Featured </p>
    <p> All </p>
    <p> Favourites </p>
    <p> Promote </p>
  </div>
);


const CatalogueGridMain = props => (
  <div className="main-items-grid">
    { /* remember to get some mock || main data to fill in this place */ }
    { MainCatalogue(props.menus)(props) }
  </div>
);

const mapStateToProps = state => ({
  menus: state.menus.catalog
});
// these should be refactored after the application is completed right
export default connect(mapStateToProps)(Catalogue);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/catalogue.scss';
import { MainCatalogue } from '../../mixins/cards/singleMenu';
import { FetchCatalogue } from '../../actions/menus/';
import NotEmpty from '../../hocs/NonEmpty';
import { DispatchNotification } from '../../actionTypes/misc';


class Catalogue extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    menus: PropTypes.arrayOf(PropTypes.object).isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount = () => {
    if (!this.props.menus.length) return this.fetchMenus();
  }

  fetchMenus = () => this.props.dispatch(FetchCatalogue(this.props.history));

  render = () => (
    <div className="main-body" style={{ minHeight: '100vh' }}>
      <CatalogueFirstRow />
      <CatalogueGridMain
        history={this.props.history}
        menus={this.props.menus || []}
        dispatch={this.props.dispatch}
        determineRenderBy={this.props.menus}
        text="looks like there are no menus set today"
        image="pizza"
        subtitle="add your own menu to the catalogue"
        callback={() => {
        this.props.history.push('/profile');
        if (!this.props.user) return this.props.dispatch(DispatchNotification('Immediately after sign up, you can set up your kitchen and add a menu. Pretty awesome right?'));
        if (this.props.user && !this.props.user.Kitchen) return this.props.dispatch(DispatchNotification('Set up a kitchen pronto and add your menu to the catalogue'));
        this.props.dispatch(DispatchNotification('Set a new menu of the day and let your customers order from the catalogue'));
      }}
        emptyContainerStyle={{
        height: '50%',
        position: 'relative',
        bottom: '-10vh'
      }}
      />
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

const CatalogueGridMainX = props => (
  <div className="main-items-grid">
    { /* remember to get some mock || main data to fill in this place */ }
    { MainCatalogue(props.menus)(props) }
  </div>
);

const CatalogueGridMain = NotEmpty(CatalogueGridMainX);

const mapStateToProps = state => ({
  menus: state.menus.catalog || [],
  user: state.users.target
});
// these should be refactored after the application is completed right
export default connect(mapStateToProps)(Catalogue);


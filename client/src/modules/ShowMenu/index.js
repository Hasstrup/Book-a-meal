import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FetchSpecificMenu } from '../../actions/menus';
import ShowMenuDetails from './components/ShowMenuDetails';
import VendorDetails from './components/VendorDetails';
import '../styles/menu.scss';

class RenderMenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.menu = this.props.menu;
  }
  componentDidMount = () => {
    const { dispatch, history, match } = this.props;
    const { menu } = this.state;
    if (!menu) {
      const { menuId } = match.params;
      return dispatch(FetchSpecificMenu(menuId)(history)((payload) => {
        this.setState({ menu: payload });
      }));
    }
  }

  generateImageFromMenu = () => {
    if(!this.state.menu && !this.state.menu.Meals.length) return null;
  
  }

  render = () => (
    <Fragment>
      {this.state.menu && <MenuPage menu={this.state.menu}/>}
      {!this.state.menu && null}
    </Fragment>
  )
}


const MenuPage = ({ menu }) => (
  <div className="main-menu-page-body">
    <VendorDetails menu={menu} />
    <ShowMenuDetails meals={menu.Meals} />
  </div>
);

const mapStateToProps = state => ({
  menu: state.menus.target
});

export default connect(mapStateToProps)(RenderMenuContainer);

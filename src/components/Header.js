import React from 'react';
import {  NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth'

export const Header = ({ startLogout }) => ( // exported for testing purposes
    <header>
      <h1>Expensify</h1>
      <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink> 
      <NavLink to="/create" activeClassName="is-active"> Create Expense</NavLink>
      <button onClick={startLogout}> Logout </button>
    </header>
)

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => { dispatch(startLogout()); }
})
export default connect(undefined, mapDispatchToProps)(Header); 
//mapDispatch.. lets us get startLogout and use it in a way

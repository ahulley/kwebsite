import React, { Component } from 'react';
import { NavLink as RRNavLink} from 'react-router-dom';
import ModalSignin from '../../containers/Header/Modals/ModalSigninContainer'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const JUMP_TO_SIGNIN = 'JUMP_TO_SIGNIN';
const JUMP_TO_SIGNUP = 'JUMP_TO_SIGNUP';
const JUMP_TO_SIGNOUT = 'JUMP_TO_SIGNOUT';

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      isDropdownOpen: false
    };
  }

  toggleDropdown() {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  }

  jumpToLink(link) {
    switch (link) {
      case JUMP_TO_SIGNUP:
        this.props.history.push('/signup');
        break;
      case JUMP_TO_SIGNIN:
        this.props.setModalSigninVisibility(true);
        break;
      case JUMP_TO_SIGNOUT:
        this.props.signout();
        break;
    }
    if (this.state.isDropdownOpen) {
      this.toggleDropdown();
    }
  }

  render() {
    return (
      <div>
        <Navbar className="navbar-expand-md navbar-dark bg-primary">
          <NavLink
            to="/"
            className="navbar-brand"
            tag={RRNavLink}
          >
            Home
          </NavLink>
          <NavbarToggler onClick={this.toggleDropdown} />
          <Collapse isOpen={this.state.isDropdownOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink exact
                  to="/UserProfile"
                  activeClassName="active"
                  tag={RRNavLink}
                  onClick={this.state.isDropdownOpen ? this.toggleDropdown : void 0}
                >
                My Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact
                  to="/Posts"
                  activeClassName="active"
                  tag={RRNavLink}
                  onClick={this.state.isDropdownOpen ? this.toggleDropdown : void 0}
                >
                  Posts
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Login/Logout
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => this.jumpToLink(JUMP_TO_SIGNIN)}>
                    Login
                  </DropdownItem>
                  <DropdownItem onClick={() => this.jumpToLink(JUMP_TO_SIGNOUT)}>
                    Logout
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => this.jumpToLink(JUMP_TO_SIGNUP)}>
                    Register
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <ModalSignin
          isModalVisible={this.props.isModalSigninVisible}
          closeModal={() => this.props.setModalSigninVisibility(false)}
          loginError={this.props.loginError}
          enableReinitialize="true"
        />
      </div>
      );
  }
}



export default Header;

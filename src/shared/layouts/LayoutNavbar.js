import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav,Dropdown } from 'react-bootstrap'
import layoutHelpers from './helpers'

class LayoutNavbar extends Component {
  constructor(props) {
    super(props)
    this.isRTL = document.documentElement.getAttribute('dir') === 'rtl'
  }

  toggleSidenav(e) {
    e.preventDefault()
    layoutHelpers.toggleCollapsed()
  }

  render() {
    return (
      <Navbar bg={this.props.navbarBg} expand="lg" className="layout-navbar align-items-lg-center container-p-x">

        {/* Brand */}
        <Navbar.Brand as={NavLink} to="/">IQS</Navbar.Brand>

        {/* Sidenav toggle */}
        {this.props.sidenavToggle && (
          <Nav className="align-items-lg-center mr-auto mr-lg-4">
            <Nav.Item as="a" className="nav-item nav-link px-0 ml-2 ml-lg-0" href="#toggle" onClick={this.toggleSidenav}>
              <i className="ion ion-md-menu text-large align-middle"></i>
            </Nav.Item>
          </Nav>
        )}

        {/* Navbar toggle */}
        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="align-items-lg-center">
            <Nav.Item>
              <Nav.Link href="#link-1">Link 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link-2">Link 2</Nav.Link>
            </Nav.Item>
            </Nav>
            <Nav className="align-items-lg-center ml-auto">
              <div className="nav-item d-none d-lg-block text-big font-weight-light line-height-1 opacity-25 mr-3 ml-1">|</div>
              <Dropdown as={Nav.Item} className="demo-navbar-user" alignRight={!this.isRTL}>
              <Dropdown.Toggle as={Nav.Link}>
                <span className="d-inline-flex flex-lg-row-reverse align-items-center align-middle">
                  <img src={`${process.env.PUBLIC_URL}/img/avatars/1.png`} className="d-block ui-w-30 rounded-circle" alt="User" />
                  <span className="px-1 mr-lg-2 ml-2 ml-lg-0">Mike Greene</span>
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item hred="#"><i className="ion ion-ios-person text-lightest"></i> &nbsp; My profile</Dropdown.Item>
                <Dropdown.Item hred="#"><i className="ion ion-ios-mail text-lightest"></i> &nbsp; Messages</Dropdown.Item>
                <Dropdown.Item hred="#"><i className="ion ion-md-settings text-lightest"></i> &nbsp; Account settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item hred="#"><i className="ion ion-ios-log-out text-danger"></i> &nbsp; Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
      
    )
  }
}

LayoutNavbar.propTypes = {
  sidenavToggle: PropTypes.bool
}

LayoutNavbar.defaultProps = {
  sidenavToggle: true
}

export default connect(store => ({
  navbarBg: store.theme.navbarBg
}))(LayoutNavbar)

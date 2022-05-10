import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Sidenav from '../../vendor/libs/sidenav'
import layoutHelpers from './helpers'
import { Navbar, Nav,Dropdown } from 'react-bootstrap'

class LayoutSidenav extends Component {
  layoutSidenavClasses() {
    let bg = this.props.sidenavBg

    if (this.props.orientation === 'horizontal' && (bg.indexOf(' sidenav-dark') !== -1 || bg.indexOf(' sidenav-light') !== -1)) {
      bg = bg
        .replace(' sidenav-dark', '')
        .replace(' sidenav-light', '')
        .replace('-darker', '')
        .replace('-dark', '')
    }

    return `bg-${bg} ` + (
      this.props.orientation !== 'horizontal'
        ? 'layout-sidenav'
        : 'layout-sidenav-horizontal container-p-x flex-grow-0'
    )
  }

  toggleSidenav(e) {
    e.preventDefault()
    layoutHelpers.toggleCollapsed()
  }

  isMenuActive(url) {
    return this.props.location.pathname.indexOf(url) === 0
  }

  isMenuOpen(url) {
    return this.props.location.pathname.indexOf(url) === 0 && this.props.orientation !== 'horizontal'
  }

  render() {
    return (
      <Sidenav orientation={this.props.orientation} className={this.layoutSidenavClasses()}>
        {/* Inner */}
        <div className={`sidenav-inner ${this.props.orientation !== 'horizontal' ? 'py-1' : ''}`}>
        
        <Sidenav.RouterLink to="/" exact={true} icon="ion ion-ios-desktop">Home</Sidenav.RouterLink>

        <Sidenav.Divider className="my-0" />
          {/* <Sidenav.RouterLink to="/pages/search-results" exact={true} icon="ion ion-md-search">Search Text</Sidenav.RouterLink> */}
          {/* <Sidenav.Divider className="my-0" /> */}
          {/* <Sidenav.RouterLink to="/pages/Upload" exact={true} icon="ion ion-md-cloud-upload">Search File</Sidenav.RouterLink> */}
          {/* <Sidenav.Divider className="my-0" /> */}
          <Sidenav.RouterLink to="/pages/IQS" exact={true} icon="ion ion-md-help-circle-outline">Iterative Query Selection</Sidenav.RouterLink>
          <Sidenav.Divider className="my-0" />
          <Sidenav.RouterLink to="/pages/search-results" exact={true} icon="ion ion-md-search">Search Page</Sidenav.RouterLink>
          <Sidenav.Divider className="my-0" />
          <Sidenav.RouterLink to="/pages/Experiment" exact={true} icon="ion ion-md-clipboard">Experiment</Sidenav.RouterLink>
          <Sidenav.Divider className="my-0" />

          {/* <Sidenav.Divider className="my-0" />
          <Sidenav.Menu icon="ion ion-md-search" linkText="Search">
          <Sidenav.RouterLink to="/pages/search-results" exact={true} icon="ion ion-md-quote">Search Text</Sidenav.RouterLink>
          <Sidenav.RouterLink to="/pages/Upload" exact={true} icon="ion ion-md-cloud-upload">Search File</Sidenav.RouterLink>
          
            </Sidenav.Menu>
            <Sidenav.Divider className="my-0" /> */}

          {/* <Sidenav.RouterLink to="/pages/Login" exact={true} icon="ion ion-md-contact">Login</Sidenav.RouterLink>          
          <Sidenav.RouterLink to="/pages/Register" exact={true} icon="ion ion-md-contact">Register</Sidenav.RouterLink> */}

        </div>
      </Sidenav>
    )
  }
}

LayoutSidenav.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal'])
}

LayoutSidenav.defaultProps = {
  orientation: 'vertical'
}

export default connect(store => ({
  sidenavBg: store.theme.sidenavBg
}))(LayoutSidenav)

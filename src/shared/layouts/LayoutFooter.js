import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from "react-bootstrap";

class LayoutFooter extends Component {
  state = {
    isOpen: false
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  render() {
    return (
      <nav className={`layout-footer footer bg-${this.props.footerBg}`}>
      <div className="container-fluid d-flex flex-wrap justify-content-between text-center container-p-x pb-3">
        <div className="pt-3">
          <span className="footer-text font-weight-bolder">IQS Team</span> ©
        </div>
        <div>
          <a variant="primary" onClick={this.openModal} className="footer-link pt-3">About Us</a>
          <a href="#d" onClick={this.prevent} className="footer-link pt-3 ml-4">Help</a>
          <a href="#d" onClick={this.prevent} className="footer-link pt-3 ml-4">Contact</a>
          <a href="#d" onClick={this.prevent} className="footer-link pt-3 ml-4">Terms &amp; Conditions</a>
        </div>
      </div>
      <Modal size="lg" show={this.state.isOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>About Us</Modal.Title>
          </Modal.Header>
          <Modal.Body>Hello, We are Mor Zweig, Ophir porat and Ori Ben-Artzy.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </nav>
    )
  }
}

export default connect(store => ({
  footerBg: store.theme.footerBg
}))(LayoutFooter)

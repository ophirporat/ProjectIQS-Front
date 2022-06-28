import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from "react-bootstrap";
import gitPicture from '../../git.jpeg'
import pypiPicture from '../../pypi.jpeg'
import youtube from '../../youtube.jpeg'
import ContactForm from '../../components/ContactForm';

class LayoutFooter extends Component {
  state = {
    isOpen: false
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  openContactModal = () => this.setState({ isContactOpen: true });
  closeContactModal = () => this.setState({ isContactOpen: false });

  render() {
    return (
      <nav className={`layout-footer footer bg-${this.props.footerBg}`}>
      <div className="container-fluid d-flex flex-wrap justify-content-between text-center container-p-x pb-3">
        <div className="pt-3">
          <span className="footer-text font-weight-bolder">IQS Team</span> ©
          <span> <a target="_blank" rel="noopener noreferrer" variant="primary" href='https://www.youtube.com/watch?v=-GWxibc36wY'>
            <img height={'26px'} width={'26px'} src={youtube} style={{ marginLeft:'20px', marginRight: ' 10px', borderRadius: '50%'}}></img>Promotional video</a>
            </span>
            <span style={{paddingLeft: '15px'}}>| </span>
            <span> <a target="_blank" rel="noopener noreferrer" variant="primary" href='https://pypi.org/project/IQS-algorithm/'>
            <img height={'26px'} width={'26px'} src={pypiPicture} style={{border: 'solid', borderWidth: 'thin', marginLeft:'20px', marginRight: ' 10px', borderRadius: '50%'}}></img>IQS Package</a>
            </span>
            <span style={{paddingLeft: '15px'}}>| </span>
          <span> <a target="_blank" rel="noopener noreferrer" variant="primary" href='https://github.com/ophirporat/ProjectIQS-Front'>
            <img height={'25px'} width={'25px'} src={gitPicture} style={{marginLeft:'20px', marginRight: ' 10px', borderRadius: '50%'}}></img>Frontend repository</a>
            </span>
            <span style={{paddingLeft: '15px'}}>| </span>
            <span> <a target="_blank" rel="noopener noreferrer" variant="primary" href='https://github.com/oribena/projectIQS'>
            <img height={'25px'} width={'25px'} src={gitPicture} style={{marginLeft:'20px', marginRight: ' 10px', borderRadius: '50%'}}></img>Backend repository</a>
            </span>
        </div>
        <div>
          <a style={{cursor: 'pointer'}} variant="primary" onClick={this.openModal} className="footer-link pt-3">About Us</a>
          <a style={{cursor: 'pointer'}} onClick={this.openContactModal} className="footer-link pt-3 ml-4">Contact</a>
         
        </div>
      </div>
      <Modal size="lg" show={this.state.isOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title><h4>About us</h4></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <center>            
            <h5>We are Ophir Porat, Ori Ben-Artzy and Mor Zweig, students in the department of Software and Information Systems Engineering at Ben Gurion University of the Negev.</h5>
             <h5>This site is our final project under the guidance of Dr. Aviad Elishar and Mr. Maor Reuven.</h5>
             </center>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal size="md" show={this.state.isContactOpen} onHide={this.closeContactModal}>
        <Modal.Header closeButton>
        <Modal.Title><h4>Contact us</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>            
          <ContactForm/>

             </center>
          </Modal.Body>



        </Modal>

      </nav>
    )
  }
}

export default connect(store => ({
  footerBg: store.theme.footerBg
}))(LayoutFooter)

import React, { Component } from 'react'
import { Media, Button, Collapse, Row, Col } from 'react-bootstrap'

class IQS extends Component {
  constructor(props) {
    super(props)
    props.setTitle('FAQ - Pages')

    this.state = {
      expanded: []
    }
  }

  toggle(e, id) {
    e.preventDefault()
    const expanded = [...this.state.expanded]

    if (expanded.indexOf(id) === -1) {
      expanded.push(id)
    } else {
      expanded.splice(expanded.indexOf(id), 1)
    }

    this.setState({ expanded })
  }

  isExpanded(id) {
    return this.state.expanded.indexOf(id) !== -1
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <h3 className="text-center font-weight-bold py-3 mb-4">
        Iterative Query Selection
        </h3>
        <hr className="container-m-nx border-light my-0" />

        <Row className="mt-4">
          <Col lg={4} xl={3} >

            <div style={{position: "fixed", width:"18%"}}>
              <a href="#Q" className="media align-items-center bg-lighter text-body py-3 px-4">
                <div className="ion ion-md-help-circle-outline ui-w-30 text-center text-xlarge"></div>
                <Media.Body className="ml-3">
                Q & A
                  <div className="text-muted small">Information regarding IQS</div>
                </Media.Body>
              </a>
              <a href="#Article"  className="media align-items-center bg-lighter text-body py-3 px-4">
                <div className="ion ion-ios-document ui-w-30 text-center text-xlarge"></div>
                <Media.Body className="ml-3">
                Article
                  <div className="text-muted small">Iterative Query Selection</div>
                </Media.Body>
              </a>
              {/* <a href="#d" onClick={this.prevent} className="media align-items-center bg-lighter text-body py-3 px-4">
                <div className="ion ion-md-card ui-w-30 text-center text-xlarge"></div>
                <Media.Body className="ml-3">
                  Purchase
                  <div className="text-muted small">Donec sagittis urna eu leo</div>
                </Media.Body>
              </a>
              <a href="#d" onClick={this.prevent} className="media align-items-center bg-lighter text-body py-3 px-4">
                <div className="ion ion-ios-business ui-w-30 text-center text-xlarge"></div>
                <Media.Body className="ml-3">
                  Partnership
                  <div className="text-muted small">Donec sagittis urna eu leo</div>
                </Media.Body>
              </a> */}
            </div>


          </Col>
          <Col>

            <h4 id="Q" className="media align-items-center my-4">
              <div className="ion ion-md-help-circle-outline ui-w-60 text-center text-large"></div>
              <Media.Body className="ml-1">
              Questions & Answers
                <div className="text-muted text-tiny font-weight-light">Information regarding IQS</div>
              </Media.Body>
            </h4>

            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-1')} aria-expanded={String(this.isExpanded('faq-1'))} className="d-flex justify-content-between text-body py-3 px-4">
              What is the Iterative Query Selection Algorithm?
                <span className="collapse-icon"></span>
              </a>
              <Collapse in={this.isExpanded('faq-1')} className="text-muted"><div>
                <div className="px-4 pb-3">The IQS is a hill climbing algorithm that iteratively optimizes short keyword queries given a prototype document through interaction with an opaque search engine. Based on the previous query, every iteration improves it, and the end result is a list of queries, and not just a single best query. Uses WMD (Word’s Mover Distance) measure to evaluate the results.</div>
              </div></Collapse>
            </div>
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-2')} aria-expanded={String(this.isExpanded('faq-2'))} className="d-flex justify-content-between text-body py-3 px-4">
              What sets the algorithm apart from other algorithms in the field?
                <span className="collapse-icon"></span>
              </a>
              <Collapse in={this.isExpanded('faq-2')} className="text-muted"><div>
                <div className="px-4 pb-3">The IQS algorithm handles documents and articles so that it allows researchers, reporters and other users to search for queries beyond a standard search bar. The algorithm retrieves the best search results for that article.</div>
              </div></Collapse>
            </div>
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-3')} aria-expanded={String(this.isExpanded('faq-3'))} className="d-flex justify-content-between text-body py-3 px-4">
              What is the WMD measure?
                <span className="collapse-icon"></span>
              </a>
              <Collapse in={this.isExpanded('faq-3')} className="text-muted"><div>
                <div className="px-4 pb-3">WMD stands for word’s mover distance. 
                It estimates the similarity of results to a given prototype document. This measure is calculated by summing the shortest distances between words in the given prototype document and words in the retrieved results. The lower the WMD, the more relevant the retrieved results are.</div>
              </div></Collapse>
            </div>
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-4')} aria-expanded={String(this.isExpanded('faq-4'))} className="d-flex justify-content-between text-body py-3 px-4">
              What is the purpose of the site?
                <span className="collapse-icon d-inline-block ml-1"></span>
              </a>
              <Collapse in={this.isExpanded('faq-4')} className="text-muted"><div>
                <div className="px-4 pb-3">The web platform presents text-based analysis of posts published on social networks using the IQS algorithm and allows users to compare it visually to other algorithms in a convenient way.</div>
              </div></Collapse>
            </div>
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-6')} aria-expanded={String(this.isExpanded('faq-6'))} className="d-flex justify-content-between text-body py-3 px-4">
              What is the purpose of the Python package?
                <span className="collapse-icon d-inline-block ml-1"></span>
              </a>
              <Collapse in={this.isExpanded('faq-6')} className="text-muted"><div>
                <div className="px-4 pb-3">The Python package is intended for users with a programming background who can run the IQS algorithm for their needs on different queries, get statistics of the results using multiple measures and more.</div>
              </div></Collapse>
            </div>

            <hr className="my-5" />

            <h4 id="Article" className="media align-items-center mb-4">
              <div className="ion ion-ios-document ui-w-60 text-center text-large"></div>
              <div className="media-body ml-1">
              Article - Iterative Query Selection
                <div className="text-muted text-tiny font-weight-light">Aviad Elyashar, Maor Reuben, and Rami Puzis</div>
              </div>
            </h4>
            <iframe src='../journal_Elsevier_Iterative_Keyword_Optimization.pdf' width="100%" height="700px"> </iframe>


{/* 
            <hr className="my-5" />

            <h4 className="media align-items-center mb-4">
              <div className="ion ion-md-card ui-w-60 text-center text-large"></div>
              <div className="media-body ml-1">
                Purchase
                <div className="text-muted text-tiny font-weight-light">Donec sagittis urna eu leo</div>
              </div>
            </h4>

            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-31')} aria-expanded={String(this.isExpanded('faq-31'))} className="d-flex justify-content-between text-body py-3 px-4">
                Ne ornatus albucius ius?
                <span className="collapse-icon"></span>
              </a>
              <Collapse in={this.isExpanded('faq-31')} className="text-muted"><div>
                <div className="px-4 pb-3">Lorem ipsum dolor sit amet, mea in pertinax hendrerit gloriatur.</div>
              </div></Collapse>
            </div>
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-32')} aria-expanded={String(this.isExpanded('faq-32'))} className="d-flex justify-content-between text-body py-3 px-4">
                Quo insolens intellegam dissentiet at?
                <span className="collapse-icon"></span>
              </a>
              <Collapse in={this.isExpanded('faq-32')} className="text-muted"><div>
                <div className="px-4 pb-3">Ex fugit legimus fuisset per. Ex quidam option diceret ius.</div>
              </div></Collapse>
            </div>
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-33')} aria-expanded={String(this.isExpanded('faq-33'))} className="d-flex justify-content-between text-body py-3 px-4">
                Ad his assum delenit blandit?
                <span className="collapse-icon"></span>
              </a>
              <Collapse in={this.isExpanded('faq-33')} className="text-muted"><div>
                <div className="px-4 pb-3">Ne ornatus albucius ius, nostrum dignissim repudiandae an usu.</div>
              </div></Collapse>
            </div>
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-34')} aria-expanded={String(this.isExpanded('faq-34'))} className="d-flex justify-content-between text-body py-3 px-4">
                Dapibus ac facilisis in?
                <span className="collapse-icon d-inline-block ml-1"></span>
              </a>
              <Collapse in={this.isExpanded('faq-34')} className="text-muted"><div>
                <div className="px-4 pb-3">Lorem ipsum dolor sit amet, ius virtute suscipit te. Ius prima euismod consequat eu.</div>
              </div></Collapse>
            </div>
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-35')} aria-expanded={String(this.isExpanded('faq-35'))} className="d-flex justify-content-between text-body py-3 px-4">
                Cras justo odio?
                <span className="collapse-icon d-inline-block ml-1"></span>
              </a>
              <Collapse in={this.isExpanded('faq-35')} className="text-muted"><div>
                <div className="px-4 pb-3">Etiam vivendo eu sea, purto ponderum mediocritatem at pro.</div>
              </div></Collapse>
            </div>
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-36')} aria-expanded={String(this.isExpanded('faq-36'))} className="d-flex justify-content-between text-body py-3 px-4">
                Porta ac consectetur ac?
                <span className="collapse-icon d-inline-block ml-1"></span>
              </a>
              <Collapse in={this.isExpanded('faq-36')} className="text-muted"><div>
                <div className="px-4 pb-3">Iuvaret deleniti vulputate nec ne, id vix lucilius legendos deseruisse.</div>
              </div></Collapse>
            </div>

            <hr className="my-5" />

            <h4 className="media align-items-center mb-4">
              <div className="ion ion-ios-business ui-w-60 text-center text-large"></div>
              <div className="media-body ml-1">
                Partnership
                <div className="text-muted text-tiny font-weight-light">Donec sagittis urna eu leo</div>
              </div>
            </h4>

            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-41')} aria-expanded={String(this.isExpanded('faq-41'))} className="d-flex justify-content-between text-body py-3 px-4">
                Ne ornatus albucius ius?
                <span className="collapse-icon"></span>
              </a>
              <Collapse in={this.isExpanded('faq-41')} className="text-muted"><div>
                <div className="px-4 pb-3">Lorem ipsum dolor sit amet, mea in pertinax hendrerit gloriatur.</div>
              </div></Collapse>
            </div>
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-42')} aria-expanded={String(this.isExpanded('faq-42'))} className="d-flex justify-content-between text-body py-3 px-4">
                Quo insolens intellegam dissentiet at?
                <span className="collapse-icon"></span>
              </a>
              <Collapse in={this.isExpanded('faq-42')} className="text-muted"><div>
                <div className="px-4 pb-3">Ex fugit legimus fuisset per. Ex quidam option diceret ius.</div>
              </div></Collapse>
            </div>
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-43')} aria-expanded={String(this.isExpanded('faq-43'))} className="d-flex justify-content-between text-body py-3 px-4">
                Ad his assum delenit blandit?
                <span className="collapse-icon"></span>
              </a>
              <Collapse in={this.isExpanded('faq-43')} className="text-muted"><div>
                <div className="px-4 pb-3">Ne ornatus albucius ius, nostrum dignissim repudiandae an usu.</div>
              </div></Collapse>
            </div>
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-44')} aria-expanded={String(this.isExpanded('faq-44'))} className="d-flex justify-content-between text-body py-3 px-4">
                Dapibus ac facilisis in?
                <span className="collapse-icon d-inline-block ml-1"></span>
              </a>
              <Collapse in={this.isExpanded('faq-44')} className="text-muted"><div>
                <div className="px-4 pb-3">Lorem ipsum dolor sit amet, ius virtute suscipit te. Ius prima euismod consequat eu.</div>
              </div></Collapse>
            </div>
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-45')} aria-expanded={String(this.isExpanded('faq-45'))} className="d-flex justify-content-between text-body py-3 px-4">
                Cras justo odio?
                <span className="collapse-icon d-inline-block ml-1"></span>
              </a>
              <Collapse in={this.isExpanded('faq-45')} className="text-muted"><div>
                <div className="px-4 pb-3">Etiam vivendo eu sea, purto ponderum mediocritatem at pro.</div>
              </div></Collapse>
            </div>
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-46')} aria-expanded={String(this.isExpanded('faq-46'))} className="d-flex justify-content-between text-body py-3 px-4">
                Porta ac consectetur ac?
                <span className="collapse-icon d-inline-block ml-1"></span>
              </a>
              <Collapse in={this.isExpanded('faq-46')} className="text-muted"><div>
                <div className="px-4 pb-3">Iuvaret deleniti vulputate nec ne, id vix lucilius legendos deseruisse.</div>
              </div></Collapse>
            </div>*/}

          </Col>
        </Row> 

      </div>
    )
  }
}

export default IQS

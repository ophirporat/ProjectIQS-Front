import React, { Component } from 'react'
import { Media, Collapse, Row, Col } from 'react-bootstrap'
import {parseBibFile} from 'bibtex'

class IQS extends Component {
  constructor(props) {
    super(props)
    props.setTitle('FAQ - Pages')
    
    this.state = {
      expanded: [],
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
    const bibtxt1 = `@article{Reuben2022Iterative,`
      const bibtxt2 =`title = {Iterative query selection for opaque search engines with pseudo relevance feedback},`
      const bibtxt3 =`journal = {Expert Systems with Applications},`
      const bibtxt4 =`volume = {201},`
      const bibtxt5 =`pages = {117027},`
      const bibtxt6 =`year = {2022},`
      const bibtxt7 =`issn = {0957-4174},`
      const bibtxt8 =`doi = {https://doi.org/10.1016/j.eswa.2022.117027},`
      const bibtxt9 =`url = {https://www.sciencedirect.com/science/article/pii/S0957417422004432},`
      const bibtxt10 =`author = {Maor Reuben and Aviad Elyashar and Rami Puzis},`
      const bibtxt11=`keywords = {Query selection, Opaque search engine, Pseudo relevance feedback, Fake news},`
      const bibtxt12 =`}`
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
              <a href="#Citation"  className="media align-items-center bg-lighter text-body py-3 px-4">
                <div className="ion ion-md-quote ui-w-30 text-center text-xlarge"></div>
                <Media.Body className="ml-3">
                Citation
                  <div className="text-muted small">Bibtex reference</div>
                </Media.Body>
              </a>
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
              What is the main goal of the web platform?
                <span className="collapse-icon d-inline-block ml-1"></span>
              </a>
              <Collapse in={this.isExpanded('faq-4')} className="text-muted"><div>
                <div className="px-4 pb-3">Search and retrieve data from Twitter's website using the IQS algorithm.</div>
              </div></Collapse>
            </div>
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-6')} aria-expanded={String(this.isExpanded('faq-6'))} className="d-flex justify-content-between text-body py-3 px-4">
              What is the main goal of the Python package?
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
              Article - Iterative Query Selection for Opaque Search Engines with Pseudo Relevance Feedback
                <div className="text-muted text-tiny font-weight-light">Dr Aviad Elyashar,Mr Maor Reuben, and Dr Rami Puzis</div>
              </div>
            </h4>
            <iframe src='../journal_Elsevier_Iterative_Keyword_Optimization.pdf' width="100%" height="700px"> </iframe>

            <hr className="my-5" />

            <h4 id="Citation" className="media align-items-center mb-4">
              <div className="ion ion-md-quote ui-w-60 text-center text-large"></div>
              <div className="media-body ml-1">
              Citation
              <div className="text-muted text-tiny font-weight-light">To cite Iterative Query Selection article, please use the following bibtex reference:</div>
              </div>
              </h4>
              <h5>{bibtxt1}</h5>
              <h5>{bibtxt2}</h5>
              <h5>{bibtxt3}</h5>
              <h5>{bibtxt4}</h5>
              <h5>{bibtxt5}</h5>
              <h5>{bibtxt6}</h5>
              <h5>{bibtxt7}</h5>
              <h5>{bibtxt8}</h5>
              <h5>{bibtxt9}</h5>
              <h5>{bibtxt10}</h5>
              <h5>{bibtxt11}</h5>
              <h5>{bibtxt12}</h5>



          </Col>
        </Row> 

      </div>
    )
  }
}

export default IQS

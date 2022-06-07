import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Login from './Login'
import ReactChartjs2 from './ReactChartjs2'

const ReactSwal = withReactContent(Swal.mixin({
  buttonsStyling: false,
  customClass: {
    confirmButton: 'btn btn-primary btn-lg',
    cancelButton: 'btn btn-default btn-lg',
    actions: 'text-center'
  }
}))

class Modals extends Component {
  constructor(props) {
    super(props)

    this.onDefaultModalClose = this.onDefaultModalClose.bind(this)
    this.onTopModalClose = this.onTopModalClose.bind(this)
    this.onSlideModalClose = this.onSlideModalClose.bind(this)
    this.onFillInModalClose = this.onFillInModalClose.bind(this)
    this.getChart = this.getChart.bind(this)


    this.state = {
      defaultModalShow: false,
      defaultModalSize: 'xl',
      topModalShow: false,
      topModalSize: null,
      slideModalShow: false,
      fillInModalShow: false,
      fillInModalSize: null,
      show:false
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  onDefaultModalClose() {
    this.setState({ defaultModalShow: false })
  }

  onTopModalClose() {
    this.setState({ topModalShow: false })
  }

  onSlideModalClose() {
    this.setState({ slideModalShow: false })
  }

  onFillInModalClose() {
    this.setState({ fillInModalShow: false })
  }


  async stepsSweetAlertExample() {
    const steps = ['', '']
    const htmls = [<Login></Login>, ""]
    const swalQueueStep = Swal.mixin({
      confirmButtonText: 'Forward',
      cancelButtonText: 'cancel',
      showCloseButton: true,
      progressSteps: steps,
      showProgressSteps: false,
      customClass: {
        confirmButton: 'primary rounded-pill',
        cancelButton: 'primary rounded-pill',
    },
    })

    const values = []
    const buttonsText = ["to tweets", "to wmd"]
    let currentStep
    for (currentStep = 0; currentStep < steps.length;) {
        const result = await swalQueueStep.fire({
          title: `${steps[currentStep]}`,
          inputValue: values[currentStep],
          confirmButtonText: buttonsText[currentStep],
          html:htmls[currentStep],
          currentProgressStep: currentStep
        })
        console.log(result)
        if (currentStep === 0 && !result.dismiss) {
            currentStep ++
        }else if(currentStep === steps.length -1 && !result.dismiss){
            currentStep --
        }
        else{
            break;
        }
      }
  }
  getChart(){
      if(!this.state.show){
        this.setState({show: true})
      }
  }


  render() {
    const isIE10Mode = document['documentMode'] === 10
    console.log(this.props.data)
    const iteration_array = []
    for(var i =1;i<=Number(this.props.data.wmds.length);i++){
        iteration_array.push(i)
      }

    return (
     <div>
         <Button variant="default" onClick={() =>
                this.setState({
                defaultModalShow: true,
                  defaultModalSize: 'xl' 
                })
        }>{'ExtraLarge'}</Button>
        <div className="modal-xl">

        <Modal show={this.state.defaultModalShow} size={'xl'} onHide={this.onDefaultModalClose}>
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body style={{height: '450px'}}>
              <ReactChartjs2 show={this.state.show} labels={iteration_array} dataset={this.props.data.wmds}></ReactChartjs2>
                  {this.getChart()}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="default" onClick={this.onDefaultModalClose}>Close</Button>
              </Modal.Footer>
            </Modal>
            </div>

      </div>
    )
  }
}

export default Modals

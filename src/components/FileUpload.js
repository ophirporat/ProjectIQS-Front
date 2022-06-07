import React, { Component} from 'react'
import { useDropzone } from 'react-dropzone'

const humanFileSize = (bytes, si) => {
  var thresh = si ? 1000 : 1024
  if(Math.abs(bytes) < thresh) return bytes + ' B'
  var units = si
      ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
      : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB']
  var u = -1
  do {
    bytes /= thresh
    ++u
  } while(Math.abs(bytes) >= thresh && u < units.length - 1)
  return bytes.toFixed(1)+' '+units[u]
}

const DropzoneContainer = (props) => {
  const onDrop = acceptedFiles => {
    acceptedFiles.forEach(file => {
      if (!/\.(jpe?g|png|gif|txt)$/i.test(file.name)) return
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Trigger callback
        props.onDrop && props.onDrop({
          name: file.name,
          size: humanFileSize(file.size),
          data: reader.result
        })
      }
      reader.readAsText(file)
    })
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: 'text/*', onDrop })

  let className = 'text-center'

  // Set paddings depending on file list is empty or not
  className += !props.files.length ? ' p-5' : ' pt-3 pl-3'

  // Define border color depending on status
  if (isDragActive || isDragAccept) className += ' border-primary'
  else if (isDragReject) className += ' border-danger'
  else className += ' border-light'

  // Dropzone container style
  const style = {
    border: '3px dashed',
    outline: '0'
  }

  return (
    <React.Fragment>
      <div {...getRootProps({ className, style })}>
        <input {...getInputProps()} />

        {!props.files.length && (
          <div className="text-big text-muted">Drag and drop your text file here, or click to select file</div>
        )}

        {!!props.files.length && (
          // Container
          <div className="d-flex align-items-start align-content-start flex-wrap">
            {props.files.map(file => (
              // File card
              <div className="card card-condenced mb-3 mr-3" style={{width: '180px'}} key={file.name} onClick={e => e.stopPropagation()}>
                <div className="card-body">
                  <div className="font-weight-semibold text-left text-truncate" title={file.name}>{file.name}</div>
                  <div className="text-left small text-muted">{file.size}</div>
                </div>
                <button
                  className="btn btn-outline-danger btn-sm card-footer py-2"
                  style={{boxShadow: 'none', borderLeft: 0, borderRight: 0, borderBottom: 0}}
                  onClick={() => props.onRemove && props.onRemove(file)}
                >Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

class FileUpload extends Component {
  constructor(props) {
    super(props)

    this.onFileDrop = this.onFileDrop.bind(this)
    this.onFileRemove = this.onFileRemove.bind(this)

    this.state = {
      files: []
    }
  }

  async onFileDrop(file) {
    await this.setState(state => ({
      files: state.files.concat(file)
      
    }))
    console.log(file)

    console.log(this.state.files[0])
  }

  onFileRemove(file) {
    this.setState(state => {
      const files = [...state.files]
      files.splice(files.indexOf(file), 1)
      return { files }
    })
  }

  render() {
    return (
      <div>
            <DropzoneContainer files={this.state.files} onDrop={this.onFileDrop} onRemove={this.onFileRemove} />
            <br></br>
            <br></br>
      </div>
    )
  }
}

export default FileUpload

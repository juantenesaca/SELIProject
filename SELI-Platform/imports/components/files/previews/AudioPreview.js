import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AudioPlayer from 'react-h5-audio-player';
import Link from '@material-ui/core/Link';
export default class AudioPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    let file = this.props.file;
    this.setState({
      nameWithoutExtension: true,
    });
    if(typeof file===null){
      //file.name = '';
      console.log("sdfsdf",file)
    }
    else{
      file.name = file.name.toString().split('.');
      file.name = file.name[0];
  }
  }

  delete(){
    Meteor.call("RemoveCourseFile", this.props.file._id, function (err) {
      if (err) {

      }
    });
    this.props.unPickFile();
  }

  open(){
    var win = window.open(this.props.file.link, '_blank');
    win.focus();
  }

  render() {
    return(
        <div className="file-preview-container">
          {
            this.props.file!=null?
              <div className="audio-file-preview">
                <AudioPlayer volume src={this.props.file.link}/>
              </div>
            :
            undefined
          }
         
          <div className="file-preview-actions">
            <Tooltip title={this.props.language.open} placement="left">
              <Link onClick={() => this.open()} color="secondary" aria-label="open" className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorSecondary">
                <img src="openNew.svg"/>
              </Link>
            </Tooltip>
            <Tooltip title={this.props.language.uploadAnother} placement="left">
              <IconButton onClick={() => this.props.unPickFile()} color="secondary" aria-label="another">
                <CloudUploadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={this.props.language.delete} placement="left">
              <IconButton onClick={() => this.delete()} color="secondary" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      );
    }
  }

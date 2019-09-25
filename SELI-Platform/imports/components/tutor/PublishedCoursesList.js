import React, { Component } from 'react';

import Loading from '../../components/tools/Loading';
import { Courses } from '../../../lib/CourseCollection';
import Table from '../tutor/Table';

import SchoolIcon from '@material-ui/icons/School';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import TabIcon from '@material-ui/icons/Tab';
import WarningIcon from '@material-ui/icons/Warning';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class CoursesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myCourses: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.getMyCourses(this.props.user.username);
  }

  getMyCourses = (user) => {
    Tracker.autorun(() => {
      let myCourses = Courses.find({createdBy: user, published: true}).fetch();
      this.setState({
        myCourses: myCourses,
      }, () => {
        if (this.state.myCourses.length) {
          this.createTableData(this.state.myCourses);
        }
      });
    });
  }

  preview = (_id) => {
    const url = `/coursePreview#${_id}`;
    window.open(url, "_blank");
  }

  unpublish = (_id) => {
    Courses.update(
      { _id: this.state.courseToUnpublish },
      { $set:
        {
          published: false,
        }
      }
    );
    this.handleClose();
    this.props.handleControlMessage(true, 'Course unpublished, you can find it in your saved courses!', true, 'savedList', 'See list');
  }

  createTableData = (myCourses) => {
    let tableData = [];
    let headRows = [
      { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
      { id: 'organization', numeric: true, disablePadding: false, label: 'Organization' },
      { id: 'duration', numeric: true, disablePadding: false, label: 'Duration' },
      { id: 'creationDate', numeric: true, disablePadding: false, label: 'Creation Date' },
      { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
    ];
    let menuOptions = [
      {label: "Course preview", icon: <TabIcon/>, action: this.preview.bind(this)},
      {label: "Unpublish course" , icon: <UnarchiveIcon/>, action: this.showUnpublishConfirmation.bind(this)},
    ];
    myCourses.map(course => {
      tableData.push({title: course.title, organization: course.organization.label, duration: `${course.duration} hours`, creationDate: course.creationDate.toDateString(), _id: course._id})
    })
    this.setState({
      headRows: headRows,
      menuOptions: menuOptions,
      tableData: tableData,
    }, () => {
      this.setState({
        loading: false,
      })
    });
  }

  showUnpublishConfirmation = (_id) => {
    this.handleClickOpen();
    this.setState({
      dialogConfirmationTitle: 'Unpublish course',
      dialogConfirmationContentText: `Are you sure you want to unpublish this course? All your suscriptors won't be able to access the course content`,
      courseToUnpublish: _id,
      confirmAction: () => this.unpublish(),
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return(
      <div className="management-container">
        {
          this.state.loading ?
            <div className="loading-course-container">
              <Loading message="Loading my courses..."/>
            </div>
          :
          <div className="management-result-container">
            <p className="management-title">My published courses <SchoolIcon className="management-title-icon"/></p>
            <div className="management-table-container">
              <Table
                labels={{pagination: 'Courses per page:', plural: 'courses'}}
                headRows={this.state.headRows}
                menuOptions={this.state.menuOptions}
                tableData={this.state.tableData}
                delete={false}
              />
            </div>
          </div>
        }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
        >
          <DialogTitle className="success-dialog-title" id="alert-dialog-title">{this.state.dialogConfirmationTitle}</DialogTitle>
          <DialogContent className="success-dialog-content">
            <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
              {this.state.dialogConfirmationContentText}
            </DialogContentText>
            <WarningIcon className="warning-dialog-icon"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary" autoFocus>
              Cancel
            </Button>
            <Button onClick={() => this.state.confirmAction()} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

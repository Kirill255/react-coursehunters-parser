import React, { Component } from "react";
import "./Result.css";

// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
// import ListItemText from "@material-ui/core/ListItemText";
// import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }

function fetchHelper(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Success");
    }, 3000);
  });

  // fetch(url)
  //   .then((response) => response.blob())
  //   .then((response) => {
  //     // downloadHelper(response);
  //   })
  //   .catch(console.log);
}

function downloadHelper(blob, el, name) {
  const urlCreator = (window.URL = window.URL || window.webkitURL);
  const imageUrl = urlCreator.createObjectURL(blob);
  const link = document.querySelector(el);
  link.href = imageUrl;
  link.download = name;
  // urlCreator.revokeObjectURL(imageUrl);
}

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [],
      loading: false,
      success: false,
      loadingBox: [],
      successBox: [],
      dontRepeatDownloadBox: []
    };
  }
  static getDerivedStateFromProps(props, state) {
    // http://qaru.site/questions/6812/create-a-javascript-array-containing-1n
    if (props.linksCount !== state.loadingBox.length) {
      return {
        checked: [...Array(props.linksCount).keys()],
        loadingBox: new Array(props.linksCount).fill(false),
        successBox: new Array(props.linksCount).fill(false),
        dontRepeatDownloadBox: new Array(props.linksCount).fill(false)
      };
    }
    return null;
  }

  handleToggle = (value) => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  handleButtonClick = (link, index) => {
    if (!this.state.loadingBox[index] && !this.state.successBox[index]) {
      console.log("Download");
      const loadingBoxOnRequest = [...this.state.loadingBox];
      loadingBoxOnRequest[index] = true;
      console.log(loadingBoxOnRequest);
      this.setState(
        {
          loadingBox: loadingBoxOnRequest
        },
        () => {
          fetchHelper(link).then((response) => {
            console.log(response);
            const loadingBoxAfterRequest = [...this.state.loadingBox];
            loadingBoxAfterRequest[index] = false;
            const successBoxAfterRequest = [...this.state.successBox];
            successBoxAfterRequest[index] = true;
            const dontRepeatDownloadBoxAfterRequest = [...this.state.dontRepeatDownloadBox];
            dontRepeatDownloadBoxAfterRequest[index] = true;
            this.setState({
              loadingBox: loadingBoxAfterRequest,
              successBox: successBoxAfterRequest,
              dontRepeatDownloadBox: dontRepeatDownloadBoxAfterRequest
              // loading: false
              // success: true
            });
          });
        }
      );
    } else {
      console.log("Save");
    }
  };

  render() {
    const { links, onDownloadHandler } = this.props;
    const { loadingBox, successBox, dontRepeatDownloadBox } = this.state;
    return (
      <div className="result">
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              Lesson {index + 1} {link}
              <span className="wrapper">
                <Button
                  variant="contained"
                  color="primary"
                  className=""
                  disabled={loadingBox[index] && !dontRepeatDownloadBox[index]}
                  onClick={() => this.handleButtonClick(link, index)}
                >
                  {loadingBox[index] && !dontRepeatDownloadBox[index] ? (
                    <CircularProgress size={24} className="" />
                  ) : successBox[index] ? (
                    "Save"
                  ) : (
                    "Download"
                  )}
                </Button>
              </span>
            </li>
          ))}
        </ul>

        <Button variant="contained" color="primary" className="button" onClick={onDownloadHandler}>
          Download
        </Button>
      </div>
    );
  }
}

export default Result;

/*
<div className="result">
    <List dense className="list">
      {links.map((link, index) => (
        <ListItem key={index} button onClick={this.handleToggle(index)}>
          <ListItemLink href={link} download={`Lesson ${index + 1}`}>
            <ListItemText primary={`${index + 1}. `} />
          </ListItemLink>
          <ListItemSecondaryAction>
            <Checkbox
              onChange={this.handleToggle(index)}
              checked={this.state.checked.indexOf(index) !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>

    <Button variant="contained" color="primary" className="button" onClick={onDownloadHandler}>
      Download
    </Button>
  </div>




  <a href={link} download={`Lesson${index + 1}`}>
    {`${index + 1}. `}
  </a>


https://gist.github.com/javilobo8/097c30a233786be52070986d8cdb1743
https://bugs.chromium.org/p/chromium/issues/detail?id=373182
https://github.com/axetroy/react-download
https://github.com/Bazai/coursehunters-parser
https://ru.reactjs.org/
https://www.youtube.com/playlist?list=PLFaW_8zE4amOp3pOVCrGO-Ox--q4WShsQ
*/

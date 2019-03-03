import React, { Component } from "react";
import PropTypes from "prop-types";
import { saveAs } from "file-saver";
import "./Result.css";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloudDownload from "@material-ui/icons/CloudDownload";
import CloudDone from "@material-ui/icons/CloudDone";
// import Send from "@material-ui/icons/Send";

function fetchHelper(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.blob())
      .then((response) => {
        resolve(response);
        // downloadHelper(response);
      })
      .catch(reject);
  });
}

function downloadHelper(blob, index) {
  saveAs(blob, `Lesson ${index}`);
}

class Result extends Component {
  static propTypes = {
    links: PropTypes.array,
    linksCount: PropTypes.number,
    onDownloadHandler: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      loadingBox: [],
      successBox: [],
      dontRepeatDownloadBox: []
    };
  }
  static getDerivedStateFromProps(props, state) {
    // http://qaru.site/questions/6812/create-a-javascript-array-containing-1n
    if (props.linksCount !== state.loadingBox.length) {
      return {
        loadingBox: new Array(props.linksCount).fill(false),
        successBox: new Array(props.linksCount).fill(false),
        dontRepeatDownloadBox: new Array(props.linksCount).fill(false)
      };
    }
    return null;
  }

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
            downloadHelper(response, index + 1);

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
            });
          });
        }
      );
    } else {
      console.log("Save");
    }
  };

  render() {
    // const { links, onDownloadHandler } = this.props;
    const { links } = this.props;
    const { loadingBox, successBox, dontRepeatDownloadBox } = this.state;
    return (
      <div className="result">
        <ol>
          {links.map((link, index) => (
            <li className="link-item" key={index}>
              <a
                className="link"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >{`${link}`}</a>
              <span className="wrapper">
                <Button
                  id={`button_${index}`}
                  variant="contained"
                  color="default"
                  size="small"
                  disabled={
                    (loadingBox[index] && !dontRepeatDownloadBox[index]) || successBox[index]
                  }
                  onClick={() => this.handleButtonClick(link, index)}
                >
                  {loadingBox[index] && !dontRepeatDownloadBox[index] ? (
                    <CircularProgress size={24} className="" />
                  ) : successBox[index] ? (
                    <React.Fragment>
                      <CloudDone />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <CloudDownload />
                    </React.Fragment>
                  )}
                </Button>
              </span>
            </li>
          ))}
        </ol>

        {/* <Button
          variant="contained"
          color="secondary"
          className="button"
          onClick={onDownloadHandler}
        >
          Download All
          <Send className="rightIcon" />
        </Button> */}
      </div>
    );
  }
}

export default Result;

/*
Кнопка 'Download All' не работает, просто заглушка
*/
/*
https://gist.github.com/javilobo8/097c30a233786be52070986d8cdb1743
https://bugs.chromium.org/p/chromium/issues/detail?id=373182
https://github.com/axetroy/react-download
https://github.com/Bazai/coursehunters-parser
https://ru.reactjs.org/
https://www.youtube.com/playlist?list=PLFaW_8zE4amOp3pOVCrGO-Ox--q4WShsQ

https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa
https://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
https://github.com/dankogai/js-base64
https://stackoverflow.com/questions/6794255/html-download-a-pdf-file-instead-of-opening-them-in-browser-when-clicked/34729861#34729861
https://www.npmjs.com/package/downloadjs

http://bgrins.github.io/videoconverter.js/#docs
https://developer.mozilla.org/ru/docs/Web/HTTP/Basics_of_HTTP/MIME_types
https://github.com/eligrey/FileSaver.js
https://github.com/jimmywarting/StreamSaver.js
https://stackoverflow.com/questions/5107956/client-side-file-creation-and-download
*/

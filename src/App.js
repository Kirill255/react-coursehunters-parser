import React, { Component } from "react";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import Result from "./components/Result/Result";
import "./App.css";

const parseResponseVideos = (body) => {
  let responseHTML = document.createElement("html");
  responseHTML.innerHTML = body;

  const inputs = responseHTML.querySelectorAll("#lessons-list li");

  const items = Object.keys(inputs).map((element) => {
    let elementHTML = document.createElement("div");
    elementHTML.innerHTML = inputs[element].innerHTML;
    let item = elementHTML.querySelector("link[itemprop=url]").getAttribute("href");
    return item;
  });
  return items;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      links: [],
      linksCount: 0
    };
  }

  onChangeHandler = (e) => {
    // console.log(e.target.value);
    this.setState({ url: e.target.value });
  };

  onSearchHandler = () => {
    if (this.state.url) {
      console.log(this.state.url);
      this.parseHandler(this.state.url);
    }
  };

  parseHandler = (url) => {
    fetch(url)
      .then((response) => response.text())
      .then((response) => {
        const parseResult = parseResponseVideos(response);
        this.setState({ links: parseResult, linksCount: parseResult.length });
      })
      .catch((err) => console.log("Request failed: ", err));
  };

  onDownloadHandler = () => {
    console.log("download");
  };

  render() {
    const { links, linksCount } = this.state;
    return (
      <div className="App">
        <Nav />
        <Search onChangeHandler={this.onChangeHandler} onSearchHandler={this.onSearchHandler} />
        <Result links={links} linksCount={linksCount} onDownloadHandler={this.onDownloadHandler} />
      </div>
    );
  }
}

export default App;

/*
.then((response) => {
        console.log(object);
        if (response.status === 200) {
          parseResponseVideos(response.body);
        } else {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .catch((err) => console.log("request failed", err));
*/

import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Loading from "./Loading";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    // pagesize=8,
    category: "science",
  };

  static propTypes = {
    country: PropTypes.string,
  };
  constructor() {
    super();
    console.log("hello i am constructor form newsitem");
    this.state = {
      articles: [],
      page: 1,
      Loading: false,
      // pagesize: 5,
    };
  }

  // state = {
  //   articles: [], // Initialize articles array in state

  // };

  async componentDidMount() {
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&business&apiKey=d18aed7a18c04e329f5acafc72f415f2&page=1&pagesize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData.articles });
  }

  previous = async () => {
    this.setState({ Loading: true });

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
      this.props.category
    }&business&apiKey=d18aed7a18c04e329f5acafc72f415f2&page=${
      this.state.page - 1
    }&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData.articles });

    this.setState({
      page: this.state.page - 1,
      Loading: false,
    });
  };

  next = async () => {
    this.setState({ Loading: true });

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
      this.props.category
    }&business&apiKey=d18aed7a18c04e329f5acafc72f415f2&page=${
      this.state.page + 1
    }&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData.articles });

    this.setState({
      page: this.state.page + 1,
      Loading: false,
    });
  };

  render() {
    return (
      <>
        <div className="container my-3">
          <h2>News Mela -top headlines</h2>
          {this.state.Loading && <Loading />}
          <div className="row">
            {!this.state.Loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title.slice(0, 20) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 55)
                          : ""
                      }
                      imageurl={element.urlToImage}
                      url={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
          </div>
          <div className="container d-flex justify-content-between ">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="bnt btn-dark"
              onClick={this.previous}
            >
              &larr; previous
            </button>
            <button
              disabled={this.state.page >= 3}
              type="button"
              className="bnt btn-dark"
              onClick={this.next}
            >
              next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default News;

import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageurl, url } = this.props;

    const myStyle = {};
    return (
      <>
        <div className="card my-3" style={myStyle}>
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={url} className="btn btn-sm btn-primary">
              Read more
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default Newsitem;

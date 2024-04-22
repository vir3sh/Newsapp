// import React from "react";

// const Newsitem = (props) => {
//   let { title, description, imageurl, url, author, date } = props;

//   const myStyle = {};
//   return (
//     <>
//       <div className="card my-3" style={myStyle}>
//         <img src={imageurl} className="card-img-top" alt="..." />
//         <div className="card-body">
//           <h5 className="card-title">{title}...</h5>
//           <p className="card-text">{description}...</p>
//           <p class="card-text">
//             <small class="text-muted">
//               by {!author ? "unknown " : author} on{" "}
//               {new Date(date).toGMTString()}
//             </small>
//           </p>

//           <a href={url} className="btn btn-sm btn-primary">
//             Read more
//           </a>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Newsitem;

import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Loading from "./Loading";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&business&apiKey=d18aed7a18c04e329f5acafc72f415f2&page=${page}&pagesize=${props.pagesize}`;
      let data = await fetch(url);
      let parseData = await data.json();
      setArticles(parseData.articles);
      setLoading(false);
    };
    fetchNews();
  }, [props.category, page, props.pagesize]);

  const previous = async () => {
    setPage((prevPage) => prevPage - 1);
  };

  const next = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="container my-3">
        <h2>News Mela - Top Headlines</h2>
        {loading && <Loading />}
        <div className="row">
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <Newsitem
                title={element.title ? element.title.slice(0, 20) : ""}
                description={element.description ? element.description.slice(0, 55) : ""}
                imageurl={element.urlToImage}
                url={element.url}
                author={element.author}
                date={element.publishedAt}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="bnt btn-dark"
            onClick={previous}
          >
            &larr; Previous
          </button>
          <button
            disabled={page >= 3}
            type="button"
            className="bnt btn-dark"
            onClick={next}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </>
  );
};

News.defaultProps = {
  country: "in",
  category: "science",
  pagesize: 8,
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pagesize: PropTypes.number,
};

export default News;


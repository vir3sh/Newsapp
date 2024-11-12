// import React, { useEffect ,useState} from "react";
// import Newsitem from "./Newsitem";
// import Loading from "./Loading";
// import PropTypes from "prop-types";

// const News =()=> {

//   const [articles,setarticles]=useState([])
//   const [Loading,setLoading]=useState([])
//   const [page,setpage]=useState([])
//   // capitalize = (string) => {
//   //   return string.charAt(0).toUppercase() + string.slice(1);
//   // };
//   constructor(props) {
//     super(props);
//     console.log("hello i am constructor form newsitem");
//     this.state = {
//       articles: [],
//       page: 1,
//       Loading: false,
//       // pagesize: 5,
//     };
//     document.title = `${this.props.category}`;
//   }

//   // state = {
//   //   articles: [], // Initialize articles array in state

//   // };

//   async componentDidMount() {
//     console.log("cdm");
//     let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&business&apiKey=d18aed7a18c04e329f5acafc72f415f2&page=1&pagesize=${this.props.pagesize}`;
//     let data = await fetch(url);
//     let parseData = await data.json();
//     console.log(parseData);
//     this.setState({ articles: parseData.articles });
//   }

//   previous = async () => {
//     this.setState({ Loading: true });

//     let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
//       this.props.category
//     }&business&apiKey=d18aed7a18c04e329f5acafc72f415f2&page=${
//       this.state.page - 1
//     }&pageSize=${this.props.pagesize}`;
//     let data = await fetch(url);
//     let parseData = await data.json();
//     console.log(parseData);
//     this.setState({ articles: parseData.articles });

//     this.setState({
//       page: this.state.page - 1,
//       Loading: false,
//     });
//   };

//   next = async () => {
//     this.setState({ Loading: true });

//     let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
//       this.props.category
//     }&business&apiKey=d18aed7a18c04e329f5acafc72f415f2&page=${
//       this.state.page + 1
//     }&pageSize=${this.props.pagesize}`;
//     let data = await fetch(url);
//     let parseData = await data.json();
//     console.log(parseData);
//     this.setState({ articles: parseData.articles });

//     this.setState({
//       page: this.state.page + 1,
//       Loading: false,
//     });
//   };

//   render() {
//     return (
//       <>
//         <div className="container my-3">
//           <h2>News Mela -top headlines</h2>
//           {/* {this.state.Loading && <Loading />} */}
//           <div className="row">
//             {this.state.articles.map((element) => {
//               return (
//                 <div className="col-md-4" key={element.url}>
//                   <Newsitem
//                     title={element.title ? element.title.slice(0, 20) : ""}
//                     description={
//                       element.description
//                         ? element.description.slice(0, 55)
//                         : ""
//                     }
//                     imageurl={element.urlToImage}
//                     url={element.url}
//                     author={element.author}
//                     date={element.publishedAt}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//           {/* <div className="container d-flex justify-content-between ">
//             <button
//               disabled={this.state.page <= 1}
//               type="button"
//               className="bnt btn-dark"
//               onClick={this.previous}
//             >
//               &larr; previous
//             </button>
//             <button
//               disabled={this.state.page >= 3}
//               type="button"
//               className="bnt btn-dark"
//               onClick={this.next}
//             >
//               next &rarr;
//             </button>
//           </div> */}
//         </div>
//       </>
//     );
//   }
// }

// News.defaultProps = {
//   country: "in",
//   // pagesize=8,
//   category: "science",
// };

// News.propTypes = {
//   country: PropTypes.string,
// };
// export default News;

import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import newsData from "./newsData.json";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = props.pagesize || 8; // Set the page size from props, default to 8 if not provided

  useEffect(() => {
    const loadNews = () => {
      setLoading(true);
      // Calculate the start and end index for slicing the articles array
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      setArticles(newsData.articles.slice(start, end)); // Slice the articles array based on the page and page size
      setLoading(false);
    };
    loadNews();
  }, [page, pageSize]);

  const previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const next = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className="container my-3">
        <h2>News Mela - Top Headlines</h2>
        {loading && <Loading />}
        <div className="row">
          {articles && articles.map((element) => (
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
            className="btn btn-dark"
            onClick={previous}
          >
            &larr; Previous
          </button>
          <button
            disabled={articles.length < pageSize} // Disable next button if there are less than pageSize articles
            type="button"
            className="btn btn-dark"
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

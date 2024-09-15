import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const updateNews= async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}-News Monkey`;
    updateNews();
    // eslint-disable-next-line
  }, [])
  // const handlePrevClick = async () => {
  //   setPage(page-1);
  //   updateNews();
  // };
  // const handleNextClick = async () => { 
  //   setPage(page+1);
  //   updateNews();
  // };
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };
  return (
        <>
        {/* <div className="container my-3"></div>   */}
        <h1 className="text-center" style={{ margin: "40px 0px",marginTop:'90px' }}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)}
          Headlines
        </h1>
         {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {articles.map((element,index) => (
              <div className="col-md-4" key={`${element.url}-${index}`}>

                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
          </div>
        </InfiniteScroll>
      
        </>
    );
}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;

//Class Based Component
// import React, { Component } from "react";
// import NewsItem from "./NewsItem";
// import Spinner from "./Spinner";
// import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

// export class News extends Component {
//   static defaultProps = {
//     country: "in",
//     pageSize: 8,
//     category: "general",
//   };
//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
//   };
//   capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };
//   constructor(props) {
//     super(props);
//     console.log("Hello I am a constructor from news component");
//     this.state = {
//       articles: [], // Initialize articles as an empty array
//       loading: true,
//       page: 1,
//       totalResults: 0
//     }
//     document.title = `${this.capitalizeFirstLetter(
//       props.category
//     )}-News Monkey`;
//   }
  
//   async updateNews() {
//     props.setProgress(10);
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pagesize=${props.pageSize}`;
//     this.setState({ loading: true });
//     let data = await fetch(url);
//     props.setProgress(30);
//     let parsedData = await data.json();
//     props.setProgress(70);
//     console.log(parsedData);
//     this.setState({
//       articles: parsedData.articles,
//       totalResults: parsedData.totalResults,
//       loading: false,
//     });
//     props.setProgress(100);
//   }
//   async componentDidMount() {
//     // console.log("cdn");
//     // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ed6bca5e498840978e8372a9f2ba89c8&page=1&pagesize=${props.pageSize}`;
//     // this.setState({loading:true});
//     // let data=await fetch(url);
//     // let parsedData=await data.json()
//     // console.log(parsedData);
//     // this.setState({articles:parsedData.articles,
//     //   totalResults:parsedData.totalResults,
//     //   loading:false
//     // })
//     this.updateNews();
//   }
//   handlePrevClick = async () => {
//     console.log("Previous");
//     // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ed6bca5e498840978e8372a9f2ba89c8&page=${
//     //   this.state.page-1}&pagesize=${props.pageSize}`;
//     //   this.setState({loading:true});
//     // let data=await fetch(url);
//     // let parsedData=await data.json()
//     // console.log(parsedData);
//     // this.setState({
//     //   articles:parsedData.articles,
//     //   page:this.state.page-1,
//     //   loading:false
//     // })
//     this.setState({ page: this.state.page - 1 });
//     this.updateNews();
//   };
//   handleNextClick = async () => {
//     // console.log("Next");
//     // if(!(this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize))){
//     // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ed6bca5e498840978e8372a9f2ba89c8&page=${
//     // this.state.page+1}&pagesize=${props.pageSize}`;
//     // this.setState({loading:true});
//     // let data=await fetch(url);
//     // let parsedData=await data.json()
//     // console.log(parsedData);
//     // this.setState({
//     //   articles:parsedData.articles,
//     //   page:this.state.page+1,
//     //   loading:false
//     // })
//     // }
//     this.setState({ page: this.state.page + 1 });
//     this.updateNews();
//   };
//   fetchMoreData = async () => {
//     this.setState({ page: this.state.page + 1 });
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pagesize=${props.pageSize}`;
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     // console.log(parsedData);
//     this.setState({
//       articles: this.state.articles.concat(parsedData.articles),
//       totalResults: parsedData.totalResults,
//     });
    
//   };

//   render() {
//     return (
//         <>
//         {/* <div className="container my-3"></div>   */}
//         <h1 className="text-center" style={{ margin: "40px 0px" }}>
//           NewsMonkey - Top {this.capitalizeFirstLetter(props.category)}
//           Headlines
//         </h1>
//          {this.state.loading && <Spinner/>}
//         {/* <div className="row">
//         {!this.state.loading && this.state.articles.map((element) => (
//           <div className="col-md-4" key={element.url}>
//           <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
//         </div>
//         ))}  */}
        
//         <InfiniteScroll
//           dataLength={this.state.articles.length}
//           next={this.fetchMoreData}
//           hasMore={this.state.articles.length !== this.state.totalResults}
//           // loader={<Spinner/>}
//         >
//           <div className="container">
//           <div className="row">
//             {this.state.articles.map((element,index) => (
//               // <div className="col-md-4" key={element.url}>
//               <div className="col-md-4" key={`${element.url}-${index}`}>

//                 <NewsItem
//                   title={element.title ? element.title.slice(0, 45) : ""}
//                   description={
//                     element.description ? element.description.slice(0, 88) : ""
//                   }
//                   imageUrl={element.urlToImage}
//                   newsUrl={element.url}
//                   author={element.author}
//                   date={element.publishedAt}
//                   source={element.source.name}
//                 />
//               </div>
//             ))}
//           </div>
//           </div>
//         </InfiniteScroll>
//         {/* <div className="container d-flex justify-content-between">
//           <button
//             disabled={this.state.page <= 1}
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handlePrevClick}
//           >
//             &larr; Previous
//           </button>
//           <button
//             disabled={
//               this.state.page + 1 >
//               Math.ceil(this.state.totalResults / props.pageSize)
//             }
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handleNextClick}
//           >
//             Next&rarr;
//           </button>
//         </div> */}
//         {/* </div> */}
//         </>
//     );
//   }
// }

// export default News;
// // render() {
// //   return (
// //     <div className='container my-3'>
// //       <h2>NewsMonkey - Top Headlines</h2>
// //       <div className="row">
// //         <div className="col-md-4">
// //           <NewsItem title="my Title" description="my desc" imageUrl="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg" newsUrl="todo"/>
// //         </div>
// //         <div className="col-md-4">
// //           <NewsItem title="my Title" description="my desc"/>
// //         </div>
// //         <div className="col-md-4">
// //           <NewsItem title="my Title" description="my desc"/>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

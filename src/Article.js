import React, { useState, useEffect } from "react";
import axios from "axios";
import useInfiniteScroll from "./useInfinite"

const Article = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useInfiniteScroll(moreData);

  const loadData = () =>{
    let url = "https://medrum.herokuapp.com/articles";
    axios.get(url).then(res => {
      setData(res.data);
    });
  }
  function moreData() {
    let url = `https://medrum.herokuapp.com/feeds/?source=5718e53e7a84fb1901e05971&page=${page}&sort=latest`;
    axios.get(url).then(res => {
      setData([...data, ...res.data]);
      setPage(page+1)
      setIsFetching(false)
    });
  }
  
  useEffect(()=>{
    loadData()
  }, [])

  if (data.length==0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <ul className="list-group-ul">
        {data.map((article, key) => (
          <li className="list-group-li" key={key}>
          {key+1}. {" "}
            <a href={article.url} target="_blank">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Article;

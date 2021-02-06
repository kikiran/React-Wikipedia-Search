import React, { useEffect, useState } from "react";
import { wikiPediaApi } from "../api/index";
import Loader from "react-loader-spinner";

const WikipediaSearch = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("google");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [load, setLoad] = useState(false);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    setLoad(true);

    wikiPediaApi(searchTerm).then((items) => {
      if (searchTerm) {
        setData(items.query.search);
        setLoad(false);
      }
    });
  }, [debouncedTerm]);

  return (
    <div className="ui container">
      <h2>Wikipedia Search App</h2>
      <form className="ui form">
        <div className="field">
          <input
            type="text"
            name="search"
            placeholder="Search"
            onChange={handleChange}
          />
        </div>
      </form>
      {load ? (
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      ) : data ? (
        data.map((item, i) => (
          <div className="ui celled list" key={i}>
            <div key={item.pageid} className="item">
              <div className="right floated content">
                <a
                  className="ui button"
                  href={`https://en.wikipedia.org?curid=${item.pageid}`}
                >
                  Go
                </a>
              </div>
              <div className="content">
                <div className="header">{item.title}</div>
                <span
                  dangerouslySetInnerHTML={{ __html: item.snippet }}
                ></span>
              </div>
            </div>
          </div>
        ))
      ) : <div>No Results </div>
      
      }
    </div>
  );
};

export default WikipediaSearch;

import "./Vans.css";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Vans() {
  const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  // console.log(typeFilter);

  useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);
  //filter the vans, adding filtering funtionality
  const filteredItems = typeFilter
    ? vans.filter((item) => item.type === typeFilter)
    : vans;
  //map the filtered data, if condition is true filtered items are pass, if false all vans are passed
  const vanElements = filteredItems.map((van) => (
    //state ={{search: searchParams.toString() is added to pass it to another linked page, passed to url as history }}
    <Link to={`/vans/${van.id}`} state={{search : `?${searchParams.toString()}`, type : typeFilter}}>
      <div key={van.id} className="van-card">
        <img src={van.imageUrl} alt={van.name} />
        <span className="van-type-mobile">{van.type}</span>
        <div className="van-card_details">
          <h1>{van.name}</h1>
          <p>${van.price}/per day</p>
          <p className="van-type-pc">{van.type}</p>
        </div>
      </div>
    </Link>
  ));

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  return (
    <div className="van-list-container">
      <h1 className="pagetitle">Explore our van options</h1>
      <div className="filter-buttons">
        <button
          className={`filter-btn ${typeFilter === "simple" ? "selected" : ""}`}
          onClick={() => handleFilterChange("type", "simple")}
        >
          Simple
        </button>
        <button
          className={`filter-btn ${typeFilter === "rugged" ? "selected" : ""}`}
          onClick={() => handleFilterChange("type", "rugged")}
        >
          Rugged
        </button>
        <button
          className={`filter-btn ${typeFilter === "luxury" ? "selected" : ""}`}
          onClick={() => handleFilterChange("type", "luxury")}
        >
          Luxury
        </button>
        {typeFilter ? (
          <button
            className="filter-btn"
            onClick={() => handleFilterChange("type", null)}
          >
            Clear
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}

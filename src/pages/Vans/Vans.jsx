import "./Vans.css";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
export default function Vans() {
  const [vans, setVans] = useState([]);
  useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);
  const vanElements = vans.map((van) => (
      <Link to={`/vans/${van.id}`}>
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
  return (
    <div className="van-list-container">
      <h1 className="pagetitle">Explore our van options</h1>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}

import "./VanDetail.css";
import { useEffect, useState } from "react";
import { Link, useParams, useLocation  } from "react-router-dom";
export default function VanDetail() {
  const params = useParams();
  // console.log(params.id);
  const location = useLocation()
  console.log(location);
  
  const [van, setVan] = useState(null);

  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, [params.id]);
//optional chaining => if the object =>location has state then search from 'search' else empty string
//location uses the history provided by previous page provided by => state={{search : `?${searchParams.toString()}`}}
  const search = location.state?.search || ''
  //optional chaining used
  const type = location.state?.type || 'all'
  return (
    <div>
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>

      {van ? (
        <div className="van-details">
          <img src={van.imageUrl} alt="{van.name}" />
          <div className="van-details-info">
            <p className="van-type">{van.type}</p>
            <h2>{van.name}</h2>
            <p>${van.price}/day</p>
            <p>{van.description}</p>
            <button className="button-rent">Rent this van</button>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

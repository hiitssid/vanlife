import "./VanDetail.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function VanDetail() {
  const params = useParams();
  // console.log(params.id);
  const [van, setVan] = useState(null);

  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, [params.id]);
  return (
    <div>
      {van ? (
        <div className="van-details">
          <img src={van.imageUrl} alt="{van.name}" />
          <div className="van-details-info">
            <p className="van-type">{van.type}</p>
            <h2>{van.name}</h2>
            <p>${van.price}/day</p>
            <p>{van.description}</p>
            <button>Rent this van</button>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

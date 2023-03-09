import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function HostVansDetails() {
    const params = useParams()
    console.log(params);
    
    const[currentVans, setCurrentVans] = useState(null)
    useEffect(()=>{
        fetch(`api/host/vans/${params.id}`)
        .then(res=>res.json())
        .then(data=> console.log(data.vans))
    },[])
  return (
    <div>Host Vans Details Page</div>
  )
}

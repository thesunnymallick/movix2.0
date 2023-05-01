import{ useEffect, useState } from 'react'
import { fetchDataFromApi } from '../utils/apiConfig';

const useFetch = (url) => {
 
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const[error, setError]=useState(null);
    
    useEffect(()=>{
         setData(null);
         setLoading(true);
         setError(null);

        fetchDataFromApi(url).then((res)=>{
           setData(res);
           setLoading(false)
           setError(null);
        })
        .catch((error)=>{
          setData(null);
          setError("Something went worng");
          setLoading(false)
        })
    },[url])
   
    return {data, loading, error}
}

export default useFetch
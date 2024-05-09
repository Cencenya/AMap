import { useRef, useEffect, useState } from "react";

function useIsFirstRender(): boolean {
  const isFirstRenderRef = useRef<boolean>(true);

  useEffect(() => {
    isFirstRenderRef.current = false;
  }, []);

  return isFirstRenderRef.current;
}

export default useIsFirstRender;


function useFetchData<T>() {

  const [data,setData] = useState<T>();
  const [error,setError] = useState();
  const [loading,setLoading] = useState<boolean>(false)

  const getData = async () => {
    setLoading(true)
    try {
       // 请求
     const res = fetch('')
     setData(res as T)
     setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
    
  }

  return [data,error,loading,getData]
  
}
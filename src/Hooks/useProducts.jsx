import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


export default function useProducts() {
    function getProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      }
      const productInfo = useQuery({
        queryKey: ["recentProduct"],
        queryFn : getProducts,
        staleTime : 20000,
        // retry : 6,
        // retryDelay : 3000,
        // refetchInterval: 30000,
        // refetchIntervalInBackground :true,
        // refetchOnWindowFocus: true,
        // gcTime : 6000,
        // select : (data) => data.data.data,
    
    
    
      });


      return productInfo
      
}

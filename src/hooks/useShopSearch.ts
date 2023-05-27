import { useEffect, useState } from "react";
import { Shop } from "../components/maps";

import queryString from "query-string";

const url =
  "{{baseUrl}}/api/farmers/find?location_longitude=-73.9&location_latitude=40.6&maxDistance_km=30&filter_groceryTypes=Potato,Strawberry";

interface ShopSearchOptions {
  location: { longitude: number; latitude: number };
  maxDistance: number;
  categories: string[];
  organic: boolean;
  ecoPackaging: boolean;
}

export function useShopSearch() {
  const [shops, setShops] = useState<Shop[]>([]);

  const fetchShops = (searchOptions: ShopSearchOptions) => {
    const query = queryString.stringify(
        {
          location_longitude: searchOptions.location.longitude,
          location_latitude: searchOptions.location.latitude,
          maxDistance_km: searchOptions.maxDistance,
          filter_groceryTypes: searchOptions.categories,
        },
        { arrayFormat: "comma" }
      );

      console.warn("query", query)
  
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/farmers/find?${query}`)
        .then((response) => response.json())
        .then((data) => {
          console.warn("data", data)
          const shops: Shop[] = data.map((shop: any): Shop => ({
              location: {
                  lat: shop.location.latitude as number,
                  lng: shop.location.longitude as number
              },
              name: shop.name as string,
              categories: shop.groceryTypes as string[],
          }));
          console.error("abc", shops)
          setShops(shops)
      }).catch((error) => {
          console.log(error)
      });
  }

  return {shopsNearby: shops, fetchShops};
}

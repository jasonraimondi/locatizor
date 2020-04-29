import React, { useEffect, useState } from "react";
import { of, Subject, Subscription } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { catchError, debounceTime, map, startWith, switchMap, tap } from "rxjs/operators";

type OpenStreetMapResult = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon: string;
}

export const MapSearch = () => {
  const onSearch$ = new Subject();
  let subscription: Subscription;

  const [results, setResults] = useState([])

  useEffect(() => {
    subscription = onSearch$
      .pipe(
        debounceTime(1000),
        switchMap(query => {
          if (!query) {
            return of([]);
          }
          return fromFetch(
            `https://nominatim.openstreetmap.org/search?q=${query}&format=json`,
          ).pipe(
            switchMap(response => {
              if (response.ok) {
                return response.json();
              } else {
                return of({ error: true, message: `Error ${response.status}` });
              }
            }),
            catchError(err => of({ error: true, message: err.message })),
            tap(console.log),
            map(res => res.map((address: OpenStreetMapResult) => ({
              description: address.display_name,
              latitude: address.lat,
              longitude: address.lon,
            }))),
          );
        }),
        startWith(results),
      )
      .subscribe(searchResults => {
        setResults(searchResults);
      });
    return () => subscription?.unsubscribe();
  });

  const onSearch = (e: any) => {
    const value = e.target.value;
    onSearch$.next(value);
  };

  return <>Hi fred
    <input type="text" onChange={onSearch}/>
    {JSON.stringify(results)}
  </>;
};

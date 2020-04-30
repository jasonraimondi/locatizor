import React, { useEffect, useState } from "react";
import { of, Subject, Subscription } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { catchError, debounceTime, map, startWith, switchMap, tap } from "rxjs/operators";
import styled from "styled-components";
import { useMap } from "./providers/use_map_provider";

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

  const { setUserPosition } = useMap();
  const [results, setResults] = useState<{ description: string; latitude: number; longitude: number; }[]>([]);

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

  return <div style={{ position: "relative" }}>
    <TextInput type="text" onChange={onSearch} placeholder="200 Santa Monica Pier, Santa Monica, CA 90401"/>
    <ResultContainer>
      {results.map((r, idx) => (
        <Text key={idx} onClick={() => setUserPosition([r.latitude, r.longitude])}>{r.description}</Text>
      ))}
    </ResultContainer>
  </div>;
};

const ResultContainer = styled.div`
  position: absolute;
  z-index: 999;
  width: 100%;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 0.2rem;
  border-bottom: 1px solid ${props => props.theme.gray["800"]};
`;

const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: rgba(255, 255, 255, 0.75);
  border-bottom: 1px solid rgba(50, 50, 50, 0.4);

  &:hover {
    background-color: orange;
  }
`;

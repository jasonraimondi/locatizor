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
  const [pristine, setPristine] = useState(true);
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

  let content: any = <ResultContainer>
    {results.map((r, idx) => (
      <Result key={idx} onClick={() => {
        setPristine(true);
        setUserPosition([r.latitude, r.longitude]);
        setResults([]);
      }}>{r.description}</Result>
    ))}
  </ResultContainer>;

  if (results.length === 0) {
    content = <Result className="no-hover">No Results</Result>;
  }

  if (results.length === 0 && pristine) {
    content = undefined;
  }

  return <SearchContainer>
    <TextInput type="text" onChange={onSearch} placeholder="200 Santa Monica Pier, Santa Monica, CA 90401"/>
    <CloseText onClick={() => {
      setResults([]);
      setPristine(true);
      onSearch$.next("");
    }}>&times;</CloseText>
    {content}
  </SearchContainer>;
};

const CloseText = styled.span`
    position: absolute;
    right: 0.45rem;
    font-size: 1.4rem;
    top: -0.1rem;
    cursor: pointer;
`;

const SearchContainer = styled.div`
  position: absolute;
  z-index: 999;
  margin: 10px;
  width: calc(100% - 4rem);
  float: right;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 0.2rem;
  border: 1px solid ${props => props.theme.gray["800"]};
  border-radius: 0.25rem;
`;

const ResultContainer = styled.div`
  margin-top: 0.5rem;
  background-color: rgba(255, 255, 255, 0.75);
  border: 1px solid ${props => props.theme.gray["400"]};
  border-radius: 0.25rem;
`;

const Result = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: inherit;

  &:hover {
    background-color: orange;
  }

  &.no-hover:hover {
    background-color: inherit;
  }
`;

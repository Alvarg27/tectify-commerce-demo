import React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Hits, SearchBox } from "react-instantsearch-dom";
import Hit from "./Hit";

const searchClient = algoliasearch(
  "T2G3MVZEDR",
  "afa7109e7997947bec0c6c51fe14555e"
);

export default function Search() {
  return (
    <div>
      <InstantSearch indexName="products" searchClient={searchClient}>
        {/* Widgets */}
        <SearchBox />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
}

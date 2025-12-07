"use client";

import {Container} from "@brynlabs/fusion-ui";
import {SearchBar} from "@/components/search-bar/search-bar";
import {SearchResults} from "@/components/search-results";
import {useState} from "react";

export default function Page() {
  const [query, setQuery] = useState("");

  return (
    <Container direction={"both"}>
      <SearchBar value={query} onChange={setQuery} />
      <SearchResults query={query}></SearchResults>
    </Container>
  );
}

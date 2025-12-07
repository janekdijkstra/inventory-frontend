"use client";

import React from "react";
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {searchItems} from "@/api/itemApi";
import {ItemPreview} from "@/components/item-preview/item-preview";

export const SearchResults = ({query}: {query: string}) => {
  const {data: session} = useSession();

  const {isPending, error, data} = useQuery(searchItems(session?.access_token || "", query));

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>Suchergebnisse</h1>

      {(data || []).map((item, index) => (
        <React.Fragment key={index}>
          <ItemPreview item={item} />
        </React.Fragment>
      ))}
    </div>
  );
};

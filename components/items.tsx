"use client";

import React from "react";
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {listItems} from "@/api/itemApi";
import {ItemPreview} from "@/components/item-preview/item-preview";

export const Items = () => {
  const {data: session} = useSession();

  const {isPending, error, data} = useQuery(listItems(session?.access_token || ""));

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>Items</h1>

      {(data || []).map((item, index) => (
        <React.Fragment key={index}>
          <ItemPreview item={item} />
        </React.Fragment>
      ))}
    </div>
  );
};

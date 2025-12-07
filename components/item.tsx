"use client";

import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {getItem, getStorageUnitsByItem} from "@/api/itemApi";

export const Item = ({id}: {id: string}) => {
  const {data: session} = useSession();

  const {isPending, error, data} = useQuery(getItem(session?.access_token || "", id));
  const storageUnits = useQuery(getStorageUnitsByItem(session?.access_token || "", id));

  if (isPending || storageUnits.isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  if (storageUnits.error) return "An error has occurred: " + storageUnits.error.message;

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.description}</p>
      <pre>{JSON.stringify(storageUnits.data, null, 2)}</pre>
    </div>
  );
};

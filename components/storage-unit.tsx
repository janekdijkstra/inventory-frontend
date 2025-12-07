"use client";

import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {getItemsByStorageUnit, getStorageUnit} from "@/api/itemApi";
import {StorageUnitItem} from "@/components/storage-unit-item/storage-unit-item";
import {Fragment} from "react";

export const StorageUnit = ({id}: {id: string}) => {
  const {data: session} = useSession();

  const {isPending, error, data} = useQuery(getStorageUnit(session?.access_token || "", id));
  const itemsByStorageUnit = useQuery(getItemsByStorageUnit(session?.access_token || "", id));

  if (isPending || itemsByStorageUnit.isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  if (itemsByStorageUnit.error) return "An error has occurred: " + itemsByStorageUnit.error.message;

  return (
    <div>
      <h1>{data?.readableId}</h1>
      <p>Type: {data?.type}</p>

      {(itemsByStorageUnit.data || []).map((item, index) => (
        <Fragment key={index}>
          <StorageUnitItem item={item} storageUnit={data} />
        </Fragment>
      ))}
    </div>
  );
};

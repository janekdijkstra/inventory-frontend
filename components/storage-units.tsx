"use client";

import React from "react";
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {listStorageUnits} from "@/api/itemApi";
import {StorageUnitPreview} from "@/components/storage-unit-preview/storage-unit-preview";

export const StorageUnits = () => {
  const {data: session} = useSession();

  const {isPending, error, data} = useQuery(listStorageUnits(session?.access_token || ""));

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>Lagereinheiten</h1>

      {(data || []).map((storageUnit, index) => (
        <React.Fragment key={index}>
          <StorageUnitPreview storageUnit={storageUnit} />
        </React.Fragment>
      ))}
    </div>
  );
};

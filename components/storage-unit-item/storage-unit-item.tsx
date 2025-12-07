"use client";

import {insertItem, ItemDetails, StorageUnit} from "@/api/itemApi";
import styles from "./storage-unit-item.module.scss";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import Link from "next/link";

export const StorageUnitItem = ({
  item,
  storageUnit,
}: {
  item: ItemDetails;
  storageUnit: StorageUnit;
}) => {
  const {data: session} = useSession();
  const queryClient = useQueryClient();

  const update = useMutation(insertItem(session?.access_token, queryClient));

  return (
    <div className={styles.item}>
      <div>
        <Link href={`/item/${item.id}`}>{item.name}</Link>
      </div>
      <div className={styles.buttons}>
        <button
          onClick={() => update.mutate({itemId: item.id, storageId: storageUnit.id, count: -1})}>
          -
        </button>
        <div className={styles.count}>{item.count}</div>
        <button
          onClick={() => update.mutate({itemId: item.id, storageId: storageUnit.id, count: 1})}>
          +
        </button>
      </div>
    </div>
  );
};

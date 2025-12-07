"use client";

import box from "@/assets/box.jpg";
import pallet from "@/assets/pallet.jpg";

import Image from "next/image";
import {StorageUnit} from "@/api/itemApi";

import styles from "./storage-unit-preview.module.scss";
import Link from "next/link";

export const StorageUnitPreview = ({storageUnit}: {storageUnit: StorageUnit}) => (
  <Link href={`/storage-unit/${storageUnit.id}`}>
    <div className={styles.storageUnit}>
      {storageUnit.type === "PALLET" && <Image src={pallet} alt={storageUnit.type} />}
      {storageUnit.type === "BOX" && <Image src={box} alt={storageUnit.type} />}

      <div className={styles.content}>
        <h2>{storageUnit.readableId}</h2>
      </div>
    </div>
  </Link>
);

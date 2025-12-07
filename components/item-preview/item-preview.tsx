import {Item} from "@/api/itemApi";
import styles from "./item-preview.module.scss";
import Link from "next/link";

export const ItemPreview = ({item}: {item: Item}) => (
  <Link href={`/item/${item.id}`}>
    <div className={styles.itemPreview}>
      <h2>{item.name}</h2>
      <p>{item.description.slice(0, 50)}</p>
    </div>
  </Link>
);

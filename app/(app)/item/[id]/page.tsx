import {Item} from "@/components/item";

export default async function Page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  return <Item id={id}></Item>;
}

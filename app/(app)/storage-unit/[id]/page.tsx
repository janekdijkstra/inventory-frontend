import {StorageUnit} from "@/components/storage-unit";

export default async function Page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  return <StorageUnit id={id}></StorageUnit>;
}

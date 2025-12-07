"use client";

import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {listPrinters} from "@/api/printer";

export const PrinterList = () => {
  const {data: session} = useSession();
  const {isPending, error, data} = useQuery(listPrinters(session?.access_token));

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

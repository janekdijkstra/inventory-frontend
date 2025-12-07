"use client";

import {useMutation} from "@tanstack/react-query";
import {createPrinter} from "@/api/printer";
import {useSession} from "next-auth/react";

export const CreatePrinter = () => {
  const {data: session} = useSession();
  const mutation = useMutation(createPrinter(session?.access_token));

  if (mutation.isIdle) {
    return (
      <div>
        <button onClick={() => mutation.mutate()}>Create Printer</button>
      </div>
    );
  }

  if (mutation.isPending) {
    return <div>Loading..</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  return (
    <div>
      <div>Use this secret key to setup the printer. This will be visible only once.</div>
      <div>{mutation.data.secretKey}</div>
    </div>
  );
};

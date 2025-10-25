"use client";

import {QueryClient, QueryClientProvider as Provider} from "@tanstack/react-query";
import {PropsWithChildren} from "react";

const queryClient = new QueryClient();

export const QueryClientProvider = ({children}: PropsWithChildren) => (
  <Provider client={queryClient}>{children}</Provider>
);

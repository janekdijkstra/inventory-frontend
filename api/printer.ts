import {DefaultError, queryOptions, UseMutationOptions} from "@tanstack/react-query";
import {Printer} from "@/model/printer";

export const listPrinters = (access_token: string | undefined) =>
  queryOptions({
    queryKey: ["printers"],
    queryFn: async (): Promise<Printer[]> => {
      if (!access_token) {
        throw new Error("no access token");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/printer`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (!response.ok) {
        throw new Error("response was not ok " + response.status);
      }
      return await response.json();
    },
  });

export type CreatePrinterResponse = {
  secretKey: string;
};

export const createPrinter = (
  access_token: string | undefined,
): UseMutationOptions<CreatePrinterResponse, DefaultError, void, unknown> => ({
  mutationFn: async (events: void): Promise<CreatePrinterResponse> => {
    if (!access_token) {
      throw new Error("no access token");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/printer`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(events),
    });

    if (!response.ok) {
      throw new Error("response was not ok " + response.status);
    }
    return await response.json();
  },
});

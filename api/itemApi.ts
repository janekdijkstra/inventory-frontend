import {DefaultError, QueryClient, queryOptions, UseMutationOptions} from "@tanstack/react-query";

export type Item = {
  id: string;
  name: string;
  description: string;
  eanNumber: string;
  orderUrl: string;
};

export type StorageUnit = {
  id: string;
  readableId: string;
  type: StorageUnitType;
};

export type ItemDetails = {
  id: string;
  name: string;
  count: number;
};

export type StorageUnitItemDetails = {
  id: string;
  itemId: string;
  readableId: string;
  type: StorageUnitType;
  count: number;
};

export type StorageUnitType = "BOX" | "PALLET";

export const listItems = (access_token: string) =>
  queryOptions({
    queryKey: ["items"],
    queryFn: async (props): Promise<Item[]> => {
      console.log(props);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/item`, {
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

export const searchItems = (access_token: string, query: string) =>
  queryOptions({
    queryKey: ["search-items", query],
    queryFn: async (props): Promise<Item[]> => {
      console.log(props);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/item/search?q=${query}`, {
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

export const getItem = (access_token: string, id: string) =>
  queryOptions({
    queryKey: ["items", id],
    queryFn: async (props): Promise<Item> => {
      console.log(props);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/item/${id}`, {
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

export const getStorageUnitsByItem = (access_token: string, id: string) =>
  queryOptions({
    queryKey: ["items-storage-unit", id],
    queryFn: async (props): Promise<StorageUnitItemDetails[]> => {
      console.log(props);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/item/${id}/storage-unit`, {
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

export const getItemsByStorageUnit = (access_token: string, id: string) =>
  queryOptions({
    queryKey: ["storage-unit-items", id],
    queryFn: async (props): Promise<ItemDetails[]> => {
      console.log(props);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/item/by-storage-unit/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("response was not ok " + response.status);
      }
      return await response.json();
    },
  });

export const listStorageUnits = (access_token: string) =>
  queryOptions({
    queryKey: ["storage-units"],
    queryFn: async (): Promise<StorageUnit[]> => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/storage-unit`, {
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

export const getStorageUnit = (access_token: string, id: string) =>
  queryOptions({
    queryKey: ["storage-units", id],
    queryFn: async (props): Promise<StorageUnit> => {
      console.log(props);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/storage-unit/${id}`, {
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

export type ItemStorageInsertRequest = {
  itemId: string;
  storageId: string;
  count: number;
};

export const insertItem = (
  access_token: string | undefined,
  queryClient: QueryClient,
): UseMutationOptions<ItemDetails, DefaultError, ItemStorageInsertRequest, unknown> => ({
  mutationFn: async (events: ItemStorageInsertRequest): Promise<ItemDetails> => {
    if (!access_token) {
      throw new Error("no access token");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/item/insert`, {
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
  onSuccess: (data, variables) => {
    const queryKey = ["storage-unit-items", variables.storageId];
    const cachedData = queryClient.getQueryData<ItemDetails[]>(queryKey);
    const oldData: ItemDetails[] = cachedData ? [...cachedData] : [];

    const index = oldData.findIndex(item => item.id === data.id);
    if (index !== -1) {
      oldData.splice(index, 1, data);
      queryClient.setQueryData(queryKey, oldData);
    }
  },
});

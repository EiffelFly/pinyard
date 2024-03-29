"use client";

import { useSupabaseBrowser } from "@/lib/utils";
import { CreateItemPayload, createItemMutation } from "@/supabase-query";
import { Database } from "@/types/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateItem() {
  const queryClient = useQueryClient();
  const client = useSupabaseBrowser();
  return useMutation({
    mutationFn: async ({
      payload,
      userID,
    }: {
      payload: CreateItemPayload;
      userID: string;
    }) => {
      const { data, error } = await createItemMutation(client, payload);

      if (error) {
        return Promise.reject(error);
      }

      return { data: data[0], userID };
    },
    onSuccess: ({ data, userID }) => {
      queryClient.setQueryData<Database["public"]["Tables"]["items"]["Row"][]>(
        ["users", userID, "items"],
        (old) => {
          if (!old) {
            return [data];
          }

          return [...old, data];
        }
      );
    },
  });
}

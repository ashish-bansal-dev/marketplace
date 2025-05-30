import { useMutation } from "@tanstack/react-query";

import { UniqueIdentifier } from "@dnd-kit/core";
import { Spinner } from "@medusajs/icons";
import { FetchError } from "@medusajs/js-sdk";
import { HttpTypes } from "@medusajs/types";
import { toast } from "@medusajs/ui";
import { useState } from "react";
import { RouteFocusModal } from "../../../../../components/modals";
import {
  categoriesQueryKeys,
  useProductCategories,
} from "../../../../../hooks/api/categories";
import { sdk } from "../../../../../lib/client";
import { queryClient } from "../../../../../lib/query-client";
import { CategoryTree } from "../../../common/components/category-tree";
import { CategoryTreeItem } from "../../../common/types";

const QUERY = {
  fields: "id,name,parent_category_id,rank,*category_children",
  parent_category_id: "null",
  include_descendants_tree: true,
  limit: 9999,
};

export const OrganizeCategoryForm = () => {
  const {
    product_categories,
    isPending,
    isError,
    error: fetchError,
  } = useProductCategories(QUERY);

  const [snapshot, setSnapshot] = useState<CategoryTreeItem[]>([]);

  const { mutateAsync, isPending: isMutating } = useMutation({
    mutationFn: async ({
      value,
    }: {
      value: {
        id: string;
        parent_category_id: string | null;
        rank: number | null;
      };
      arr: CategoryTreeItem[];
    }) => {
      await sdk.vendor.productCategory.update(value.id, {
        rank: value.rank ?? 0,
        parent_category_id: value.parent_category_id,
      });
    },
    onMutate: async (update) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: categoriesQueryKeys.list(QUERY),
      });

      // Snapshot the previous value
      const previousValue:
        | HttpTypes.AdminProductCategoryListResponse
        | undefined = queryClient.getQueryData(categoriesQueryKeys.list(QUERY));

      const nextValue = {
        ...previousValue,
        product_categories: update.arr,
      };

      // Optimistically update to the new value
      queryClient.setQueryData(categoriesQueryKeys.list(QUERY), nextValue);

      return {
        previousValue,
      };
    },
    onError: (error: FetchError, _newValue, context) => {
      // Roll back to the previous value
      queryClient.setQueryData(
        categoriesQueryKeys.list(QUERY),
        context?.previousValue
      );

      toast.error(error.message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: categoriesQueryKeys.all,
      });
    },
  });

  const handleRankChange = async (
    value: {
      id: UniqueIdentifier;
      parentId: UniqueIdentifier | null;
      index: number;
    },
    arr: CategoryTreeItem[]
  ) => {
    const val = {
      id: value.id as string,
      parent_category_id: value.parentId as string | null,
      rank: value.index,
    };

    setSnapshot(arr);
    await mutateAsync({ value: val, arr });
  };

  const loading = isPending || isMutating;

  if (isError) {
    throw fetchError;
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <RouteFocusModal.Header>
        <div className="flex items-center justify-end">
          {loading && <Spinner className="animate-spin" />}
        </div>
      </RouteFocusModal.Header>
      <RouteFocusModal.Body className="bg-ui-bg-subtle flex flex-1 flex-col overflow-y-auto">
        <CategoryTree
          renderValue={(item) => item.name}
          value={loading ? snapshot : product_categories || []}
          onChange={handleRankChange}
        />
      </RouteFocusModal.Body>
    </div>
  );
};

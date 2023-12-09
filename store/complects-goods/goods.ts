import { defineStore } from "pinia";
import type { SortTypes } from "./filters";
import { SERVER_URL } from "~/utils/constants";

interface GoodsFilters {
  sort: SortTypes;
  material: number;
}

export const useGoodsStore = defineStore("goodsStore", () => {
  const goods = ref<GoodsItem[] | null>(null);
  const filteredGoods = ref<GoodsItem[] | null>(null);

  const initialFilters: GoodsFilters = {
    sort: "DEFAULT",
    material: 0,
  };
  const filters = ref<GoodsFilters>(Object.assign(initialFilters));

  const changeFilter = (
    property: keyof GoodsFilters,
    value: GoodsFilters[typeof property]
  ) => {
    if (property === "material" && typeof value === "number") {
      filters.value.material = value;
    }

    if (property === "sort" && typeof value === "string") {
      filters.value.sort = value;
    }
  };

  const filterGoodsByMaterial = (materialValue: GoodsFilters["material"]) => {
    if (goods.value && materialValue !== 0) {
      filteredGoods.value = goods.value.filter(
        (goodsItem) => goodsItem.material === materialValue
      );
    } else {
      filteredGoods.value = goods.value;
    }
  };

  const sortGoods = (method: SortTypes) => {
    if (goods.value && method === "DEFAULT") {
      filterGoodsByMaterial(filters.value.material);
    }

    if (goods.value && method === "ASC") {
      filterGoodsByMaterial(filters.value.material);
      filteredGoods.value = (filteredGoods.value ?? goods.value)
        .slice()
        .sort((a, b) => a.price.current_price - b.price.current_price);
    }

    if (goods.value && method === "DESC") {
      filterGoodsByMaterial(filters.value.material);
      filteredGoods.value = (filteredGoods.value ?? goods.value)
        .slice()
        .sort((a, b) => b.price.current_price - a.price.current_price);
    }
  };

  const fetchGoodsItems = async () => {
    try {
      const { data }: { data: Ref<GoodsItem[]> } = await useFetch(
        `${SERVER_URL}/items`
      );

      goods.value = data.value;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("Произошла неизвестная ошибка");
    }
  };

  return {
    changeFilter,
    fetchGoodsItems,
    filterGoodsByMaterial,
    filteredGoods,
    goods,
    sortGoods,
    filters,
  };
});

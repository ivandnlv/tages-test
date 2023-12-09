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
  const goodsCart = ref<GoodsItem[]>([]);
  const goodsFavorites = ref<GoodsItem[]>([]);

  const afterMount = ref(false);

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

  const applyFiltersToGoods = () => {
    const { sort, material } = filters.value;

    if (goods.value) {
      const localGoods = goods.value.filter((item) => {
        if (material !== 0) {
          if (item.material === material) return item;
        } else {
          return item;
        }
      });

      if (sort === "DEFAULT") filteredGoods.value = localGoods;
      if (sort === "ASC") {
        filteredGoods.value = localGoods
          .slice()
          .sort((a, b) => a.price.current_price - b.price.current_price);
      }

      if (sort === "DESC") {
        filteredGoods.value = localGoods
          .slice()
          .sort((a, b) => b.price.current_price - a.price.current_price);
      }
    }
  };

  const addToCart = (item: GoodsItem) => {
    goodsCart.value.push(item);
  };

  const removeFromCart = (item: GoodsItem) => {
    goodsCart.value = goodsCart.value.filter(
      (cartItem) => cartItem.id !== item.id
    );
  };

  const addToFavs = (item: GoodsItem) => {
    goodsFavorites.value.push(item);
  };

  const removeFromFavs = (item: GoodsItem) => {
    goodsFavorites.value = goodsFavorites.value.filter(
      (favsItem) => favsItem.id !== item.id
    );
  };

  const setCart = (cart: GoodsItem[]) => {
    goodsCart.value = cart;
  };

  const setFavs = (favs: GoodsItem[]) => {
    goodsFavorites.value = favs;
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

  watch(
    goodsCart,
    () => {
      if (afterMount.value) {
        localStorage.setItem("cart", JSON.stringify(goodsCart.value));
      }
    },
    { deep: true }
  );

  watch(
    goodsFavorites,
    () => {
      if (afterMount.value) {
        localStorage.setItem("favorites", JSON.stringify(goodsFavorites.value));
      }
    },
    { deep: true }
  );

  onMounted(() => {
    const localCart = localStorage.getItem("cart");
    const localFavs = localStorage.getItem("favorites");

    if (localCart) {
      setCart(JSON.parse(localCart));
    }

    if (localFavs) {
      setFavs(JSON.parse(localFavs));
    }

    afterMount.value = true;
  });

  return {
    changeFilter,
    fetchGoodsItems,
    applyFiltersToGoods,
    filteredGoods,
    goods,
    filters,
    goodsCart,
    goodsFavorites,
    addToCart,
    addToFavs,
    removeFromCart,
    removeFromFavs,
    setCart,
    setFavs,
  };
});

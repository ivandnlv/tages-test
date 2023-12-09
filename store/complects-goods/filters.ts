import { defineStore } from "pinia";
import type { GroupItem } from "~/types/ui";
import type { Material } from "~/types";
import { SERVER_URL } from "~/utils/constants";

export type SortTypes = "ASC" | "DESC" | "DEFAULT";

export type SortObject = {
  value: SortTypes;
} & GroupItem;

export const useComplectsGoodsStore = defineStore("complectsGoodsStore", () => {
  const defaultSortObject: SortObject = {
    value: "DEFAULT",
    title: "По умолчанию",
  };
  const currentSortObject = ref<SortObject>(defaultSortObject);
  const allSortObjects = ref<SortObject[]>([
    defaultSortObject,
    {
      title: "Цена по возрастанию",
      value: "ASC",
    },
    {
      title: "Цена по убыванию",
      value: "DESC",
    },
  ]);

  const setCurrentSortObject = (sortObj: SortObject) => {
    currentSortObject.value = sortObj;
  };

  const defaultMaterialObject = { title: "Выберите материал", value: "0" };
  const allMaterials = ref<GroupItem[]>([defaultMaterialObject]);
  const currentMaterial = ref<GroupItem>(defaultMaterialObject);
  const materialStatus = ref<"success" | "error" | "loading">("loading");

  const fetchMaterials = async () => {
    materialStatus.value = "loading";

    if (allMaterials.value.length > 1) return;

    try {
      const { data: materials }: { data: Ref<Material[]> } = await useFetch(
        `${SERVER_URL}/materials`
      );

      allMaterials.value.push(
        ...materials.value.map((item) => ({
          title: item.name,
          value: item.id,
        }))
      );

      materialStatus.value = "success";
    } catch (error) {
      materialStatus.value = "error";
      if (typeof error === "string") {
        throw new Error(error);
      }

      throw new Error("Произошла неизвестная ошибка");
    }
  };

  const setCurrentMaterial = (val: GroupItem) => {
    currentMaterial.value = val;
  };
  return {
    currentSortObject,
    allSortObjects,
    setCurrentSortObject,
    allMaterials,
    currentMaterial,
    setCurrentMaterial,
    fetchMaterials,
    materialStatus,
  };
});

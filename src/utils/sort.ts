import { SortType } from "../services/product.service";

const allowedSorts: SortType[] = [
    "newest",
    "price_asc",
    "price_desc",
    "discount",
];

export function parseSort(value: string | undefined): SortType {
    return allowedSorts.includes(value as SortType)
        ? (value as SortType)
        : "newest";
}

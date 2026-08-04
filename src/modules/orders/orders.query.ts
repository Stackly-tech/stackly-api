import { type QueryMetadata } from "#common/interfaces/IInternal-query.js";

export const ordersQueryMetadata: QueryMetadata = {
  searchableFields: [
    "order_no",
    "Item_name",
    "Item_price",
    "Item_Quantity"
  ],



 
  sortableFields: ["Item_name", "Item_Quantity ", "order_no"],

  filterableFields: [
    "order_no",
    "Item_name",
    "Item_Quantity",
    
  ],

  selectableFields: [
     "order_no",
    "Item_name",
    "Item_price",
    "Item_Quantity"
  ],

  aggregatableFields: ["order_no", "Item_name"],
};

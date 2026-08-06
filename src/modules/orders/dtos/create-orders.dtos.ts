import { z } from "zod";

export const CreateOrderDto = z.object({
    order_no : z.int(),
    Item_name : z.string().min(2).max(20),
  Item_price: z.int(),
  Item_Quantity: z.int(),
});

export type CreateOrderDto = z.infer<typeof CreateOrderDto>;


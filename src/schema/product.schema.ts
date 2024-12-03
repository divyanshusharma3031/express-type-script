import { string, TypeOf, z } from "zod";

export const ProductSchema = {
  body: z.object({
    title: z
      .string({
        required_error: "Title is Required",
      })
      .min(3, "Title must have atleast 3 characters"),
    description: z
      .string({
        required_error: "Description is required",
      })
      .min(5, "Description must have atleast 5 characters"),
    price: z.number({
      required_error: "Email field is required",
    }),
    image: z.string({
      required_error: "image field is required",
    }),
  }),
};

const paramsSchema = {
  params: z.object({
    productId: string({
      required_error: "Product Id is required",
    }),
  }),
}; // ^ Ye params aise hi rakhna zaruri hai as hamne validate resources mai isiko xhexk karne ke liye lagaya hua hai
export const CreateProductSchema = z.object({
  ...ProductSchema,
});
export const updateProductSchema = z.object({
  ...ProductSchema,
  ...paramsSchema,
});

export const getProductSchema = z.object({
  ...paramsSchema,
});

export const deleteProductSchema = z.object({
  ...paramsSchema,
});
//console.log(...CreateProductSchema); Spread Operator doesn't work on zod objects.
export type CreateProductInput = TypeOf<typeof CreateProductSchema>;

export type UpdateProductInput = TypeOf<typeof updateProductSchema>;

export type ReadProductInput = TypeOf<typeof getProductSchema>;

export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;

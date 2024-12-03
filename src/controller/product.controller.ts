import { Request, Response } from "express";
import {
  CreateProductInput,
  DeleteProductInput,
  ReadProductInput,
  UpdateProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../service/product.service";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  try {
    let body = req.body;
    let userId = res.locals.user._id;
    // body={...body,user:userId} //^ This is not allowed with types in ts . we can't extend field like this but with interfaces we can.
    await createProduct({ ...body, user: userId });
    res.status(200).json({ message: "Product Creation successful" });
  } catch (e) {
    res
      .status(500)
      .json({ error: "Internal Server Error . Product Creation Failed." });
  }
}

export async function updateProductHandler(
  req: Request<UpdateProductInput['params'], {}, UpdateProductInput['body']>,
  res: Response
) {
  const update = req.body;
  const productId = req.params.productId;
  const userId = res.locals.user._id;
  try {
    const product = await findProduct({ productId });
    if (!product) {
      return res.status(404).json({ error: "Not Found" });
    }
    if (String(userId) !== product.user) {
      return res.status(403).json({ Error: "Forbidden" });
    }
    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
      new: true,
    });
    /*
            ^ By default, findOneAndUpdate() returns the document as it was before update was applied. If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
        */
    return res.status(200).json({ UpdatedProduct: updatedProduct });
  } catch (err) {
    return res.status(500).json({ Error: "Internal Server Error." });
  }
}

export async function getProductHandler(
  req: Request<ReadProductInput['params']>,
  res: Response
) {
  const productId = req.params.productId;
  try {
    const product = await findProduct({ productId });
    if (!product) {
      return res.status(404).json({ Error: "Product Not Found" });
    }
    res.status(200).json({ Product: product });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

export async function deleteProductHandler(
  req: Request<DeleteProductInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const product = await findProduct({ productId });
  if (!product) {
    return res.status(404).json({ error: "Not Found" });
  }
  if (String(userId) !== product.user) {
    return res.status(403).json({ Error: "Forbidden" });
  }
  await deleteProduct({ productId });

  return res.status(200).json({
    message: "Deleted Succesfully",
  });
}

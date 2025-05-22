"use client";
import { url } from "./url";

export const trackingProdutos = async (produto_id: string) => {
  try {
    const res = await fetch(url + "analytics/produto/" + produto_id, {
      credentials: "include",
    });
    if (res.ok) console.log("Tracking do produto com sucesso");
  } catch (error) {
    if (process.env.NODE_ENV !== "production") console.error(error);
  }
};

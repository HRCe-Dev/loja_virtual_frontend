"use client";

export const verifyAuth = async (): Promise<boolean> => {
  console.log("Verificando se usuario esta logado");
  try {
    const out = localStorage.getItem("token") !== null;

    /* if (!out) {
      window.location.href = "/login?next=entrega";
    }*/

    return out;
  } catch (error) {
    console.error(error);
    return false;
  }
};

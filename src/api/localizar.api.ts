import type { Zona } from "../types/Localizacao";
import { url } from "./url";

export async function GetLocalizacao(coordenadas: {
  lon: number;
  lat: number;
}): Promise<Zona | null> {
  try {
    const res = await fetch(
      url + "api0/localizar?lat=" + coordenadas.lat + "&lon=" + coordenadas.lon
    );

    const dados = await res.json();

    if (!res.ok) {
      alert(dados.message);
      return null;
    }

    //alert(JSON.stringify(dados));
    return dados.zona as Zona;
  } catch (error) {
    alert(error);
    console.error(error);
    return null;
  }
}

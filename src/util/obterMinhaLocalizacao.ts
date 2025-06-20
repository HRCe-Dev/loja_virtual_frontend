const obterMinhaLocalizacao = async (): Promise<{
  lon: number;
  lat: number;
} | null> => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
        resolve({
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        });
      },
      (error) => {
        console.error("Erro ao obter localização:", error.message);
        alert("Erro ao obter localização:" + error.message);
        resolve(null);
      }
    );
  });
};

export default obterMinhaLocalizacao;

function formatDataOuHora(createdAt: string | Date): string {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now.getTime() - created.getTime();
  const diffMin = Math.floor(diffMs / 1000 / 60);
  const diffHoras = Math.floor(diffMin / 60);
  const diffDias = Math.floor(diffHoras / 24);

  if (diffMin < 1) {
    return "agora";
  } else if (diffMin < 60) {
    return `${diffMin} min`;
  } else if (diffHoras < 24 && now.getDate() === created.getDate()) {
    return created.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (
    diffDias === 1 ||
    (diffHoras < 48 && now.getDate() - created.getDate() === 1)
  ) {
    return "ontem";
  } else {
    return created.toLocaleDateString();
  }
}

export default formatDataOuHora;

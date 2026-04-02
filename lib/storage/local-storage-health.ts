export class StorageUnavailableError extends Error {
  constructor(message = "Armazenamento local indisponível no navegador.") {
    super(message);
    this.name = "StorageUnavailableError";
  }
}

function hasIndexedDb() {
  return typeof indexedDB !== "undefined";
}

export function isLocalStorageAvailable() {
  if (typeof window === "undefined") {
    return false;
  }

  return hasIndexedDb();
}

export function assertLocalStorageAvailable() {
  if (!isLocalStorageAvailable()) {
    throw new StorageUnavailableError();
  }
}

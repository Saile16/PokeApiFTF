import NodeCache from "node-cache";

// Crear instancia de cache con TTL de 1 hora por defecto
const cache = new NodeCache({ stdTTL: 3600 });

export default cache;

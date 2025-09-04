/**
 * Chave única usada no `request` para armazenar o payload decodificado do token
 * (ex.: JWT) durante a autenticação. Evita "string mágica" espalhada pelo código.
 */
export const REQUEST_TOKEN_PAYLOAD_KEY = "tokenPayload";

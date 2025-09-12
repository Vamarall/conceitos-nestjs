import { registerAs } from "@nestjs/config";

export default registerAs('jwt', () => {     // registra um "namespace" de config 'jwt' e exporta esta fábrica
  return {
    secret: process.env.JWT_SECRET,          // segredo para assinatura/validação do JWT
    audience: process.env.JWT_TOKEN_AUDIENCE,// valor esperado no claim "aud"
    issuer: process.env.JWT_TOKEN_ISSUE,     // valor esperado no claim "iss" (quem emite)
    jwtTtl: Number(process.env.JWT_TTL ?? 3600),// TTL do token em segundos (fallback 3600)
    jwtRefreshTtl: Number(process.env.JWT_REFRESH_TTL ?? 86400) // TTL do token de refresh em segundos (fallback 86400)
  }
});

const SETUP_INSTRUCTIONS = `
Erro: LEADFINDER_GOOGLE_API_KEY nao encontrada.

Para configurar sua API key:

1. Acesse https://console.cloud.google.com/apis/credentials
2. Crie um projeto (ou selecione um existente)
3. Clique em "Criar credenciais" > "Chave de API"
4. Copie a chave
5. Ative a "Places API (New)" em:
   https://console.cloud.google.com/apis/library/places.googleapis.com

Depois, defina a variavel de ambiente:

  export LEADFINDER_GOOGLE_API_KEY=sua_chave_aqui

Ou crie um arquivo .env na raiz do projeto:

  LEADFINDER_GOOGLE_API_KEY=sua_chave_aqui

Ou passe via flag:

  leadfinder-ai prospect barbearias Curitiba --api-key SUA_CHAVE
`

export class MissingApiKeyError extends Error {
  override readonly name = "MissingApiKeyError"
  override readonly message = SETUP_INSTRUCTIONS
}

export function getApiKey(flagKey?: string): string {
  const key =
    flagKey ||
    process.env.LEADFINDER_GOOGLE_API_KEY ||
    ""

  if (!key) {
    throw new MissingApiKeyError()
  }

  return key
}

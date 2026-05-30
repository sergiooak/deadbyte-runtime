# DeadByte Runtime

`deadbyte-runtime` é o pacote de contratos do DeadByte v4. Ele existe para concentrar tipos, schemas, helpers, manifesto e regras compartilhadas entre o bot e o spawner.

## Responsabilidade

- Definir o formato de bots, comandos, mensagens, permissões, configs e eventos.
- Gerar manifestos serializáveis de comandos.
- Validar runtime config e eventos estruturados.
- Validar colisões de aliases por instância.

## O que ele não deve fazer

Este pacote não conhece WhatsApp, Nuxt, Nitro, Drizzle, PostgreSQL, Puppeteer, filesystem pesado ou processos. Ele não inicia bot, não acessa banco e não renderiza stickers.

## Instalação

```bash
pnpm install
```

## Configuração

O runtime não precisa de `.env`. Ele recebe objetos TypeScript/JSON e valida com `zod`.

## Desenvolvimento

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Testes

```bash
pnpm test
```

## Criando comando

```ts
import { defineCommand } from '@deadbyte/runtime'

export const pingCommand = defineCommand({
  id: 'system.ping',
  group: 'system',
  name: 'Ping',
  description: 'Responde pong para validar se o bot está vivo.',
  aliases: ['ping', 'p'],
  enabledByDefault: true,
  ownerOnlyByDefault: false,
  supports: { private: true, groups: true, implicit: false },
  configFields: [],
  async match(ctx) {
    return ctx.parsedCommand?.normalizedName === 'ping'
  },
  async run(ctx) {
    await ctx.reply('pong')
  }
})
```

## Gerando manifesto

Use `createBotManifest(bot)`. O resultado não contém funções, apenas JSON serializável para o spawner sincronizar comandos existentes no código.

## Configurando comandos

O banco do spawner pode configurar comandos por instância no formato:

```ts
commands: {
  'sticker.create': {
    enabled: true,
    ownerOnly: false,
    aliases: ['s', 'fig'],
    config: {}
  }
}
```

`validateCommandAliases(commands, config)` impede alias vazio, alias com prefixo e colisão entre comandos ativos.

## Comunicação com outros projetos

- `deadbyte-bot` importa o runtime para definir comandos, configs e eventos.
- `deadbyte-spawner` importa o runtime para validar manifesto, gerar config e interpretar eventos.

## Expansão

Adicione novos contratos no runtime quando eles forem compartilhados entre bot e spawner. Lógica específica de WhatsApp fica no bot; lógica de banco/processos fica no spawner.

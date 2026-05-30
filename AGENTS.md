# DeadByte Runtime — Agent Instructions

`@deadbyte/runtime` is the **shared contracts package** for the DeadByte v4 WhatsApp bot system. It defines types, Zod schemas, helpers, and manifests shared between the bot runner and the spawner (manager process). It has **no side effects**: no WhatsApp, no database, no filesystem, no processes.

## Commands

```bash
pnpm build      # unbuild → dist/index.mjs + dist/index.d.ts
pnpm typecheck  # tsc --noEmit (strict)
pnpm test       # vitest
pnpm lint       # eslint
```

## Architecture

| Directory | Responsibility |
|-----------|----------------|
| `src/bot/` | `DeadByteBot` type, `defineDeadByteBot` (identity, for inference), runtime modes |
| `src/command/` | `DeadByteCommand`, `defineCommand`, `createCommandRegistry`, `createBotManifest`, alias collision detection |
| `src/config/` | `DeadByteConfig`/`ResolvedDeadByteConfig`, Zod schema, `resolveDeadByteConfig` |
| `src/events/` | Structured event type and `DeadByteEventNames` constants |
| `src/logging/` | Event logger interface types |
| `src/message/` | `MessageContext`, `DeadByteMessage`, `ParsedCommand` |
| `src/permissions/` | `PermissionContext` |
| `src/utils/` | `normalizeCommandName`, `normalizeSlug`, timing, ID helpers |

Everything is re-exported from [`src/index.ts`](src/index.ts).

## Key Conventions

### Import paths use `.js` extensions
Even when importing `.ts` source files, use `.js` extensions (TypeScript + `moduleResolution: Bundler` convention):
```ts
import type { DeadByteCommand } from './command.types.js'
```

### ESM only — no CommonJS
`"type": "module"` in `package.json`. `unbuild` is configured with `emitCJS: false`.

### Command IDs use dot notation
Format: `group.name` — e.g., `system.ping`, `sticker.create`.

### `defineCommand` is an identity function
It exists purely for TypeScript inference/type-checking. No runtime logic inside.

### Config merging uses `defu`
`resolveDeadByteConfig` parses with Zod, then merges with `defu(parsed, defaultDeadByteConfig)`. Defaults are in [`src/config/resolve-config.ts`](src/config/resolve-config.ts).

### `normalizeCommandName` is the canonical alias normalizer
Strips diacritics and lowercases. Used for all alias lookups in `createCommandRegistry`. Aliases must NOT start with a prefix character — `validateCommandAliases` enforces this.

### Manifests are JSON-serializable
`DeadByteCommandManifest` = `DeadByteCommand` without `match`/`run`. Use `createBotManifest(bot)` to produce it for the spawner.

### `configFields` types
Valid values for `DeadByteCommandConfigField.type`: `'string' | 'number' | 'boolean' | 'select' | 'json'`.

### Runtime modes
`'standalone'` (single process) | `'managed'` (spawner-controlled).

## Hard Boundaries

This package must **never** import or reference:
- WhatsApp client libraries (e.g., `whatsapp-web.js`)
- Nuxt, Nitro, H3, Drizzle, PostgreSQL
- Puppeteer / browser automation
- File system access beyond types
- Process management

If you find yourself needing one of those, the logic belongs in a different package.

## Available Skills

| Skill | Trigger | What it does |
|-------|---------|--------------|
| [`commits`](.agents/commits/SKILL.md) | "commit", "review changes", "write commit message" | Inspects `git diff`, groups files by topic, generates Conventional Commit messages, stages and commits with user confirmation for breaking changes |
| [`find-skills`](.agents/find-skills/SKILL.md) | "find a skill for X", "is there a skill that…" | Searches the open agent skills ecosystem (`npx skills find`) and helps install skills from [skills.sh](https://skills.sh/) |

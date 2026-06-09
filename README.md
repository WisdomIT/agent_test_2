# chzzk-bot

Nightbot과 유사한 Chzzk 챗봇 서비스 모노레포.

- `apps/bot` — 채팅 명령어 처리 워커 (Node.js/TypeScript)
- `apps/web` — 명령어 관리 및 조회 웹사이트 (Next.js)

## Requirements

- Node.js >= 20
- pnpm >= 9

## Local Development

```bash
# Install dependencies
pnpm install

# Build all apps
pnpm build

# Run all apps in dev mode
pnpm dev
```

## Project Structure

```
chzzk-bot/
├── apps/
│   ├── bot/          # 챗봇 워커
│   └── web/          # Next.js 웹사이트
├── tsconfig.base.json
├── pnpm-workspace.yaml
└── package.json
```

## Deployment

Kubernetes 위에 Helm Chart로 배포한다. (Helm chart는 추후 `charts/chzzk-bot`에 추가 예정)

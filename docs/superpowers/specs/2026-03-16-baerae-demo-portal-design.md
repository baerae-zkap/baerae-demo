# Baerae Demo Portal

## Overview

Baerae 데모 프로젝트들을 하나의 GitHub Pages 사이트에서 통합 관리하고 시연할 수 있는 포털.

## URL Structure

- Base: `https://baerae-zkap.github.io/baerae-demo/`
- Landing: `/baerae-demo/`
- 경기지갑: `/baerae-demo/wallet/`
- ZKAP App: `/baerae-demo/zkap/`

## Repository

`git@github.com:baerae-zkap/baerae-demo.git`

## Architecture

단일 레포에 랜딩 페이지 + 각 데모 소스를 포함. 빌드 스크립트가 각 데모를 정적 빌드하고 하나의 출력 폴더로 합친 뒤 GitHub Pages로 배포.

### Directory Structure

```
baerae-demo/
├── landing/                          # 랜딩 페이지 (Next.js, static export)
│   ├── src/app/page.tsx              # 앱스토어 스타일 데모 선택 화면
│   ├── next.config.ts                # basePath: "/baerae-demo"
│   └── package.json
│
├── demos/
│   ├── gyeonggi-civic-wallet/        # 경기지갑 소스 (기존 프로젝트 복사)
│   │   ├── next.config.ts            # basePath: "/baerae-demo/wallet"
│   │   └── ...
│   └── zkap-app/                     # ZKAP App 소스 (기존 프로젝트 복사)
│       ├── next.config.mjs           # basePath: "/baerae-demo/zkap", output: "export"
│       └── ...
│
├── scripts/
│   └── build.sh                      # 전체 빌드: 각 데모 빌드 → dist/ 합침
│
├── .github/
│   └── workflows/deploy.yml          # push → build → GitHub Pages 배포
│
├── dist/                             # (gitignored) 최종 빌드 결과
│   ├── index.html                    # 랜딩 페이지
│   ├── _next/                        # 랜딩 정적 자산
│   ├── wallet/                       # 경기지갑 빌드
│   └── zkap/                         # ZKAP App 빌드
│
└── package.json                      # 루트 (build script 진입점)
```

### Build Flow

```
1. cd landing && npm run build
   → out/ 생성 (basePath: /baerae-demo)

2. cd demos/gyeonggi-civic-wallet && npm run build
   → out/ 생성 (basePath: /baerae-demo/wallet)

3. cd demos/zkap-app && npm run build
   → out/ 생성 (basePath: /baerae-demo/zkap)

4. dist/ 폴더에 합침:
   - landing/out/* → dist/
   - gyeonggi-civic-wallet/out/* → dist/wallet/
   - zkap-app/out/* → dist/zkap/

5. GitHub Pages가 dist/ 서빙
```

### GitHub Actions Deploy

- Trigger: push to `main`
- Steps: install deps → build all → upload artifact → deploy to Pages
- Uses: `actions/deploy-pages`

## Landing Page Design

앱스토어 스타일 2열 그리드 레이아웃.

### Header
- 좌측 Baerae 로고 + "Baerae Demo" 타이틀 + 설명 텍스트
- 구분선

### Demo Cards (2열 그리드)
각 카드 구성:
- **상단 행**: 앱 아이콘 (38x38, rounded) + 타이틀/설명 + "열기" pill 버튼
- **하단**: 16:9 가로형 히어로 이미지 (HTML로 디바이스 목업 렌더링, 이미지 파일 불필요)

#### 경기지갑 카드
- 아이콘: 파란 그라데이션 배경
- 히어로: 파란 그라데이션 + 디바이스 목업 (잔액, 지역화폐 카드, 하단 네비)
- 텍스트 오버레이: "지역화폐 스테이블코인 지갑"

#### ZKAP App 카드
- 아이콘: 다크/보라 그라데이션 배경
- 히어로: 보라 그라데이션 + 디바이스 목업 (거래소 비교, Best Rate)
- 텍스트 오버레이: "Multi-Exchange Best Rate Trading"

### Responsive
- 데스크탑: 2열 그리드, 좌우 여백 48px, 카드 간격 40px
- 모바일: 1열 스택

## Tech Stack

- Next.js (landing + 각 데모)
- Static export (`output: "export"`)
- GitHub Pages
- GitHub Actions (CI/CD)

## Demo 추가 시

1. `demos/` 에 새 프로젝트 폴더 추가
2. `basePath: "/baerae-demo/<slug>"` 설정
3. `scripts/build.sh`에 빌드 단계 추가
4. 랜딩 페이지 `demos` 배열에 항목 추가

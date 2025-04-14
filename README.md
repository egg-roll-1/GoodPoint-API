# Eggroll API Server

## Sheet

```
npm run start:dev
ALT+SHIFT+O: import 정리
git pull --rebase
```

## Application

```
# 프로젝트 다운받기
git clone https://github.com/egg-roll-1/eggroll-server.git

# 프로젝트 내부로 이동.
cd eggroll-server

# +VScode에서 Open Folder로 정확히 위 폴더를 선택해야 터미널이 자동으로 여기가 열려서 편합니다.

# 의존성 설치
npm i
```

## DB 설정

```
CREATE DATABASE eggroll;
```

## .env.local 생성

package.json이 있는 경로에 `.env.local`이라는 파일을 생성해서 아래와 같이 입력해주시고, 빈칸은 적절히 넣어주세요!

```
NODE_ENV=local

USER_API_PORT=3000
ADMIN_API_PORT=3001

DB_DATABASE=eggroll
DB_HOST=127.0.0.1
DB_USER=admin
DB_PASSWORD=temppassword
DB_PORT=3306

ACCESS_TOKEN_KEY=asdfoihawefiower923ehsdflaisdf9023hriwleflsihfalskdf2390rhfsodfsdfsdf
REFRESH_TOKEN_KEY=sdfoin23r9ewfjsdfilasdfjw9r02j3rlkwefjsdfpmo23ippruje9w0fjsdilfjsdf

SALT_ROUND=8
```

## 실행

```
# 봉사활동 사용자 API
npm run user-api:local

# 봉사활동 제공자 API
npm run admin-api:local
```

## 디렉토리 구조

```
apps
└─ admin-api : 봉사활동 담당자 관련 API를 제공합니다.
    └─ src
        └─ [feature]
            └─ controller
            └─ service
            └─ dto

└─ user-api : 봉사활동 신청자 관련 API를 제공합니다.
    └─ src
        └─ [feature]
            └─ controller
            └─ service
            └─ dto

libs/core
└─ src: 위 apps에서 공통되는 부분이 들어갑니다.
    └─ domain: 사용자, 기관 같은 주요 feature가 들어갑니다.
    └─ [feature]
        └─ repository
        └─ entity
        └─ exception
        └─ [feature.module.ts]

        └─ global: 공통적으로 필요한 프레임워크 설정이 들어갑니다.
        └─ infrastructure: 데이터베이스나 클라우드 같은 인프라 관련 설정이 들어갑니다.
```

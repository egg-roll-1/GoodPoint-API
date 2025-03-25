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

DB_DATABASE=eggroll
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=
DB_PASSWORD=
```

## 실행

```
npm run start:dev
```

## 디렉토리 구조

```
src
└─ domain: 사용자, 기관 같은 주요 feature가 들어갑니다.
   └─ [feature]
       └─ controller
       └─ service
       └─ repository
       └─ entity
       └─ exception
       └─ [feature.module.ts]

└─ global: 공통적으로 필요한 프레임워크 설정이 들어갑니다.
└─ infra: 데이터베이스나 클라우드 같은 인프라 관련 설정이 들어갑니다.
```

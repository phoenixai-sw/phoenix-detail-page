# Phoenix Detail Page DB 저장 개선 작업 가이드

## 목적

Phoenix detail page에서 생성한 상세페이지 프로젝트를 브라우저 저장소뿐 아니라 서버 DB에도 저장한다.
현재 이미지 생성 기능은 정상 동작 중이므로 생성 API 흐름은 건드리지 않고, 저장/불러오기/삭제 흐름만 확장한다.

## 현재 반영된 1차 구조

- 기존 IndexedDB 브라우저 저장은 그대로 유지한다.
- `DATABASE_URL`이 설정된 배포 환경에서는 `/api/projects`를 통해 서버 DB에도 저장한다.
- 서버 DB 저장이 실패해도 생성 결과는 브라우저 저장소에 남는다.
- `PROJECTS_STORAGE_KEY`를 설정하면 프로젝트 저장소 접근에 별도 키를 요구한다.
- 설정 화면의 `프로젝트 DB 저장 키`에 같은 값을 입력하면 서버 DB 저장/불러오기/삭제가 가능하다.

## 추가된 파일

- `src/lib/project-store.ts`
  - `detail_page_projects` 테이블 생성
  - 프로젝트 저장, 목록 조회, 삭제 처리
- `src/app/api/projects/route.ts`
  - `GET`: 서버 DB 프로젝트 목록 조회
  - `POST`: 프로젝트 저장
  - `DELETE`: 프로젝트 삭제

## 수정된 파일

- `src/app/api/config/route.ts`
  - 프로젝트 DB 저장소 설정 상태를 프론트에 전달
- `src/components/redesign-wizard.tsx`
  - 서버 DB 프로젝트 불러오기
  - 저장 시 IndexedDB + 서버 DB 동시 저장
  - 삭제 시 IndexedDB + 서버 DB 동시 삭제
  - 설정 화면에 프로젝트 DB 저장 키 입력란 추가
  - 사이드 설정 박스에 프로젝트 DB 저장 상태 표시
- `.env.example`
  - `PROJECTS_STORAGE_KEY` 추가

## 배포 환경변수

필수:

```env
DATABASE_URL="Supabase Postgres 접속 URL"
```

권장:

```env
PROJECTS_STORAGE_KEY="프로젝트 저장소 접근 키"
```

이미 사용 중인 맞춤형 Data 설정 RAG를 계속 쓰려면 기존 값도 유지한다.

```env
OPENAI_API_KEY="서버 RAG 임베딩용 OpenAI 키"
KNOWLEDGE_ACCESS_KEYS="사용자 접근 키"
KNOWLEDGE_ADMIN_KEY="운영자 관리 키"
```

## 필요한 정보

작업자가 배포까지 완료하려면 아래 정보가 필요하다.

1. Vercel 또는 Netlify 프로젝트 접근 권한
2. DB 접속 URL
   - Supabase Dashboard의 `Connect`에서 가져온 Postgres connection string을 사용한다.
   - Vercel/Netlify 같은 서버리스 배포에서는 Supabase `Transaction pooler` 또는 `Session pooler` URI를 권장한다.
   - 현재 코드는 Supabase pooler 호환을 위해 `postgres.js`와 `prepare: false` 설정을 사용한다.
3. 프로젝트 저장소 보호 키
   - 원하는 임의 문자열
   - 예: `phoenix-project-save-2026`
4. 서버 RAG까지 함께 활성화하려면 OpenAI 서버 키
   - `OPENAI_API_KEY`

## 참고자료 이미지 분석 반영

업로드된 참고자료는 Supabase 기반 회원가입, 로그인, DB, Storage 구축 흐름이다.
현재 1차 작업은 빠른 적용을 위해 Supabase Postgres에 생성 프로젝트 저장 테이블을 붙이는 방식으로 확장했다.

참고자료처럼 사용자별 저장, 로그인, 이미지 파일 스토리지까지 확장하려면 2차 작업에서 아래 항목을 추가한다.

- Supabase Auth 또는 별도 로그인
- 사용자별 프로젝트 소유자 컬럼
- 이미지 원본을 DB JSON에 직접 넣지 않고 Supabase Storage, Vercel Blob, S3 중 하나에 업로드
- DB에는 이미지 URL 또는 storage key만 저장
- 관리자 페이지 또는 사용자 마이페이지에서 프로젝트 목록 관리

## 2차 개선 권장안

현재 1차 구조는 빠르게 DB 저장을 붙이는 목적이다.
이미지가 많아지면 DB 용량이 커질 수 있으므로 장기 운영 시에는 다음 구조가 좋다.

```text
프로젝트 메타데이터: Postgres
섹션/수정 히스토리: Postgres
이미지 파일: Supabase Storage 또는 Vercel Blob
사용자 인증: Supabase Auth 또는 별도 로그인
```

## 테스트 순서

1. 로컬 또는 배포 환경에 `DATABASE_URL`을 넣는다.
2. 필요하면 `PROJECTS_STORAGE_KEY`를 넣는다.
3. 앱 설정 화면에서 같은 프로젝트 DB 저장 키를 입력한다.
4. 상세페이지를 1장 생성한다.
5. 결과 화면에서 저장을 누른다.
6. 홈보드에 저장 프로젝트가 남는지 확인한다.
7. 브라우저 새로고침 후 서버 DB 프로젝트가 다시 표시되는지 확인한다.
8. 삭제 버튼으로 DB와 브라우저 저장소에서 같이 삭제되는지 확인한다.

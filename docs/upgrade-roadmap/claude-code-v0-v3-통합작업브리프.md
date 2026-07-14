# Claude Code용 Phoenix Pages V0-V3 통합 작업 브리프

이 문서는 Claude Code가 `phoenix pages` 프로젝트의 현재 구현 상태와 V1, V1.5, V2, V3 확장 방향을 한 번에 이해하고, 해당 버전의 작업을 안전하게 수행하도록 만든 최상위 통합 브리프이다.

문서 기준일:

```text
2026-07-12
```

현재 구현 상태:

```text
V0 운영 코드 존재
로드맵 기준선: V0.1.2 계열
V1, V1.5, V2, V3는 설계 및 작업 문서 단계
```

`package.json`의 애플리케이션 버전과 이 문서의 제품 로드맵 버전은 별개다. 패키지 버전이 `1.0.0`이라고 해서 V1 Supabase 기능이 구현된 것으로 판단하지 않는다.

중요:

1. 이 문서에 V1 이후의 설계가 적혀 있어도 현재 코드에 구현됐다는 뜻은 아니다.
2. 한 번의 작업에서 V0부터 V3까지 전부 구현하지 않는다.
3. 마스터가 지정한 현재 목표 버전만 구현하고, 다음 버전은 인터페이스와 확장 가능성만 보존한다.
4. 작업 전 현재 Git 상태와 실제 코드를 읽고, 문서와 코드가 다르면 차이를 먼저 보고한다.

대상 프로젝트:

```text
C:\codex\agent\phoenix detail page
```

GitHub 저장소:

```text
https://github.com/phoenixai-sw/phoenix-detail-page.git
```

현재 서비스명:

```text
phoenix pages
```

기존 저장소명 또는 프로젝트 폴더명에는 `phoenix detail page`가 남아 있을 수 있다.  
유저에게 보이는 서비스명은 `phoenix pages`로 정리한다.

---

## 문서 사용법과 우선순위

### 문서 읽기 순서

Claude Code는 작업을 시작하기 전에 아래 순서로 문서를 읽는다.

1. 이 통합 브리프 전체
2. `docs/upgrade-roadmap/README.md`
3. 현재 목표 버전의 `코덱스용 작업지시서`
4. 현재 목표 버전의 `유저용 작업확인서`
5. V1이면 Supabase 준비물, 코덱스 입력용, 마스터 작업용 문서 추가 확인
6. 실제 소스 코드와 현재 Git 변경 사항 확인

### 기준이 충돌할 때

의도와 범위의 우선순위:

```text
마스터의 최신 명시 지시
→ 이 통합 브리프
→ 현재 버전의 작업지시서/작업확인서
→ README
→ 보관 문서
```

현재 구현 사실의 우선순위:

```text
실제 소스 코드와 실행 테스트
→ 현재 문서
```

문서와 코드가 다르다고 임의로 대규모 수정하지 않는다. 차이, 영향 범위, 권장 수정안을 먼저 보고한 뒤 현재 요청 범위에서 처리한다.

### 문서별 역할

| 문서 | 역할 |
|---|---|
| 이 통합 브리프 | 전체 버전 경계, 공통 원칙, 데이터 계약, 작업 순서의 기준 |
| `README.md` | 로드맵 색인과 현재 버전 요약 |
| 코덱스용 작업지시서 | 해당 버전의 구현 항목과 기술 검증 기준 |
| 유저용 작업확인서 | 마스터와 수강생이 화면에서 확인하는 단계별 체크리스트 |
| 보관 문서 | 과거 아이디어 참고용이며 현재 구현 기준이 아님 |

---

## 0. 전체 방향 요약

이 프로젝트는 상세페이지 생성 웹을 출발점으로, Agent Web과 Agent Bot이 연결되는 구조로 확장한다.

버전 흐름:

```text
V0 = 현재 운영 중인 기본 상세페이지 생성 웹
V1 = Supabase Auth + Database + Storage 기반 클라우드 저장
V1.5 = 결제 시스템 + 크레딧 충전/차감 + 사용량 관리
V2 = Design Bot이 phoenix pages 웹을 컨트롤하고 Telegram으로 결과 전달
V3 = Genesis Bot이 Design Bot을 지휘하고, Design Bot이 웹을 컨트롤
```

버전별 완료 상태:

| 버전 | 현재 상태 | 다음 단계로 넘어가는 조건 |
|---|---|---|
| V0 | 운영 및 안정화 진행 중 | 기존 생성, 편집, 추가 생성, ZIP 다운로드가 회귀 없이 동작 |
| V1 | 미구현, 문서 준비 | Auth, DB, Storage, RLS, 유저/슈퍼 관리자 검증 완료 |
| V1.5 | 미구현, 문서 준비 | 결제 승인, 웹훅, 크레딧 원장, 중복 방지 검증 완료 |
| V2 | 미구현, 문서 준비 | Design Bot이 작업 접수부터 Telegram 전달까지 반복 성공 |
| V3 | 미구현, 문서 준비 | Genesis Bot과 Design Bot의 지휘, 상태 동기화, 실패 복구 검증 완료 |

핵심 원칙:

1. V0 기능을 깨지 않는다.
2. V1은 저장, 로그인, 권한, 관리자 모드 중심이다.
3. V1.5는 결제, 무료 크레딧, 유료 크레딧, 사용량 차감 중심이다.
4. V2는 봇이 웹을 직접 조작하는 자동화 단계다.
5. V3는 상위 봇이 하위 봇을 지휘하는 오케스트레이션 단계다.
6. 비밀 키와 유저 API 키는 절대 코드, GitHub, 로그, 텔레그램 메시지에 노출하지 않는다.
7. 다음 버전 기능을 현재 버전에 섞어서 구현하지 않는다.
8. 각 버전은 이전 버전의 정상 동작을 회귀 테스트한 뒤 완료한다.

---

## 1. 현재 V0 상태

V0는 현재 운영 중인 기본 상태다.

### 1.1 V0의 역할

V0는 로그인과 클라우드 저장 없이도 유저가 바로 상세페이지 이미지를 생성할 수 있는 기본 웹이다.

현재 구조:

```text
브라우저 접속
→ 유저가 OpenAI 또는 Google API 키 직접 입력
→ 이미지/PDF 업로드
→ 상세페이지 이미지 생성
→ 프로젝트/이미지는 브라우저 IndexedDB에 저장
→ API 키와 일부 설정은 브라우저 localStorage에 저장
→ ZIP 파일로 로컬 다운로드
```

V0의 브라우저 저장을 한 단어로 `localStorage`라고 표현하면 안 된다. 현재 코드는 큰 프로젝트 데이터와 이미지를 IndexedDB에 저장하고, API 키와 일부 설정값만 localStorage에 저장한다.

### 1.2 V0 주요 기능

V0에 포함된 기능:

1. 메인 입장 페이지
2. `phoenix pages` 작업 화면
3. OpenAI Image 2.0 생성
4. Google Nano Banana 2 생성
5. 유저별 API 키 직접 입력
6. 이미지 또는 PDF 업로드
7. 생성 페이지 선택
   - 1장 히어로
   - 4장 심플
   - 8장 상세
8. 출력 비율 선택
   - 9:16(상세): 상세페이지 본문과 세로형 긴 정보 흐름
   - 1:1(정사각): 썸네일, 카드뉴스, 상품 보조 이미지
   - 4:5(피드): 광고 및 SNS 피드 소재
9. 최초 생성 결과 뒤에 1장, 2장, 3장 단위로 페이지 추가 생성
10. UI에는 남은 수량 안에서 가능한 추가 버튼만 표시
11. 프로젝트당 최대 12장
12. 추가 생성 시 원본 업로드 자료가 남아 있으면 제품 일관성과 정확도가 더 높다는 안내 표시
13. `나머지 섹션 만들기` 메뉴는 V0에서 숨김
14. 모델/인물 요청 시 홀수 페이지 중심 배치, 짝수 페이지는 제품·정보 중심 구성
15. 결과 저장
16. 최근 제작 작업
17. 최근 제작 작업 제목 편집
18. 개별 페이지 편집
19. 빠른 편집 메뉴와 기본 프롬프트 유지
20. 각 빠른 편집 메뉴의 AI 멘트 생성
21. 결과 이미지 전체를 ZIP 파일 1개로 다운로드
22. 브라우저 저장 기반 fallback

빠른 편집 메뉴:

```text
카피 강화
디자인 강화
CTA 강화
모바일 첫화면
리뷰/UGC 신뢰
불안 제거
중복 레이아웃 줄이기
안전 표현
```

AI 멘트 생성 모델:

```text
기본: gpt-5.4-nano
백업: gpt-5.4-mini
```

AI 멘트 생성은 유저가 이미지 생성용으로 입력한 OpenAI API 키를 재사용하되, 요청에는 이미지 base64를 넣지 않고 텍스트 정보만 보낸다.

### 1.3 V0 현재 코드 기준점

주요 파일과 API:

```text
src/components/redesign-wizard.tsx
src/app/api/generate/route.ts
src/app/api/edit-section/route.ts
src/app/api/ai-comment/route.ts
src/app/api/knowledge/route.ts
src/app/studio/page.tsx
```

현재 생성/편집 API는 `multipart/form-data`를 받아 이미지와 메타데이터를 처리한다. OpenAI 이미지 생성과 편집은 high 품질을 우선 사용하고, 지연 또는 재시도 가능한 실패 조건에서는 medium 품질로 전환하는 fallback이 있다. 이 fallback을 V1 작업 중 제거하지 않는다.

현재 `src/lib/rag.ts`에는 `@neondatabase/serverless`와 `DATABASE_URL`을 사용하는 선택형 맞춤형 Data/RAG 저장 로직이 있다. 이것은 유저 프로젝트와 생성 이미지를 저장하는 V1 Database/Storage가 아니다.

```text
현재 선택형 RAG
→ 맞춤형 Data 문서와 vector chunk 저장

V1 프로젝트 저장
→ 유저, 프로젝트, 원본 자산, 생성 섹션, 권한 저장
```

V1에서 Supabase를 연결할 때 기존 RAG를 임의로 삭제하지 않는다. 같은 Supabase Postgres로 옮길지, 기존 `DATABASE_URL`을 유지할지 먼저 확인하고, 테이블 이름과 권한 범위를 프로젝트 저장 테이블과 분리한다.

### 1.4 최근 확정된 V0 UI 문구

좌측 상단 브랜드 영역:

```text
phoenix pages
MeMe studio
```

해당 코드 위치:

```text
src/components/redesign-wizard.tsx
```

### 1.5 V0의 한계

V0는 DB와 Storage가 없기 때문에 다음 한계가 있다.

1. 생성 이미지가 브라우저에서 base64/data URL과 Blob 형태로 처리된다.
2. 이미지가 많아지면 IndexedDB를 사용하더라도 브라우저 메모리와 직렬화 비용이 커진다.
3. 한 장짜리 이미지라도 9:16 고해상도 결과는 데이터가 클 수 있다.
4. 개별 편집 시 이미지 데이터를 통째로 다시 서버에 보내므로 요청 제한에 걸릴 수 있다.
5. `이미지 데이터가 너무 커서...` 오류가 발생할 수 있다.
6. 유저별 클라우드 작업 목록이 없다.
7. 다른 기기에서 같은 작업을 이어서 열 수 없다.
8. 슈퍼 관리자 모드가 없다.

### 1.6 V0 유지 원칙

V1 이상으로 가더라도 아래 기능은 유지해야 한다.

1. 비로그인 사용 가능
2. 유저 API 키 직접 입력 가능
3. 로컬 ZIP 다운로드 가능
4. 브라우저 저장 기반 최근 작업 fallback 유지
5. 기존 이미지 생성/편집/AI 멘트 생성 기능 유지
6. 1장/4장/8장 최초 생성과 최대 12장 추가 생성 유지
7. 9:16/1:1/4:5 출력 비율 유지
8. 최근 제작 작업 제목 편집 유지
9. `나머지 섹션 만들기`는 V1 완료 후 마스터가 재검토하기 전까지 숨김 유지

### 1.7 V0에서 V1으로 넘겨야 할 데이터

V1 마이그레이션 설계는 현재 브라우저 프로젝트를 억지로 자동 업로드하지 않는다. 최초 V1에서는 아래 두 흐름을 분리한다.

```text
기존 브라우저 프로젝트
→ 계속 로컬에서 열기/다운로드 가능

V1 로그인 후 새로 저장하거나 명시적으로 클라우드 저장한 프로젝트
→ Supabase Database + Storage에 저장
```

기존 IndexedDB 프로젝트의 일괄 클라우드 이전은 별도 마이그레이션 기능으로 취급하고, V1 필수 범위에 자동으로 포함하지 않는다.

---

## 2. V1 목표: Supabase Cloud Save

V1은 V0의 가장 큰 한계인 저장, 로그인, 이미지 데이터 크기 문제를 해결하는 단계다.

### 2.1 V1 핵심 목표

V1 목표:

1. Supabase Auth 기반 Google 로그인
2. Supabase Storage에 생성 이미지 저장
3. Supabase Database에 프로젝트와 섹션 정보 저장
4. 유저별 작업 목록
5. 프로젝트 다시 열기
6. 슈퍼 관리자와 일반 유저 구분
7. V0 브라우저 저장 fallback 유지
8. 이미지 데이터 과다 전송 문제 완화

V1에 포함하지 않는 것:

1. Toss 결제
2. 무료/유료 크레딧 지급 및 차감
3. Design Bot의 웹 자동 조작
4. Genesis Bot의 지휘 기능
5. 유저가 자기 Supabase를 직접 연결하는 고급 옵션

위 기능은 각각 V1.5, V2, V3 또는 보관된 고급 옵션의 범위다.

### 2.2 V1 권장 연결 방식

현재 추천하는 실전 방식:

```text
Vercel Marketplace Supabase Integration
+ Supabase MCP
+ Google OAuth 수동 확인
```

이유:

1. 현재 웹사이트는 Vercel에 배포 중이다.
2. Vercel Pro 플랜을 사용 중이다.
3. Vercel Marketplace에서 Supabase Integration을 연결하면 환경변수 상당 부분이 자동 세팅된다.
4. Supabase MCP를 사용하면 DB/RLS/Storage 확인과 SQL 작업을 자동화 또는 반자동화할 수 있다.
5. Google OAuth Client Secret은 보안상 마스터가 직접 생성/입력하는 편이 안전하다.

### 2.3 V1 환경변수 후보

Vercel Supabase Integration 또는 수동 설정으로 실제 생성된 이름을 먼저 확인한다. 같은 역할의 구형/신형 키를 무조건 모두 요구하지 않는다.

브라우저용 필수 값:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

프로젝트가 기존 anon key 체계를 사용한다면 아래 이름을 대신 사용할 수 있다.

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

서버용 필수 값은 프로젝트가 발급한 체계에 따라 아래 중 하나를 사용한다.

```env
SUPABASE_SECRET_KEY=
# 또는
SUPABASE_SERVICE_ROLE_KEY=
```

애플리케이션 설정:

```env
SUPABASE_STORAGE_BUCKET=phoenix-pages-images
SUPER_ADMIN_EMAILS=
NEXT_PUBLIC_SITE_URL=
```

주의:

```text
NEXT_PUBLIC_ 값은 브라우저에 노출 가능하다.
SUPABASE_SECRET_KEY, SUPABASE_SERVICE_ROLE_KEY는 서버 전용이다.
secret/service role key에 NEXT_PUBLIC_을 붙이면 안 된다.
DATABASE_URL은 직접 SQL 연결이나 migration 도구가 필요할 때만 사용한다.
Supabase client로만 프로젝트 저장을 구현한다면 DATABASE_URL은 V1 프로젝트 저장의 필수값이 아니다.
단, 현재 선택형 맞춤형 Data/RAG 기능은 DATABASE_URL과 서버 OPENAI_API_KEY를 사용할 수 있으므로 제거 또는 변경 전 해당 기능을 별도로 확인한다.
실제 키 값은 문서, 채팅, GitHub, 클라이언트 로그에 적지 않는다.
```

### 2.4 Google OAuth 준비

Google OAuth Client ID와 Client Secret은 마스터가 Google Cloud Console에서 발급하고 Supabase Dashboard의 Google Provider에 직접 입력한다.

권장 운영:

```text
Google OAuth Client 생성 = 마스터가 Google Cloud Console에서 직접
Supabase Google Provider 입력 = 마스터가 Supabase Dashboard에서 직접
Claude/코덱스 역할 = 코드 연동, redirect URL 안내, 오류 분석
```

Supabase Auth가 Google OAuth를 중계하는 표준 구조에서는 `GOOGLE_CLIENT_ID`와 `GOOGLE_CLIENT_SECRET`을 Vercel 애플리케이션 환경변수에 중복으로 넣을 필요가 없다. 애플리케이션 코드가 Google API를 직접 호출하는 별도 기능을 추가할 때만 필요성을 다시 판단한다.

필수 URL 확인:

1. Google OAuth Authorized redirect URI에 Supabase callback URL 등록
2. Supabase Auth Site URL에 실제 Vercel Production URL 등록
3. Supabase Auth Redirect URLs에 로컬과 허용할 Vercel URL 등록
4. Preview URL을 무제한 wildcard로 열지 말고 필요한 범위만 허용

### 2.5 V1 Database 설계 후보

필수 테이블 후보:

```text
profiles
projects
project_assets
project_sections
admin_users
```

역할:

| 테이블 | 역할 |
|---|---|
| `profiles` | 로그인 유저 기본 정보 |
| `projects` | 프로젝트 제목, 소유자, 채널, 모델, 상태 |
| `project_assets` | 업로드한 원본 이미지/PDF와 분석용 자산의 Storage path |
| `project_sections` | 섹션 번호, 이미지 Storage path, prompt, 모델 정보, 편집 상태 |
| `admin_users` | 슈퍼 관리자 권한 |

핵심 관계:

```text
auth.users 1 ─ 1 profiles
auth.users 1 ─ N projects
projects 1 ─ N project_assets
projects 1 ─ N project_sections
auth.users 1 ─ 0..1 admin_users
```

권장 제약:

1. `projects.owner_id`는 `auth.users.id`를 참조한다.
2. `project_assets.project_id`와 `project_sections.project_id`는 프로젝트 삭제 시 함께 정리되게 한다.
3. `project_sections`는 `(project_id, section_number)` 조합을 유일하게 한다.
4. 페이지 수는 1 이상 12 이하로 검증한다.
5. Storage signed URL 자체를 영구 저장하지 않고, 영구 식별자인 bucket과 object path를 저장한다.
6. 편집 이력은 초기에는 JSONB로 둘 수 있으나, 이력이 커지면 `project_section_revisions` 테이블로 분리한다.

프로젝트에 보존할 핵심 값:

```text
owner_id, title, channel, ratio, provider, model_id
request_text, analysis_summary, page_count, status
created_at, updated_at
```

### 2.6 V1 Storage 설계

Storage bucket 권장 이름:

```text
phoenix-pages-images
```

권장 bucket:

```text
Private bucket
```

Storage path 예시:

```text
users/{user_id}/projects/{project_id}/source/{asset_id}.{ext}
users/{user_id}/projects/{project_id}/sections/{section_number}/{revision_id}.{ext}
```

Storage 원칙:

1. 원본 업로드 파일과 생성 결과를 구분해 저장한다.
2. 저장된 프로젝트에서 페이지를 추가 생성할 때 `project_assets`의 원본 파일을 다시 참조한다.
3. private bucket을 기본으로 하고, 화면 표시 때 짧은 만료시간의 signed URL을 발급한다.
4. signed URL은 만료되므로 DB의 기준값으로 사용하지 않는다.
5. ZIP은 필요할 때 생성해 내려주고, 영구 저장이 필요하지 않으면 Storage에 중복 보관하지 않는다.
6. 업로드 파일 확장자만 믿지 말고 MIME type과 허용 크기를 서버에서 검증한다.

### 2.7 V1 이미지 저장 흐름

V0:

```text
AI 생성 이미지
→ base64 data URL
→ 브라우저 상태/IndexedDB
→ 편집 시 이미지 전체 데이터 재전송
```

V1:

```text
AI 생성 이미지
→ 서버 API에서 Supabase Storage 업로드
→ DB에 project/section/bucket/object path 저장
→ 화면 요청 시 private object의 signed URL 발급
→ 편집 시 project_id와 section_id를 서버로 전달
→ 서버가 권한 확인 후 Storage에서 원본을 읽어 AI 편집
→ 새 revision을 Storage에 저장하고 DB 갱신
```

Storage 업로드 성공 후 DB 저장에 실패하거나, DB 생성 후 Storage 업로드가 실패하는 경우를 고려해 보상 정리 또는 `status=failed` 처리를 구현한다. 화면에 저장 완료를 표시하기 전에 DB와 Storage가 모두 일치하는지 확인한다.

### 2.8 V1 개별 편집과 페이지 추가 생성

로그인 유저의 개별 편집 요청:

```text
브라우저
→ project_id, section_id, 편집 프롬프트, provider, 유저 API 키 전송
→ 서버가 로그인 세션과 프로젝트 소유권 확인
→ Storage에서 기존 섹션 이미지 읽기
→ 이미지 제공사 API에 편집 요청
→ 편집 결과를 새 revision으로 Storage 저장
→ project_sections 갱신
→ 새 signed URL 반환
```

이 구조는 브라우저가 큰 base64 이미지를 다시 JSON으로 보내는 문제를 제거한다. 다만 외부 이미지 제공사의 처리 지연, Vercel 함수 시간 제한, 네트워크 장애까지 절대 없애는 것은 아니므로 timeout, 재시도, 오류 상태 저장은 계속 필요하다.

저장된 프로젝트의 페이지 추가 생성:

```text
프로젝트 메타데이터
+ project_assets의 원본 업로드 자료
+ 기존 project_sections의 요약/프롬프트
→ 마지막 section_number 다음 번호부터 생성
→ 전체 12장 제한 검증
→ 새 섹션을 Storage와 DB에 저장
```

비로그인 유저는 V0의 압축 Blob + FormData 편집과 현재 작업 흐름 내 추가 생성을 그대로 사용한다.

### 2.9 V1 유저 권한

일반 유저:

1. 자기 프로젝트만 조회
2. 자기 프로젝트만 수정
3. 자기 이미지 파일만 접근
4. 자기 클라우드 저장 사용량 확인

일반 유저 화면은 `관리자 권한`을 주는 화면이 아니라 `내 작업 관리 화면`이다. 다른 유저 정보는 보이지 않아야 한다.

슈퍼 관리자:

1. 전체 유저 프로젝트 조회
2. 유저 이메일 기준 검색
3. 프로젝트 상태 확인
4. 이미지 저장 경로 확인
5. 오류 작업 확인
6. 초기 V1에서는 조회 중심으로 운영하고, 강제 삭제/수정 기능은 별도 승인 후 추가

### 2.10 V1 RLS 원칙

1. RLS는 반드시 켠다.
2. 일반 유저는 `auth.uid()` 기준으로 자기 데이터만 접근한다.
3. 슈퍼 관리자는 `admin_users` 또는 `SUPER_ADMIN_EMAILS` 기준으로 판단한다.
4. service role key는 서버 route에서만 사용한다.
5. 브라우저 client에 service role key를 절대 넣지 않는다.
6. Storage object 정책도 `users/{auth.uid()}/...` 소유 경로를 검증한다.
7. 슈퍼 관리자 API는 서버에서 세션과 관리자 권한을 다시 확인한다.
8. UI에서 버튼을 숨기는 것만으로 권한을 보호하지 않는다.

### 2.11 V1 저장 모드와 실패 상태

V1은 아래 세 가지 상태를 명확히 구분한다.

| 상태 | 저장 방식 | UI 표시 |
|---|---|---|
| 비로그인 | IndexedDB + ZIP | 로컬 저장 |
| 로그인 및 클라우드 정상 | Supabase DB + Storage | 클라우드 저장 완료 |
| 로그인했지만 클라우드 저장 실패 | 현재 브라우저 상태/IndexedDB 임시 보존 | 클라우드 미동기화, 재시도 필요 |

클라우드 저장 실패를 로컬 저장 성공으로 덮어 `클라우드 저장 완료`라고 표시하면 안 된다.

### 2.12 V1에서 Claude Code가 구현할 파일 후보

예상 추가/수정 파일:

```text
src/lib/supabase/client.ts
src/lib/supabase/server.ts
src/lib/supabase/admin.ts
src/lib/supabase/storage.ts
src/app/api/projects/route.ts
src/app/api/projects/[id]/route.ts
src/app/api/admin/projects/route.ts
src/app/api/storage/upload-image/route.ts
src/app/auth/callback/route.ts
src/components/redesign-wizard.tsx
supabase/schema.sql
docs/upgrade-roadmap/v1-phoenix-cloud-save/v1_supabase_schema.sql
.env.example
```

실제 파일명은 현재 Next.js 버전과 코드 구조에 맞춰 조정한다. 세션 갱신용 middleware 또는 최신 Next.js의 대응 파일이 필요하면 설치된 버전의 공식 패턴을 확인한 뒤 적용한다.

### 2.13 V1 권장 구현 순서

1. Git 상태, 현재 빌드, V0 기능 기준선 기록
2. Supabase 의존성과 환경변수 검증 모듈 추가
3. 브라우저용/서버용 Supabase client 분리
4. SQL schema, index, trigger, RLS, Storage policy 작성
5. Google 로그인과 callback 구현
6. 프로젝트/원본 자산/섹션 저장 API 구현
7. private Storage signed URL 조회 구현
8. 개별 편집을 section reference 방식으로 연결
9. 최근 제작 작업을 로그인 상태에 따라 로컬/클라우드로 분기
10. 슈퍼 관리자 조회 화면 구현
11. 기존 V0 fallback과 ZIP 다운로드 회귀 테스트
12. Vercel Production 배포 후 실제 Google 로그인과 저장 테스트

각 단계는 빌드 가능한 상태를 유지하고, 인증과 Storage를 한 번에 거대한 컴포넌트에 몰아넣지 않는다.

### 2.14 V1 완료 기준

1. Google 로그인과 로그아웃이 로컬 및 Vercel Production에서 동작한다.
2. 일반 유저는 자기 프로젝트와 Storage object만 조회/수정한다.
3. 다른 유저의 project id 또는 object path를 직접 넣어도 접근이 거부된다.
4. 슈퍼 관리자는 서버 검증 후 전체 프로젝트를 조회한다.
5. 원본 업로드 자료와 생성/편집 결과가 private Storage에 저장된다.
6. 저장된 프로젝트를 다른 브라우저에서 다시 열 수 있다.
7. 저장된 원본 자료를 이용해 마지막 페이지 뒤에 추가 생성할 수 있다.
8. 개별 편집 요청이 큰 base64 JSON 없이 section reference로 동작한다.
9. 비로그인 상태에서 V0 생성, IndexedDB 저장, ZIP 다운로드가 계속 동작한다.
10. Storage 또는 DB 장애 시 미동기화 상태와 재시도 안내가 정확히 표시된다.
11. `npm run build`가 성공하고 Vercel 배포 로그에 비밀 값이 노출되지 않는다.
12. 마스터용 작업확인서의 항목을 실제 화면에서 통과한다.

V1 완료 보고 시 마스터에게 아래 메뉴 정책을 반드시 다시 언급하고 컨펌을 받는다.

```text
1. 숨겨 둔 `나머지 섹션 만들기`를 재도입할지
2. `페이지 추가 생성`을 현재 방식으로 유지할지
3. 최초 생성 메뉴를 1/4/8장으로 유지할지, 1/6/8/10/12장으로 확장할지
```

### 2.15 V1 금지 사항

Claude Code는 아래를 하면 안 된다.

1. V0 기능 삭제
2. 유저의 OpenAI/Google API 키를 DB에 저장
3. service role key를 브라우저 코드에 넣기
4. 비밀 키를 코드에 하드코딩
5. RLS 없이 테이블 공개
6. 슈퍼 관리자 권한을 프론트 표시만으로 판단
7. 기존 ZIP 다운로드 기능 제거
8. 빌드 검증 없이 완료 보고
9. V1 작업에 결제/크레딧 코드를 섞기
10. 만료되는 signed URL을 DB의 영구 이미지 주소로 저장
11. Google Client Secret을 소스 코드나 문서에 기록
12. 클라우드 저장 실패를 저장 완료로 표시

---

## 3. V1.5 목표: 결제와 크레딧

V1.5는 V1의 로그인, DB, Storage 위에 결제와 사용량 관리를 얹는 단계다.  
V1이 “누가 무엇을 만들고 어디에 저장했는가”를 해결한다면, V1.5는 “누가 얼마만큼 사용할 수 있고 얼마만큼 사용했는가”를 해결한다.

V1.5 목표:

1. 무료 유저에게 소량의 무료 크레딧 제공
2. 결제 유저에게 결제 금액에 맞는 크레딧 지급
3. 이미지 생성, 이미지 편집, 추가 페이지 생성, AI 멘트 생성 등에 크레딧 차감
4. 유저별 크레딧 잔액 표시
5. 유저별 사용량, 결제 이력, 크레딧 지급/차감 이력 관리
6. 슈퍼 관리자 모드에서 전체 유저의 결제와 크레딧 현황 확인
7. 일반 유저의 내 계정 화면에서 본인 결제와 사용 이력만 확인
8. 결제 실패, 취소, 환불, 중복 승인 같은 예외 상황 기록

### 3.1 V1.5 전제 조건

V1.5는 반드시 V1 이후에 진행한다.

필수 전제:

1. Supabase Auth Google 로그인
2. 유저 프로필 테이블
3. 프로젝트 저장 테이블
4. Supabase Storage 이미지 저장
5. 슈퍼 관리자와 일반 유저 권한 구분
6. 서버 전용 API Route 구조

V1이 안정화되지 않은 상태에서 결제와 크레딧을 먼저 붙이면 결제 유저를 정확히 식별하기 어렵고, 사용량 차감 기준도 흔들린다.

### 3.2 V1.5 결제 방식

현재 로드맵 기준 결제 사업자는 Toss Payments를 우선 후보로 둔다.

중요한 구분:

```text
MCP = 개발, 설정 확인, 문서 조회를 돕는 도구
Toss Payments API/Webhook = 실제 운영 결제 승인과 상태 동기화 경로
```

MCP가 연결되어도 운영 결제를 대신 처리하는 것은 아니다. 실제 서비스에서는 서버가 결제 승인 API를 호출하고, 웹훅을 검증해 DB와 크레딧 원장에 반영해야 한다.

Claude Code는 실제 구현 전 아래를 확인해야 한다.

1. 결제 사업자 최종 확정
2. 테스트 결제 키와 운영 결제 키 분리
3. 결제 승인 콜백 URL
4. 결제 취소/환불 처리 방식
5. 크레딧 지급 단위
6. 무료 크레딧 정책
7. 유료 플랜 또는 충전 상품 구성
8. 환불 시 사용한 크레딧의 회수 정책
9. 부가세, 영수증, 이용약관, 개인정보 처리 고지

### 3.3 V1.5 시작 전 반드시 결정할 운영 모델

현재 V0/V1은 유저가 자기 OpenAI/Google API 키를 입력하는 BYOK 구조다. 내부 크레딧을 도입하려면 크레딧이 무엇의 비용인지 먼저 확정해야 한다.

가능한 방식:

| 방식 | 설명 | 장점 | 주의점 |
|---|---|---|---|
| BYOK + 서비스 크레딧 | 유저 API 비용은 유저가 부담하고, Phoenix 기능 이용료만 크레딧으로 차감 | 기존 구조 유지가 쉬움 | 유저가 이중 과금처럼 느끼지 않도록 명확한 고지 필요 |
| Phoenix 관리 API + 크레딧 | Phoenix 서버 키로 생성하고 크레딧이 모델 사용 비용과 서비스 비용을 포함 | 결제 경험이 단순함 | 서버 키 보안, 원가, 악용 방지, 한도 관리 필요 |
| 혼합형 | 비로그인/BYOK는 유지하고 로그인 유료 유저는 Phoenix 관리 API 선택 가능 | 기존 유저와 유료 운영을 함께 지원 | UI와 과금 규칙이 복잡해짐 |

권장 기본안은 혼합형이다. V0의 BYOK 흐름을 유지하면서, V1.5 유료 생성은 Phoenix 관리 API와 크레딧을 사용하는 별도 모드로 명확히 표시한다. 이 결정은 실제 구현 전에 마스터의 최종 승인을 받는다.

### 3.4 V1.5 Database 설계 후보

세부 작업지시서와 통일한 추가 테이블 이름:

```text
credit_accounts
- id
- user_id
- balance
- free_credit_balance
- paid_credit_balance
- created_at
- updated_at

credit_ledger
- id
- user_id
- project_id
- transaction_type
- amount
- balance_after
- reason
- provider_payment_id
- idempotency_key
- status
- created_at

payment_orders
- id
- user_id
- provider
- provider_payment_id
- order_id
- product_name
- amount_krw
- credit_amount
- status
- approved_at
- cancelled_at
- raw_payload
- created_at

usage_logs
- id
- user_id
- project_id
- job_id
- event_type
- model_provider
- model_name
- credit_cost
- status
- idempotency_key
- error_message
- created_at
```

선택 테이블:

```text
credit_products
- 결제 상품명, 금액, 지급 크레딧, 활성 여부, 표시 순서
```

테이블 역할:

| 테이블 | 역할 |
|---|---|
| `credit_accounts` | 빠른 잔액 조회용 현재 상태 |
| `credit_ledger` | 지급, 예약, 사용, 해제, 환불, 관리자 조정의 불변 원장 |
| `payment_orders` | Toss 주문, 승인, 실패, 취소, 환불 상태 |
| `usage_logs` | 생성/편집/AI 멘트 단위의 사용량과 성공/실패 상태 |
| `credit_products` | 운영 중 변경 가능한 충전 상품 |

### 3.5 V1.5 크레딧 처리 원칙

동시 요청과 실패를 안전하게 처리하기 위한 권장 흐름:

```text
요청 접수
→ 서버에서 유저/잔액/상품 정책 확인
→ idempotency_key로 중복 요청 확인
→ 필요한 크레딧을 원자적으로 예약
→ 생성 또는 편집 실행
→ 성공하면 예약을 사용으로 확정
→ 실패하면 예약을 해제
→ usage_logs와 credit_ledger를 같은 작업 ID로 연결
```

단순히 브라우저에서 잔액을 읽고 빼면 안 된다. Postgres transaction 또는 검증된 RPC를 사용해 잔액 확인과 예약/차감을 원자적으로 처리한다.

결제 웹훅 처리:

1. provider 서명과 주문 정보를 서버에서 검증한다.
2. `provider_payment_id`, `order_id`, 웹훅 event id에 unique 제약을 둔다.
3. 같은 성공 웹훅이 반복 수신돼도 크레딧은 한 번만 지급한다.
4. 클라이언트의 성공 redirect만으로 지급하지 않는다.
5. 취소/환불은 기존 원장을 삭제하지 않고 반대 방향 원장을 추가한다.

### 3.6 V1.5 크레딧 단가 예시

예시 정책:

```text
AI 멘트 생성 = 낮은 크레딧
이미지 1장 생성 = 중간 크레딧
이미지 1장 편집 = 중간 크레딧
고해상도 이미지 생성 = 높은 크레딧
추가 페이지 생성 = 생성 장수 기준 차감
```

정확한 크레딧 단가는 마스터가 운영 정책으로 확정한다.  
Claude Code는 단가를 하드코딩하지 말고 설정값 또는 DB 정책으로 바꿀 수 있게 설계한다.

### 3.7 V1.5 환경변수와 API 후보

실제 이름은 Toss Payments 계약과 SDK 버전을 확인해 확정한다.

```env
TOSS_CLIENT_KEY=
TOSS_SECRET_KEY=
TOSS_WEBHOOK_SECRET=
PHOENIX_OPENAI_API_KEY=
PHOENIX_GOOGLE_API_KEY=
```

`TOSS_SECRET_KEY`, 웹훅 secret, Phoenix 관리 모델 키는 서버 전용이다. BYOK 모드의 유저 API 키와 혼합해 DB에 저장하지 않는다.

API 후보:

```text
POST /api/billing/orders
POST /api/billing/confirm
POST /api/billing/webhook
POST /api/billing/refund
GET  /api/credits/balance
GET  /api/credits/history
POST /api/admin/credits/adjust
```

### 3.8 V1.5 금지 사항

Claude Code는 아래를 하면 안 된다.

1. 결제 Secret Key를 브라우저에 노출
2. 결제 성공 여부를 클라이언트 응답만 믿고 확정
3. 크레딧 차감 실패를 무시하고 생성 성공 처리
4. 결제 성공 후 DB 기록 없이 크레딧만 증가
5. 유저가 직접 크레딧 잔액을 조작할 수 있는 구조
6. 환불/취소 이력을 지우는 구조
7. 관리자 권한 없이 타 유저 결제 내역을 조회할 수 있는 구조
8. 웹훅 중복 수신 때 크레딧 중복 지급
9. 외부 AI 생성이 실패했는데 예약 크레딧을 사용 확정
10. BYOK 요청과 Phoenix 관리 API 요청을 화면에서 구분하지 않는 구조

### 3.9 V1.5 검증 기준

V1.5 완료 기준:

1. 신규 가입 유저에게 무료 크레딧이 지급된다.
2. 결제 성공 시 크레딧이 증가한다.
3. 생성/편집 사용 시 크레딧이 차감된다.
4. 잔액 부족 시 생성이 차단되고 안내 문구가 나온다.
5. 슈퍼 관리자는 전체 결제와 크레딧 현황을 볼 수 있다.
6. 일반 유저는 본인 내역만 볼 수 있다.
7. 결제 실패, 취소, 환불이 기록된다.
8. 같은 결제 웹훅을 여러 번 보내도 크레딧은 한 번만 지급된다.
9. 같은 생성 idempotency key를 반복 전송해도 한 번만 차감된다.
10. 동시 요청에도 잔액이 음수가 되지 않는다.
11. 생성 실패 시 예약 크레딧이 해제된다.
12. 결제/웹훅/관리자 API가 서버 권한을 검증한다.
13. 빌드와 배포가 정상 통과한다.

---

## 4. V2 목표: Design Bot Telegram Automation

V2는 Design Bot이 `phoenix pages` 웹사이트를 직접 컨트롤하고 결과물을 Telegram으로 전달하는 단계다.

연결 대상 Agent 패키지:

```text
Phoenix Agent v2.0
지원 설치 패키지: Windows 11, macOS
Agent 저장소: https://github.com/phoenixai-sw/phoenix-agents-camp.git
Telegram bot: design_bot
```

V2 구현 전 실제 설치된 운영체제용 Phoenix Agent v2.0 패키지와 저장소의 최신 설치 문서를 확인한다. Windows 전용 경로를 macOS 문서에 그대로 사용하지 않는다.

### 4.1 V2 목표 흐름

```text
Telegram에서 유저가 명령
→ Design Bot이 명령 수신
→ phoenix pages 접속
→ 로그인 또는 API 키 설정 확인
→ 이미지/PDF 업로드
→ 생성 옵션 선택
→ 상세페이지 생성
→ 결과 ZIP 또는 이미지 다운로드
→ Telegram으로 결과 전달
```

### 4.2 V2 전제 조건

권장 전제:

1. V1 Google 로그인 완료
2. V1 Supabase Storage 저장 완료
3. V1 프로젝트 DB 저장 완료
4. 운영 서비스라면 V1.5 크레딧 구조와 사용량 기록 완료
5. Phoenix Agent v2.0 Design Bot 설치 및 Telegram 연결 완료
6. Design Bot 전용 일반 유저 계정 또는 안전한 인증 방식 확정
7. Telegram 허용 유저/chat allowlist 확정
8. Windows 11 또는 macOS에서 사용할 브라우저 제어 방식 확정

V1 없이도 V2 개념 실험은 가능하지만 저장, 재시도, 작업 추적이 약해 운영용으로 사용하지 않는다. V1.5 이전에 V2 개발을 시작할 수는 있으나 유료 운영에 투입하려면 크레딧과 사용량 정책을 먼저 완성한다.

Design Bot에는 슈퍼 관리자 계정을 주지 않는다. 봇 전용 일반 유저 권한으로 필요한 프로젝트만 접근하게 한다.

### 4.3 V2에서 phoenix pages가 제공해야 할 것

봇 자동화를 위해 웹 UI에 안정적인 식별자가 필요하다.

권장 `data-testid` 후보:

```text
data-testid="login-button"
data-testid="logout-button"
data-testid="api-key-openai"
data-testid="api-key-google"
data-testid="upload-dropzone"
data-testid="generation-prompt"
data-testid="page-count-hero"
data-testid="page-count-simple"
data-testid="page-count-detail"
data-testid="ratio-9-16"
data-testid="ratio-1-1"
data-testid="ratio-4-5"
data-testid="generate-button"
data-testid="save-project-button"
data-testid="download-zip-button"
data-testid="cloud-save-button"
data-testid="result-gallery"
data-testid="add-page-1"
data-testid="add-page-2"
data-testid="add-page-3"
```

추가 권장 식별자:

```text
data-testid="auth-status"
data-testid="generation-status"
data-testid="generation-error"
data-testid="project-title-input"
data-testid="recent-projects"
data-testid="project-row-{project_id}"
data-testid="section-card-{section_number}"
data-testid="edit-section-{section_number}"
data-testid="credit-balance"
```

동적 ID에는 화면에 표시되는 프로젝트 제목 대신 변경되지 않는 project id 또는 section number를 사용한다.

### 4.4 V2 제어 방식

V2는 두 층으로 설계한다.

```text
1차 호환 경로: 브라우저 UI 자동화
- 실제 유저와 같은 화면 흐름 검증
- data-testid 기반 조작

2차 안정화 경로: 인증된 job API
- 장시간 생성 상태 추적
- 재시도와 중복 방지
- UI 문구 변경의 영향 최소화
```

Design Bot이 웹서비스를 컨트롤한다는 제품 개념은 유지하되, 모든 동작을 마우스 클릭에만 의존할 필요는 없다. 로그인, 업로드, 생성 요청, 상태 조회, 결과 전달을 인증된 job API로 제공하면 운영 안정성이 높아진다. Bot은 Supabase DB에 직접 쓰지 않고 phoenix pages의 승인된 서버 API를 사용한다.

### 4.5 V2에서 필요한 상태 모델

봇 작업마다 job id가 필요하다.

V2 추가 테이블 후보:

```text
automation_jobs
automation_job_events
```

`automation_jobs`는 요청 유저, Telegram chat, project id, 현재 상태, idempotency key, 생성 시각을 보관한다. `automation_job_events`는 상태 변경과 재시도 사유를 순서대로 남긴다.

상태 후보:

```text
queued
opening_site
auth_check
uploading_files
setting_options
generating
saving_to_cloud
downloading
sending_to_telegram
completed
failed
cancelled
```

상태는 브라우저 화면 텍스트를 추측해 정하지 않고, 서버 응답 또는 job 상태에서 확인한다.

### 4.6 V2 결과 전달 방식

우선순위:

1. ZIP 파일 1개 전달
2. 대표 미리보기 이미지 1장 전달
3. 클라우드 저장 프로젝트 URL 전달
4. 실패 시 실패 원인과 재시도 안내 전달

Telegram 파일 크기 제한이나 네트워크 실패에 대비해 ZIP 직접 전송과 만료시간이 있는 다운로드 링크를 함께 고려한다. private Storage object를 영구 공개 URL로 바꾸지 않는다.

### 4.7 V2 보안 원칙과 금지 사항

1. Telegram 채팅방에 API 키를 출력하지 않는다.
2. Design Bot 로그에 유저 API 키를 평문 저장하지 않는다.
3. UI 텍스트에만 의존하지 않고 `data-testid`를 사용한다.
4. 생성 실패를 성공으로 보고하지 않는다.
5. 여러 유저의 작업 파일이 같은 폴더에서 섞이지 않게 한다.
6. Design Bot에 service role key 또는 슈퍼 관리자 세션을 제공하지 않는다.
7. Telegram에서 받은 파일을 검증 없이 실행하거나 HTML로 렌더링하지 않는다.
8. 같은 idempotency key로 생성 작업을 중복 실행하지 않는다.
9. 성공 여부를 다운로드 버튼 노출만으로 판단하지 않는다.

### 4.8 V2 완료 기준

1. 허용된 Telegram 유저만 생성 명령을 시작할 수 있다.
2. Design Bot이 필요한 파일과 옵션을 수집하고 누락값을 다시 요청한다.
3. 봇 전용 일반 유저로 phoenix pages에 인증한다.
4. 1장, 4장, 8장과 9:16, 1:1, 4:5 조합을 정확히 설정한다.
5. job id와 상태가 생성부터 완료/실패까지 기록된다.
6. 결과 ZIP, 대표 이미지, 프로젝트 링크 중 설정된 결과가 Telegram에 전달된다.
7. API key, 세션 token, Storage secret이 Telegram과 로그에 나타나지 않는다.
8. 실패 후 재시도해도 프로젝트와 크레딧이 중복 생성/차감되지 않는다.
9. Windows 11 또는 macOS의 목표 운영 환경에서 반복 테스트를 통과한다.
10. UI 텍스트를 바꿔도 `data-testid` 계약이 유지되면 핵심 자동화가 동작한다.

---

## 5. V3 목표: Genesis Bot Orchestration

V3는 Genesis Bot이 최상위 지휘자가 되고, Design Bot이 실제 웹 컨트롤을 수행하는 단계다.

Phoenix Agent 버전 관계:

```text
Phoenix Agent v2.0
→ bot-to-bot-to-web 구조 지원
→ genesis_bot이 design_bot을 지휘
→ design_bot이 phoenix pages를 컨트롤
```

Agent v2.0이라는 설치 패키지 버전과 phoenix pages의 V3 제품 로드맵 버전은 서로 다른 버전 체계다. 둘을 같은 숫자라고 가정하지 않는다.

### 5.1 V3 목표 흐름

```text
마스터가 Genesis Bot에게 자연어 요청
→ Genesis Bot이 요청을 분석
→ 필요한 정보 질문
→ Design Bot에게 구조화된 작업 지시 전달
→ Design Bot이 phoenix pages 조작
→ 결과 생성 및 저장
→ Design Bot이 결과를 Telegram으로 전달
→ Genesis Bot이 최종 완료 보고
```

### 5.2 V3 전제 조건

1. V1 DB/Storage/Auth 안정화
2. V2 Design Bot 웹 컨트롤 안정화
3. Genesis Bot 설치 및 Telegram 연결
4. Genesis Bot과 Design Bot 간 메시지 전달 방식 확정
5. 작업 상태를 저장할 DB 또는 job store 준비
6. Phoenix Agent v2.0의 Windows 11 또는 macOS 설치 검증
7. `genesis_bot`, `design_bot` 각각의 Telegram 연결 및 allowlist 검증
8. 자동 실행 전 마스터 승인 정책 확정

### 5.3 V3 역할 분리

Genesis Bot 역할:

1. 마스터 요청 이해
2. 부족한 정보 질문
3. 작업 요구사항 정리
4. 적절한 봇 선택
5. Design Bot에게 구조화된 명령 전달
6. 진행 상태 모니터링
7. 실패 시 재시도 또는 마스터 확인 요청
8. 최종 보고

Design Bot 역할:

1. Genesis Bot 명령 수신
2. 명령 JSON 검증
3. phoenix pages 접속
4. 파일 업로드
5. 생성 옵션 설정
6. 상세페이지 생성
7. 결과 저장/다운로드
8. Telegram 결과 전달
9. 상태 반환

phoenix pages 역할:

1. 안정적인 웹 생성 도구 제공
2. 자동화용 `data-testid` 제공
3. 클라우드 프로젝트 저장
4. 결과 URL 제공
5. 작업 상태 확인 API 제공 가능성 검토

### 5.4 V3 구조화 명령 예시

Genesis Bot이 Design Bot에게 보내는 명령은 자연어만 쓰지 말고 구조화해야 한다.

예시:

```json
{
  "job_type": "detail_page_create",
  "schema_version": "1.0",
  "job_id": "generated-unique-id",
  "requester": "genesis_bot",
  "telegram_chat_id": "123456789",
  "target_web": "phoenix_pages",
  "product_name": "테스트 상품",
  "page_count": 8,
  "aspect_ratio": "9:16",
  "channel": "맞춤형 웹/앱",
  "prompt": "모바일 첫 화면에서 제품, 대상, 혜택이 3초 안에 보이게 구성",
  "source_files": [],
  "idempotency_key": "unique-request-key",
  "delivery": {
    "send_zip": true,
    "send_preview": true,
    "send_project_url": true
  }
}
```

명령 검증 원칙:

1. `schema_version`, `job_id`, `job_type`, `target_web`, 요청자, 전달 대상을 검증한다.
2. `page_count`는 허용값과 최대 12장 규칙을 검증한다.
3. `aspect_ratio`는 9:16, 1:1, 4:5만 허용한다.
4. source file은 Telegram file id 또는 승인된 Storage path처럼 검증 가능한 참조를 쓴다.
5. API key, OAuth token, 결제 secret을 명령 JSON에 넣지 않는다.
6. 같은 `idempotency_key`는 한 번만 실행한다.

### 5.5 V3 작업 상태

권장 상태:

```text
requested
validated
waiting_for_missing_info
sent_to_design_bot
accepted_by_design_bot
running
waiting_for_generation
saving
delivering
completed
failed
needs_master_input
cancelled
```

### 5.6 V3 에러 처리

1. Design Bot이 응답하지 않으면 Genesis Bot이 마스터에게 보고한다.
2. 웹 생성이 실패하면 실패 원인과 재시도 옵션을 보고한다.
3. 크레딧 부족이면 결제 또는 충전 안내를 보고한다.
4. 파일이 너무 크면 압축 또는 분할 업로드를 안내한다.
5. 장시간 작업은 중간 상태를 주기적으로 보고한다.
6. Design Bot 재시도 여부와 횟수를 Genesis Bot이 기록한다.
7. 마스터 입력이 필요한 상태는 자동 실패로 닫지 않고 `needs_master_input`으로 유지한다.

### 5.7 V3 금지 사항

1. Genesis Bot이 Design Bot 상태를 모른 채 완료 보고하지 않는다.
2. 자연어 지시만으로 중요한 자동화 작업을 실행하지 않는다.
3. 같은 job id로 중복 생성하지 않는다.
4. 실패 작업을 성공으로 표시하지 않는다.
5. API 키, 결제 정보, 유저 개인정보를 Telegram에 평문 출력하지 않는다.
6. Genesis Bot이 DB나 Storage를 슈퍼 관리자 권한으로 직접 수정하지 않는다.
7. 승인 정책이 필요한 고비용 작업을 마스터 확인 없이 실행하지 않는다.

### 5.8 V3 완료 기준

1. 마스터의 자연어 요청을 Genesis Bot이 구조화된 명령으로 변환한다.
2. 누락 정보가 있으면 실행 전에 질문한다.
3. 승인 정책 대상이면 Design Bot에게 넘기기 전에 마스터 승인을 받는다.
4. Design Bot이 동일한 job id를 수락하고 진행 상태를 반환한다.
5. Genesis Bot과 마스터가 같은 상태를 확인할 수 있다.
6. 성공 결과가 Telegram으로 전달되고 프로젝트와 사용량이 연결된다.
7. 실패 원인, 재시도 횟수, 다음 행동이 기록된다.
8. 같은 요청의 중복 실행과 중복 크레딧 차감이 방지된다.
9. Genesis Bot 중단 또는 Design Bot 중단 뒤에도 job 상태를 복구할 수 있다.
10. Windows 11 또는 macOS 목표 환경의 Phoenix Agent v2.0에서 종단 테스트를 통과한다.

---

## 6. Claude Code에게 주는 작업 원칙

Claude Code는 이 프로젝트를 수정할 때 아래 원칙을 지킨다.

### 6.1 먼저 해야 할 분석

작업 전 확인:

```text
git status 및 기존 유저 변경
package.json
src/components/redesign-wizard.tsx
src/app/api/generate/route.ts
src/app/api/edit-section/route.ts
src/app/api/ai-comment/route.ts
src/app/layout.tsx
src/app/page.tsx
src/app/studio/page.tsx
docs/upgrade-roadmap
```

반드시 답해야 할 사전 질문:

1. 현재 요청의 목표 버전은 무엇인가?
2. 현재 코드에서 이미 구현된 기능과 문서상 계획은 무엇인가?
3. 기존 유저 변경이 있는가?
4. 현재 브라우저 저장, API key 저장, 생성, 편집, ZIP 흐름은 어디에 구현돼 있는가?
5. DB schema 또는 migration이 이미 존재하는가?
6. 배포 환경은 로컬, Vercel Preview, Vercel Production 중 어디인가?
7. 실제 비밀값 없이도 코드와 문서를 먼저 구현할 수 있는가?

### 6.2 코딩 원칙

1. 기존 V0 기능을 깨지 않는다.
2. 대규모 리팩터링보다 필요한 범위의 안정적 변경을 우선한다.
3. Supabase secret은 서버 route에서만 사용한다.
4. 유저 API 키는 DB에 저장하지 않는다.
5. 이미지 원본 데이터 대신 Storage path/URL 중심 구조로 전환한다.
6. Vercel 배포를 기준으로 빌드 가능해야 한다.
7. UI 라벨과 자동화 식별자를 분리한다.
8. V2/V3를 고려해 `data-testid`를 안정적으로 설계한다.
9. 현재 2천 줄 이상인 `redesign-wizard.tsx`에 인증, Storage, 결제, 봇 상태 로직을 계속 직접 누적하지 않는다.
10. V1부터는 Supabase client, 프로젝트 저장, Storage, 인증 UI를 책임별 모듈로 분리한다.
11. 리팩터링은 기능 변경과 섞어 한 번에 크게 진행하지 않고, 테스트 가능한 단위로 나눈다.
12. DB 변경은 재현 가능한 SQL migration 또는 schema 파일로 남긴다.
13. 날짜가 지나면 만료되는 signed URL보다 Storage object path를 데이터 기준으로 삼는다.
14. 외부 API 실패, DB 실패, Storage 실패를 서로 다른 상태와 메시지로 구분한다.
15. 유저 변경이나 무관한 파일을 되돌리지 않는다.

### 6.3 검증 원칙

최소 검증:

```bash
npm run build
```

가능하면 로컬 실행:

```bash
npm run dev:local
```

브라우저 확인:

```text
http://localhost:3002
```

기능 확인:

1. 비로그인 V0 생성
2. 로그인 V1 저장
3. Storage 이미지 저장
4. DB 프로젝트 저장
5. 일반 유저 자기 작업만 조회
6. 슈퍼 관리자 전체 작업 조회
7. ZIP 다운로드
8. 개별 편집
9. AI 멘트 생성

버전별 최소 검증표:

| 버전 | 필수 검증 |
|---|---|
| V0 | 1/4/8장, 3개 비율, 최대 12장 추가, 개별 편집, AI 멘트, IndexedDB 다시 열기, ZIP |
| V1 | Google Auth, private Storage, DB 저장/다시 열기, RLS 교차 유저 차단, 슈퍼 관리자 조회, V0 fallback |
| V1.5 | 결제 승인/실패/취소, 웹훅 중복, 크레딧 원장, 동시 요청, 실패 시 예약 해제 |
| V2 | Telegram 접수, 웹/job API 제어, 상태 추적, ZIP 전달, 재시도, secret 비노출 |
| V3 | 자연어 분석, 누락 정보 질문, 승인, bot-to-bot 명령, 상태 복구, 중복 실행 방지 |

### 6.4 완료 보고 형식

Claude Code는 작업 완료 후 아래를 빠짐없이 보고한다.

```text
1. 구현한 목표 버전과 범위
2. 변경한 파일의 절대 또는 저장소 기준 경로
3. 새 환경변수 이름과 공개/비밀 구분
4. 생성한 SQL migration과 적용 여부
5. 마스터가 직접 해야 할 설정
6. 실행한 빌드/테스트와 실제 결과
7. 검증하지 못한 항목과 이유
8. 기존 V0 기능의 회귀 여부
9. 다음 버전으로 넘긴 항목
10. rollback 방법 또는 되돌릴 파일 범위
```

---

## 7. Supabase MCP 사용 지침

Supabase MCP를 사용할 수 있으면 먼저 읽기 전용으로 확인한다.

공식 endpoint:

```text
https://mcp.supabase.com/mcp
```

프로젝트 제한:

```text
https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_REF
```

초기 확인용:

```text
https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_REF&read_only=true&features=database,docs,storage
```

MCP로 확인할 것:

1. Supabase 프로젝트 연결 상태
2. Project URL
3. Storage bucket 목록
4. 기존 table 목록
5. RLS 상태
6. 기존 policy
7. SQL 실행 가능 여부
8. 오류 로그

MCP 원칙:

1. 반드시 현재 마스터 또는 수강생이 지정한 `project_ref`로 제한한다.
2. 첫 연결은 `read_only=true`로 확인한다.
3. 다른 수강생, 운영 마스터, 무관한 프로젝트를 탐색하지 않는다.
4. migration, RLS, Storage policy 쓰기 전 변경 SQL과 영향을 보고한다.
5. destructive SQL은 별도 승인 없이는 실행하지 않는다.
6. MCP가 연결되지 않아도 SQL 파일과 수동 적용 안내를 제공할 수 있어야 한다.

쓰기 작업 전 반드시 보고:

```text
실행할 SQL
생성할 테이블
수정할 RLS 정책
Storage bucket 변경 여부
삭제되는 항목 여부
rollback 가능 여부
```

MCP를 사용해 실제 쓰기를 완료했다면 적용된 migration, 정책, bucket을 다시 읽어 기대 상태와 일치하는지 검증한다.

---

## 8. Vercel Supabase Integration 사용 지침

현재 서비스는 Vercel에 배포 중이고 Pro 플랜을 사용한다.

권장:

```text
Vercel Marketplace Supabase Integration으로 Supabase 연결
```

이 방식의 장점:

1. Vercel 프로젝트와 Supabase 프로젝트 연결이 쉽다.
2. Supabase URL과 key 환경변수가 자동으로 들어갈 수 있다.
3. Vercel Production/Preview 환경과 연결하기 좋다.
4. 이후 Claude Code는 환경변수 이름 기준으로 코드 작업을 진행하면 된다.

주의:

```text
Vercel Integration이 Google OAuth Provider 설정까지 모두 대신해주지는 않는다.
Google OAuth Client와 Supabase Google Provider 입력은 마스터가 직접 확인한다.
```

Integration 연결 후 확인할 것:

1. Production, Preview, Development 중 어느 환경에 변수가 들어갔는가?
2. publishable/anon key 이름 중 프로젝트가 실제 사용하는 것은 무엇인가?
3. secret/service role key가 클라이언트 번들에 노출되지 않는가?
4. Supabase 프로젝트와 Vercel 프로젝트가 정확히 연결됐는가?
5. 환경변수 변경 후 새 배포가 실행됐는가?

Integration이 연결됐다는 사실만으로 DB table, RLS, Storage bucket, Google Provider가 자동 완성됐다고 판단하지 않는다.

---

## 9. Claude Code에게 붙여넣을 압축 프롬프트

아래 프롬프트는 Claude Code에 바로 입력할 수 있다.

```text
현재 저장소는 phoenix pages V0 상태입니다.
먼저 아래 문서를 순서대로 읽어주세요.
1. docs/upgrade-roadmap/claude-code-v0-v3-통합작업브리프.md
2. docs/upgrade-roadmap/README.md
3. docs/upgrade-roadmap/v1-phoenix-cloud-save/v1(코덱스입력용)_작업지시서.md
4. docs/upgrade-roadmap/v1-phoenix-cloud-save/v1(마스터작업용)_작업확인서.md

문서상 계획과 실제 구현을 구분하고, 현재 코드와 Git 변경을 먼저 분석해주세요.

현재 목표는 우선 V1입니다.

V1 목표:
1. Supabase Auth Google 로그인
2. Supabase Storage 이미지 저장
3. Supabase Database 프로젝트 저장
4. 유저별 작업 목록
5. 슈퍼 관리자와 일반 유저 구분
6. 기존 V0 브라우저 저장과 로컬 다운로드 fallback 유지
7. 원본 업로드 파일과 생성/편집 결과를 private Storage에 분리 저장
8. 이미지 데이터가 커서 편집 요청이 실패하는 문제를 project/section reference 중심 구조로 개선
9. 저장된 원본 자료를 이용한 최대 12장 페이지 추가 생성 유지

현재 배포는 Vercel이고 Pro 플랜입니다.
가능하면 Vercel Marketplace Supabase Integration과 Supabase MCP 사용을 전제로 설계해주세요.

주의:
- 기존 V0 기능은 삭제하지 마세요.
- 유저 OpenAI/Google API 키는 DB에 저장하지 마세요.
- Supabase service role/secret key는 서버에서만 사용하세요.
- RLS 정책과 SQL을 함께 제공하세요.
- Google OAuth Client Secret은 마스터가 직접 입력합니다.
- V2/V3 봇 자동화를 위해 주요 UI 요소에는 안정적인 data-testid를 추가할 수 있게 설계하세요.
- V1에 결제/크레딧(V1.5)이나 봇 자동화(V2/V3)를 섞어 구현하지 마세요.
- signed URL을 DB의 영구 주소로 저장하지 말고 Storage object path를 저장하세요.
- cloud 저장 실패를 저장 완료로 표시하지 마세요.

작업 전 현재 코드 구조, V0 저장 방식(localStorage와 IndexedDB의 역할), 현재 API 흐름을 분석하고 수정할 파일 목록과 구현 순서를 먼저 보고한 뒤 진행해주세요.
작업 완료 후 변경 파일, 환경변수 목록, Supabase SQL, 테스트 방법, 남은 주의사항을 보고해주세요.

V1이 안정화된 뒤에는 V1.5로 결제와 크레딧을 붙입니다.
V1.5에서는 무료 크레딧, 유료 크레딧 충전, 사용량 차감, 결제 이력, 슈퍼 관리자 확인 화면을 구현합니다.
```

---

## 10. 관련 문서 위치

로드맵 색인:

```text
docs/upgrade-roadmap/README.md
```

버전별 상세 문서:

```text
docs/upgrade-roadmap/v0-from-scratch-to-current/v0(초기구축)_코덱스용 작업지시서.md
docs/upgrade-roadmap/v0-from-scratch-to-current/v0(초기구축)_유저용 작업확인서.md

docs/upgrade-roadmap/v1-phoenix-cloud-save/v1(피닉스클라우드저장)_코덱스용 작업지시서.md
docs/upgrade-roadmap/v1-phoenix-cloud-save/v1(피닉스클라우드저장)_유저용 작업확인서.md
docs/upgrade-roadmap/v1-phoenix-cloud-save/v1(Supabase준비물)_획득안내서.md
docs/upgrade-roadmap/v1-phoenix-cloud-save/v1(코덱스입력용)_작업지시서.md
docs/upgrade-roadmap/v1-phoenix-cloud-save/v1(마스터작업용)_작업확인서.md

docs/upgrade-roadmap/v1.5-credit-payments/v1.5(결제크레딧)_코덱스용 작업지시서.md
docs/upgrade-roadmap/v1.5-credit-payments/v1.5(결제크레딧)_유저용 작업확인서.md

docs/upgrade-roadmap/v2-design-bot-telegram/v2(Design봇텔레그램자동화)_코덱스용 작업지시서.md
docs/upgrade-roadmap/v2-design-bot-telegram/v2(Design봇텔레그램자동화)_유저용 작업확인서.md

docs/upgrade-roadmap/v3-genesis-design-orchestration/v3(Genesis봇지휘자동화)_코덱스용 작업지시서.md
docs/upgrade-roadmap/v3-genesis-design-orchestration/v3(Genesis봇지휘자동화)_유저용 작업확인서.md
```

보관 문서:

```text
docs/_archive-storage/v2-user-supabase-option
```

보관 문서의 `유저 개인 Supabase 연결`은 현재 V2가 아니다. 현재 V2는 Design Bot Telegram 자동화다.

---

## 11. 현재 우선순위

지금 당장 우선순위:

1. 이 통합 브리프와 목표 버전 세부 문서를 읽고 현재 V0 기준선 확인
2. V1 Supabase 프로젝트와 Vercel Integration 연결 확인
3. Google OAuth 설정값과 Production/로컬 redirect URL 확인
4. Supabase DB/Storage/RLS migration 설계와 마스터 승인
5. V1 Auth, 클라우드 저장, 개별 편집, 추가 생성 코드 구현
6. 일반 유저/슈퍼 관리자 권한과 V0 fallback 검증
7. V1 완료 후 3개 생성 메뉴 정책을 마스터에게 재보고
8. V1.5의 과금 모델(BYOK/관리 API/혼합형)과 Toss 정책 확정
9. V1.5 결제/크레딧 구현과 중복·실패 테스트
10. Phoenix Agent v2.0 Design Bot 기반 V2 자동화 준비
11. Phoenix Agent v2.0 Genesis/Design Bot 기반 V3 지휘 구조 준비

---

## 12. 최신 확정 결정 기록

이 항목은 과거 문서의 표현이 다시 들어오는 것을 막기 위한 기준이다.

1. 화면 서비스명은 `phoenix pages`다.
2. 좌측 상단 보조 문구는 `MeMe studio`다.
3. V0 최초 생성 메뉴는 `1장(히어로)`, `4장(심플)`, `8장(상세)`다.
4. V0 출력 비율은 `9:16(상세)`, `1:1(정사각)`, `4:5(피드)`다.
5. `페이지 추가 생성`은 유지하며 1/2/3장 중 가능한 수량만 보여주고 최대 12장에서 종료한다.
6. `나머지 섹션 만들기`는 V0에서 숨긴다.
7. V1 완료 후 위 생성 메뉴 3종의 운영 정책을 마스터에게 다시 보고한다.
8. V1은 Supabase Auth, Database, Storage, Google 로그인, 슈퍼 관리자/일반 유저 구분 단계다.
9. 일반 유저는 자기 작업만 관리하며 다른 유저를 관리하는 권한이 없다.
10. V1.5는 Toss 결제, 무료/유료 크레딧, 사용량 원장 단계다.
11. V1.5 공식 테이블명은 `credit_accounts`, `credit_ledger`, `payment_orders`, `usage_logs`를 기준으로 한다.
12. V2는 `design_bot`이 phoenix pages를 컨트롤하고 Telegram으로 결과를 보내는 단계다.
13. V3는 `genesis_bot`이 `design_bot`을 지휘하는 단계다.
14. V2/V3 Agent 연결 기준은 Phoenix Agent v2.0이며 Windows 11과 macOS를 고려한다.
15. 과거의 `유저 개인 Supabase 연결` 계획은 보관된 고급 옵션이며 현재 V2 정의가 아니다.

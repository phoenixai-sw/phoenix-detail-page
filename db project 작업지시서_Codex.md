# db project 작업지시서 - Codex

## 1. 작업 목적

Phoenix detail page 프로젝트에서 생성된 상세페이지 결과를 브라우저 저장소뿐 아니라 Supabase Postgres DB에도 저장되도록 완성한다.

현재 이미지 생성 기능은 정상 동작 중이므로 이미지 생성 API, 모델 설정, 타임아웃 처리 로직은 불필요하게 수정하지 않는다.

## 2. 현재 완료된 작업

1. Supabase Postgres 호환 DB 클라이언트 추가
   - `postgres` 패키지 추가
   - Supabase pooler 호환을 위해 `prepare: false` 사용

2. 프로젝트 저장소 모듈 추가
   - 파일: `src/lib/project-store.ts`
   - 테이블: `detail_page_projects`
   - 기능:
     - 프로젝트 저장
     - 프로젝트 목록 조회
     - 프로젝트 삭제
     - `PROJECTS_STORAGE_KEY` 검증

3. 프로젝트 저장 API 추가
   - 파일: `src/app/api/projects/route.ts`
   - `GET /api/projects`
   - `POST /api/projects`
   - `DELETE /api/projects`

4. 프론트 저장 흐름 연결
   - 파일: `src/components/redesign-wizard.tsx`
   - 기존 IndexedDB 저장 유지
   - 서버 DB 저장 추가
   - 저장 실패 시에도 브라우저 저장은 유지
   - 설정 화면에 `프로젝트 DB 저장 키` 입력란 추가
   - 사이드 설정 박스에 `프로젝트 DB 저장` 상태 표시

5. 설정 상태 API 확장
   - 파일: `src/app/api/config/route.ts`
   - `projectStoreConfigured`
   - `projectStoreKeyRequired`

6. 환경변수 예시 추가
   - 파일: `.env.example`
   - `PROJECTS_STORAGE_KEY`

## 3. Codex가 다음에 확인할 것

1. `npm run build` 실행
   - 이미 1회 성공했으나, 추가 수정 후 반드시 다시 확인한다.

2. Supabase 연결 실제 테스트
   - 마스터가 `DATABASE_URL`과 `PROJECTS_STORAGE_KEY`를 배포 환경에 넣은 뒤 진행한다.
   - 테스트 순서:
     - 사이트 접속
     - API 키 설정에서 `프로젝트 DB 저장 키` 입력
     - 상세페이지 1장 생성
     - 결과 저장
     - 새로고침
     - 홈보드에 저장 프로젝트 재표시 확인

3. 오류 발생 시 확인할 API
   - `/api/config`
   - `/api/projects`

4. Supabase Table Editor 확인
   - `detail_page_projects` 테이블 생성 여부
   - `payload` jsonb 저장 여부
   - `saved_at` 최신순 정렬 여부

## 4. 수정 금지 또는 주의 영역

1. 이미지 생성 안정화 로직은 건드리지 않는다.
   - `src/app/api/generate/route.ts`
   - `src/app/api/edit-section/route.ts`

2. OpenAI/Gemini API 키 입력 방식은 유지한다.
   - 사용자가 그때그때 입력하는 구조다.

3. `redesign-wizard.tsx`는 큰 파일이므로 수정 범위를 작게 유지한다.

4. DB 저장 실패가 생성 실패로 이어지면 안 된다.
   - 저장 실패 시 브라우저 저장소만 사용하게 해야 한다.

## 5. 필요한 환경변수

필수:

```env
DATABASE_URL="Supabase Postgres connection string"
```

권장:

```env
PROJECTS_STORAGE_KEY="마스터가 정한 프로젝트 저장 키"
```

맞춤형 Data 설정 RAG까지 사용할 경우:

```env
OPENAI_API_KEY="서버 RAG 임베딩용 OpenAI 키"
KNOWLEDGE_ACCESS_KEYS="사용자 접근 키"
KNOWLEDGE_ADMIN_KEY="운영자 관리 키"
```

## 6. 성공 기준

1. 빌드 성공
2. Supabase에 `detail_page_projects` 테이블 자동 생성
3. 생성 결과 저장 시 DB에 row 추가
4. 새로고침 후 DB 저장 프로젝트가 홈보드에 다시 표시
5. 삭제 시 브라우저 저장소와 DB에서 같이 삭제

## 7. 2차 개선 후보

1. 이미지 파일을 DB JSON에 직접 저장하지 않고 Supabase Storage에 저장
2. DB에는 이미지 URL 또는 storage path만 저장
3. 사용자 로그인 추가
4. 사용자별 프로젝트 목록 분리
5. 프로젝트 검색, 태그, 즐겨찾기 기능 추가

# Phoenix Detail Page 버전별 업그레이드 로드맵

## 1. 문서 목적

이 문서 묶음은 Phoenix detail page를 수강생이 단계별로 따라 만들고, 실제 운영 서비스로 확장하기 위한 버전 관리 문서다.

각 버전은 반드시 아래 2개 문서를 가진다.

1. `v번호(목적)_코덱스용 작업지시서.md`
   - 코덱스에게 그대로 전달해 작업을 진행할 수 있는 구현 지시서다.
   - 구현 범위, 수정 파일, 금지 사항, 검증 명령, 성공 기준을 포함한다.

2. `v번호(목적)_유저용 작업확인서.md`
   - 입문자 유저가 화면을 보며 하나씩 확인할 수 있는 체크 문서다.
   - 메뉴 이름, 클릭 순서, 입력값, 성공 메시지, 실패 시 점검 항목을 자세히 적는다.

## 2. 버전 구조

| 버전 | 이름 | 목적 | 최종 상태 |
| --- | --- | --- | --- |
| V0 | 초기구축 | 아무것도 없는 상태에서 현재 기본 사이트까지 구축 | 공개형 상세페이지 생성/편집/저장/다운로드 사이트 |
| V1 | 피닉스클라우드저장 | 로그인/유료 유저용 클라우드 저장 | Phoenix Supabase Storage + Database 저장 |
| V2 | 유저수파베이스연결 | 고급 유저용 자기 Supabase 연결 | 유저 본인 Supabase에 이미지/프로젝트 저장 |

## 3. 운영 철학

Phoenix detail page는 처음부터 모든 유저 데이터를 우리 서버에 저장하지 않는다.

기본 운영은 아래 방식이다.

```text
기본 유저:
브라우저 저장 + 로컬 다운로드
```

이 방식은 공개형 사이트에 가장 안전하다.
유저가 자기 OpenAI 또는 Google API 키를 넣어 생성하고, 결과는 자기 브라우저와 로컬 PC에 저장한다.

이후 필요에 따라 아래 방식으로 확장한다.

```text
로그인/유료 유저:
Phoenix Supabase Storage + Database 저장

고급 유저:
자기 Supabase 연결 옵션
```

## 4. 버전별 핵심 작업

### V0 초기구축

V0는 빈 프로젝트에서 현재 기본 사이트까지 만드는 과정이다.

V0에 포함되는 기능:

1. Next.js 프로젝트 구성
2. 메인 입장 페이지
3. Phoenix 로고와 파비콘 적용
4. `/studio` 작업 화면
5. API 키 설정
6. 상세페이지 이미지/PDF 업로드
7. OpenAI Image 2.0 생성
8. Google Nano Banana 2 생성
9. 맞춤형 Data 설정 기본 구조
10. 결과 이미지 다운로드
11. 브라우저 IndexedDB 저장
12. 섹션별 개별 편집
13. 개별 편집 안정화
14. AI 멘트 생성
15. GitHub/Vercel 배포 가능 상태

V0의 중요한 안정화 기준:

```text
개별 편집 요청은 JSON base64 방식이 아니라 FormData 파일 업로드 방식으로 보낸다.
```

### V1 피닉스클라우드저장

V1은 로그인 또는 유료 유저가 Phoenix의 Supabase에 프로젝트를 저장하는 단계다.

핵심 구조:

```text
Supabase Storage = 생성/편집 이미지 파일 저장
Supabase Database = 프로젝트명, 이미지 URL, 유저 정보, 생성 기록 저장
```

V1에서는 일반 공개 유저의 모든 이미지를 무조건 저장하지 않는다.
로그인/유료 유저만 클라우드 저장을 사용한다.

### V2 유저수파베이스연결

V2는 고급 유저가 자기 Supabase 프로젝트를 연결하는 단계다.

핵심 구조:

```text
Phoenix 사이트 = 생성/편집 도구
고급 유저 Supabase = 이미지와 프로젝트 저장소
```

이 단계는 입문자 기본 기능이 아니라 기업, 대행사, 강사, 고급 유저용 옵션이다.

## 5. 문서 경로

```text
docs/upgrade-roadmap/README.md
docs/upgrade-roadmap/v0-from-scratch-to-current/v0(초기구축)_코덱스용 작업지시서.md
docs/upgrade-roadmap/v0-from-scratch-to-current/v0(초기구축)_유저용 작업확인서.md
docs/upgrade-roadmap/v1-phoenix-cloud-save/v1(피닉스클라우드저장)_코덱스용 작업지시서.md
docs/upgrade-roadmap/v1-phoenix-cloud-save/v1(피닉스클라우드저장)_유저용 작업확인서.md
docs/upgrade-roadmap/v2-user-supabase-option/v2(유저수파베이스연결)_코덱스용 작업지시서.md
docs/upgrade-roadmap/v2-user-supabase-option/v2(유저수파베이스연결)_유저용 작업확인서.md
```

## 6. 보류 문서

기존 `편집안정화` 문서는 별도 버전으로 두면 수강생이 헷갈릴 수 있어 active 버전에서 제외했다.
핵심 내용은 V0에 흡수했다.

참고용 보류 경로:

```text
docs/upgrade-roadmap/_hold-v1-stable-edit-formdata
```

## 7. 작업 원칙

1. V0는 공개형 기본 사이트 완성이 목표다.
2. V0에서는 로그인과 DB 저장을 넣지 않는다.
3. V1에서 Phoenix Supabase 저장을 붙인다.
4. V2에서 고급 유저 자기 Supabase 연결을 붙인다.
5. 유저 API 키는 서버 DB에 저장하지 않는다.
6. 이미지 저장 비용이 발생하는 기능은 로그인/유료/고급 옵션으로 분리한다.

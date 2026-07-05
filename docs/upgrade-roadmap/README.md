# Phoenix Detail Page 업그레이드 로드맵

## 1. 문서 목적

이 폴더는 Phoenix detail page가 현재 V0 공개 서비스에서 클라우드 저장, 결제/크레딧, 텔레그램 봇 자동화까지 확장되는 전체 제품 로드맵을 관리한다.

각 주요 버전은 아래 2개 문서를 가진다.

1. `코덱스용 작업지시서`
   - 코덱스가 구현할 범위, 수정 파일, 금지 사항, 검증 기준을 정리한다.

2. `유저용 작업확인서`
   - 마스터 또는 수강생 유저가 화면을 보면서 하나씩 확인할 체크리스트를 정리한다.

## 2. 현재 버전 정의

| 버전 | 이름 | 목표 | 실행 가능 여부 |
| --- | --- | --- | --- |
| V0 | 초기 구축 | 현재 운영 중인 기본 상세페이지 생성 서비스. 브라우저 저장, 로컬 다운로드, 개별 편집, 페이지 추가 생성까지 포함 | 가능. 현재 V0.1.2 수준으로 개선 진행 중 |
| V1 | phoenix cloud 저장 | Supabase DB/Storage, Google 로그인, 슈퍼 관리자/일반 유저 권한 분리 | 가능. Supabase Auth, RLS, Storage 정책 설계 필요 |
| V1.5 | 결제/크레딧 | Toss 결제 연동, 결제 금액별 크레딧 지급, 무료 크레딧, 사용량 차감 | 가능. 결제 승인/웹훅/크레딧 원장 설계 필요 |
| V2 | Design bot 텔레그램 자동화 | 로컬 OpenClaw Design bot이 웹사이트를 컨트롤해 상세페이지를 만들고 텔레그램으로 결과 전달 | 가능. Design bot 실행 경로, 토큰, 브라우저 제어 방식 확인 필요 |
| V3 | Genesis bot 지휘 자동화 | Genesis bot이 Design bot을 지휘하고, Design bot이 웹사이트를 조작해 결과를 텔레그램으로 전달 | 가능. 봇 간 명령 프로토콜과 작업 상태 관리 필요 |

## 3. V0 현재 상태 판단

현재 V0는 공개형 상세페이지 생성 도구로는 상위 수준까지 정리된 상태다.

V0에 포함되는 기능:

1. 메인 입장 페이지
2. `/studio` 작업 화면
3. OpenAI Image 2.0 생성
4. Google Nano Banana 2 생성
5. 유저별 API 키 직접 입력
6. 업로드 이미지/PDF 기반 상세페이지 생성
7. 1장, 4장, 8장 생성
8. 9:16, 1:1, 4:5 출력 비율
9. 최대 12장까지 페이지 추가 생성
10. 개별 페이지 편집
11. AI 멘트 생성
12. 브라우저 IndexedDB 저장
13. 결과 ZIP 다운로드
14. V0에서는 `나머지 섹션 만들기` 숨김, `페이지 추가 생성` 유지

단, V0는 DB/Storage/로그인이 없는 공개형 구조이므로 클라우드 프로젝트 관리, 유저별 권한, 결제 크레딧, 원격 봇 자동화는 V1 이후에서 담당한다.

## 4. 버전별 핵심 설계

### V1 phoenix cloud 저장

```text
Supabase Auth = Google 로그인
Supabase Storage = 생성/편집 이미지 파일 저장
Supabase Database = 프로젝트, 이미지 URL, 유저 정보, 권한 정보 저장
```

권한:

1. 슈퍼 관리자
   - 모든 유저, 모든 프로젝트, 전체 사용량 확인
   - 유저 권한 변경
   - 문제 프로젝트 삭제 또는 복구

2. 일반 유저
   - 본인 프로젝트만 확인
   - 본인 이미지와 저장 내역만 관리

### V1.5 결제/크레딧

```text
Toss 결제 = 결제 승인
Webhook = 결제 성공/실패/취소 반영
Credit ledger = 크레딧 지급/사용/환불 기록
Usage log = 이미지 생성 및 편집 사용량 기록
```

V1.5는 V1의 로그인과 DB가 전제다. 결제 시스템은 DB 없이 안정적으로 운영하기 어렵다.

### V2 Design bot 텔레그램 자동화

```text
Telegram 명령
→ Design bot
→ Phoenix detail page 웹사이트 접속
→ 파일/프롬프트 입력
→ 생성/다운로드
→ 결과물을 Telegram으로 전달
```

V2는 로컬 OpenClaw Design bot이 실제 웹사이트를 컨트롤하는 단계다. V1/V1.5가 있으면 로그인, 저장, 크레딧 차감까지 자동화할 수 있어 안정성이 높다.

### V3 Genesis bot 지휘 자동화

```text
마스터가 Genesis bot에게 요청
→ Genesis bot이 작업 분석 및 지시
→ Design bot에게 구조화된 작업 전달
→ Design bot이 Phoenix detail page 조작
→ 결과를 Telegram으로 반환
→ Genesis bot이 완료 보고
```

V3는 Design bot을 직접 부르는 것이 아니라 Genesis bot이 비서실장처럼 업무를 분배하고 추적하는 구조다.

## 5. 별도 보관 문서

아래 문서는 과거 V2 계획이었던 `유저 개인 Supabase 연결` 문서다. 현재 새 V2는 Design bot 텔레그램 자동화로 재정의되었으므로, 이 문서는 삭제하지 않고 고급 옵션 후보로 보류한다.

```text
docs/_archive-storage/v2-user-supabase-option
```

나중에 필요하면 `V4 user supabase 연결` 또는 `고급 저장 옵션`으로 다시 편입한다.

## 6. 문서 경로

```text
docs/upgrade-roadmap/README.md

docs/upgrade-roadmap/v0-from-scratch-to-current/v0(초기구축)_코덱스용 작업지시서.md
docs/upgrade-roadmap/v0-from-scratch-to-current/v0(초기구축)_유저용 작업확인서.md

docs/upgrade-roadmap/v1-phoenix-cloud-save/v1(피닉스클라우드저장)_코덱스용 작업지시서.md
docs/upgrade-roadmap/v1-phoenix-cloud-save/v1(피닉스클라우드저장)_유저용 작업확인서.md

docs/upgrade-roadmap/v1.5-credit-payments/v1.5(결제크레딧)_코덱스용 작업지시서.md
docs/upgrade-roadmap/v1.5-credit-payments/v1.5(결제크레딧)_유저용 작업확인서.md

docs/upgrade-roadmap/v2-design-bot-telegram/v2(Design봇텔레그램자동화)_코덱스용 작업지시서.md
docs/upgrade-roadmap/v2-design-bot-telegram/v2(Design봇텔레그램자동화)_유저용 작업확인서.md

docs/upgrade-roadmap/v3-genesis-design-orchestration/v3(Genesis봇지휘자동화)_코덱스용 작업지시서.md
docs/upgrade-roadmap/v3-genesis-design-orchestration/v3(Genesis봇지휘자동화)_유저용 작업확인서.md
```

## 7. 운영 원칙

1. V0 기능은 V1에서 깨지면 안 된다.
2. V1은 저장과 권한을 추가하되, 비로그인 유저의 기존 생성/다운로드 흐름을 유지한다.
3. V1.5는 크레딧 차감 실패가 이미지 생성 중복 결제로 이어지지 않도록 원장 방식으로 설계한다.
4. V2/V3 봇 자동화는 웹 UI 변경에 취약하므로 안정적인 테스트 ID, 버튼 라벨, API 자동화 경로를 함께 설계한다.
5. V1 완성 시 V0에서 숨긴 `나머지 섹션 만들기`, `페이지 추가 생성`, `생성 페이지` 메뉴 정책을 다시 검토한다.

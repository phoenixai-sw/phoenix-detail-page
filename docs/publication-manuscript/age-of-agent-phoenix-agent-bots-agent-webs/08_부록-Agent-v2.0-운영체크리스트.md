# 부록: Agent v2.0 운영 체크리스트

## 1. 이 부록의 목적

이 부록은 Phoenix Agent v2.0을 설치하거나 운영할 때 확인해야 할 항목을 한곳에 모은 문서다.

본문이 개념과 흐름을 설명한다면, 이 부록은 실제 운영자가 체크박스처럼 사용할 수 있는 기준을 제공한다.

입문자는 모든 항목을 한 번에 이해할 필요는 없다. 문제가 생겼을 때 이 부록을 열고, 위에서 아래로 하나씩 확인하면 된다.

## 2. v1.9 보존 체크리스트

Phoenix Agent v2.0은 v1.9 안정 기능을 깨지 않는 것이 우선이다.

확인 항목:

1. 기존 Telegram token이 보존되는가?
2. 기존 Telegram chat id가 보존되는가?
3. 기존 outputs 폴더가 삭제되지 않았는가?
4. 기존 logs 폴더가 삭제되지 않았는가?
5. 기존 PCS/PTS 스킬 파일이 보존되는가?
6. 기존 모델 인증 방식이 강제로 바뀌지 않았는가?
7. PM2 프로세스가 online 상태인가?
8. OpenClaw gateway health가 정상인가?
9. config validate가 통과하는가?
10. proactive 자동 메시지 구조가 남아 있는가?

운영 원칙:

```text
v2.0은 v1.9를 갈아엎는 버전이 아니다.
v1.9 위에 web control skill을 추가하는 버전이다.
```

## 3. agent web 준비 체크리스트

각 agent web은 사람이 직접 사용할 수 있어야 하고, 봇도 조작할 수 있어야 한다.

확인 항목:

1. 로그인 URL이 명확한가?
2. 로그인 상태 확인 방법이 있는가?
3. 세션 만료 시 안내가 나오는가?
4. 주요 입력창에 `data-testid`가 있는가?
5. 주요 버튼에 `data-testid`가 있는가?
6. 파일 업로드 성공/실패가 표시되는가?
7. 생성 중 상태가 표시되는가?
8. 실패 상태가 표시되는가?
9. 재시도 방법이 안내되는가?
10. 결과 미리보기가 있는가?
11. 결과 다운로드 버튼이 있는가?
12. 결과 파일명이 예측 가능한가?
13. 민감값이 화면에 노출되지 않는가?
14. 민감값이 로그에 노출되지 않는가?

## 4. 봇별 담당 웹 체크리스트

### Genesis Bot

담당:

```text
phoenix command
```

확인 항목:

1. 마스터 요청을 분석하는가?
2. 필요한 정보를 질문하는가?
3. 작업을 task 단위로 나누는가?
4. 전문 봇에게 task를 전달하는가?
5. 상태를 추적하는가?
6. 최종 결과를 보고하는가?
7. 전문 agent web을 직접 조작하지 않는가?

### Design Bot

담당:

```text
phoenix pages
phoenix slides
phoenix webs
phoenix images
```

확인 항목:

1. 상세페이지 생성 웹을 이해하는가?
2. PPT 생성 웹을 이해하는가?
3. 랜딩페이지/HTML 생성 웹을 이해하는가?
4. 제품컷/목업/썸네일/카드뉴스 생성 웹을 이해하는가?
5. 결과 다운로드를 수행하는가?
6. outputs 저장을 안내하는가?
7. Telegram 전송 전에 물어보는가?

### Writer Bot

담당:

```text
phoenix books
```

확인 항목:

1. 강의교안 생성을 이해하는가?
2. SNS 카피 생성을 이해하는가?
3. 출판 원고 초안 생성을 이해하는가?
4. DOCX/PDF/text 결과물을 구분하는가?
5. outputs 저장을 안내하는가?

### Video Bot

담당:

```text
phoenix videos
```

확인 항목:

1. 영상 목적을 먼저 정리하는가?
2. 장면/스토리보드 생성을 안내하는가?
3. 영상 생성 전 비용 또는 크레딧 사용 여부를 묻는가?
4. MP4 다운로드를 확인하는가?
5. Telegram 또는 Cloud 링크 전송 전에 물어보는가?

### Power Bot

담당:

```text
phoenix reports
phoenix tax
phoenix dental
phoenix marketing
```

확인 항목:

1. 리서치/보고서 생성을 이해하는가?
2. 세무 상담은 일반 정보 기준으로 안내하는가?
3. 치과 상담은 일반 정보 기준으로 안내하는가?
4. AI 검색 마케팅 대시보드 조작을 이해하는가?
5. 고위험 정보에는 전문가 확인 안내를 포함하는가?

## 5. 구조화 task 체크리스트

Genesis Bot이 전문 봇에게 task를 넘길 때 확인할 항목이다.

필수 항목:

1. `jobId`
2. `taskId`
3. `requester`
4. `targetBot`
5. `targetWebsite`
6. `action`
7. `priority`
8. `requiresApproval`
9. `inputs`
10. `delivery`

금지 항목:

1. API key
2. Telegram token
3. OAuth credential
4. raw `.env` 값
5. private chat id

나쁜 예:

```text
Design Bot, 이거 만들어줘.
```

좋은 예:

```text
jobId, taskId, targetBot, targetWebsite, action, inputs, delivery가 포함된 task로 전달한다.
```

## 6. 승인 정책 체크리스트

아래 작업은 반드시 마스터 승인을 받는다.

1. 영상 생성
2. 유료 크레딧 사용
3. 외부 공개 배포
4. 세무 상담 결과 전달
5. 치과 상담 결과 전달
6. 프로젝트 삭제
7. 여러 agent web 동시 실행
8. 대량 파일 생성
9. 대량 파일 삭제

승인 문구 예시:

```text
이 작업은 비용이 발생하거나 외부에 공개될 수 있습니다.
진행할까요?

1. 진행
2. 중단
3. 초안만 먼저 작성
```

## 7. outputs와 Telegram 체크리스트

결과물 처리 기준:

1. 결과물은 먼저 로컬 `outputs`에 저장한다.
2. 저장 경로를 안내한다.
3. 파일이 여러 개면 ZIP으로 묶을 수 있다.
4. Telegram 전송은 유저에게 묻고 진행한다.
5. 파일이 크면 Cloud 링크를 고려한다.
6. 전송 실패와 생성 실패를 구분한다.

권장 안내 문구:

```text
결과물은 로컬 outputs 폴더에 저장했습니다.
텔레그램으로도 결과물을 보실래요?
```

## 8. 장애 대응 체크리스트

오류가 발생하면 아래 순서대로 확인한다.

1. Telegram 봇이 답장하는가?
2. token 파일이 맞는가?
3. chat id 파일이 맞는가?
4. pairing code 승인이 필요한가?
5. PM2가 online인가?
6. OpenClaw gateway health가 정상인가?
7. config validate가 통과하는가?
8. agent web URL이 맞는가?
9. agent web 로그인 세션이 살아 있는가?
10. API key가 필요한 작업인데 키가 빠지지 않았는가?
11. Playwright MCP가 브라우저를 열 수 있는가?
12. `data-testid`가 바뀌지 않았는가?
13. outputs 폴더에 파일이 저장되었는가?
14. Telegram 전송만 실패한 것인가?
15. 생성 자체가 실패한 것인가?

## 9. 출판 원고용 안전 문장

책에는 아래 문장을 반복해서 넣어도 좋다.

```text
실제 token, API key, OAuth credential은 절대 원고나 강의자료에 적지 않는다.
```

```text
세무와 의료 관련 결과는 일반 정보이며, 최종 판단은 전문가 확인이 필요하다.
```

```text
외부 공개, 비용 발생, 삭제 작업은 마스터 승인 후 진행한다.
```

```text
Agent Webs는 사람이 쓰는 화면이자, 봇이 일하는 작업장이다.
```

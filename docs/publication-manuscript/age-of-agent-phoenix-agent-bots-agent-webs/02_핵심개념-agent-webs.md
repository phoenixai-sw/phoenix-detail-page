# 핵심 개념: agent webs

## 1. 한 문장 정의

`agent webs`는 사람이 직접 사용할 수도 있고, 에이전트 봇이 대신 컨트롤할 수도 있도록 설계된 웹사이트다.

## 2. 기존 웹사이트와의 차이

기존 웹사이트:

```text
사람이 접속
→ 사람이 입력
→ 사람이 클릭
→ 사람이 다운로드
```

agent webs:

```text
사람이 직접 사용할 수도 있음
또는
에이전트 봇이 접속
→ 봇이 입력
→ 봇이 클릭
→ 봇이 결과 확인
→ 봇이 다운로드
→ 봇이 사람에게 보고
```

## 3. phoenix command

여러 agent web이 생기면 지휘 웹이 필요하다.

`phoenix command`는 Phoenix 시스템의 최상위 agent web이다.

역할:

1. 작업 등록
2. 봇 배정
3. 상태 추적
4. 결과물 모음
5. 승인/크레딧 확인
6. 실패 작업 재시도

## 4. Phoenix의 agent webs

```text
phoenix command   = 지휘/상태 관리 웹
phoenix pages     = 상세페이지 생성 웹
phoenix slides    = PPT 생성 웹
phoenix videos    = 영상 생성 웹
phoenix reports   = 리서치/보고서 생성 웹
phoenix webs      = 웹사이트/랜딩페이지 HTML 생성 웹
phoenix books     = 강의교안/SNS 카피라이팅 생성 웹
phoenix images    = 제품 목업/제품컷/카드뉴스/썸네일 생성 웹
phoenix tax       = 양도소득세/세무사 정보 및 채팅 상담 웹
phoenix dental    = 치아관리/치과병원 정보 및 채팅 상담 웹
phoenix marketing = AI 검색 순위/인용 정보/예상 질문 대시보드 및 채팅 상담 웹
```

## 5. 봇과 웹의 연결

```text
Genesis Bot → phoenix command
Design Bot  → phoenix pages
Design Bot  → phoenix slides
Design Bot  → phoenix webs
Design Bot  → phoenix images
Writer Bot  → phoenix books
Video Bot   → phoenix videos
Power Bot   → phoenix reports
Power Bot   → phoenix tax
Power Bot   → phoenix dental
Power Bot   → phoenix marketing
```

## 6. 중요한 설계 기준

agent webs가 되려면 아래 조건이 필요하다.

1. 사람이 쓰기 쉬운 화면
2. 봇이 찾기 쉬운 버튼과 입력창
3. 안정적인 다운로드
4. 작업 상태 확인
5. 실패 메시지
6. 보안 처리
7. 결과물 저장
8. API 또는 자동화 식별자
9. 전문가 영역의 안전 표현

## 7. 출판용 핵심 문장

```text
에이전트 시대의 웹사이트는 사람만을 위한 화면이 아니다.
웹사이트는 이제 봇이 접속하고, 판단하고, 실행하고, 상담하고, 보고하는 작업장이 된다.
그리고 그 작업장들을 지휘하는 최상위 웹이 phoenix command다.
```

# 강의형 워크북과 연습문제

## 1. 이 문서의 목적

이 문서는 출판 원고를 강의나 워크숍으로 확장할 때 사용할 실습 자료다.

독자는 책을 읽는 것에서 끝나지 않고, 직접 손으로 따라 하며 Phoenix Agent Bots와 Agent Webs 구조를 이해한다.

## 2. 워크북 사용 방법

각 실습은 아래 구조로 진행한다.

1. 학습 목표
2. 준비물
3. 따라 하기
4. 성공 기준
5. 자주 막히는 지점
6. 스스로 점검하기
7. 확장 과제

강사는 이 워크북을 수업 자료로 사용할 수 있고, 독자는 자습 노트로 사용할 수 있다.

## 3. 실습 A: agent web 개념 설명하기

학습 목표:

```text
일반 웹사이트와 agent web의 차이를 자기 말로 설명한다.
```

따라 하기:

1. 일반 웹사이트의 예를 하나 적는다.
2. 그 웹사이트를 사람이 어떻게 사용하는지 적는다.
3. 봇이 대신 사용하려면 어떤 요소가 필요할지 적는다.
4. `data-testid`가 필요한 버튼을 세 개 상상해본다.
5. 결과 저장 위치를 어디로 할지 적는다.

연습 질문:

1. 사람이 보기 쉬운 웹과 봇이 조작하기 쉬운 웹은 어떻게 다른가?
2. 버튼 문구만 있으면 왜 봇 자동화가 불안정할 수 있는가?
3. `data-testid`는 누구를 위한 이름표인가?
4. 실패 상태가 화면에 표시되지 않으면 어떤 문제가 생기는가?

모범 답안 방향:

agent web은 사람이 쓰는 화면이면서 봇이 조작할 수 있는 구조를 가진 웹이다. 봇은 화면을 사람처럼 직관적으로 해석하지 못하므로 안정적인 선택자, 상태 표시, 결과 다운로드 기준이 필요하다.

## 4. 실습 B: GitHub 저장소 받기

학습 목표:

```text
GitHub 저장소를 내 컴퓨터로 가져오는 방법을 이해한다.
```

준비물:

1. GitHub 계정
2. GitHub Desktop
3. 인터넷 연결
4. 저장소 URL

따라 하기:

1. GitHub Desktop을 실행한다.
2. `File > Clone Repository`를 누른다.
3. URL 탭을 선택한다.
4. 저장소 URL을 넣는다.
5. Local Path를 선택한다.
6. Clone을 누른다.
7. 폴더 안에 `package.json`이 있는지 확인한다.

연습 질문:

1. clone과 ZIP 다운로드의 차이는 무엇인가?
2. GitHub Desktop을 쓰면 입문자에게 어떤 점이 쉬워지는가?
3. 저장소 URL을 잘못 넣으면 어떤 일이 생기는가?
4. clone한 폴더를 어디에 두는 것이 관리하기 좋은가?

## 5. 실습 C: phoenix pages 배포 계획 세우기

학습 목표:

```text
phoenix pages를 Vercel에 배포하기 전 필요한 조건을 정리한다.
```

준비할 항목:

1. GitHub 저장소 연결
2. Vercel 계정
3. 환경변수
4. 빌드 명령
5. Production URL 확인
6. 생성 기능 테스트 계획

작성 과제:

아래 표를 채운다.

| 항목 | 내 설정 |
| --- | --- |
| 저장소 URL |  |
| 배포 플랫폼 | Vercel |
| 로컬 실행 명령 |  |
| 빌드 명령 |  |
| 필요한 환경변수 |  |
| 배포 후 테스트 |  |

점검 질문:

1. 환경변수를 GitHub에 올리면 안 되는 이유는 무엇인가?
2. 로컬에서는 되는데 배포에서는 안 되는 경우 무엇을 확인해야 하는가?
3. Vercel의 Preview와 Production은 어떻게 구분할 수 있는가?

## 6. 실습 D: Netlify 배포 계획 세우기

학습 목표:

```text
phoenix pages가 아닌 agent web을 Netlify에 배포하는 기준을 이해한다.
```

대상 예시:

1. phoenix images
2. phoenix command
3. phoenix slides
4. phoenix webs
5. phoenix books
6. phoenix reports

따라 하기:

1. Netlify 계정을 준비한다.
2. GitHub 저장소를 연결한다.
3. Build command를 확인한다.
4. Publish directory를 확인한다.
5. 환경변수를 입력한다.
6. 배포 후 URL을 확인한다.

연습 질문:

1. Netlify는 어떤 유형의 웹에 잘 맞는가?
2. 장시간 생성 작업은 왜 별도 구조가 필요할 수 있는가?
3. 환경변수 scope는 왜 확인해야 하는가?
4. 배포 후 바로 운영하지 말고 테스트해야 하는 이유는 무엇인가?

## 7. 실습 E: Telegram 봇 만들기

학습 목표:

```text
BotFather를 사용해 봇 token을 발급받고 안전하게 보관한다.
```

따라 하기:

1. Telegram에서 `@BotFather`를 찾는다.
2. `/newbot`을 입력한다.
3. 봇 이름을 입력한다.
4. 봇 username을 입력한다.
5. token을 복사한다.
6. `telegram_access_token.txt`에 넣을 값을 준비한다.
7. 실제 token은 원고나 수업 자료에 적지 않는다.

연습 질문:

1. BotFather는 어떤 역할인가?
2. token은 왜 비밀번호처럼 다뤄야 하는가?
3. bot username이 이미 사용 중이면 어떻게 해야 하는가?
4. token과 chat id는 어떻게 다른가?

## 8. 실습 F: 봇별 역할 나누기

학습 목표:

```text
Genesis Bot, Design Bot, Writer Bot, Video Bot, Power Bot의 역할을 구분한다.
```

분류 과제:

아래 작업을 담당 봇에 연결한다.

1. 상세페이지 생성
2. SNS 카피 작성
3. 15초 숏폼 영상 생성
4. 고객사 AI 검색 순위 분석
5. 전체 작업을 task로 나누기
6. 제품 썸네일 생성
7. 치과 상담형 문서 생성
8. 강의교안 DOCX 생성

정답 방향:

1. 상세페이지 생성: Design Bot
2. SNS 카피 작성: Writer Bot
3. 15초 숏폼 영상 생성: Video Bot
4. 고객사 AI 검색 순위 분석: Power Bot
5. 전체 작업을 task로 나누기: Genesis Bot
6. 제품 썸네일 생성: Design Bot
7. 치과 상담형 문서 생성: Power Bot
8. 강의교안 DOCX 생성: Writer Bot

## 9. 실습 G: 구조화 task 만들기

학습 목표:

```text
자연어 요청을 구조화 task로 바꿔본다.
```

자연어 요청:

```text
이 제품으로 썸네일 이미지를 만들어줘. 결과는 저장하고 텔레그램으로 보낼지 물어봐줘.
```

작성 예시:

```json
{
  "jobId": "job_practice_001",
  "taskId": "task_001",
  "requester": "genesis",
  "targetBot": "design",
  "targetWebsite": "phoenix-images",
  "action": "create_product_thumbnail",
  "priority": "normal",
  "requiresApproval": false,
  "inputs": {
    "product": "practice product",
    "purpose": "thumbnail",
    "format": "png"
  },
  "delivery": {
    "outputs": true,
    "telegramAskFirst": true,
    "cloudSave": false,
    "zip": false
  }
}
```

연습 질문:

1. `jobId`와 `taskId`는 왜 필요한가?
2. `targetBot`과 `targetWebsite`를 구분해야 하는 이유는 무엇인가?
3. `telegramAskFirst`가 필요한 이유는 무엇인가?
4. task payload에 API key를 넣으면 안 되는 이유는 무엇인가?

## 10. 실습 H: 승인 정책 판단하기

학습 목표:

```text
자동으로 실행해도 되는 작업과 승인 후 실행해야 하는 작업을 구분한다.
```

판단 문제:

1. 상세페이지 초안 생성
2. 15초 영상 생성
3. 프로젝트 삭제
4. 결과물 ZIP 다운로드
5. 세무 상담 결과를 유저에게 전달
6. 유료 크레딧을 사용하는 이미지 생성
7. outputs 폴더 경로 안내
8. 여러 agent web을 동시에 실행

정답 방향:

승인 필요:

1. 15초 영상 생성
2. 프로젝트 삭제
3. 세무 상담 결과 전달
4. 유료 크레딧 사용
5. 여러 agent web 동시 실행

승인 없이 가능할 수 있는 작업:

1. 상세페이지 초안 생성
2. 결과물 ZIP 다운로드
3. outputs 폴더 경로 안내

단, 실제 운영 정책에 따라 초안 생성도 비용이 발생한다면 승인 대상으로 바꿀 수 있다.

## 11. 실습 I: 오류 보고서 쓰기

학습 목표:

```text
오류가 났을 때 개발자와 운영자가 이해할 수 있게 상황을 정리한다.
```

오류 보고 양식:

```text
어떤 봇:
어떤 agent web:
어떤 작업:
어디까지 성공:
어디서 실패:
화면 메시지:
outputs 파일 생성 여부:
Telegram 전송 여부:
승인 필요 작업 여부:
```

연습 상황:

```text
Design Bot이 phoenix pages에서 상세페이지를 생성하다가 다운로드 전에 실패했다.
화면에는 타임아웃 메시지가 보였다.
outputs 폴더에는 파일이 없었다.
```

작성 예시:

```text
어떤 봇: Design Bot
어떤 agent web: phoenix pages
어떤 작업: 상세페이지 생성
어디까지 성공: 업로드 성공, 생성 시작
어디서 실패: 다운로드 전 타임아웃
화면 메시지: 이미지 생성 응답 시간이 초과되었습니다
outputs 파일 생성 여부: 없음
Telegram 전송 여부: 전송 전
승인 필요 작업 여부: 해당 없음
```

## 12. 최종 과제

아래 과제를 완료하면 이 워크북의 기본 실습은 끝난다.

1. agent web의 정의를 세 문장으로 설명한다.
2. GitHub 저장소를 clone하거나 ZIP으로 다운로드한다.
3. 로컬에서 프로젝트를 실행한다.
4. Vercel 또는 Netlify 배포 계획표를 작성한다.
5. BotFather로 봇을 만드는 절차를 설명한다.
6. 봇별 역할을 구분한다.
7. 구조화 task 예시를 하나 만든다.
8. 승인 필요한 작업을 다섯 개 이상 말한다.
9. 오류 보고서를 작성한다.
10. outputs 저장과 Telegram 선택 전송의 차이를 설명한다.

## 13. 강사용 진행 팁

강사는 처음부터 모든 기술을 설명하지 않아도 된다.

권장 순서:

1. agent web 개념을 먼저 설명한다.
2. `phoenix pages`를 예시로 보여준다.
3. GitHub에서 파일을 받는 장면을 보여준다.
4. 로컬 실행과 배포를 나눈다.
5. Telegram 봇 생성을 별도 실습으로 진행한다.
6. 마지막에 봇별 역할과 구조화 task를 설명한다.

중요한 점은 독자가 “한 번에 모든 것을 완성해야 한다”고 느끼지 않게 하는 것이다.

Phoenix 시스템은 단계적으로 확장된다.

```text
웹 하나 이해
→ 배포 이해
→ 봇 하나 연결
→ outputs 저장 이해
→ 여러 봇과 여러 웹으로 확장
```

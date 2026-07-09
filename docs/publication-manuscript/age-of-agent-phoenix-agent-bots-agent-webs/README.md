# age of agent - phoenix agent bots & agent webs

## 1. 문서 목적

이 폴더는 출판원고에 넣기 위한 원고 묶음이다.

현재 웹사이트 코드는 수정하지 않는다. 현재 구축된 `phoenix pages`는 V0 상태로 둔다. 다른 웹사이트와 봇도 지금 바로 만들지 않는다.

이 문서들은 앞으로 코딩 작업에 들어가기 전에, 독자에게 설명할 개념과 구조를 먼저 정리하기 위한 출판용 원고다.

## 2. 제목 의미

```text
age of agent - phoenix agent bots & agent webs
```

이 제목은 두 가지 축을 담고 있다.

1. Phoenix Agent Bots
   - Genesis Bot, Design Bot, Writer Bot, Video Bot, Power Bot처럼 역할을 가진 에이전트 봇들

2. Agent Webs
   - 사람이 직접 사용할 수도 있고, 에이전트 봇이 대신 컨트롤할 수도 있도록 설계된 생성형 웹사이트들

Phoenix 시스템은 단순히 봇만 만드는 것도 아니고, 웹사이트만 만드는 것도 아니다.

```text
사람이 쓰는 웹
+ 봇이 조작할 수 있는 웹
+ phoenix command에서 지휘되는 업무 구조
= agent webs
```

## 3. 출판원고 파일

```text
00_원고-개요.md
01_본문원고-age-of-agent-phoenix-agent-bots-agent-webs.md
02_핵심개념-agent-webs.md
03_장별-구성안.md
04_출판용-요약문.md
05_용어정리.md
06_실전-웹구축-배포-매뉴얼.md
07_Agent-v2.0-설치-텔레그램-컨트롤-매뉴얼.md
08_부록-Agent-v2.0-운영체크리스트.md
09_입문자용-실습시나리오.md
10_writer-model-brief.md
11_verified-research-notes.md
12_agent-web-sourcebook.md
13_bot-dialogue-promptbook.md
14_publication-safety-checklist.md
15_workbook-exercises.md
16_chapter-expansion-draft.md
17_implementation-deep-dive.md
18_case-studies.md
19_ai-writer-prompt-guide.md
20_publication-handoff-note.md
```

각 Markdown 원고는 같은 폴더에 `.docx` 파일로도 함께 생성한다.

## 4. 현재 기준

현재 기준은 아래와 같다.

1. `phoenix command`를 최상위 지휘 웹으로 정의한다.
2. `phoenix pages`는 V0 상태로 유지한다.
3. `phoenix slides`, `phoenix videos`, `phoenix reports`, `phoenix webs`, `phoenix books`, `phoenix images`, `phoenix tax`, `phoenix dental`, `phoenix marketing`은 아직 만들지 않는다.
4. Phoenix Agent Bot v2.0은 아직 만들지 않는다.
5. Agent Bot v2.0 설치 패키지는 Windows 11과 macOS 기준을 함께 다룬다.
6. 먼저 출판원고를 작성하고, 이후 코딩 작업으로 이어간다.

## 4.1 원고 업그레이드 기준

이번 원고 업그레이드는 아래 기준을 따른다.

1. 출판 원고만 수정한다.
2. 웹사이트 코드와 V0/V1/V2 구축 문서는 수정하지 않는다.
3. 독자 수준은 입문자용으로 유지한다.
4. 개념 설명보다 실습 가능한 절차, 체크리스트, 실패 대응을 강화한다.
5. Phoenix Agent v2.0 웹컨트롤형 최종 작업지시서의 기준을 반영한다.
6. Windows 11과 macOS 설치 흐름을 함께 설명한다.
7. 민감값, token, API key, OAuth credential은 원고에 실값으로 넣지 않는다.

## 5. 확정 입력 정보

이 출판 원고는 입문자용으로 작성한다. 독자가 GitHub 저장소에서 내려받고, 배포하고, Agent Bot을 연결하는 흐름을 따라 할 수 있어야 한다.

실제 존재하는 저장소:

| Agent Web | GitHub 저장소 | 배포 기준 |
| --- | --- | --- |
| phoenix pages | `https://github.com/phoenixai-sw/phoenix-detail-page.git` | Vercel |
| phoenix images | `https://github.com/phoenixai-sw/mock-up-image.git` | Netlify |
| phoenix dental | `https://github.com/phoenixai-sw/phoenixai_dentala.git` | Netlify |

예정 저장소:

| Agent Web | 담당 봇 | GitHub 저장소 | 배포 기준 |
| --- | --- | --- | --- |
| phoenix command | Genesis Bot | `https://github.com/phoenixai-sw/phoenix-command.git` | Netlify |
| phoenix slides | Design Bot | `https://github.com/phoenixai-sw/phoenix-slides.git` | Netlify |
| phoenix webs | Design Bot | `https://github.com/phoenixai-sw/phoenix-webs.git` | Netlify |
| phoenix books | Writer Bot | `https://github.com/phoenixai-sw/phoenix-books.git` | Netlify |
| phoenix videos | Video Bot | `https://github.com/phoenixai-sw/phoenix-videos.git` | Netlify |
| phoenix reports | Power Bot | `https://github.com/phoenixai-sw/phoenix-reports.git` | Netlify |
| phoenix tax | Power Bot | `https://github.com/phoenixai-sw/phoenix-tax.git` | Netlify |
| phoenix marketing | Power Bot | `https://github.com/phoenixai-sw/phoenix-marketing.git` | Netlify |

Phoenix Agent v2.0 설치 저장소:

```text
https://github.com/phoenixai-sw/phoenix-agents-camp.git
```

최종 Telegram 봇 username:

```text
genesis_bot
power_bot
design_bot
video_bot
writer_bot
```

## 6. 실전 원고 기준

출판용 원고는 개념 설명에서 끝나지 않고 아래 실전 흐름까지 다룬다.

1. 회사 GitHub 저장소에서 웹사이트 파일 받기
2. 로컬에서 웹사이트 실행하기
3. Vercel/Netlify에 배포하기
4. Phoenix Agent v2.0 설치하기
5. Telegram BotFather로 봇 만들기
6. Telegram token/chat id 연결하기
7. Agent Bot이 agent web을 컨트롤하는 방식 이해하기
8. 결과물을 outputs에 저장하고 필요 시 Telegram으로 전달하기
9. 승인 필요한 작업과 금지 사항 이해하기
10. 실패했을 때 확인 순서대로 점검하기

## 7. 이번 업그레이드에서 보강한 핵심

출판 원고에는 아래 내용을 추가로 반영한다.

1. `v2.0 = Web Control Agent`, `v2.2 = Master Builder Agent` 구분
2. `Playwright MCP`와 `data-testid`가 왜 필요한지에 대한 입문자용 설명
3. Genesis Bot이 직접 모든 웹을 조작하지 않고 전문 봇에게 task를 나누는 구조
4. 구조화 task payload의 의미
5. `outputs` 기본 저장과 Telegram 선택 전송 원칙
6. 마스터 승인 필요 작업
7. installer, updater, cleaner의 역할 차이
8. Windows 11/macOS 설치 후 검증 체크리스트


## 8. 집필 모델용 확장 자료

이번 확장에서는 GPT 5.5, Claude Opus 4.8, Fable이 원고를 이어 쓸 수 있도록 별도 소스 문서를 추가했다.

1. `10_writer-model-brief.md`: 집필 톤, 금지 사항, 장별 확장 방향
2. `11_verified-research-notes.md`: 공식 문서 기반 기술 근거
3. `12_agent-web-sourcebook.md`: agent web별 설명 자료
4. `13_bot-dialogue-promptbook.md`: 봇별 대화 예시와 프롬프트
5. `14_publication-safety-checklist.md`: 출판 전 검수 기준
6. `15_workbook-exercises.md
16_chapter-expansion-draft.md
17_implementation-deep-dive.md
18_case-studies.md
19_ai-writer-prompt-guide.md`: 강의와 워크숍용 실습 문제


## 9. 3배 확장용 추가 원고

원고 총량을 3배 이상으로 확장하기 위해 아래 자료를 추가했다.

1. `16_chapter-expansion-draft.md`: 장별 확장 문단 초안
2. `17_implementation-deep-dive.md`: GitHub, Vercel, Netlify, Telegram, Playwright MCP, Supabase 딥다이브
3. `18_case-studies.md`: agent web 운영 사례 연구
4. `19_ai-writer-prompt-guide.md`: GPT 5.5, Claude Opus 4.8, Fable 집필 프롬프트 지침
5. `20_publication-handoff-note.md`: 출판 원고 집필 모델에게 넘길 최종 인수인계 노트

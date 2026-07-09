# Phoenix V3 System 문서 묶음

## 1. 문서 목적

이 폴더는 Phoenix V3 시스템을 구축하기 위한 코딩 대기용 문서 묶음이다.

Phoenix V3는 하나의 웹사이트가 아니라, 여러 agent web과 Phoenix Agent Bot v2.0이 연결되는 업무 실행 시스템이다.

```text
마스터
→ Genesis Bot
→ phoenix command
→ 전문 봇
→ agent web
→ 결과물 생성
→ Telegram / Cloud / Dashboard 전달
```

## 2. 최상위 구조

`phoenix command`를 최상위 지휘 웹으로 둔다.

나머지 agent web은 `phoenix command` 아래에서 전문 봇이 컨트롤하는 실행 웹으로 배치한다.

## 3. 포함 웹사이트

이 문서의 독자 기준은 입문자용이다. 저장소 URL, 담당 봇, 배포 플랫폼을 한눈에 확인할 수 있도록 함께 관리한다.

| 순서 | 웹사이트 | 역할 | 컨트롤 봇 | GitHub 저장소 | 상태 | 배포 기준 |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | phoenix command | 전체 지휘/상태 관리 | Genesis Bot | `https://github.com/phoenixai-sw/phoenix-command.git` | 예정 | Netlify |
| 02 | phoenix pages | 상세 페이지 생성 | Design Bot | `https://github.com/phoenixai-sw/phoenix-detail-page.git` | 실제 존재 | Vercel |
| 03 | phoenix slides | PPT 생성 | Design Bot | `https://github.com/phoenixai-sw/phoenix-slides.git` | 예정 | Netlify |
| 04 | phoenix videos | 영상 생성 | Video Bot | `https://github.com/phoenixai-sw/phoenix-videos.git` | 예정 | Netlify |
| 05 | phoenix reports | 리서치/보고서 생성 | Power Bot | `https://github.com/phoenixai-sw/phoenix-reports.git` | 예정 | Netlify |
| 06 | phoenix webs | 웹사이트/랜딩페이지 HTML 생성 | Design Bot | `https://github.com/phoenixai-sw/phoenix-webs.git` | 예정 | Netlify |
| 07 | phoenix books | 강의교안/SNS 카피라이팅 생성 | Writer Bot | `https://github.com/phoenixai-sw/phoenix-books.git` | 예정 | Netlify |
| 08 | phoenix images | 제품 목업, 제품컷, 카드뉴스, 썸네일 생성 | Design Bot | `https://github.com/phoenixai-sw/mock-up-image.git` | 실제 존재 | Netlify |
| 09 | phoenix tax | 양도소득세/세무사 사무실 정보 및 채팅 상담 | Power Bot | `https://github.com/phoenixai-sw/phoenix-tax.git` | 예정 | Netlify |
| 10 | phoenix dental | 치아관리/치과병원/치과원장 정보 및 채팅 상담 | Power Bot | `https://github.com/phoenixai-sw/phoenixai_dentala.git` | 실제 존재 | Netlify |
| 11 | phoenix marketing | AI 검색 순위/인용 정보/예상 질문 관리 대시보드 및 채팅 상담 | Power Bot | `https://github.com/phoenixai-sw/phoenix-marketing.git` | 예정 | Netlify |

배포 기준:

1. `phoenix pages`만 Vercel을 메인 배포 플랫폼으로 설명한다.
2. 나머지 agent web은 Netlify를 메인 배포 플랫폼으로 설명한다.
3. 예정 저장소는 문서에 먼저 반영하고, 실제 저장소가 만들어지면 같은 URL로 연결한다.

## 4. Agent Bot v2.0 역할

1. Genesis Bot
   - 전체 지휘
   - 작업 분해
   - phoenix command 컨트롤
   - 전문 봇에게 task 전달
   - 최종 보고

2. Design Bot
   - phoenix pages 컨트롤
   - phoenix slides 컨트롤
   - phoenix webs 컨트롤
   - phoenix images 컨트롤

3. Writer Bot
   - phoenix books 컨트롤

4. Video Bot
   - phoenix videos 컨트롤

5. Power Bot
   - phoenix reports 컨트롤
   - phoenix tax 컨트롤
   - phoenix dental 컨트롤
   - phoenix marketing 컨트롤

## 5. 문서 폴더 구조

```text
docs/phoenix-v3-system/
├─ README.md
├─ 00-overview/
├─ 01-phoenix-command/
├─ 02-phoenix-pages/
├─ 03-phoenix-slides/
├─ 04-phoenix-videos/
├─ 05-phoenix-reports/
├─ 06-phoenix-webs/
├─ 07-phoenix-books/
├─ 08-phoenix-images/
├─ 09-phoenix-tax/
├─ 10-phoenix-dental/
├─ 11-phoenix-marketing/
└─ agent-bot-v2.0/
```

각 agent web 폴더는 기본적으로 아래 3개 문서를 가진다.

```text
01_웹사이트-기획서.md
02_코덱스용-작업지시서.md
03_유저용-작업확인서.md
```

## 6. 작업 원칙

1. phoenix command는 최상위 지휘 웹으로 설계한다.
2. 전문 agent web은 command 안에 중복 구현하지 않는다.
3. 전문 봇은 자기 담당 웹만 안정적으로 컨트롤한다.
4. 결과물은 다운로드, Cloud 저장, Telegram 전달까지 고려한다.
5. V1 이후에는 Supabase Auth/DB/Storage를 기준으로 관리한다.
6. V1.5 이후에는 결제와 크레딧 차감을 고려한다.
7. V3에서는 Genesis Bot이 직접 모든 일을 하지 않고 전문 봇에게 위임한다.
8. API 키, Telegram token, OAuth 정보는 문서와 로그에 노출하지 않는다.

## 7. Agent v2.0 실제 설치 패키지 기준

Agent Bot v2.0 문서는 실제 배포 패키지를 기준으로 한다.

독자용 설치 저장소:

```text
https://github.com/phoenixai-sw/phoenix-agents-camp.git
```

```text
Windows 11:
Phoenix Agent_v2.0_win11_260706.zip

macOS:
Phoenix Agent_v2.0_macOS_260706.zip
```

최종 Telegram 봇 username 기준:

```text
genesis_bot
power_bot
design_bot
video_bot
writer_bot
```

핵심 기준:

1. Windows 11은 `.ps1` 설치/업데이트/클리너 파일을 사용한다.
2. macOS는 `.command`와 `.sh` 설치/업데이트/클리너 파일을 사용한다.
3. 두 패키지 모두 같은 봇 역할과 같은 agent web 매핑을 가진다.
4. agent web 컨트롤은 Playwright MCP와 `data-testid` 기준으로 설명한다.
5. 결과물은 기본적으로 로컬 `outputs`에 저장하고, Telegram 전송은 유저 확인 후 진행한다.

상세 분석 문서:

```text
docs/phoenix-v3-system/00-overview/03_Agent-v2.0-설치패키지-분석.md
```

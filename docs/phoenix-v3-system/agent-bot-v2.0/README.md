# Phoenix Agent Bot v2.0 문서

## 1. 목적

이 폴더는 Phoenix Agent v1.9를 v2.0으로 발전시키기 위한 봇 측 작업 문서 묶음이다.

v2.0의 핵심은 Telegram/OpenClaw 기반 봇들이 각각의 `agent web`을 컨트롤하고, 결과물을 다시 Telegram과 관리 화면으로 전달하는 것이다.

```text
Genesis Bot → phoenix command
Design Bot  → phoenix pages / phoenix slides / phoenix webs / phoenix images
Writer Bot  → phoenix books
Video Bot   → phoenix videos
Power Bot   → phoenix reports / phoenix tax / phoenix dental / phoenix marketing
```

## 2. v2.0에서 추가할 것

1. 웹사이트 컨트롤 스킬
2. 봇별 웹사이트 매핑
3. Genesis Bot 지휘 프로토콜
4. 작업 상태 추적
5. 결과물 Telegram 전달 규칙
6. phoenix command 연동
7. 상담형 agent web 처리 규칙

## 3. 문서 목록

```text
01_Agent-v2.0-전체설계서.md
02_Design-Bot-v2.0-작업지시서.md
03_Video-Bot-v2.0-작업지시서.md
04_Power-Bot-v2.0-작업지시서.md
05_Writer-Bot-v2.0-작업지시서.md
06_Genesis-Bot-v2.0-작업지시서.md
07_Agent-v2.0-유저용-설치확인서.md
08_봇간-지휘프로토콜.md
```

## 4. 원칙

1. v1.9 설치 안정성을 깨지 않는다.
2. 설치 코어는 최소 수정한다.
3. 봇별 스킬 폴더를 추가하는 방식으로 확장한다.
4. API 키와 Telegram token은 문서나 payload에 저장하지 않는다.
5. Genesis Bot은 모든 웹사이트를 직접 조작하지 않고 전문 봇에게 위임한다.

## 5. 실제 설치 패키지 기준

Agent Bot v2.0은 Windows 11과 macOS 패키지를 모두 기준으로 문서화한다.

독자용 다운로드 저장소:

```text
https://github.com/phoenixai-sw/phoenix-agents-camp.git
```

```text
Windows 11:
Phoenix Agent_v2.0_win11_260706.zip

macOS:
Phoenix Agent_v2.0_macOS_260706.zip
```

최종 Telegram 봇 username:

```text
genesis_bot
power_bot
design_bot
video_bot
writer_bot
```

OS별 실행 파일:

```text
Windows 11:
installer/install_phoenix_agent.ps1
installer/phoenix_agent_install_core.ps1
updater/update_phoenix_proactive_nudge.ps1
cleaner/super_cleaning_bot.ps1

macOS:
installer/install_phoenix_agent.command
installer/phoenix_agent_install_core.command
installer/phoenix_agent_oauth_helpers.sh
updater/update_phoenix_proactive_nudge.command
cleaner/super_cleaning_bot.command
```

공통 설치 원칙:

1. 봇은 한 번에 하나씩 설치한다.
2. Telegram BotFather token과 Telegram chat id를 먼저 준비한다.
3. 키 값은 한 줄 텍스트 파일에 넣고 installer 폴더로 복사/이동한다.
4. 기본 대화 인증은 OpenAI/Codex이며, Gemini 선택도 가능하다.
5. 설치 중 민감값은 출력하지 않는다.
6. v2.0 web control skill은 installer와 updater 양쪽에 포함된다.

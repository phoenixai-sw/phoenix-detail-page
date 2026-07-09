# Agent v2.0 설치패키지 분석

## 1. 분석 대상

이번 문서는 아래 실제 설치 패키지를 기준으로 작성한다.

```text
Windows 11:
C:\antigravity - openclaw\5th\agent collection\01_install_packages\Phoenix Agent_v2.0_win11_260706.zip

macOS:
C:\antigravity - openclaw\5th\agent collection\01_install_packages\Phoenix Agent_v2.0_macOS_260706.zip

작업지시서:
C:\antigravity - openclaw\5th\agent collection\02_operator_review_docs\dev issue\v2.0 개발 자료\Phoenix_Agent_v2.0_웹컨트롤형_최종_작업지시서_260706.md
```

## 2. 패키지 공통 결론

Windows 11용과 macOS용은 같은 v2.0 목적을 가진다.

공통 핵심:

1. v1.9의 Telegram/OpenClaw/PM2 운영 구조를 유지한다.
2. Agent v2.0은 `Web Control Agent`다.
3. 웹 컨트롤 방식은 Playwright MCP와 안정적인 `data-testid`를 기준으로 한다.
4. 결과물은 기본적으로 로컬 `outputs`에 저장한다.
5. Telegram 전송은 유저에게 먼저 묻고 진행한다.
6. API key, Telegram token, OAuth credential은 출력하거나 payload에 넣지 않는다.
7. v2.0 이후 로드맵은 `v2.2 Master Builder Agent`다.

## 3. Windows 11 패키지 구조

주요 실행 파일:

```text
installer/install_phoenix_agent.ps1
installer/install_genesis_bot.ps1
installer/install_design_bot.ps1
installer/install_power_bot.ps1
installer/install_video_bot.ps1
installer/install_writer_bot.ps1
installer/phoenix_agent_install_core.ps1
updater/update_phoenix_proactive_nudge.ps1
cleaner/super_cleaning_bot.ps1
```

특징:

1. PowerShell 기반이다.
2. 설치는 `install_phoenix_agent.ps1`에서 봇을 선택하는 흐름이다.
3. 개별 봇 설치 파일도 따로 있다.
4. updater와 cleaner도 PowerShell 파일로 제공된다.

## 4. macOS 패키지 구조

주요 실행 파일:

```text
installer/install_phoenix_agent.command
installer/install_genesis_bot.command
installer/install_design_bot.command
installer/install_power_bot.command
installer/install_video_bot.command
installer/install_writer_bot.command
installer/phoenix_agent_install_core.command
installer/phoenix_agent_oauth_helpers.sh
updater/update_phoenix_proactive_nudge.command
cleaner/super_cleaning_bot.command
```

특징:

1. `.command`와 `.sh` 기반이다.
2. 설치는 `install_phoenix_agent.command`에서 봇을 선택하는 흐름이다.
3. `--bot`, `--auth`, `--gemini`, `--openai` 옵션을 사용할 수 있다.
4. Windows와 같은 역할 구조를 유지한다.

## 5. 설치 전 입력 파일

패키지에는 아래 입력 템플릿 파일이 있다.

```text
1. API 키 관련 폴더
- telegram_access_token.txt
- telegram_chat_id.txt
- telegram_pairing_code.txt
- openai_api_key_image.txt
- falai_api_key_video.txt

2. 모델/프로바이더 인증 관련 폴더
- gemini_api_key.txt
- gemini_model.txt
- local_llm_base_url.txt
- local_llm_model.txt
- local_llm_api_key.txt
```

문서 작성 기준:

1. 실제 키 값은 문서에 쓰지 않는다.
2. 유저에게는 “한 줄 텍스트 파일에 값을 넣고 installer 폴더로 복사/이동”하는 방식으로 안내한다.
3. Telegram token과 chat id가 없으면 설치가 중단될 수 있음을 명시한다.
4. Gemini 사용 시 `--auth gemini` 또는 `-AuthMode gemini` 흐름을 설명한다.

## 6. v2.0 web control skill

두 패키지 모두 아래 스킬 폴더를 포함한다.

```text
installer/genesis_orchestration_skills/
installer/design_web_control_skills/
installer/writer_web_control_skills/
installer/video_web_control_skills/
installer/power_web_control_skills/
installer/shared_v3_protocols/
```

역할:

1. Genesis Bot: `phoenix command`
2. Design Bot: `phoenix pages`, `phoenix slides`, `phoenix webs`, `phoenix images`
3. Writer Bot: `phoenix books`
4. Video Bot: `phoenix videos`
5. Power Bot: `phoenix reports`, `phoenix tax`, `phoenix dental`, `phoenix marketing`

## 7. GitHub 저장소 맵

v2.0 문서의 저장소 맵은 아래 기준으로 관리한다.

| Agent Web | Bot | Repository | 상태 | 배포 기준 |
| --- | --- | --- | --- | --- |
| phoenix command | Genesis Bot | `https://github.com/phoenixai-sw/phoenix-command.git` | 예정 | Netlify |
| phoenix pages | Design Bot | `https://github.com/phoenixai-sw/phoenix-detail-page.git` | 실제 존재 | Vercel |
| phoenix images | Design Bot | `https://github.com/phoenixai-sw/mock-up-image.git` | 실제 존재 | Netlify |
| phoenix slides | Design Bot | `https://github.com/phoenixai-sw/phoenix-slides.git` | 예정 | Netlify |
| phoenix webs | Design Bot | `https://github.com/phoenixai-sw/phoenix-webs.git` | 예정 | Netlify |
| phoenix books | Writer Bot | `https://github.com/phoenixai-sw/phoenix-books.git` | 예정 | Netlify |
| phoenix videos | Video Bot | `https://github.com/phoenixai-sw/phoenix-videos.git` | 예정 | Netlify |
| phoenix reports | Power Bot | `https://github.com/phoenixai-sw/phoenix-reports.git` | 예정 | Netlify |
| phoenix tax | Power Bot | `https://github.com/phoenixai-sw/phoenix-tax.git` | 예정 | Netlify |
| phoenix dental | Power Bot | `https://github.com/phoenixai-sw/phoenixai_dentala.git` | 실제 존재 | Netlify |
| phoenix marketing | Power Bot | `https://github.com/phoenixai-sw/phoenix-marketing.git` | 예정 | Netlify |

Agent v2.0 설치 패키지 독자용 저장소는 아래 주소를 기준으로 한다.

```text
https://github.com/phoenixai-sw/phoenix-agents-camp.git
```

최종 Telegram 봇 username은 아래 5개로 확정한다.

```text
genesis_bot
power_bot
design_bot
video_bot
writer_bot
```

## 8. 문서 반영 기준

웹사이트 구축용 문서에는 아래 내용을 반영한다.

1. Windows 11과 macOS를 모두 지원 대상으로 적는다.
2. 설치 파일명과 실행 파일 확장자를 OS별로 분리한다.
3. 모든 agent web 문서는 GitHub 저장소와 컨트롤 봇을 함께 표시한다.
4. 봇 컨트롤은 Playwright MCP와 `data-testid`를 기준으로 설명한다.
5. 결과물은 기본 `outputs` 저장, Telegram 전송은 확인 후 전송으로 설명한다.
6. 영상 생성, 유료 크레딧, 외부 배포, 세무/의료 상담 결과 전달은 마스터 승인 후 진행으로 설명한다.
7. `phoenix pages`는 Vercel, 나머지 agent web은 Netlify를 기본 배포 기준으로 설명한다.
8. 출판용 문서는 입문자도 따라 할 수 있도록 GitHub Desktop, ZIP 다운로드, 터미널 실행 방식을 함께 설명한다.

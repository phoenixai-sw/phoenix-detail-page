# 실전: Phoenix Agent v2.0 설치, Telegram 연결, 웹 컨트롤

## 1. 이 장의 목표

이 장은 Phoenix Agent v2.0을 설치하고, Telegram Bot을 연결하고, Agent Bot이 agent web을 컨트롤하는 흐름을 설명한다.

이번 기준은 Windows 11과 macOS를 모두 포함한다.

## 2. 설치 패키지

독자는 아래 GitHub 저장소에서 Phoenix Agent v2.0 설치 파일을 내려받는다.

```text
https://github.com/phoenixai-sw/phoenix-agents-camp.git
```

Git을 사용할 수 있으면 아래처럼 받을 수 있다.

```bash
git clone https://github.com/phoenixai-sw/phoenix-agents-camp.git
```

입문자는 GitHub 페이지에서 `Code > Download ZIP`을 눌러 내려받아도 된다.

Windows 11:

```text
Phoenix Agent_v2.0_win11_260706.zip
```

macOS:

```text
Phoenix Agent_v2.0_macOS_260706.zip
```

두 패키지는 같은 역할 구조를 가진다.

차이:

1. Windows 11은 PowerShell `.ps1` 파일을 사용한다.
2. macOS는 Terminal `.command`와 `.sh` 파일을 사용한다.
3. 봇 역할, web control skill, shared protocol은 동일한 기준으로 제공된다.

## 3. Agent v2.0 봇 역할

```text
genesis_bot → Genesis Bot → phoenix command
design_bot  → Design Bot  → phoenix pages / phoenix slides / phoenix webs / phoenix images
writer_bot  → Writer Bot  → phoenix books
video_bot   → Video Bot   → phoenix videos
power_bot   → Power Bot   → phoenix reports / phoenix tax / phoenix dental / phoenix marketing
```

Telegram에서 실제로 찾고 연결할 봇 username은 아래 5개다.

```text
genesis_bot
power_bot
design_bot
video_bot
writer_bot
```

## 4. Windows 11 설치 파일

주요 파일:

```powershell
installer\install_phoenix_agent.ps1
installer\install_genesis_bot.ps1
installer\install_design_bot.ps1
installer\install_power_bot.ps1
installer\install_video_bot.ps1
installer\install_writer_bot.ps1
installer\phoenix_agent_install_core.ps1
updater\update_phoenix_proactive_nudge.ps1
cleaner\super_cleaning_bot.ps1
```

대표 설치 명령:

```powershell
cd "압축을_푼_폴더\installer"
powershell -ExecutionPolicy Bypass -File .\install_phoenix_agent.ps1
```

Gemini 인증을 선택하는 예시:

```powershell
powershell -ExecutionPolicy Bypass -File .\install_phoenix_agent.ps1 -AuthMode gemini
```

개별 봇 설치 예시:

```powershell
powershell -ExecutionPolicy Bypass -File .\install_design_bot.ps1
```

## 5. macOS 설치 파일

주요 파일:

```bash
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

대표 설치 명령:

```bash
cd "압축을_푼_폴더/installer"
chmod +x *.command
./install_phoenix_agent.command
```

봇을 지정하는 예시:

```bash
./install_phoenix_agent.command --bot design
```

Gemini 인증을 선택하는 예시:

```bash
./install_phoenix_agent.command --bot design --auth gemini
```

Gatekeeper 또는 실행 권한 문제가 있으면 파일을 우클릭해 열거나, Terminal에서 실행 권한을 다시 부여한다.

## 6. Telegram BotFather 준비

각 봇은 Telegram BotFather에서 token을 받아야 한다.

절차:

1. Telegram에서 `@BotFather`를 찾는다.
2. `/newbot`을 입력한다.
3. 봇 이름을 입력한다.
4. 봇 username을 입력한다.
5. BotFather가 발급한 token을 복사한다.
6. token을 `telegram_access_token.txt`에 한 줄로 저장한다.

봇별로 token을 따로 발급하는 것이 안전하다.

최종 봇 username 예시:

```text
genesis_bot token
power_bot token
design_bot token
video_bot token
writer_bot token
```

입문자용 권장 순서:

1. 먼저 `genesis_bot`을 만든다.
2. 그 다음 `design_bot`, `writer_bot`, `video_bot`, `power_bot`을 만든다.
3. 각 봇의 token을 서로 섞지 않도록 파일명이나 메모장에 봇 이름을 함께 적어둔다.
4. 원고나 강의자료에는 실제 token을 절대 적지 않는다.

## 7. Telegram chat id 준비

설치 패키지는 Telegram chat id도 필요로 한다.

준비 방식은 운영 환경에 따라 다르지만, 문서에서는 아래처럼 안내한다.

1. 봇에게 메시지를 한 번 보낸다.
2. chat id 확인 도구 또는 Telegram API로 chat id를 확인한다.
3. 숫자 chat id를 복사한다.
4. `telegram_chat_id.txt`에 한 줄로 저장한다.

파일 예시:

```text
telegram_access_token.txt
telegram_chat_id.txt
telegram_pairing_code.txt
```

주의:

1. 실제 token과 chat id는 출판 원고에 쓰지 않는다.
2. 설치 화면이나 로그에 민감값이 출력되면 안 된다.
3. pairing code는 필요할 때만 입력한다.

## 8. 모델 인증 선택

기본 대화 인증은 OpenAI/Codex 흐름이다.

Gemini를 선택할 수도 있다.

Windows:

```powershell
powershell -ExecutionPolicy Bypass -File .\install_phoenix_agent.ps1 -AuthMode gemini
```

macOS:

```bash
./install_phoenix_agent.command --auth gemini
```

Gemini 관련 파일:

```text
gemini_api_key.txt
gemini_model.txt
```

local LLM 관련 파일:

```text
local_llm_base_url.txt
local_llm_model.txt
local_llm_api_key.txt
```

## 9. Web Control Skill 구조

Agent v2.0 패키지는 아래 스킬 폴더를 포함한다.

```text
installer/genesis_orchestration_skills/
installer/design_web_control_skills/
installer/writer_web_control_skills/
installer/video_web_control_skills/
installer/power_web_control_skills/
installer/shared_v3_protocols/
```

이 스킬들은 봇이 어떤 agent web을 컨트롤해야 하는지 알려준다.

핵심 기준:

1. Playwright MCP 기반 웹 컨트롤
2. `data-testid` 기반 안정 선택자
3. 구조화 task payload
4. 로컬 `outputs` 기본 저장
5. Telegram 전송 전 확인
6. 승인 필요한 작업은 마스터 확인 후 진행

## 10. Agent Bot이 웹을 컨트롤하는 흐름

예시 요청:

```text
이 제품으로 상세페이지, 제품컷, 랜딩페이지, PPT, SNS 카피까지 만들어줘.
```

처리 흐름:

```text
마스터
→ Genesis Bot
→ phoenix command에 작업 등록
→ Design Bot에게 pages/images/webs/slides task 전달
→ Writer Bot에게 books task 전달
→ 각 봇이 agent web 접속
→ 결과 생성
→ outputs 저장
→ Telegram 전송 여부 확인
```

## 11. 구조화 task 예시

```json
{
  "jobId": "job_20260706_001",
  "taskId": "task_001",
  "requester": "genesis",
  "targetBot": "design",
  "targetWebsite": "phoenix-images",
  "action": "create_product_thumbnail",
  "priority": "normal",
  "requiresApproval": true,
  "inputs": {
    "brand": "Phoenix AI",
    "product": "sample product",
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

금지:

1. API key를 payload에 넣지 않는다.
2. Telegram token을 payload에 넣지 않는다.
3. OAuth credential을 payload에 넣지 않는다.
4. raw `.env` 값을 payload에 넣지 않는다.

## 12. outputs 저장과 Telegram 전송

Agent v2.0의 기본 결과 저장 위치는 로컬 `outputs`다.

작업 완료 후 봇은 이렇게 안내한다.

```text
결과물이 outputs 폴더에 저장되었습니다.
Telegram으로도 결과물을 보내드릴까요?
```

Telegram 전송은 유저가 원할 때만 진행한다.

파일이 큰 경우:

1. outputs 경로를 안내한다.
2. 압축 파일을 만든다.
3. Cloud 링크가 있으면 링크를 전달한다.
4. Telegram 직접 전송은 용량 제한을 확인한 뒤 진행한다.

## 13. 승인 필요 작업

아래 작업은 마스터 승인 후 진행한다.

1. 영상 생성
2. 유료 크레딧 사용
3. 외부 공개/배포
4. 세무 상담 결과 전달
5. 치과 상담 결과 전달
6. 프로젝트 삭제
7. 여러 agent web 동시 실행

승인 문구 예시:

```text
이 작업은 유료 크레딧을 사용할 수 있습니다.
진행할까요?

1. 진행
2. 중단
3. 초안만 먼저 작성
```

## 14. 설치 후 확인

각 봇에게 `/start`를 보낸다.

확인할 것:

1. `genesis_bot`, `power_bot`, `design_bot`, `video_bot`, `writer_bot`이 모두 답장하는가?
2. Telegram 답장이 오는가?
3. PM2 상태가 online인가?
4. OpenClaw gateway health가 정상인가?
5. agent web 역할을 알고 있는가?
6. outputs 저장 정책을 설명하는가?
7. Telegram 전송 전에 확인을 요청하는가?

## 15. 장애 대응

자주 생기는 문제:

1. Telegram token이 다른 봇의 token이다.
2. Telegram chat id가 틀렸다.
3. pairing code 승인이 안 됐다.
4. OpenClaw route가 검증되지 않았다.
5. API key가 누락됐다.
6. macOS에서 `.command` 실행 권한이 없다.
7. Windows에서 PowerShell 실행 정책에 막혔다.

해결 원칙:

1. token/chat id 파일을 다시 확인한다.
2. pairing code를 승인한다.
3. PM2 상태를 확인한다.
4. gateway health를 확인한다.
5. config validate를 실행한다.
6. 민감값은 절대 화면에 출력하지 않는다.

## 16. 설치 전 준비 체크리스트

설치 전에 아래 항목을 먼저 준비한다.

1. Windows 11 또는 macOS 중 어떤 환경에서 설치할지 정한다.
2. Phoenix Agent v2.0 설치 ZIP을 받는다.
3. Telegram에서 사용할 봇 username 5개를 정한다.
4. BotFather에서 각 봇 token을 발급한다.
5. Telegram chat id를 확인한다.
6. 사용할 모델 인증 방식을 정한다.
7. OpenAI/Codex, Gemini, local LLM 중 어떤 인증을 쓸지 정한다.
8. 기존 v1.9 설치본이 있다면 outputs와 logs를 백업한다.
9. 터미널 또는 PowerShell 실행 권한을 확인한다.
10. 실제 token과 API key를 문서나 스크린샷에 남기지 않는다.

초보자에게 가장 중요한 준비물은 두 가지다.

```text
telegram_access_token.txt
telegram_chat_id.txt
```

이 두 파일이 맞지 않으면 봇이 답장하지 않는다.

## 17. Windows 11 설치 후 확인 순서

Windows 11에서는 PowerShell 기반 파일을 사용한다.

설치 후 아래 순서대로 확인한다.

1. PowerShell 실행 정책 때문에 막히지 않았는지 확인한다.
2. 설치 로그에 token 값이 그대로 출력되지 않았는지 확인한다.
3. PM2 상태가 online인지 확인한다.
4. OpenClaw gateway health가 정상인지 확인한다.
5. config validate가 통과하는지 확인한다.
6. 각 봇에게 `/start`를 보내 답장 여부를 확인한다.
7. outputs 폴더가 생성되었는지 확인한다.
8. web control skill 폴더가 설치되었는지 확인한다.

대표 확인 대상:

```text
installer/install_phoenix_agent.ps1
installer/install_design_bot.ps1
installer/install_genesis_bot.ps1
installer/install_power_bot.ps1
installer/install_video_bot.ps1
installer/install_writer_bot.ps1
```

## 18. macOS 설치 후 확인 순서

macOS에서는 `.command`와 `.sh` 파일을 사용한다.

설치 후 아래 순서대로 확인한다.

1. `.command` 파일에 실행 권한이 있는지 확인한다.
2. Gatekeeper 경고가 뜨면 우클릭 열기 또는 Terminal 실행으로 처리한다.
3. token과 chat id 파일이 installer 폴더 기준으로 올바른 위치에 있는지 확인한다.
4. 각 봇 설치 명령이 정상 종료되었는지 확인한다.
5. PM2 상태가 online인지 확인한다.
6. OpenClaw gateway health가 정상인지 확인한다.
7. 각 봇에게 `/start`를 보내 답장 여부를 확인한다.
8. outputs 폴더가 생성되었는지 확인한다.

대표 확인 대상:

```text
installer/install_phoenix_agent.command
installer/install_design_bot.command
installer/install_genesis_bot.command
installer/install_power_bot.command
installer/install_video_bot.command
installer/install_writer_bot.command
installer/phoenix_agent_oauth_helpers.sh
```

## 19. 승인 필요한 작업 예시

Agent Bot이 모든 일을 자동으로 진행하면 편해 보이지만, 일부 작업은 반드시 멈춰서 물어봐야 한다.

승인이 필요한 작업:

1. 영상 생성
2. 유료 크레딧 사용
3. 외부 공개 배포
4. 세무 상담 결과 전달
5. 치과 상담 결과 전달
6. 프로젝트 삭제
7. 여러 agent web 동시 실행
8. 대량 파일 생성 또는 삭제

권장 승인 문구:

```text
이 작업은 비용이 발생하거나 외부에 공개될 수 있습니다.
진행할까요?

1. 진행
2. 중단
3. 초안만 먼저 작성
```

이 문구는 독자가 직접 운영할 때도 그대로 사용할 수 있다.

## 20. 초보자용 명령 예시

Genesis Bot에게:

```text
이 제품으로 상세페이지, 제품컷, 랜딩페이지, PPT, SNS 카피까지 만드는 작업을 나눠줘.
필요한 agent web과 담당 봇을 구분하고, 실행 전에 승인 필요한 항목을 알려줘.
```

Design Bot에게:

```text
phoenix pages에서 상세페이지 생성 준비 상태를 확인해줘.
결과물은 outputs에 저장하고, 완료 후 Telegram 전송 여부를 물어봐줘.
```

Writer Bot에게:

```text
phoenix books에서 초보자용 강의교안 초안을 만들어줘.
DOCX와 PDF 결과물을 outputs에 저장하고, Telegram 전송은 내가 원할 때만 해줘.
```

Video Bot에게:

```text
phoenix videos에서 15초 숏폼 영상 제작 준비를 해줘.
크레딧 사용 또는 영상 생성 실행 전에는 반드시 승인 요청해줘.
```

Power Bot에게:

```text
phoenix marketing에서 고객사 AI 검색 현황 분석 준비 상태를 확인해줘.
출처와 기준일을 표시하고, 결과물은 outputs에 저장해줘.
```

## 21. 실패했을 때의 기본 순서

초보자는 오류가 나면 어디부터 봐야 할지 막막하다.

아래 순서대로 확인하면 된다.

1. 봇이 Telegram에서 답장하는가?
2. token 파일이 맞는가?
3. chat id 파일이 맞는가?
4. PM2가 online인가?
5. OpenClaw gateway health가 정상인가?
6. config validate가 통과하는가?
7. agent web URL이 맞는가?
8. agent web 로그인 세션이 살아 있는가?
9. API key가 필요한 작업인데 키가 빠지지 않았는가?
10. outputs 폴더에 파일이 생겼는가?
11. Telegram 전송만 실패했는가, 생성 자체가 실패했는가?
12. 승인 필요한 작업인데 승인을 받지 않아 멈춘 것은 아닌가?

이 순서는 출판 원고에서 매우 중요하다. 독자는 “오류가 났다”가 아니라 “어느 단계에서 멈췄는지”를 확인하는 습관을 가져야 한다.

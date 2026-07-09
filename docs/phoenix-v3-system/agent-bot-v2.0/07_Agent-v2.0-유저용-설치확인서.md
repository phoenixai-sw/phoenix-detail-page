# Agent v2.0 유저용 설치확인서

## 1. 목적

Phoenix Agent v2.0 설치 후 각 봇이 정상 작동하고, agent web 컨트롤 준비가 되었는지 확인한다.

## 1.1 OS별 설치 파일

Windows 11:

```powershell
installer\install_phoenix_agent.ps1
```

macOS:

```bash
installer/install_phoenix_agent.command
```

두 OS 모두 Genesis, Design, Writer, Video, Power Bot을 설치하는 구조는 같다.

Windows는 PowerShell, macOS는 Terminal에서 실행한다.

## 1.2 설치 전 준비 파일

아래 파일은 실제 값을 한 줄로 입력한 뒤 installer 폴더로 복사/이동한다.

```text
telegram_access_token.txt
telegram_chat_id.txt
```

선택 입력:

```text
openai_api_key_image.txt
falai_api_key_video.txt
gemini_api_key.txt
gemini_model.txt
local_llm_base_url.txt
local_llm_model.txt
local_llm_api_key.txt
```

주의:

1. 실제 token/API key는 문서에 적지 않는다.
2. 설치 화면이나 로그에 민감값이 출력되면 안 된다.
3. Telegram pairing code는 필요할 때만 `telegram_pairing_code.txt`로 처리한다.

## 2. 기본 봇 확인

각 봇에게 `/start`를 보낸다.

확인 대상:

1. Genesis Bot: `genesis_bot`
2. Power Bot: `power_bot`
3. Design Bot: `design_bot`
4. Video Bot: `video_bot`
5. Writer Bot: `writer_bot`

성공 기준:

```text
각 봇이 자기 이름과 역할을 말한다.
```

입문자 확인 기준:

1. Telegram에서 각 봇 username을 검색한다.
2. 봇 대화창을 열고 `/start`를 보낸다.
3. 답장이 오면 설치와 token 연결이 1차 성공이다.
4. 답장이 오지 않으면 token, chat id, PM2 실행 상태를 순서대로 확인한다.

## 3. Genesis Bot 확인

```text
이 제품으로 상세페이지, 제품컷, 랜딩페이지, PPT, SNS 카피까지 만드는 작업을 나눠줘.
```

성공 기준:

1. Genesis Bot이 task를 나눈다.
2. phoenix command 등록을 언급한다.
3. Design Bot, Writer Bot 역할을 구분한다.
4. 실행 전 승인 여부를 묻는다.

## 4. Design Bot 확인

```text
phoenix images로 제품 썸네일 생성 준비 상태를 확인해줘.
```

성공 기준:

1. Design Bot이 phoenix images 역할을 안다.
2. 제품명, 브랜드명, 이미지 용도, 비율을 질문한다.
3. 다운로드 형식을 설명한다.

## 5. Writer Bot 확인

```text
phoenix books로 강의교안 생성 준비 상태를 확인해줘.
```

성공 기준:

1. Writer Bot이 phoenix books 역할을 안다.
2. 주제, 대상, 분량, 톤을 질문한다.
3. DOCX/PDF 결과물을 설명한다.

## 6. Video Bot 확인

```text
phoenix videos로 15초 숏폼 생성 준비 상태를 확인해줘.
```

성공 기준:

1. Video Bot이 영상 길이, 장면 수, 스타일을 질문한다.
2. 영상 생성은 비용/시간이 들 수 있음을 안내한다.

## 7. Power Bot 확인

```text
phoenix marketing으로 고객사 AI 검색 현황 분석 준비 상태를 확인해줘.
```

성공 기준:

1. Power Bot이 고객사, 플랫폼, 키워드를 질문한다.
2. 대시보드/상담/보고서 결과물을 설명한다.

추가 확인:

```text
phoenix tax와 phoenix dental 상담형 웹의 주의사항을 설명해줘.
```

성공 기준:

1. Power Bot이 세무/의료 고위험 정보 주의사항을 설명한다.
2. 전문가 확인 필요성을 안내한다.

## 8. 실패 시 확인

1. Telegram pairing이 완료되었는가?
2. PM2에서 봇이 online인가?
3. OpenClaw gateway health가 정상인가?
4. 웹사이트 주소가 맞는가?
5. API 키 또는 로그인 상태가 준비되었는가?
6. Windows에서 PowerShell 실행 정책 때문에 막힌 것은 아닌가?
7. macOS에서 `.command` 파일 실행 권한 또는 Gatekeeper 경고 때문에 막힌 것은 아닌가?

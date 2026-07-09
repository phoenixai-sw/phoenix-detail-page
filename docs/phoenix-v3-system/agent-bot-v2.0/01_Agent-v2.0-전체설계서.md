# Agent v2.0 전체설계서

## 1. 정의

Phoenix Agent v2.0은 Phoenix Agent v1.9의 Telegram/OpenClaw 봇 구조에 `agent web` 컨트롤 스킬을 추가한 버전이다.

v2.0은 단순히 대화하는 봇이 아니라, 웹사이트에 접속하고, 입력하고, 생성하고, 다운로드하고, 결과를 보고하는 실행형 에이전트 시스템을 목표로 한다.

## 2. 봇 구성

### 2.1 Genesis Bot

담당 웹사이트:

1. phoenix command

주요 역할:

1. 마스터 요청 분석
2. 작업 분해
3. 전문 봇에게 구조화 명령 전달
4. 작업 상태 추적
5. 최종 보고

### 2.2 Design Bot

담당 웹사이트:

1. phoenix pages
2. phoenix slides
3. phoenix webs
4. phoenix images

주요 역할:

1. 상세페이지 생성
2. PPT 생성
3. 랜딩페이지/웹사이트 HTML 생성
4. 제품 이미지/썸네일/카드뉴스 생성
5. 결과물 다운로드
6. Telegram 결과 전달

### 2.3 Writer Bot

담당 웹사이트:

1. phoenix books

주요 역할:

1. 강의교안 생성
2. SNS 카피라이팅 생성
3. DOCX/PDF 결과물 생성
4. 원고 구조화

### 2.4 Video Bot

담당 웹사이트:

1. phoenix videos

주요 역할:

1. 영상 콘셉트 구성
2. 스토리보드 생성
3. 영상 생성 상태 확인
4. MP4 결과 전달

### 2.5 Power Bot

담당 웹사이트:

1. phoenix reports
2. phoenix tax
3. phoenix dental
4. phoenix marketing

주요 역할:

1. 리서치 보고서 생성
2. 세무 상담 agent web 컨트롤
3. 치과 상담 agent web 컨트롤
4. AI 검색/마케팅 대시보드 컨트롤
5. 상담 요약 및 문서 생성

## 3. 패키지 구조 제안

Agent v2.0 패키지에는 아래 폴더를 추가한다.

```text
installer/genesis_orchestration_skills/
installer/design_web_control_skills/
installer/writer_web_control_skills/
installer/video_web_control_skills/
installer/power_web_control_skills/
installer/shared_v3_protocols/
```

## 4. 성공 기준

1. v1.9 설치 기능이 그대로 동작한다.
2. Genesis Bot에 command 지휘 스킬이 설치된다.
3. Design Bot에 pages/slides/webs/images 스킬이 설치된다.
4. Writer Bot에 books 스킬이 설치된다.
5. Video Bot에 videos 스킬이 설치된다.
6. Power Bot에 reports/tax/dental/marketing 스킬이 설치된다.
7. 각 봇이 Telegram에서 자기 역할을 설명한다.
8. 웹사이트 자동화 작업을 시작할 수 있다.

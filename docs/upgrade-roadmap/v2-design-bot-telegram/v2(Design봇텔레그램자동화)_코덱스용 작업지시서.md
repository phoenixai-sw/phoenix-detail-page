# V2(Design봇텔레그램자동화) 코덱스용 작업지시서

## 1. 작업 목표

V2는 로컬에 설치된 OpenClaw Design bot을 이용해 Phoenix detail page 웹사이트를 컨트롤하고, 상세페이지 생성 결과물을 텔레그램으로 전달받는 단계다.

목표 흐름:

```text
텔레그램 명령
→ Design bot 수신
→ Phoenix detail page 접속
→ 로그인 또는 API 키 설정
→ 파일/프롬프트 입력
→ 상세페이지 생성
→ ZIP 또는 이미지 결과 다운로드
→ 텔레그램으로 결과 전달
```

## 2. 실행 가능 여부

실행 가능하다.

로컬 자료에서 `Phoenix_Design_Bot_Guide`와 Design bot 설치 문서가 확인되었다. 다만 실제 구현 전 아래 정보를 반드시 확인해야 한다.

1. Design bot 실행 경로
2. Design bot 텔레그램 토큰
3. OpenClaw gateway 실행 방식
4. Design bot이 사용할 브라우저 제어 방식
5. Phoenix detail page 배포 URL
6. 결과물을 저장할 로컬 폴더

## 3. V2 전제 조건

권장 전제:

1. V1 Google 로그인 완료
2. V1 Supabase 저장 완료
3. 가능하면 V1.5 크레딧 완료

V1 없이도 V2 실험은 가능하지만, 안정적인 운영은 V1 이후가 낫다. 이유는 봇 자동화가 생성 결과를 다시 찾고 관리하려면 유저, 프로젝트, 결과 URL이 DB에 남아야 하기 때문이다.

## 4. Design bot 확인 경로

현재 확인된 참고 경로:

```text
C:\antigravity - openclaw\3th\Phoenix_Design_Bot_Guide
C:\antigravity - openclaw\3th\phoenix_design_bot_install.zip
```

구현 전 확인할 파일:

```text
design_bot_handoff.md
phoenix_pw_design_bot_install_guide_win11.md
phoenix_pw_design_bot_install_execute_win11.md
```

## 5. Phoenix detail page에 필요한 자동화 안정화

봇이 웹사이트를 안정적으로 조작하려면 화면 요소에 안정적인 식별자가 필요하다.

추가 권장:

```text
data-testid="api-key-openai"
data-testid="api-key-google"
data-testid="upload-dropzone"
data-testid="generation-prompt"
data-testid="generate-button"
data-testid="download-zip-button"
data-testid="cloud-save-button"
data-testid="result-gallery"
```

버튼 라벨이 바뀌어도 봇 자동화가 깨지지 않게 `data-testid`를 기준으로 조작한다.

## 6. Design bot 명령 설계

텔레그램 명령 예시:

```text
/detail_create
/detail_status
/detail_cancel
/detail_download
```

대화형 입력 순서:

1. 생성할 상품명 입력
2. 판매 채널 선택
3. 생성 페이지 수 선택
4. 출력 비율 선택
5. 참고 이미지 업로드
6. 추가 요청 문구 입력
7. 생성 시작 확인

## 7. 작업 상태 모델

봇은 작업마다 job_id를 만들어야 한다.

```text
job_id
telegram_user_id
site_user_id
status
project_id
created_at
updated_at
error_message
result_files
```

상태 예시:

```text
queued
opening_site
uploading_files
generating
downloading
sending_to_telegram
completed
failed
cancelled
```

## 8. 결과 전달 방식

권장 우선순위:

1. ZIP 파일 1개 전달
2. 대표 썸네일 이미지 1장 함께 전달
3. 클라우드 저장 프로젝트 URL 전달
4. 실패 시 실패 사유와 재시도 버튼 안내

## 9. V2 구현 범위

Design bot 쪽:

1. Telegram 명령 핸들러 추가
2. Phoenix detail page 웹 제어 스크립트 추가
3. 파일 업로드 처리
4. 생성 완료 감지
5. ZIP 다운로드 감지
6. 텔레그램 파일 전송
7. 실패/타임아웃 재시도

Phoenix detail page 쪽:

1. 자동화용 `data-testid` 추가
2. 다운로드 ZIP 버튼 안정화
3. 클라우드 저장 결과 URL 제공
4. 봇 전용 경량 상태 API 검토
5. 장시간 생성 상태 표시 개선

## 10. 금지 사항

1. 유저 API 키를 Design bot 로그에 평문 저장하지 않는다.
2. 텔레그램 채팅방에 API 키를 그대로 다시 출력하지 않는다.
3. 여러 유저의 작업 파일을 같은 폴더에 섞지 않는다.
4. 봇 자동화를 UI 텍스트에만 의존하지 않는다.
5. 생성 실패를 성공으로 보고하지 않는다.
6. V1.5 크레딧 적용 후에는 크레딧 없이 생성이 진행되지 않게 한다.

## 11. 검증 기준

1. 텔레그램에서 `/detail_create` 명령이 동작한다.
2. Design bot이 사이트를 연다.
3. 테스트 파일을 업로드한다.
4. 1장 생성이 완료된다.
5. ZIP 파일이 다운로드된다.
6. 텔레그램으로 결과가 전달된다.
7. 실패 시 상태와 원인이 표시된다.
8. 동시에 2개 작업을 보냈을 때 파일이 섞이지 않는다.

## 12. 마스터에게 요청할 정보

1. Design bot 설치 최종 경로
2. Design bot 텔레그램 봇 토큰
3. 테스트용 텔레그램 chat_id
4. Phoenix detail page 배포 URL
5. 봇이 사용할 로그인 계정
6. 봇 작업 결과 저장 폴더
7. V1.5 크레딧 차감 적용 여부


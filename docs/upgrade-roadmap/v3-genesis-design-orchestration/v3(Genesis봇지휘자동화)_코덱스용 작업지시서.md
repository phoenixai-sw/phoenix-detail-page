# V3(Genesis봇지휘자동화) 코덱스용 작업지시서

## 1. 작업 목표

V3는 Genesis bot을 비서실장처럼 사용해 Design bot을 지휘하고, Design bot이 Phoenix detail page 웹사이트를 컨트롤해 상세페이지를 생성한 뒤 결과를 텔레그램으로 전달하는 단계다.

목표 흐름:

```text
마스터가 Genesis bot에게 요청
→ Genesis bot이 요구사항 분석
→ Genesis bot이 Design bot에게 구조화된 작업 지시
→ Design bot이 Phoenix detail page 웹사이트 조작
→ 결과 생성 및 다운로드
→ Design bot이 텔레그램으로 결과 전달
→ Genesis bot이 최종 보고
```

## 2. 실행 가능 여부

실행 가능하다.

로컬 자료에서 Genesis bot 패키지와 Design bot 설치 자료가 확인되었다. 다만 V3는 V2가 먼저 안정화되어야 한다. Genesis bot은 직접 웹사이트를 조작하기보다 Design bot에게 명령을 전달하고 진행 상태를 관리하는 역할이 적합하다.

## 3. 전제 조건

1. V1 Google 로그인/DB/Storage 완료
2. 가능하면 V1.5 결제/크레딧 완료
3. V2 Design bot 텔레그램 자동화 완료
4. Genesis bot 실행 가능
5. Genesis bot과 Design bot 간 메시지 전달 방식 확정
6. 작업 상태를 저장할 DB 또는 로컬 job store 준비

## 4. 역할 분리

### 4.1 Genesis bot

역할:

1. 마스터의 자연어 요청 이해
2. 필요한 정보 질문
3. 작업 요구사항 정리
4. Design bot에게 작업 지시
5. 진행 상태 모니터링
6. 실패 시 재시도 또는 마스터 확인 요청
7. 최종 결과 보고

### 4.2 Design bot

역할:

1. Genesis bot이 준 구조화 명령 수신
2. Phoenix detail page 접속
3. 파일 업로드
4. 상세페이지 생성
5. 결과 다운로드
6. 텔레그램 결과 전달
7. 작업 상태 반환

### 4.3 Phoenix detail page

역할:

1. 안정적인 웹 생성 도구
2. 자동화용 테스트 ID 제공
3. 프로젝트 저장
4. 결과 다운로드
5. 작업 상태 API 제공 가능

## 5. 봇 간 명령 프로토콜

Genesis bot이 Design bot에게 보내는 작업 명령은 자연어만 쓰지 말고 구조화한다.

예시:

```json
{
  "job_type": "detail_page_create",
  "requester": "genesis_bot",
  "telegram_chat_id": "123456789",
  "product_name": "피닉스 테스트 상품",
  "page_count": 8,
  "aspect_ratio": "9:16",
  "channel": "맞춤형 웹/앱",
  "prompt": "모바일 첫화면에서 혜택이 잘 보이게",
  "source_files": [],
  "delivery": {
    "send_zip": true,
    "send_preview": true
  }
}
```

## 6. 작업 상태 동기화

권장 상태:

```text
requested
validated
sent_to_design_bot
accepted_by_design_bot
running
waiting_for_generation
completed
failed
needs_master_input
cancelled
```

Genesis bot은 Design bot이 반환하는 상태를 보고 마스터에게 적절히 보고한다.

## 7. V3 구현 범위

Genesis bot 쪽:

1. 상세페이지 생성 요청 intent 추가
2. 부족한 정보 질문 로직 추가
3. Design bot 명령 생성기 추가
4. job_id 발급
5. 진행 상태 모니터링
6. 최종 보고 템플릿 추가

Design bot 쪽:

1. Genesis bot 명령 수신 엔드포인트 또는 명령 파일 감시
2. 구조화 JSON 검증
3. 작업 승인/거절 응답
4. 진행 상태 반환
5. 결과 파일 경로/URL 반환

Phoenix detail page 쪽:

1. V2에서 만든 자동화용 식별자 유지
2. 클라우드 저장 URL 안정화
3. 생성 상태 확인 API 검토
4. 결과 ZIP 다운로드 안정화

## 8. 장애 처리

1. Design bot이 응답하지 않으면 Genesis bot이 마스터에게 보고한다.
2. 웹사이트 생성이 실패하면 실패 원인과 재시도 옵션을 보고한다.
3. 크레딧 부족이면 결제 또는 충전 안내를 보고한다.
4. 파일이 너무 크면 압축 또는 분할 업로드를 안내한다.
5. 작업이 오래 걸리면 중간 상태를 주기적으로 보고한다.

## 9. 금지 사항

1. Genesis bot이 Design bot 상태를 모른 채 완료 보고하지 않는다.
2. 자연어 지시만으로 봇 간 작업을 넘기지 않는다.
3. 같은 job_id로 중복 생성하지 않는다.
4. 실패한 작업을 성공으로 표시하지 않는다.
5. 유저 API 키나 결제 정보를 텔레그램에 평문 노출하지 않는다.

## 10. 검증 기준

1. Genesis bot에게 자연어로 상세페이지 생성을 요청한다.
2. Genesis bot이 부족한 정보를 질문한다.
3. Genesis bot이 Design bot에게 구조화 명령을 보낸다.
4. Design bot이 작업을 수락한다.
5. Design bot이 Phoenix detail page를 조작한다.
6. 결과가 텔레그램으로 전달된다.
7. Genesis bot이 최종 완료 보고를 한다.
8. 실패 시 Genesis bot이 원인과 다음 행동을 안내한다.

## 11. 마스터에게 요청할 정보

1. Genesis bot 설치 최종 경로
2. Genesis bot 텔레그램 봇 토큰
3. Design bot 명령 수신 방식
4. 봇 간 통신 방식
5. 마스터 텔레그램 chat_id
6. 작업 승인 없이 자동 실행할 범위
7. 결제/크레딧 부족 시 처리 정책


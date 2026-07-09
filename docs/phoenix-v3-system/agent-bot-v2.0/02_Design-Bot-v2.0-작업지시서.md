# Design Bot v2.0 작업지시서

## 1. 목표

Design Bot v2.0은 시각 결과물을 만드는 agent web을 컨트롤한다.

```text
phoenix pages  = 상세페이지 생성
phoenix slides = PPT 생성
phoenix webs   = 웹사이트/랜딩페이지 HTML 생성
phoenix images = 제품 목업/제품컷/카드뉴스/썸네일 생성
```

## 2. 추가할 스킬 폴더

```text
installer/design_web_control_skills/
```

권장 하위 파일:

```text
SKILL.md
pages_workflow.md
slides_workflow.md
webs_workflow.md
images_workflow.md
selectors.md
telegram_delivery.md
failure_handling.md
```

## 3. 자동화 기준

Design Bot은 화면 텍스트보다 `data-testid`를 우선 사용한다.

필수 prefix:

```text
phoenix-pages-*
phoenix-slides-*
phoenix-webs-*
phoenix-images-*
```

## 4. 공통 작업 흐름

1. 사이트 접속
2. 로그인 또는 API 키 설정 확인
3. 참고자료 업로드 또는 입력
4. 생성 조건 선택
5. 생성 실행
6. 결과 대기
7. 결과 다운로드
8. Telegram 전달
9. phoenix command에 상태 보고

## 5. 실패 처리

1. 업로드 실패
2. API 키 없음
3. 생성 타임아웃
4. 결과 없음
5. 다운로드 실패
6. Telegram 전송 실패

각 실패는 마스터에게 짧고 명확하게 보고한다.

## 6. 금지 사항

1. API 키를 Telegram에 다시 출력하지 않는다.
2. 실패한 결과를 성공으로 보고하지 않는다.
3. 파일이 너무 큰데 무조건 Telegram으로 보내려 하지 않는다.
4. Genesis Bot의 승인 정책을 무시하지 않는다.

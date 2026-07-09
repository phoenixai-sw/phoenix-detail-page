# Writer Bot v2.0 작업지시서

## 1. 목표

Writer Bot v2.0은 문서와 카피라이팅 결과물을 만드는 `phoenix books`를 컨트롤한다.

```text
phoenix books = 강의교안 / SNS 카피라이팅 / 문서 결과물 생성
```

## 2. 추가할 스킬 폴더

```text
installer/writer_web_control_skills/
```

권장 하위 파일:

```text
SKILL.md
books_workflow.md
copywriting_workflow.md
document_export.md
selectors.md
telegram_delivery.md
failure_handling.md
```

## 3. phoenix books 작업 흐름

1. 사이트 접속
2. 결과물 유형 선택
3. 주제 입력
4. 대상 독자/수강생 입력
5. 톤앤매너 선택
6. 분량 선택
7. 목차 생성
8. 본문 생성
9. 미리보기 확인
10. DOCX/PDF 다운로드
11. Telegram 전달

## 4. 결과물 유형

1. 강의교안
2. 강의 대본
3. SNS 카피 묶음
4. 카드뉴스 문안
5. 실습 과제
6. 체크리스트
7. 출판 원고 초안

## 5. 자동화 기준

Writer Bot은 `data-testid`를 우선 사용한다.

필수 prefix:

```text
phoenix-books-*
```

## 6. 품질 기준

1. 생성 문안은 바로 최종본으로 단정하지 않는다.
2. 목차와 본문 구조가 맞는지 확인한다.
3. 문체가 요청 톤과 맞는지 확인한다.
4. 출처가 필요한 자료는 출처 필요 여부를 표시한다.
5. DOCX/PDF 다운로드가 실제로 가능한지 확인한다.

## 7. 실패 처리

1. 주제 입력 누락
2. 생성 타임아웃
3. 문서 export 실패
4. 파일 용량 초과
5. Telegram 전달 실패

실패 시 Writer Bot은 원인, 재시도 가능 여부, 다음 행동을 함께 보고한다.

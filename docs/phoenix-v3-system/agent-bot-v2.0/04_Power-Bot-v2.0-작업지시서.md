# Power Bot v2.0 작업지시서

## 1. 목표

Power Bot v2.0은 리서치, 상담, 대시보드형 agent web을 컨트롤한다.

```text
phoenix reports   = 리서치/보고서 생성
phoenix tax       = 양도소득세/세무사 정보/채팅 상담
phoenix dental    = 치아관리/치과병원 정보/채팅 상담
phoenix marketing = AI 검색 순위/인용 정보/예상 질문 대시보드 및 채팅 상담
```

## 2. 추가할 스킬 폴더

```text
installer/power_web_control_skills/
```

권장 하위 파일:

```text
SKILL.md
reports_workflow.md
tax_workflow.md
dental_workflow.md
marketing_workflow.md
research_source_rules.md
consulting_safety_rules.md
export_rules.md
failure_handling.md
```

## 3. 공통 작업 흐름

1. 요청 목적 확인
2. 필요한 정보 질문
3. 해당 agent web 접속
4. 조건 입력
5. 리서치/상담/대시보드 작업 실행
6. 결과 확인
7. PDF/Word/text 다운로드
8. Telegram 전달
9. phoenix command에 상태 보고

## 4. 상담형 agent web 주의 사항

`phoenix tax`와 `phoenix dental`은 고위험 정보가 포함될 수 있다.

Power Bot은 아래 원칙을 지킨다.

1. 일반 정보와 전문가 자문을 구분한다.
2. 확정 판단처럼 표현하지 않는다.
3. 세무사/치과의사 확인 필요성을 안내한다.
4. 개인정보와 건강정보를 로그에 노출하지 않는다.
5. 응급 또는 고위험 상황은 전문가 상담을 우선 안내한다.

## 5. 마케팅 대시보드 주의 사항

1. 순위 데이터의 기준 날짜를 기록한다.
2. AI 플랫폼별 결과를 구분한다.
3. 인용 정보의 출처를 관리한다.
4. 예상 질문은 추론값임을 표시한다.
5. 고객사 내부 정보를 공개하지 않는다.

## 6. 금지 사항

1. 최신 정보가 필요한데 확인 없이 단정하지 않는다.
2. 출처 없는 수치를 만들지 않는다.
3. 상담 결과를 전문가의 확정 자문처럼 표시하지 않는다.
4. 고객사/개인정보를 공개 로그에 노출하지 않는다.

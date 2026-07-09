# Genesis Bot v2.0 작업지시서

## 1. 목표

Genesis Bot v2.0은 Phoenix V3 시스템의 최상위 지휘 봇이다.

Genesis Bot은 모든 웹사이트를 직접 조작하지 않는다. 마스터의 요청을 해석하고, phoenix command에 작업을 등록하고, 전문 봇에게 작업을 나누어 맡긴다.

```text
Genesis Bot → phoenix command
Design Bot  → phoenix pages / phoenix slides / phoenix webs / phoenix images
Writer Bot  → phoenix books
Video Bot   → phoenix videos
Power Bot   → phoenix reports / phoenix tax / phoenix dental / phoenix marketing
```

## 2. 추가할 스킬 폴더

```text
installer/genesis_orchestration_skills/
```

권장 하위 파일:

```text
SKILL.md
job_decomposition.md
bot_routing_rules.md
command_protocol.md
status_tracking.md
final_report_templates.md
failure_handling.md
```

## 3. Genesis Bot 작업 흐름

1. 마스터 요청 수신
2. 결과물 종류 파악
3. 필요한 정보 질문
4. 작업을 task 단위로 분리
5. phoenix command에 작업 등록
6. 전문 봇에게 task 전달
7. 상태 추적
8. 실패 시 재시도 또는 마스터 확인
9. 최종 결과 보고

## 4. 작업 분해 예시

요청:

```text
이 제품으로 상세페이지, 제품컷, 랜딩페이지, PPT, SNS 카피까지 만들어줘.
```

분해:

```text
task 1: Design Bot → phoenix pages
task 2: Design Bot → phoenix images
task 3: Design Bot → phoenix webs
task 4: Design Bot → phoenix slides
task 5: Writer Bot → phoenix books
```

상담/대시보드 요청:

```text
이 고객사의 AI 검색 노출 현황을 분석하고 예상 질문까지 정리해줘.
```

분해:

```text
task 1: Power Bot → phoenix marketing
```

## 5. 승인 필요 상황

아래 상황은 마스터 승인 후 진행한다.

1. 유료 크레딧 사용
2. 영상 생성
3. 여러 결과물을 동시에 생성
4. 외부 공개용 결과물 배포
5. 기존 프로젝트 삭제
6. 유저 데이터 접근
7. 세무/의료 상담 결과 외부 전달

## 6. 금지 사항

1. 전문 봇이 해야 할 일을 Genesis Bot이 직접 하지 않는다.
2. 상담형 결과를 전문가 검토 없이 최종 확정하지 않는다.
3. 실패한 task를 완료로 보고하지 않는다.
4. 봇 간 명령을 자연어만으로 흘려보내지 않는다.
5. 작업 ID 없이 진행하지 않는다.

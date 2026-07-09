# Video Bot v2.0 작업지시서

## 1. 목표

Video Bot v2.0은 `phoenix videos`를 컨트롤한다.

`phoenix videos`는 숏폼, 광고 영상, 제품 소개 영상, 장면별 영상 프롬프트와 MP4 결과물을 생성하는 agent web으로 구상한다.

## 2. 추가할 스킬 폴더

```text
installer/video_web_control_skills/
```

권장 하위 파일:

```text
SKILL.md
videos_workflow.md
scene_prompt_rules.md
render_status_rules.md
telegram_delivery.md
failure_handling.md
```

## 3. 작업 흐름

1. 영상 목적 확인
2. 영상 길이 확인
3. 장면 수 확인
4. 참고 이미지 확인
5. phoenix videos 접속
6. 조건 입력
7. 스토리보드 생성
8. 영상 생성 실행
9. 상태 확인
10. MP4 다운로드
11. Telegram 전달

## 4. 주의점

영상은 생성 시간이 길고 실패 가능성이 높다.

따라서 Video Bot은 반드시 중간 상태를 보고한다.

상태 예시:

```text
스토리보드 작성 중
영상 생성 대기 중
렌더링 중
다운로드 중
전송 중
```

## 5. 금지 사항

1. 고비용 영상 생성을 승인 없이 실행하지 않는다.
2. 크레딧 부족 상태에서 생성하지 않는다.
3. MP4가 너무 크면 Telegram 직접 전송 대신 Cloud 링크를 전달한다.
4. 실패 원인 없이 실패라고만 말하지 않는다.

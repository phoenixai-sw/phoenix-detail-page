# age of agent - phoenix agent bots & agent webs

## 1. 에이전트의 시대

AI는 처음에는 대답하는 도구처럼 보였다.

사람이 질문하면 AI가 답했다. 사람이 요청하면 AI가 문장을 만들었다. 그러나 에이전트 시대에는 역할이 달라진다.

에이전트는 단순히 답을 말하는 존재가 아니라, 일을 맡아 실행하는 존재가 된다.

접속하고, 판단하고, 입력하고, 생성하고, 저장하고, 상담하고, 보고한다. 이 변화는 웹사이트의 의미도 바꾼다.

## 2. 웹사이트는 화면에서 작업장으로 바뀐다

기존의 웹사이트는 사람을 위한 화면이었다.

사람이 메뉴를 보고, 버튼을 누르고, 파일을 올리고, 결과를 내려받았다.

하지만 에이전트가 실제 업무를 맡기 시작하면 웹사이트는 새로운 조건을 갖춰야 한다. 사람이 보기 쉬워야 하고, 동시에 봇이 조작하기 쉬워야 한다.

이런 웹사이트를 Phoenix에서는 `agent webs`라고 부른다.

## 3. phoenix command가 최상위에 있는 이유

agent web이 많아질수록 전체 상태를 지휘하는 웹이 필요하다.

그래서 Phoenix 구조에서는 `phoenix command`를 최상위에 둔다.

`phoenix command`는 직접 모든 결과물을 만드는 웹이 아니다. 대신 어떤 작업이 요청되었는지, 어떤 봇이 맡았는지, 어떤 agent web에서 진행 중인지, 결과물이 어디에 저장되었는지를 보여준다.

사람은 phoenix command를 통해 전체 업무를 보고, Genesis Bot은 phoenix command를 통해 작업을 등록하고 추적한다.

## 4. Phoenix Agent Bots

Genesis Bot은 비서실장처럼 전체 요청을 해석하고 작업을 나눈다.

Design Bot은 시각 결과물을 담당한다. 상세페이지, PPT, 랜딩페이지, 제품 이미지, 카드뉴스, 썸네일 같은 결과물을 만든다.

Writer Bot은 문서와 카피를 담당한다. 강의교안, SNS 카피, 카드뉴스 문안, 출판 원고 초안 같은 텍스트 결과물을 만든다.

Video Bot은 영상 결과물을 담당한다.

Power Bot은 리서치, 상담, 대시보드형 업무를 담당한다. 보고서, 세무 상담, 치과 상담, AI 검색 마케팅 분석 같은 작업을 맡는다.

중요한 점은 봇이 혼자 모든 일을 하지 않는다는 것이다. 각 봇은 자기에게 맞는 agent web을 컨트롤한다.

## 5. Phoenix Agent Webs

`phoenix command`는 전체 지휘와 상태 관리를 담당한다.

`phoenix pages`는 상세페이지 생성 웹이다. 현재 실제로 구축되어 있는 V0 웹사이트다.

`phoenix slides`는 PPT 생성 웹이다. Design Bot이 컨트롤한다.

`phoenix videos`는 영상 생성 웹이다. Video Bot이 컨트롤한다.

`phoenix reports`는 리서치/보고서 생성 웹이다. Power Bot이 컨트롤한다.

`phoenix webs`는 웹사이트/랜딩페이지 HTML 생성 웹이다. Design Bot이 컨트롤한다.

`phoenix books`는 강의교안/SNS 카피라이팅 생성 웹이다. Writer Bot이 컨트롤한다.

`phoenix images`는 제품 목업, 제품컷, 카드뉴스, 썸네일 이미지 생성 웹이다. Design Bot이 컨트롤한다.

`phoenix tax`는 양도소득세와 세무사 사무실 정보, 세무사님 소개, 채팅 상담을 제공하는 웹이다. Power Bot이 컨트롤한다.

`phoenix dental`은 치아관리와 치과병원 정보, 치과원장님 소개, 채팅 상담을 제공하는 웹이다. Power Bot이 컨트롤한다.

`phoenix marketing`은 고객사별 AI 검색 순위, AI 플랫폼별 인용 정보, 예상 AI 검색 질문을 관리하는 대시보드와 채팅 상담 웹이다. Power Bot이 컨트롤한다.

## 6. 봇과 웹이 함께 움직이는 구조

예를 들어 마스터가 이렇게 말한다고 하자.

```text
이 제품으로 상세페이지, 제품컷, 랜딩페이지, PPT, SNS 카피까지 만들어줘.
```

Genesis Bot은 이 요청을 하나의 큰 작업으로 보고, 여러 task로 나눈다.

상세페이지는 Design Bot에게 맡긴다.

제품컷과 썸네일도 Design Bot에게 맡긴다.

랜딩페이지도 Design Bot에게 맡긴다.

PPT도 Design Bot에게 맡긴다.

SNS 카피와 교안은 Writer Bot에게 맡긴다.

그 사이 `phoenix command`는 전체 작업 상태를 보여준다. 어떤 작업이 진행 중인지, 어떤 작업이 실패했는지, 어떤 결과물이 완성됐는지 한 곳에서 볼 수 있다.

## 7. 상담형 agent web의 확장

agent web은 이미지나 문서 생성에만 쓰이지 않는다.

`phoenix tax`와 `phoenix dental`처럼 특정 전문가 영역의 정보와 상담을 제공할 수도 있다.

다만 세무와 의료는 고위험 정보다. 따라서 일반 정보와 전문가 자문을 구분해야 한다. AI가 세무사나 치과의사를 대신해 확정 판단을 내려서는 안 된다.

`phoenix marketing`은 또 다른 방향의 agent web이다. 고객사별 AI 검색 순위, 인용 정보, 예상 질문을 대시보드로 관리하고, Power Bot이 이를 기반으로 상담과 보고서를 만든다.

## 8. 현재는 V0에서 시작한다

중요한 것은 순서다.

처음부터 거대한 자동화 시스템을 만들면 위험하다. 먼저 사람이 직접 쓸 수 있는 웹사이트가 안정적으로 작동해야 한다.

현재 `phoenix pages`는 그 출발점이다.

V0에서는 브라우저 저장, 로컬 다운로드, 상세페이지 생성, 개별 편집 같은 기본 기능을 다듬는다.

V1에서는 로그인, Supabase Database, Supabase Storage를 붙인다.

V1.5에서는 결제와 크레딧을 붙인다.

V2에서는 봇이 조작하기 쉬운 자동화 구조를 강화한다.

V3에서는 Phoenix Agent Bot v2.0과 agent webs가 연결된다.

## 9. 결론

에이전트 시대에는 웹사이트가 바뀐다.

좋은 웹사이트는 사람이 직접 쓰기 쉬운 동시에 봇이 안정적으로 조작할 수 있어야 한다.

Phoenix는 이 구조를 `agent webs`라고 부른다.

Genesis Bot은 지휘하고, Design Bot은 시각 결과물을 만들고, Writer Bot은 문서와 카피를 만들고, Video Bot은 영상을 만들고, Power Bot은 리서치와 상담형 업무를 맡는다.

그리고 그 모든 흐름의 최상위에는 `phoenix command`가 있다.

## 10. Phoenix Agent v2.0의 정확한 의미

Phoenix Agent v2.0은 단순히 봇 이름을 늘리는 버전이 아니다.

v2.0의 핵심은 `Web Control Agent`다. 즉 Telegram과 OpenClaw 기반으로 운영되던 기존 봇들이, 이제 담당 웹사이트에 접속하고 화면을 조작하고 결과물을 저장할 수 있도록 만드는 단계다.

여기서 중요한 것은 기존 안정판을 무너뜨리지 않는 것이다. v1.9에서 안정적으로 작동하던 Telegram token 처리, chat id 처리, PM2 online 상태, OpenClaw gateway, config validate, outputs 저장, logs 보존 구조는 그대로 유지해야 한다.

v2.0은 새로운 시스템을 무리하게 덧씌우는 작업이 아니다. 이미 안정화된 봇 운영 구조 위에, 웹을 조작하는 능력을 추가하는 작업이다.

Phoenix 구조에서는 이를 아래처럼 구분한다.

```text
v2.0 = Web Control Agent
v2.2 = Master Builder Agent
```

v2.0은 봇이 웹을 실제로 조작하는 단계다.

v2.2는 봇이 작업 경험을 바탕으로 스킬 개선안을 만들고, Genesis Bot이 이를 정리하고, 마스터 승인 후 updater로 반영하는 단계다.

이 구분은 독자에게 중요하다. 처음부터 봇이 스스로 모든 것을 바꾸게 만들면 위험하다. 먼저 사람의 승인 아래에서 웹을 안정적으로 조작하는 구조를 만들고, 그 다음에 개선 제안과 스킬 업데이트로 넘어가야 한다.

## 11. 왜 Playwright MCP와 data-testid가 필요한가

사람은 화면을 보고 대충 알아차린다.

버튼 색이 조금 바뀌어도, 위치가 조금 달라져도, 문구가 약간 바뀌어도 사람은 의미를 이해한다.

하지만 봇은 다르다. 봇이 웹을 조작하려면 “어떤 입력창에 무엇을 넣을지”, “어떤 버튼을 눌러야 할지”, “생성 중인지 실패했는지”, “다운로드 버튼이 어디 있는지”를 안정적으로 찾아야 한다.

그래서 Playwright MCP와 `data-testid`가 필요하다.

Playwright는 브라우저를 실제로 조작하는 자동화 엔진이다. Playwright MCP는 에이전트가 Playwright를 더 안정적으로 사용할 수 있게 연결하는 방식이다.

`data-testid`는 봇이 화면 요소를 찾는 이름표다.

예를 들어 사람에게는 “다운로드 버튼”이 보이면 충분하다. 그러나 봇에게는 아래처럼 안정적인 이름이 필요하다.

```tsx
<button data-testid="phoenix-pages-download-zip">
  결과 다운로드
</button>
```

이렇게 해두면 디자인이 조금 바뀌어도 봇은 같은 버튼을 찾을 수 있다.

Agent Webs는 보기 좋은 웹사이트일 뿐 아니라, 봇이 안정적으로 찾을 수 있는 웹사이트여야 한다.

## 12. 구조화 task가 필요한 이유

Genesis Bot은 비서실장 역할을 한다.

하지만 Genesis Bot이 전문 봇에게 일을 넘길 때 단순히 “이거 해줘”라고 말하면 안 된다. 그러면 어떤 웹에서 어떤 작업을 해야 하는지, 승인이 필요한지, 결과를 어디에 저장해야 하는지 흐려진다.

그래서 Phoenix Agent v2.0은 구조화 task를 사용한다.

예시는 아래와 같다.

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

입문자는 이 JSON을 외울 필요는 없다.

핵심은 간단하다.

1. 어떤 일인지 번호를 붙인다.
2. 어떤 봇이 맡을지 정한다.
3. 어떤 웹사이트에서 실행할지 정한다.
4. 입력값을 정리한다.
5. 승인 필요 여부를 표시한다.
6. 결과를 어디에 저장하고 어떻게 전달할지 정한다.

이 구조가 있으면 봇끼리 일할 때 혼선이 줄어든다.

## 13. outputs 저장과 Telegram 선택 전송

Phoenix Agent v2.0의 기본 결과 저장 위치는 로컬 `outputs`다.

봇은 결과물을 만든 뒤 곧바로 Telegram에 보내지 않는다. 먼저 로컬에 저장하고, 그 다음 유저에게 묻는다.

```text
결과물은 로컬 outputs 폴더에 저장했습니다.
텔레그램으로도 결과물을 보실래요?
```

이 방식은 단순해 보이지만 중요하다.

파일이 크면 Telegram 전송에 실패할 수 있다. 영상이나 ZIP 파일은 용량 제한에 걸릴 수 있다. 또한 어떤 결과물은 검토 전 외부 채널로 보내면 안 될 수도 있다.

그래서 Phoenix 구조에서는 기본 저장과 선택 전송을 분리한다.

1. 먼저 `outputs`에 저장한다.
2. 파일명과 경로를 안내한다.
3. 필요하면 ZIP으로 묶는다.
4. Telegram 전송 여부를 묻는다.
5. 유저가 원할 때만 보낸다.

이 원칙은 출판 원고에서도 반복해서 설명해야 한다. 입문자는 자동화가 강력할수록 “전송 전에 한 번 묻는 장치”가 왜 중요한지 이해해야 한다.

## 14. 승인 정책은 브레이크가 아니라 안전장치다

Phoenix Agent v2.0에서 아래 작업은 반드시 마스터 승인 후 진행한다.

1. 영상 생성
2. 유료 크레딧 사용
3. 외부 배포
4. 세무/의료 상담 결과 전달
5. 프로젝트 삭제
6. 여러 agent web 동시 실행
7. 대량 파일 생성/삭제

이 정책은 봇의 속도를 떨어뜨리려는 것이 아니다.

비용이 발생하거나, 외부에 공개되거나, 삭제가 일어나거나, 세무/의료처럼 오해의 위험이 큰 결과를 전달할 때는 사람의 확인이 필요하다.

좋은 에이전트 시스템은 무조건 자동으로 밀어붙이는 시스템이 아니다. 자동화할 부분과 사람이 승인할 부분을 정확히 나누는 시스템이다.

Phoenix의 승인 정책은 그 경계선이다.

## 15. installer, updater, cleaner의 역할

입문자가 Agent 설치 패키지를 볼 때 가장 헷갈리는 부분이 `installer`, `updater`, `cleaner`다.

세 폴더의 역할은 다르다.

`installer`는 새로 설치할 때 사용한다.

Windows 11에서는 `.ps1` 파일을 사용하고, macOS에서는 `.command`와 `.sh` 파일을 사용한다.

`updater`는 기존 설치본을 새 버전으로 올릴 때 사용한다. v2.0 updater는 v1.9의 token, chat id, outputs, logs, PCS/PTS 스킬을 보존하면서 web control skill을 추가해야 한다.

`cleaner`는 삭제와 정리를 담당한다. 하지만 cleaner가 GitHub 저장소나 외부 배포물을 삭제해서는 안 된다. 또한 outputs를 지울 때는 백업 여부를 물어야 한다.

이 구분을 알면 설치 패키지 구조가 무섭지 않다.

```text
installer = 새로 설치
updater   = 기존 설치본 승급
cleaner   = 로컬 봇과 관련 파일 정리
```

## 16. 입문자가 기억해야 할 한 문장

Phoenix Agent Bots는 사람처럼 웹을 보고, 사람처럼 버튼을 누르는 것처럼 보일 수 있다.

하지만 실제로는 안정적인 이름표, 명확한 작업 지시, 저장 정책, 승인 정책이 있어야 움직인다.

그래서 Agent Webs는 멋진 화면보다 더 넓은 의미를 가진다.

Agent Webs는 사람이 쓰는 화면이자, 봇이 일하는 작업장이다.

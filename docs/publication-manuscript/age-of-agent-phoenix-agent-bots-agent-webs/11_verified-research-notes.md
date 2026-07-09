# 검증된 기술 근거 리서치 노트

## 1. 이 문서의 목적

이 문서는 출판 원고를 확장할 때 참고할 검증 자료를 정리한다.

집필 모델은 이 문서를 그대로 복사하지 않는다. 대신 공식 문서의 의미를 Phoenix 시스템 맥락에 맞게 풀어 쓴다.

아래 링크는 원고의 기술적 근거로 사용할 수 있다.

## 2. GitHub Desktop과 저장소 clone

공식 근거:

- GitHub Docs, Cloning a repository from GitHub to GitHub Desktop: https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-a-repository-from-github-to-github-desktop
- GitHub Docs, Cloning and forking repositories from GitHub Desktop: https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop

원고에 반영할 핵심:

GitHub Desktop은 입문자가 저장소를 로컬로 가져오기 쉽게 해준다. 책에서는 CLI clone만 설명하지 말고, GitHub Desktop의 `File > Clone Repository` 흐름도 함께 설명한다.

입문자용 설명 문장:

```text
GitHub 저장소는 인터넷에 있는 프로젝트 폴더다. clone은 그 폴더를 내 컴퓨터로 복사해 작업 가능한 상태로 만드는 과정이다.
```

주의할 점:

1. clone한 폴더와 ZIP으로 다운로드한 폴더는 겉보기에는 비슷해 보일 수 있다.
2. 하지만 clone은 Git 기록과 원격 저장소 연결을 유지한다.
3. ZIP 다운로드는 단순 파일 복사에 가깝다.
4. 출판 원고에서는 초보자에게 두 방법을 모두 허용하되, 장기 운영은 clone을 권장한다.

## 3. Vercel 배포와 환경변수

공식 근거:

- Vercel Docs, Environment Variables: https://vercel.com/docs/environment-variables
- Vercel Docs, Deploying Git Repositories with Vercel: https://vercel.com/docs/git
- Vercel Docs, Environments: https://vercel.com/docs/deployments/environments
- Vercel Docs, Sensitive Environment Variables: https://vercel.com/docs/environment-variables/sensitive-environment-variables

원고에 반영할 핵심:

Vercel은 GitHub 저장소를 연결하고, Framework Preset, Root Directory, Build Output Settings, Environment Variables를 설정해 배포할 수 있다.

Vercel 환경변수는 소스코드 밖에서 관리하는 key-value 설정이다. API key처럼 노출되면 안 되는 값은 코드에 직접 쓰지 않고 환경변수로 넣는다.

입문자용 설명 문장:

```text
환경변수는 코드 안에 직접 적지 않는 설정값이다. API key처럼 숨겨야 하는 값은 GitHub에 올리지 말고 배포 플랫폼의 환경변수 메뉴에 넣는다.
```

Phoenix 원고 적용:

1. `phoenix pages`는 Vercel을 메인 배포 플랫폼으로 설명한다.
2. 이미지 생성처럼 시간이 오래 걸릴 수 있는 작업은 Vercel 기준으로 먼저 테스트한다.
3. Local, Preview, Production 환경을 구분해 설명한다.
4. 운영 중 환경변수를 바꿨다면 다시 배포해야 실제 서비스에 반영될 수 있음을 안내한다.

## 4. Netlify 배포와 환경변수

공식 근거:

- Netlify Docs, Build environment variables: https://docs.netlify.com/build/configure-builds/environment-variables/
- Netlify Docs, Get started with environment variables: https://docs.netlify.com/build/environment-variables/get-started/
- Netlify Docs, Build configuration overview: https://docs.netlify.com/build/configure-builds/overview/
- Netlify Docs, File-based configuration: https://docs.netlify.com/build/configure-builds/file-based-configuration/

원고에 반영할 핵심:

Netlify는 GitHub 같은 Git provider와 연결해 continuous deployment를 구성할 수 있다. 환경변수는 UI, CLI, API, configuration file 등 여러 방식으로 설정할 수 있다.

공식 문서에서는 민감한 값은 Netlify UI를 사용하는 편이 좋다고 설명한다. 원고에서도 secret 값은 저장소 파일에 넣지 말고 UI에서 관리하도록 안내한다.

Phoenix 원고 적용:

1. `phoenix pages`를 제외한 agent web은 Netlify 기준으로 설명한다.
2. 정적 웹, 랜딩페이지, 대시보드, 문서형 웹은 Netlify와 잘 맞는다고 설명한다.
3. 장시간 생성 작업은 타임아웃과 백엔드 구조를 검토해야 한다고 안내한다.
4. Build command와 Publish directory를 입문자용으로 따로 설명한다.

## 5. Playwright locator와 data-testid

공식 근거:

- Playwright Docs, Locators: https://playwright.dev/docs/locators
- Playwright Docs, Locator API: https://playwright.dev/docs/api/class-locator
- Playwright Docs, Other locators: https://playwright.dev/docs/other-locators
- Playwright Docs, Best Practices: https://playwright.dev/docs/best-practices

원고에 반영할 핵심:

Playwright는 locator를 사용해 화면 요소를 찾는다. `getByTestId()`는 기본적으로 `data-testid` 속성을 기준으로 요소를 찾는다. test id 속성명은 설정으로 바꿀 수도 있다.

입문자용 설명 문장:

```text
사람은 버튼의 위치와 문구를 보고 누를 수 있지만, 봇은 안정적인 이름표가 필요하다. data-testid는 봇을 위한 이름표다.
```

Phoenix 원고 적용:

1. Agent Webs는 예쁜 화면만으로 충분하지 않다.
2. 봇이 조작해야 하는 입력창, 버튼, 상태, 다운로드 링크에는 안정적인 선택자가 필요하다.
3. `data-testid`는 디자인 변경에 덜 흔들리는 자동화를 만드는 데 도움이 된다.
4. locator가 여러 요소를 가리키면 자동화가 불안정해질 수 있으므로 고유한 이름을 사용한다.

예시:

```tsx
<button data-testid="phoenix-pages-download-zip">결과 다운로드</button>
```

## 6. Telegram BotFather와 Bot API

공식 근거:

- Telegram APIs, From BotFather to Hello World: https://core.telegram.org/bots/tutorial
- Telegram APIs, Bots FAQ: https://core.telegram.org/bots/faq
- Telegram APIs, Bot API: https://core.telegram.org/bots/api
- Telegram APIs, Bot Payments API: https://core.telegram.org/bots/payments

원고에 반영할 핵심:

Telegram bot은 BotFather를 통해 계정을 만들고 token을 발급받아 backend server 또는 봇 런타임과 연결한다.

입문자용 설명 문장:

```text
BotFather는 Telegram 봇을 만드는 관리 봇이다. 여기서 새 봇을 만들고 token을 발급받는다. 이 token은 비밀번호처럼 다뤄야 한다.
```

Phoenix 원고 적용:

1. `genesis_bot`, `power_bot`, `design_bot`, `video_bot`, `writer_bot` 기준을 설명한다.
2. 실제 username이 이미 사용 중이면 회사 규칙에 맞게 접두어나 접미사를 붙일 수 있다고 안내한다.
3. token과 chat id를 구분한다.
4. Telegram 전송은 결과 생성과 별개 단계라고 설명한다.
5. 결제나 유료 기능과 연결될 수 있는 작업은 승인 정책과 함께 설명한다.

## 7. Supabase Auth, Database, Storage

공식 근거:

- Supabase Docs, Auth: https://supabase.com/docs/guides/auth
- Supabase Docs, Login with Google: https://supabase.com/docs/guides/auth/social-login/auth-google
- Supabase Docs, Database Overview: https://supabase.com/docs/guides/database/overview
- Supabase Docs, Storage: https://supabase.com/docs/guides/storage
- Supabase Docs, Storage Buckets: https://supabase.com/docs/guides/storage/buckets/fundamentals
- Supabase Docs, Storage Access Control: https://supabase.com/docs/guides/storage/security/access-control

원고에 반영할 핵심:

Supabase Auth는 유저 인증을 제공한다. Supabase Database는 Postgres 기반 데이터베이스다. Supabase Storage는 파일 저장과 제공을 담당한다.

Phoenix 원고 적용:

1. V1에서는 로그인, Database, Storage가 붙는다.
2. Supabase Storage는 이미지 파일을 저장한다.
3. Supabase Database는 이미지 URL, 프로젝트명, 유저 정보, 생성 상태를 저장한다.
4. Google 로그인은 Supabase Auth의 social login 흐름으로 설명할 수 있다.
5. Storage bucket은 public/private 접근 모델을 구분해 설명한다.
6. RLS와 접근 정책은 “누가 어떤 파일과 데이터를 볼 수 있는가”를 정하는 장치로 설명한다.

입문자용 설명 문장:

```text
Storage는 파일 창고이고, Database는 파일의 주소와 소유자 정보를 적어두는 장부다.
```

## 8. 출판 원고에서 피해야 할 단정

공식 문서가 계속 바뀔 수 있으므로 아래 표현은 조심한다.

1. “항상 무료다”라고 쓰지 않는다.
2. “무조건 타임아웃이 없다”라고 쓰지 않는다.
3. “이 모델이 가장 싸다”처럼 날짜가 중요한 가격 정보를 단정하지 않는다.
4. “세무/의료 상담을 AI가 해결한다”라고 쓰지 않는다.
5. “Telegram 전송은 항상 성공한다”라고 쓰지 않는다.
6. “Vercel 또는 Netlify 하나만 쓰면 모든 생성형 기능이 해결된다”라고 쓰지 않는다.

권장 표현:

```text
플랫폼 정책과 요금은 바뀔 수 있으므로 실제 운영 전 공식 문서를 확인한다.
```

```text
장시간 생성 작업은 배포 플랫폼, 백엔드 구조, 파일 저장 방식에 따라 안정성이 달라질 수 있다.
```

```text
세무와 의료 관련 결과는 일반 정보이며 최종 판단은 전문가 확인이 필요하다.
```

## 9. 집필 모델에게 주는 조사 활용 지침

집필 모델은 위 공식 문서를 근거로 삼되, 원고에는 독자가 이해할 수 있는 설명을 쓴다.

좋은 방식:

1. 공식 문서의 기능을 확인한다.
2. Phoenix 시스템에서는 그 기능이 어떤 역할인지 해석한다.
3. 입문자용 문장으로 풀어 쓴다.
4. 실습 절차와 실패 대응을 함께 넣는다.

나쁜 방식:

1. 공식 문서를 긴 문장으로 그대로 옮긴다.
2. 출처 없이 기술 정책을 단정한다.
3. 개발자만 이해하는 약어를 설명 없이 사용한다.
4. 예시 secret 값을 만들어 넣는다.

## 10. 원고에 넣을 수 있는 출처 표기 방식

본문에는 지나치게 많은 링크를 넣지 않아도 된다.

장 끝이나 부록에 아래처럼 정리하면 좋다.

```text
참고 공식 문서:
- GitHub Desktop clone documentation
- Vercel deployment and environment variables documentation
- Netlify build and environment variables documentation
- Playwright locators documentation
- Telegram Bot API and BotFather documentation
- Supabase Auth, Database, Storage documentation
```

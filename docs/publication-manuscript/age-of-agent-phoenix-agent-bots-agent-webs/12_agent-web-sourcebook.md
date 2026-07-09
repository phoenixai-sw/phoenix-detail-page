# Agent Web별 확장 원고 소스북

## 1. 이 문서의 목적

이 문서는 각 agent web을 책 속에서 풍부하게 설명하기 위한 원천 자료다.

집필 모델은 각 항목을 바탕으로 장별 원고, 사례, 실습, 체크리스트를 확장한다.

## phoenix command

담당 봇: `Genesis Bot`

역할: 전체 지휘/상태 관리 웹

주요 작업: 작업 등록, 상태 추적, 결과 보고, 승인 대기 관리

배포 기준: `Netlify`

GitHub 저장소: `https://github.com/phoenixai-sw/phoenix-command.git`

상태: 예정

### 책에서 설명할 핵심

phoenix command는 Phoenix Agent Webs 구조 안에서 독립적으로 작동하면서도, Genesis Bot이 조작할 수 있도록 설계되는 웹이다.

이 웹을 설명할 때는 “사람이 직접 쓰는 화면”과 “봇이 조작하는 작업장”이라는 두 관점을 함께 유지해야 한다.

독자는 이 웹이 무엇을 만드는지뿐 아니라, 어떤 봇이 언제 이 웹을 대신 조작하는지 이해해야 한다.

### 사람 사용 시나리오

1. 유저가 브라우저에서 `phoenix command`에 접속한다.
2. 필요한 파일, 텍스트, 설정값을 입력한다.
3. `작업 등록, 상태 추적, 결과 보고, 승인 대기 관리` 흐름을 실행한다.
4. 결과 미리보기를 확인한다.
5. 결과물을 다운로드하거나 저장한다.

### 봇 사용 시나리오

1. Genesis Bot이 작업을 분석한다.
2. 이 작업이 `Genesis Bot` 담당이라고 판단한다.
3. 구조화 task에 `targetWebsite`를 `phoenix command`로 넣는다.
4. Genesis Bot이 웹에 접속한다.
5. `data-testid` 기반으로 입력창과 버튼을 찾는다.
6. 생성 상태를 확인한다.
7. 결과물을 outputs에 저장한다.
8. Telegram 전송 여부를 유저에게 묻는다.

### 필요한 data-testid 예시

```text
phoenix-command-login-status
phoenix-command-upload-input
phoenix-command-generate-button
phoenix-command-status-label
phoenix-command-download-button
```

### 승인 또는 주의가 필요한 지점

1. 민감값이 화면이나 로그에 노출되면 안 된다.
2. 결과물은 먼저 outputs에 저장한다.
3. Telegram 전송은 유저에게 묻고 진행한다.
4. Genesis Bot은 전문 agent web을 직접 조작하지 않고 전문 봇에게 위임한다.
5. 여러 agent web 동시 실행은 승인 후 진행한다.

### 집필 확장 포인트

책에서는 `phoenix command`를 단순 기능 소개로 끝내지 않는다. 독자가 “내가 이 웹을 직접 쓰는 장면”과 “봇이 대신 조작하는 장면”을 함께 상상할 수 있도록 쓴다.

아래 질문에 답하는 식으로 원고를 늘린다.

1. 이 웹은 어떤 사람에게 필요한가?
2. 이 웹을 직접 쓰면 어떤 순서로 작업하는가?
3. 봇이 대신 조작하면 어떤 단계가 자동화되는가?
4. 실패했을 때 어떤 상태 메시지가 나와야 하는가?
5. 결과물은 어디에 저장되고 어떻게 전달되는가?
6. 승인 또는 전문가 확인이 필요한 부분은 무엇인가?

## phoenix pages

담당 봇: `Design Bot`

역할: 상세페이지 생성 웹

주요 작업: 업로드 자료 분석, 상세페이지 생성, 개별 편집, ZIP 다운로드

배포 기준: `Vercel`

GitHub 저장소: `https://github.com/phoenixai-sw/phoenix-detail-page.git`

상태: 실제 존재

### 책에서 설명할 핵심

phoenix pages는 Phoenix Agent Webs 구조 안에서 독립적으로 작동하면서도, Design Bot이 조작할 수 있도록 설계되는 웹이다.

이 웹을 설명할 때는 “사람이 직접 쓰는 화면”과 “봇이 조작하는 작업장”이라는 두 관점을 함께 유지해야 한다.

독자는 이 웹이 무엇을 만드는지뿐 아니라, 어떤 봇이 언제 이 웹을 대신 조작하는지 이해해야 한다.

### 사람 사용 시나리오

1. 유저가 브라우저에서 `phoenix pages`에 접속한다.
2. 필요한 파일, 텍스트, 설정값을 입력한다.
3. `업로드 자료 분석, 상세페이지 생성, 개별 편집, ZIP 다운로드` 흐름을 실행한다.
4. 결과 미리보기를 확인한다.
5. 결과물을 다운로드하거나 저장한다.

### 봇 사용 시나리오

1. Genesis Bot이 작업을 분석한다.
2. 이 작업이 `Design Bot` 담당이라고 판단한다.
3. 구조화 task에 `targetWebsite`를 `phoenix pages`로 넣는다.
4. Design Bot이 웹에 접속한다.
5. `data-testid` 기반으로 입력창과 버튼을 찾는다.
6. 생성 상태를 확인한다.
7. 결과물을 outputs에 저장한다.
8. Telegram 전송 여부를 유저에게 묻는다.

### 필요한 data-testid 예시

```text
phoenix-pages-login-status
phoenix-pages-upload-input
phoenix-pages-generate-button
phoenix-pages-status-label
phoenix-pages-download-button
```

### 승인 또는 주의가 필요한 지점

1. 민감값이 화면이나 로그에 노출되면 안 된다.
2. 결과물은 먼저 outputs에 저장한다.
3. Telegram 전송은 유저에게 묻고 진행한다.
4. 이미지 생성은 응답 시간이 길어질 수 있으므로 실패/재시도 상태를 명확히 표시한다.
5. 대용량 결과물은 ZIP 다운로드와 로컬 저장을 우선한다.

### 집필 확장 포인트

책에서는 `phoenix pages`를 단순 기능 소개로 끝내지 않는다. 독자가 “내가 이 웹을 직접 쓰는 장면”과 “봇이 대신 조작하는 장면”을 함께 상상할 수 있도록 쓴다.

아래 질문에 답하는 식으로 원고를 늘린다.

1. 이 웹은 어떤 사람에게 필요한가?
2. 이 웹을 직접 쓰면 어떤 순서로 작업하는가?
3. 봇이 대신 조작하면 어떤 단계가 자동화되는가?
4. 실패했을 때 어떤 상태 메시지가 나와야 하는가?
5. 결과물은 어디에 저장되고 어떻게 전달되는가?
6. 승인 또는 전문가 확인이 필요한 부분은 무엇인가?

## phoenix images

담당 봇: `Design Bot`

역할: 제품 이미지 생성 웹

주요 작업: 제품컷, 목업, 카드뉴스, 썸네일 생성

배포 기준: `Netlify`

GitHub 저장소: `https://github.com/phoenixai-sw/mock-up-image.git`

상태: 실제 존재

### 책에서 설명할 핵심

phoenix images는 Phoenix Agent Webs 구조 안에서 독립적으로 작동하면서도, Design Bot이 조작할 수 있도록 설계되는 웹이다.

이 웹을 설명할 때는 “사람이 직접 쓰는 화면”과 “봇이 조작하는 작업장”이라는 두 관점을 함께 유지해야 한다.

독자는 이 웹이 무엇을 만드는지뿐 아니라, 어떤 봇이 언제 이 웹을 대신 조작하는지 이해해야 한다.

### 사람 사용 시나리오

1. 유저가 브라우저에서 `phoenix images`에 접속한다.
2. 필요한 파일, 텍스트, 설정값을 입력한다.
3. `제품컷, 목업, 카드뉴스, 썸네일 생성` 흐름을 실행한다.
4. 결과 미리보기를 확인한다.
5. 결과물을 다운로드하거나 저장한다.

### 봇 사용 시나리오

1. Genesis Bot이 작업을 분석한다.
2. 이 작업이 `Design Bot` 담당이라고 판단한다.
3. 구조화 task에 `targetWebsite`를 `phoenix images`로 넣는다.
4. Design Bot이 웹에 접속한다.
5. `data-testid` 기반으로 입력창과 버튼을 찾는다.
6. 생성 상태를 확인한다.
7. 결과물을 outputs에 저장한다.
8. Telegram 전송 여부를 유저에게 묻는다.

### 필요한 data-testid 예시

```text
phoenix-images-login-status
phoenix-images-upload-input
phoenix-images-generate-button
phoenix-images-status-label
phoenix-images-download-button
```

### 승인 또는 주의가 필요한 지점

1. 민감값이 화면이나 로그에 노출되면 안 된다.
2. 결과물은 먼저 outputs에 저장한다.
3. Telegram 전송은 유저에게 묻고 진행한다.
4. 이미지 생성은 응답 시간이 길어질 수 있으므로 실패/재시도 상태를 명확히 표시한다.
5. 대용량 결과물은 ZIP 다운로드와 로컬 저장을 우선한다.

### 집필 확장 포인트

책에서는 `phoenix images`를 단순 기능 소개로 끝내지 않는다. 독자가 “내가 이 웹을 직접 쓰는 장면”과 “봇이 대신 조작하는 장면”을 함께 상상할 수 있도록 쓴다.

아래 질문에 답하는 식으로 원고를 늘린다.

1. 이 웹은 어떤 사람에게 필요한가?
2. 이 웹을 직접 쓰면 어떤 순서로 작업하는가?
3. 봇이 대신 조작하면 어떤 단계가 자동화되는가?
4. 실패했을 때 어떤 상태 메시지가 나와야 하는가?
5. 결과물은 어디에 저장되고 어떻게 전달되는가?
6. 승인 또는 전문가 확인이 필요한 부분은 무엇인가?

## phoenix slides

담당 봇: `Design Bot`

역할: PPT 생성 웹

주요 작업: 강의 슬라이드, 제안서, 요약 발표자료 생성

배포 기준: `Netlify`

GitHub 저장소: `https://github.com/phoenixai-sw/phoenix-slides.git`

상태: 예정

### 책에서 설명할 핵심

phoenix slides는 Phoenix Agent Webs 구조 안에서 독립적으로 작동하면서도, Design Bot이 조작할 수 있도록 설계되는 웹이다.

이 웹을 설명할 때는 “사람이 직접 쓰는 화면”과 “봇이 조작하는 작업장”이라는 두 관점을 함께 유지해야 한다.

독자는 이 웹이 무엇을 만드는지뿐 아니라, 어떤 봇이 언제 이 웹을 대신 조작하는지 이해해야 한다.

### 사람 사용 시나리오

1. 유저가 브라우저에서 `phoenix slides`에 접속한다.
2. 필요한 파일, 텍스트, 설정값을 입력한다.
3. `강의 슬라이드, 제안서, 요약 발표자료 생성` 흐름을 실행한다.
4. 결과 미리보기를 확인한다.
5. 결과물을 다운로드하거나 저장한다.

### 봇 사용 시나리오

1. Genesis Bot이 작업을 분석한다.
2. 이 작업이 `Design Bot` 담당이라고 판단한다.
3. 구조화 task에 `targetWebsite`를 `phoenix slides`로 넣는다.
4. Design Bot이 웹에 접속한다.
5. `data-testid` 기반으로 입력창과 버튼을 찾는다.
6. 생성 상태를 확인한다.
7. 결과물을 outputs에 저장한다.
8. Telegram 전송 여부를 유저에게 묻는다.

### 필요한 data-testid 예시

```text
phoenix-slides-login-status
phoenix-slides-upload-input
phoenix-slides-generate-button
phoenix-slides-status-label
phoenix-slides-download-button
```

### 승인 또는 주의가 필요한 지점

1. 민감값이 화면이나 로그에 노출되면 안 된다.
2. 결과물은 먼저 outputs에 저장한다.
3. Telegram 전송은 유저에게 묻고 진행한다.

### 집필 확장 포인트

책에서는 `phoenix slides`를 단순 기능 소개로 끝내지 않는다. 독자가 “내가 이 웹을 직접 쓰는 장면”과 “봇이 대신 조작하는 장면”을 함께 상상할 수 있도록 쓴다.

아래 질문에 답하는 식으로 원고를 늘린다.

1. 이 웹은 어떤 사람에게 필요한가?
2. 이 웹을 직접 쓰면 어떤 순서로 작업하는가?
3. 봇이 대신 조작하면 어떤 단계가 자동화되는가?
4. 실패했을 때 어떤 상태 메시지가 나와야 하는가?
5. 결과물은 어디에 저장되고 어떻게 전달되는가?
6. 승인 또는 전문가 확인이 필요한 부분은 무엇인가?

## phoenix webs

담당 봇: `Design Bot`

역할: 랜딩페이지/HTML 생성 웹

주요 작업: 간단한 랜딩페이지와 정적 웹사이트 생성

배포 기준: `Netlify`

GitHub 저장소: `https://github.com/phoenixai-sw/phoenix-webs.git`

상태: 예정

### 책에서 설명할 핵심

phoenix webs는 Phoenix Agent Webs 구조 안에서 독립적으로 작동하면서도, Design Bot이 조작할 수 있도록 설계되는 웹이다.

이 웹을 설명할 때는 “사람이 직접 쓰는 화면”과 “봇이 조작하는 작업장”이라는 두 관점을 함께 유지해야 한다.

독자는 이 웹이 무엇을 만드는지뿐 아니라, 어떤 봇이 언제 이 웹을 대신 조작하는지 이해해야 한다.

### 사람 사용 시나리오

1. 유저가 브라우저에서 `phoenix webs`에 접속한다.
2. 필요한 파일, 텍스트, 설정값을 입력한다.
3. `간단한 랜딩페이지와 정적 웹사이트 생성` 흐름을 실행한다.
4. 결과 미리보기를 확인한다.
5. 결과물을 다운로드하거나 저장한다.

### 봇 사용 시나리오

1. Genesis Bot이 작업을 분석한다.
2. 이 작업이 `Design Bot` 담당이라고 판단한다.
3. 구조화 task에 `targetWebsite`를 `phoenix webs`로 넣는다.
4. Design Bot이 웹에 접속한다.
5. `data-testid` 기반으로 입력창과 버튼을 찾는다.
6. 생성 상태를 확인한다.
7. 결과물을 outputs에 저장한다.
8. Telegram 전송 여부를 유저에게 묻는다.

### 필요한 data-testid 예시

```text
phoenix-webs-login-status
phoenix-webs-upload-input
phoenix-webs-generate-button
phoenix-webs-status-label
phoenix-webs-download-button
```

### 승인 또는 주의가 필요한 지점

1. 민감값이 화면이나 로그에 노출되면 안 된다.
2. 결과물은 먼저 outputs에 저장한다.
3. Telegram 전송은 유저에게 묻고 진행한다.

### 집필 확장 포인트

책에서는 `phoenix webs`를 단순 기능 소개로 끝내지 않는다. 독자가 “내가 이 웹을 직접 쓰는 장면”과 “봇이 대신 조작하는 장면”을 함께 상상할 수 있도록 쓴다.

아래 질문에 답하는 식으로 원고를 늘린다.

1. 이 웹은 어떤 사람에게 필요한가?
2. 이 웹을 직접 쓰면 어떤 순서로 작업하는가?
3. 봇이 대신 조작하면 어떤 단계가 자동화되는가?
4. 실패했을 때 어떤 상태 메시지가 나와야 하는가?
5. 결과물은 어디에 저장되고 어떻게 전달되는가?
6. 승인 또는 전문가 확인이 필요한 부분은 무엇인가?

## phoenix books

담당 봇: `Writer Bot`

역할: 강의교안/SNS 카피 생성 웹

주요 작업: DOCX, PDF, SNS 카피, 출판 초안 생성

배포 기준: `Netlify`

GitHub 저장소: `https://github.com/phoenixai-sw/phoenix-books.git`

상태: 예정

### 책에서 설명할 핵심

phoenix books는 Phoenix Agent Webs 구조 안에서 독립적으로 작동하면서도, Writer Bot이 조작할 수 있도록 설계되는 웹이다.

이 웹을 설명할 때는 “사람이 직접 쓰는 화면”과 “봇이 조작하는 작업장”이라는 두 관점을 함께 유지해야 한다.

독자는 이 웹이 무엇을 만드는지뿐 아니라, 어떤 봇이 언제 이 웹을 대신 조작하는지 이해해야 한다.

### 사람 사용 시나리오

1. 유저가 브라우저에서 `phoenix books`에 접속한다.
2. 필요한 파일, 텍스트, 설정값을 입력한다.
3. `DOCX, PDF, SNS 카피, 출판 초안 생성` 흐름을 실행한다.
4. 결과 미리보기를 확인한다.
5. 결과물을 다운로드하거나 저장한다.

### 봇 사용 시나리오

1. Genesis Bot이 작업을 분석한다.
2. 이 작업이 `Writer Bot` 담당이라고 판단한다.
3. 구조화 task에 `targetWebsite`를 `phoenix books`로 넣는다.
4. Writer Bot이 웹에 접속한다.
5. `data-testid` 기반으로 입력창과 버튼을 찾는다.
6. 생성 상태를 확인한다.
7. 결과물을 outputs에 저장한다.
8. Telegram 전송 여부를 유저에게 묻는다.

### 필요한 data-testid 예시

```text
phoenix-books-login-status
phoenix-books-upload-input
phoenix-books-generate-button
phoenix-books-status-label
phoenix-books-download-button
```

### 승인 또는 주의가 필요한 지점

1. 민감값이 화면이나 로그에 노출되면 안 된다.
2. 결과물은 먼저 outputs에 저장한다.
3. Telegram 전송은 유저에게 묻고 진행한다.

### 집필 확장 포인트

책에서는 `phoenix books`를 단순 기능 소개로 끝내지 않는다. 독자가 “내가 이 웹을 직접 쓰는 장면”과 “봇이 대신 조작하는 장면”을 함께 상상할 수 있도록 쓴다.

아래 질문에 답하는 식으로 원고를 늘린다.

1. 이 웹은 어떤 사람에게 필요한가?
2. 이 웹을 직접 쓰면 어떤 순서로 작업하는가?
3. 봇이 대신 조작하면 어떤 단계가 자동화되는가?
4. 실패했을 때 어떤 상태 메시지가 나와야 하는가?
5. 결과물은 어디에 저장되고 어떻게 전달되는가?
6. 승인 또는 전문가 확인이 필요한 부분은 무엇인가?

## phoenix videos

담당 봇: `Video Bot`

역할: 영상 생성 웹

주요 작업: 숏폼, 광고 영상, 스토리보드, MP4 결과물 생성

배포 기준: `Netlify`

GitHub 저장소: `https://github.com/phoenixai-sw/phoenix-videos.git`

상태: 예정

### 책에서 설명할 핵심

phoenix videos는 Phoenix Agent Webs 구조 안에서 독립적으로 작동하면서도, Video Bot이 조작할 수 있도록 설계되는 웹이다.

이 웹을 설명할 때는 “사람이 직접 쓰는 화면”과 “봇이 조작하는 작업장”이라는 두 관점을 함께 유지해야 한다.

독자는 이 웹이 무엇을 만드는지뿐 아니라, 어떤 봇이 언제 이 웹을 대신 조작하는지 이해해야 한다.

### 사람 사용 시나리오

1. 유저가 브라우저에서 `phoenix videos`에 접속한다.
2. 필요한 파일, 텍스트, 설정값을 입력한다.
3. `숏폼, 광고 영상, 스토리보드, MP4 결과물 생성` 흐름을 실행한다.
4. 결과 미리보기를 확인한다.
5. 결과물을 다운로드하거나 저장한다.

### 봇 사용 시나리오

1. Genesis Bot이 작업을 분석한다.
2. 이 작업이 `Video Bot` 담당이라고 판단한다.
3. 구조화 task에 `targetWebsite`를 `phoenix videos`로 넣는다.
4. Video Bot이 웹에 접속한다.
5. `data-testid` 기반으로 입력창과 버튼을 찾는다.
6. 생성 상태를 확인한다.
7. 결과물을 outputs에 저장한다.
8. Telegram 전송 여부를 유저에게 묻는다.

### 필요한 data-testid 예시

```text
phoenix-videos-login-status
phoenix-videos-upload-input
phoenix-videos-generate-button
phoenix-videos-status-label
phoenix-videos-download-button
```

### 승인 또는 주의가 필요한 지점

1. 민감값이 화면이나 로그에 노출되면 안 된다.
2. 결과물은 먼저 outputs에 저장한다.
3. Telegram 전송은 유저에게 묻고 진행한다.
4. 영상 생성은 비용과 시간이 들어갈 수 있으므로 실행 전 승인한다.
5. 영상 결과물은 용량이 클 수 있어 Cloud 링크 전송도 고려한다.

### 집필 확장 포인트

책에서는 `phoenix videos`를 단순 기능 소개로 끝내지 않는다. 독자가 “내가 이 웹을 직접 쓰는 장면”과 “봇이 대신 조작하는 장면”을 함께 상상할 수 있도록 쓴다.

아래 질문에 답하는 식으로 원고를 늘린다.

1. 이 웹은 어떤 사람에게 필요한가?
2. 이 웹을 직접 쓰면 어떤 순서로 작업하는가?
3. 봇이 대신 조작하면 어떤 단계가 자동화되는가?
4. 실패했을 때 어떤 상태 메시지가 나와야 하는가?
5. 결과물은 어디에 저장되고 어떻게 전달되는가?
6. 승인 또는 전문가 확인이 필요한 부분은 무엇인가?

## phoenix reports

담당 봇: `Power Bot`

역할: 리서치/보고서 생성 웹

주요 작업: 자료 조사, 보고서, 요약문, 근거표 생성

배포 기준: `Netlify`

GitHub 저장소: `https://github.com/phoenixai-sw/phoenix-reports.git`

상태: 예정

### 책에서 설명할 핵심

phoenix reports는 Phoenix Agent Webs 구조 안에서 독립적으로 작동하면서도, Power Bot이 조작할 수 있도록 설계되는 웹이다.

이 웹을 설명할 때는 “사람이 직접 쓰는 화면”과 “봇이 조작하는 작업장”이라는 두 관점을 함께 유지해야 한다.

독자는 이 웹이 무엇을 만드는지뿐 아니라, 어떤 봇이 언제 이 웹을 대신 조작하는지 이해해야 한다.

### 사람 사용 시나리오

1. 유저가 브라우저에서 `phoenix reports`에 접속한다.
2. 필요한 파일, 텍스트, 설정값을 입력한다.
3. `자료 조사, 보고서, 요약문, 근거표 생성` 흐름을 실행한다.
4. 결과 미리보기를 확인한다.
5. 결과물을 다운로드하거나 저장한다.

### 봇 사용 시나리오

1. Genesis Bot이 작업을 분석한다.
2. 이 작업이 `Power Bot` 담당이라고 판단한다.
3. 구조화 task에 `targetWebsite`를 `phoenix reports`로 넣는다.
4. Power Bot이 웹에 접속한다.
5. `data-testid` 기반으로 입력창과 버튼을 찾는다.
6. 생성 상태를 확인한다.
7. 결과물을 outputs에 저장한다.
8. Telegram 전송 여부를 유저에게 묻는다.

### 필요한 data-testid 예시

```text
phoenix-reports-login-status
phoenix-reports-upload-input
phoenix-reports-generate-button
phoenix-reports-status-label
phoenix-reports-download-button
```

### 승인 또는 주의가 필요한 지점

1. 민감값이 화면이나 로그에 노출되면 안 된다.
2. 결과물은 먼저 outputs에 저장한다.
3. Telegram 전송은 유저에게 묻고 진행한다.

### 집필 확장 포인트

책에서는 `phoenix reports`를 단순 기능 소개로 끝내지 않는다. 독자가 “내가 이 웹을 직접 쓰는 장면”과 “봇이 대신 조작하는 장면”을 함께 상상할 수 있도록 쓴다.

아래 질문에 답하는 식으로 원고를 늘린다.

1. 이 웹은 어떤 사람에게 필요한가?
2. 이 웹을 직접 쓰면 어떤 순서로 작업하는가?
3. 봇이 대신 조작하면 어떤 단계가 자동화되는가?
4. 실패했을 때 어떤 상태 메시지가 나와야 하는가?
5. 결과물은 어디에 저장되고 어떻게 전달되는가?
6. 승인 또는 전문가 확인이 필요한 부분은 무엇인가?

## phoenix tax

담당 봇: `Power Bot`

역할: 양도소득세/세무 상담형 웹

주요 작업: 일반 정보, 세무사 사무실 소개, 상담형 문서 생성

배포 기준: `Netlify`

GitHub 저장소: `https://github.com/phoenixai-sw/phoenix-tax.git`

상태: 예정

### 책에서 설명할 핵심

phoenix tax는 Phoenix Agent Webs 구조 안에서 독립적으로 작동하면서도, Power Bot이 조작할 수 있도록 설계되는 웹이다.

이 웹을 설명할 때는 “사람이 직접 쓰는 화면”과 “봇이 조작하는 작업장”이라는 두 관점을 함께 유지해야 한다.

독자는 이 웹이 무엇을 만드는지뿐 아니라, 어떤 봇이 언제 이 웹을 대신 조작하는지 이해해야 한다.

### 사람 사용 시나리오

1. 유저가 브라우저에서 `phoenix tax`에 접속한다.
2. 필요한 파일, 텍스트, 설정값을 입력한다.
3. `일반 정보, 세무사 사무실 소개, 상담형 문서 생성` 흐름을 실행한다.
4. 결과 미리보기를 확인한다.
5. 결과물을 다운로드하거나 저장한다.

### 봇 사용 시나리오

1. Genesis Bot이 작업을 분석한다.
2. 이 작업이 `Power Bot` 담당이라고 판단한다.
3. 구조화 task에 `targetWebsite`를 `phoenix tax`로 넣는다.
4. Power Bot이 웹에 접속한다.
5. `data-testid` 기반으로 입력창과 버튼을 찾는다.
6. 생성 상태를 확인한다.
7. 결과물을 outputs에 저장한다.
8. Telegram 전송 여부를 유저에게 묻는다.

### 필요한 data-testid 예시

```text
phoenix-tax-login-status
phoenix-tax-upload-input
phoenix-tax-generate-button
phoenix-tax-status-label
phoenix-tax-download-button
```

### 승인 또는 주의가 필요한 지점

1. 민감값이 화면이나 로그에 노출되면 안 된다.
2. 결과물은 먼저 outputs에 저장한다.
3. Telegram 전송은 유저에게 묻고 진행한다.
4. 세무/의료 관련 결과는 일반 정보로 표시한다.
5. 최종 판단은 전문가 확인이 필요하다는 문구를 넣는다.

### 집필 확장 포인트

책에서는 `phoenix tax`를 단순 기능 소개로 끝내지 않는다. 독자가 “내가 이 웹을 직접 쓰는 장면”과 “봇이 대신 조작하는 장면”을 함께 상상할 수 있도록 쓴다.

아래 질문에 답하는 식으로 원고를 늘린다.

1. 이 웹은 어떤 사람에게 필요한가?
2. 이 웹을 직접 쓰면 어떤 순서로 작업하는가?
3. 봇이 대신 조작하면 어떤 단계가 자동화되는가?
4. 실패했을 때 어떤 상태 메시지가 나와야 하는가?
5. 결과물은 어디에 저장되고 어떻게 전달되는가?
6. 승인 또는 전문가 확인이 필요한 부분은 무엇인가?

## phoenix dental

담당 봇: `Power Bot`

역할: 치아관리/치과 상담형 웹

주요 작업: 치과병원 정보, 치과원장 소개, 일반 상담 문서 생성

배포 기준: `Netlify`

GitHub 저장소: `https://github.com/phoenixai-sw/phoenixai_dentala.git`

상태: 실제 존재

### 책에서 설명할 핵심

phoenix dental는 Phoenix Agent Webs 구조 안에서 독립적으로 작동하면서도, Power Bot이 조작할 수 있도록 설계되는 웹이다.

이 웹을 설명할 때는 “사람이 직접 쓰는 화면”과 “봇이 조작하는 작업장”이라는 두 관점을 함께 유지해야 한다.

독자는 이 웹이 무엇을 만드는지뿐 아니라, 어떤 봇이 언제 이 웹을 대신 조작하는지 이해해야 한다.

### 사람 사용 시나리오

1. 유저가 브라우저에서 `phoenix dental`에 접속한다.
2. 필요한 파일, 텍스트, 설정값을 입력한다.
3. `치과병원 정보, 치과원장 소개, 일반 상담 문서 생성` 흐름을 실행한다.
4. 결과 미리보기를 확인한다.
5. 결과물을 다운로드하거나 저장한다.

### 봇 사용 시나리오

1. Genesis Bot이 작업을 분석한다.
2. 이 작업이 `Power Bot` 담당이라고 판단한다.
3. 구조화 task에 `targetWebsite`를 `phoenix dental`로 넣는다.
4. Power Bot이 웹에 접속한다.
5. `data-testid` 기반으로 입력창과 버튼을 찾는다.
6. 생성 상태를 확인한다.
7. 결과물을 outputs에 저장한다.
8. Telegram 전송 여부를 유저에게 묻는다.

### 필요한 data-testid 예시

```text
phoenix-dental-login-status
phoenix-dental-upload-input
phoenix-dental-generate-button
phoenix-dental-status-label
phoenix-dental-download-button
```

### 승인 또는 주의가 필요한 지점

1. 민감값이 화면이나 로그에 노출되면 안 된다.
2. 결과물은 먼저 outputs에 저장한다.
3. Telegram 전송은 유저에게 묻고 진행한다.
4. 세무/의료 관련 결과는 일반 정보로 표시한다.
5. 최종 판단은 전문가 확인이 필요하다는 문구를 넣는다.

### 집필 확장 포인트

책에서는 `phoenix dental`를 단순 기능 소개로 끝내지 않는다. 독자가 “내가 이 웹을 직접 쓰는 장면”과 “봇이 대신 조작하는 장면”을 함께 상상할 수 있도록 쓴다.

아래 질문에 답하는 식으로 원고를 늘린다.

1. 이 웹은 어떤 사람에게 필요한가?
2. 이 웹을 직접 쓰면 어떤 순서로 작업하는가?
3. 봇이 대신 조작하면 어떤 단계가 자동화되는가?
4. 실패했을 때 어떤 상태 메시지가 나와야 하는가?
5. 결과물은 어디에 저장되고 어떻게 전달되는가?
6. 승인 또는 전문가 확인이 필요한 부분은 무엇인가?

## phoenix marketing

담당 봇: `Power Bot`

역할: AI 검색 마케팅 대시보드 웹

주요 작업: 고객사별 AI 검색 순위, 인용 정보, 예상 질문 관리

배포 기준: `Netlify`

GitHub 저장소: `https://github.com/phoenixai-sw/phoenix-marketing.git`

상태: 예정

### 책에서 설명할 핵심

phoenix marketing는 Phoenix Agent Webs 구조 안에서 독립적으로 작동하면서도, Power Bot이 조작할 수 있도록 설계되는 웹이다.

이 웹을 설명할 때는 “사람이 직접 쓰는 화면”과 “봇이 조작하는 작업장”이라는 두 관점을 함께 유지해야 한다.

독자는 이 웹이 무엇을 만드는지뿐 아니라, 어떤 봇이 언제 이 웹을 대신 조작하는지 이해해야 한다.

### 사람 사용 시나리오

1. 유저가 브라우저에서 `phoenix marketing`에 접속한다.
2. 필요한 파일, 텍스트, 설정값을 입력한다.
3. `고객사별 AI 검색 순위, 인용 정보, 예상 질문 관리` 흐름을 실행한다.
4. 결과 미리보기를 확인한다.
5. 결과물을 다운로드하거나 저장한다.

### 봇 사용 시나리오

1. Genesis Bot이 작업을 분석한다.
2. 이 작업이 `Power Bot` 담당이라고 판단한다.
3. 구조화 task에 `targetWebsite`를 `phoenix marketing`로 넣는다.
4. Power Bot이 웹에 접속한다.
5. `data-testid` 기반으로 입력창과 버튼을 찾는다.
6. 생성 상태를 확인한다.
7. 결과물을 outputs에 저장한다.
8. Telegram 전송 여부를 유저에게 묻는다.

### 필요한 data-testid 예시

```text
phoenix-marketing-login-status
phoenix-marketing-upload-input
phoenix-marketing-generate-button
phoenix-marketing-status-label
phoenix-marketing-download-button
```

### 승인 또는 주의가 필요한 지점

1. 민감값이 화면이나 로그에 노출되면 안 된다.
2. 결과물은 먼저 outputs에 저장한다.
3. Telegram 전송은 유저에게 묻고 진행한다.

### 집필 확장 포인트

책에서는 `phoenix marketing`를 단순 기능 소개로 끝내지 않는다. 독자가 “내가 이 웹을 직접 쓰는 장면”과 “봇이 대신 조작하는 장면”을 함께 상상할 수 있도록 쓴다.

아래 질문에 답하는 식으로 원고를 늘린다.

1. 이 웹은 어떤 사람에게 필요한가?
2. 이 웹을 직접 쓰면 어떤 순서로 작업하는가?
3. 봇이 대신 조작하면 어떤 단계가 자동화되는가?
4. 실패했을 때 어떤 상태 메시지가 나와야 하는가?
5. 결과물은 어디에 저장되고 어떻게 전달되는가?
6. 승인 또는 전문가 확인이 필요한 부분은 무엇인가?

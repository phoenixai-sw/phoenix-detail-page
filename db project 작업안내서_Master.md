# db project 작업안내서 - Master

## 1. 목표

마스터가 직접 Supabase와 배포 환경에 필요한 값을 설정해서 Phoenix detail page의 생성 결과가 DB에 저장되도록 만든다.

## 2. 마스터가 준비할 것

필요한 것은 2개다.

1. `DATABASE_URL`
2. `PROJECTS_STORAGE_KEY`

## 3. DATABASE_URL 얻기 - Supabase 기준

1. [Supabase Dashboard](https://supabase.com/dashboard)에 접속한다.

2. Phoenix detail page에 사용할 Supabase 프로젝트를 클릭한다.

3. 화면 상단의 `Connect` 버튼을 클릭한다.

4. `Connection string` 메뉴로 이동한다.

5. 배포 환경에서는 우선 `Transaction pooler`를 선택한다.

6. `URI` 형태의 주소를 복사한다.

7. 복사한 주소 안에 `[YOUR-PASSWORD]`가 있으면 Supabase DB 비밀번호로 교체한다.

8. 완성된 값은 아래 형태와 비슷하다.

```env
DATABASE_URL="postgresql://postgres.xxxxx:비밀번호@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres"
```

## 4. PROJECTS_STORAGE_KEY 만들기

1. 이 값은 Supabase에서 발급받는 키가 아니다.

2. 마스터가 직접 정하는 프로젝트 저장 비밀번호다.

3. 예시는 아래와 같다.

```env
PROJECTS_STORAGE_KEY="phoenix-detail-db-save-2026"
```

4. 더 안전하게 하려면 길게 만든다.

```env
PROJECTS_STORAGE_KEY="phoenix-detail-db-save-2026-x7Kp92"
```

5. 이 값은 배포 환경변수에도 넣고, 사이트 안의 `프로젝트 DB 저장 키`에도 똑같이 입력한다.

## 5. Vercel에 설정하기

1. [Vercel](https://vercel.com/)에 접속한다.

2. Phoenix detail page 프로젝트를 클릭한다.

3. `Settings`로 이동한다.

4. `Environment Variables`로 이동한다.

5. 아래 값을 추가한다.

```env
DATABASE_URL="Supabase에서 복사한 DATABASE_URL"
PROJECTS_STORAGE_KEY="마스터가 직접 만든 저장 키"
```

6. 저장한다.

7. `Deployments`로 이동한다.

8. 최신 배포 오른쪽 메뉴에서 `Redeploy`를 실행한다.

## 6. Netlify에 설정하기

1. [Netlify](https://app.netlify.com/)에 접속한다.

2. Phoenix detail page 사이트를 클릭한다.

3. `Site configuration`으로 이동한다.

4. `Environment variables`로 이동한다.

5. 아래 값을 추가한다.

```env
DATABASE_URL="Supabase에서 복사한 DATABASE_URL"
PROJECTS_STORAGE_KEY="마스터가 직접 만든 저장 키"
```

6. 저장한다.

7. `Deploys`로 이동한다.

8. `Trigger deploy`를 실행한다.

## 7. 사이트 안에서 설정하기

1. 배포된 Phoenix detail page 사이트에 접속한다.

2. `API 키 설정`을 연다.

3. `프로젝트 DB 저장 키` 입력칸을 찾는다.

4. `PROJECTS_STORAGE_KEY`와 같은 값을 입력한다.

5. 저장한다.

## 8. 저장 테스트

1. 상세페이지 이미지를 업로드한다.

2. 1장만 생성한다.

3. 결과 화면에서 `저장`을 누른다.

4. 아래 메시지가 나오면 정상이다.

```text
결과를 저장하고 DB에도 동기화했습니다.
```

5. 브라우저를 새로고침한다.

6. 홈보드에 저장한 프로젝트가 다시 보이면 성공이다.

## 9. Supabase에서 확인하기

1. Supabase 프로젝트로 이동한다.

2. `Table Editor`를 연다.

3. `detail_page_projects` 테이블이 생겼는지 확인한다.

4. 저장 테스트 후 row가 추가됐는지 확인한다.

5. `payload` 컬럼에 프로젝트 데이터가 들어가 있으면 정상이다.

## 10. 문제가 생겼을 때 확인 순서

1. 사이트 설정 박스에서 `프로젝트 DB 저장`이 `설정됨`인지 확인한다.

2. `API 키 설정`에서 `프로젝트 DB 저장 키`가 정확히 입력됐는지 확인한다.

3. Vercel/Netlify 환경변수의 `PROJECTS_STORAGE_KEY`와 사이트 입력값이 같은지 확인한다.

4. `DATABASE_URL`에 `[YOUR-PASSWORD]`가 그대로 남아있지 않은지 확인한다.

5. Supabase DB 비밀번호가 맞는지 확인한다.

6. 환경변수를 수정했다면 반드시 재배포한다.

## 11. 마스터가 Codex에게 알려줄 것

설정을 마친 뒤 아래처럼 알려주면 된다.

```text
Vercel에 DATABASE_URL, PROJECTS_STORAGE_KEY 넣고 재배포 완료.
사이트 안에도 프로젝트 DB 저장 키 입력 완료.
테스트 진행해줘.
```

또는 Netlify라면 아래처럼 알려주면 된다.

```text
Netlify에 DATABASE_URL, PROJECTS_STORAGE_KEY 넣고 재배포 완료.
사이트 안에도 프로젝트 DB 저장 키 입력 완료.
테스트 진행해줘.
```

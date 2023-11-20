## Survey

- 객관식 설문지의 데이터베이스 설계

---

### 사용기술

- TypeScript, NestJs
- PostgreSQL
- graphQL
- TypeORM

---

### Install Dependencies

```bash
npm install
```

### Use it

```bash
npm run start:dev
```

---

### DB Connect

- Localhost 환경에서 PostgreSQL DB를 연결하여 사용
- orm.config 파일에서 환경변수 처리를 해두었으므로 .env 파일을 생성하여 아래의 '' 부분에 정보 입력 필요

```
PG_DATABASE=''
PG_HOST=''
PG_PORT=5432
PG_USERNAME=postgres
PG_PASSWORD=''
```

---

### 주요 기능

<details><summary>설문지 생성 </summary>

- Query 예시
- isMultipleChoice 필드를 사용하여 다중선택 여부를 구분
- 답변지 별 중요도에 따라 점수 부여 가능

```graphql
mutation {
  createSurvey(
    input: {
      createSurveyInput: {
        title: "샘플 설문지"
        description: "이 설문지는 샘플용 설문지입니다."
      }
      questionContents: [
        "당신이 좋아하는 색깔은 무엇인가요?"
        "일주일에 몇 번 운동하시나요?"
        "당신의 성별은 무엇입니까?"
      ]
      answerContents: [
        [
          { content: "빨강", score: 2 }
          { content: "파랑", score: 4 }
          { content: "초록", score: 6 }
        ]
        [
          { content: "0번", score: 1 }
          { content: "1번", score: 2 }
          { content: "3번 이상", score: 3 }
        ]
        [{ content: "남자", score: 1 }, { content: "여자", score: 2 }]
      ]
      isMultipleChoice: true
    }
  ) {
    id
    title
    description
    questions {
      id
      content
      isMultipleChoice
      answers {
        id
        content
        score
      }
    }
  }
}
```

- 응답결과

```
{
  "data": {
    "createSurvey": {
      "id": 4,
      "title": "샘플 설문지5",
      "description": "이 설문지는 샘플용 설문지입니다.5",
      "questions": [
        {
          "id": 10,
          "content": "당신이 좋아하는 색깔은 무엇인가요?",
          "isMultipleChoice": true,
          "answers": [
            {
              "id": 25,
              "content": "빨강",
              "score": 2
            },
            {
              "id": 26,
              "content": "파랑",
              "score": 4
            },
            {
              "id": 27,
              "content": "초록",
              "score": 6
            }
          ]
        },
        {
          "id": 11,
          "content": "일주일에 몇 번 운동하시나요?",
          "isMultipleChoice": true,
          "answers": [
            {
              "id": 28,
              "content": "0번",
              "score": 1
            },
            {
              "id": 29,
              "content": "1번",
              "score": 2
            },
            {
              "id": 30,
              "content": "3번 이상",
              "score": 3
            }
          ]
        },
        {
          "id": 12,
          "content": "당신의 성별은 무엇입니까?",
          "isMultipleChoice": true,
          "answers": [
            {
              "id": 31,
              "content": "남자",
              "score": 1
            },
            {
              "id": 32,
              "content": "여자",
              "score": 2
            }
          ]
        }
      ]
    }
  }
}
```

</details>

<details><summary>응답지 제출</summary>

- Query 예시

```graphql
mutation {
  createResponse(input: { surveyId: 3, answerIds: [2, 4, 6] }) {
    id
    survey {
      id
      title
    }
    answers {
      id
      content
      score
    }
  }
}
```

- 응답 결과

```graphql
{
  "data": {
    "createResponse": {
      "id": 3,
      "survey": {
        "id": 3,
        "title": "샘플 설문지4"
      },
      "answers": [
        {
          "id": 2,
          "content": "파랑",
          "score": 4
        },
        {
          "id": 4,
          "content": "0번",
          "score": 1
        },
        {
          "id": 6,
          "content": "3번 이상",
          "score": 3
        }
      ]
    }
  }
}
```

</details>

<details><summary>제출 결과 확인</summary>

- 설문지 ID별 응답지 조회
- Query예시

```graphql
query {
  getResponsesBySurveyId(surveyId: 7) {
    id
    totalScore
    answers {
      id
      content
      score
    }
  }
}
```

- 응답 결과

```graphql
{
  "data": {
    "getResponsesBySurveyId": [
      {
        "id": 23,
        "totalScore": 9,
        "answers": [
          {
            "id": 1,
            "content": "빨강",
            "score": 2
          },
          {
            "id": 3,
            "content": "초록",
            "score": 6
          },
          {
            "id": 7,
            "content": "남자",
            "score": 1
          }
        ]
      },
      {
        "id": 22,
        "totalScore": 7,
        "answers": [
          {
            "id": 2,
            "content": "파랑",
            "score": 4
          },
          {
            "id": 4,
            "content": "0번",
            "score": 1
          },
          {
            "id": 8,
            "content": "여자",
            "score": 2
          }
        ]
      }
    ]
  }
}
```

- 응답지ID별 조회

```graphql
query {
  getResponseById(responseId: 22) {
    id
    totalScore
    answers {
      id
      content
      score
    }
  }
}
```

- 응답 결과

```graphql
{
  "data": {
    "getResponseById": {
      "id": 22,
      "totalScore": 7,
      "answers": [
        {
          "id": 2,
          "content": "파랑",
          "score": 4
        },
        {
          "id": 4,
          "content": "0번",
          "score": 1
        },
        {
          "id": 8,
          "content": "여자",
          "score": 2
        }
      ]
    }
  }
}
```

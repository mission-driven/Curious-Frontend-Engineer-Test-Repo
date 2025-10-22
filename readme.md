# Frontend Test - Attendance Check Application

프론트앤드 과제를 위한 Flask 기반의 출석 체크 이벤트 페이지 애플리케이션입니다.

## 📋 목차

- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [시작하기](#시작하기)
  - [환경 변수 설정](#환경-변수-설정)
  - [Docker로 실행하기](#docker로-실행하기)
- [API 엔드포인트](#api-엔드포인트)
- [주요 기능](#주요-기능)

## 🛠 기술 스택

- **Backend Framework**: Flask 2.2.3
- **Python**: 3.9
- **Containerization**: Docker & Docker Compose
- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Cloud**: AWS S3 (boto3)

### 주요 라이브러리

- `Flask` - 웹 프레임워크
- `requests` - HTTP 통신
- `boto3` - AWS S3 연동
- `beautifulsoup4` - HTML 파싱
- `python-dotenv` - 환경 변수 관리

## 📁 프로젝트 구조

```
frontend-test/
├── app/
│   ├── main.py                    # 메인 애플리케이션
│   ├── config.py                  # 설정 파일
│   ├── utils.py                   # 유틸리티 함수
│   ├── api/
│   │   └── v1.py                  # API 라우터
│   ├── static/
│   │   ├── css/                   # CSS 파일들
│   │   │   ├── reset.css
│   │   │   ├── EVT.css
│   │   │   ├── EVT_bootstrap.css
│   │   │   ├── ver2.main.css
│   │   │   └── page/
│   │   │       └── attendance_check.css
│   │   └── js/                    # JavaScript 파일들
│   │       ├── EVT.js
│   │       ├── kakao-share.js
│   │       └── page/
│   │           └── community/
│   │               └── point/
│   │                   ├── fetch.js
│   │                   └── update-point-for-community.js
│   └── templates/
│       ├── event/
│       │   └── attendance_check.html
│       └── head/
│           ├── google_analytics.html
│           └── google_tag_manager.html
├── Dockerfile.development         # 개발용 Dockerfile
├── docker-compose.dev.yml         # Docker Compose 설정
├── requirements.txt               # Python 의존성
└── README.md
```

## 🚀 시작하기

### IDE 설정을 위한 로컬 환경 구성

Docker로 실행하더라도 IDE에서 코드 작성 시 자동완성과 타입 힌팅을 위해 로컬에 가상환경과 의존성을 설치하는 것을 권장합니다.

```bash
# 1. 가상환경 생성
python3 -m venv .venv

# 2. 가상환경 활성화
source .venv/bin/activate  # macOS/Linux
# 또는
.venv\Scripts\activate  # Windows

# 3. 의존성 설치
pip install -r requirements.txt

# 4. IDE에서 Python 인터프리터를 .venv/bin/python으로 설정
```

> **참고**: 이 단계는 IDE에서 import 오류 표시를 없애기 위한 것이며, 실제 실행은 Docker를 사용합니다.

### Docker로 실행하기

#### 1. Docker Compose로 빌드 및 실행

```bash
# 개발 환경 빌드 및 실행
docker-compose -f docker-compose.dev.yml up --build

# 백그라운드 실행
docker-compose -f docker-compose.dev.yml up -d

# 로그 확인
docker-compose -f docker-compose.dev.yml logs -f
```

#### 2. 애플리케이션 접속

브라우저에서 다음 URL로 접속:
- **인덱스 페이지**: http://localhost:5055/
- **출석 체크 페이지**: http://localhost:5055/event/attendance-check

#### 3. Docker 컨테이너 중지

```bash
# 컨테이너 중지
docker-compose -f docker-compose.dev.yml down

# 컨테이너 중지 및 볼륨 삭제
docker-compose -f docker-compose.dev.yml down -v
```

## 🔌 API 엔드포인트

### 페이지 라우트

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/` | 메인 페이지 (placeholder) |
| GET | `/login` | 로그인 페이지 (placeholder) |
| GET | `/studies/types/popular` | 인기 스터디 목록 (placeholder) |
| GET | `/study/<int:study_id>` | 스터디 상세 (placeholder) |
| GET | `/event/attendance-check` | 출석 체크 이벤트 페이지 |

### API v1 라우트

모든 API는 `/api/v1` prefix를 사용합니다.

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/study-schedules/<int:study_id>` | 스터디 일정 조회 |
| GET | `/users/<int:user_id>/point/attendances` | 출석 기록 조회 |
| GET | `/point/communities/activities` | 커뮤니티 활동 포인트 조회 |
| GET | `/point/communities/ranks` | 커뮤니티 통합 랭킹 조회 |
| GET | `/points/users/me` | 내 포인트 상세 조회 |


## ✨ 주요 기능

### 1. 출석 체크 시스템
- 매일 출석 체크를 통한 포인트 적립
- 연속 출석에 따른 차등 포인트 지급
- 출석 현황 시각화 (스탬프 보드)

### 2. 포인트 랭킹
- 실시간 사용자 랭킹 확인
- 커뮤니티 활동 포함 통합 랭킹
- 상위 50명 랭킹 표시

### 3. 카카오톡 공유
- 카카오톡으로 이벤트 공유 기능
- 공유 시 추가 포인트 지급
- 하루 최대 3회 공유 가능

### 4. 커뮤니티 활동 리워드
- 최초 글 작성 리워드
- 일반 글 작성 포인트
- 댓글 작성 포인트

## 🔧 개발 정보

### 포트 설정

- **개발 환경 (Docker)**: 5055 → 5000 (포트 포워딩)
- **로컬 환경**: 5000

### 디버그 모드

개발 환경에서는 Flask 디버그 모드가 자동으로 활성화됩니다:
- 코드 변경 시 자동 재시작
- 상세한 에러 메시지 표시
- 핫 리로딩 지원

### 볼륨 마운트

Docker Compose 사용 시 현재 디렉토리가 컨테이너의 `/code`에 마운트되어 코드 수정이 실시간으로 반영됩니다.

## 📝 참고사항

- 이 애플리케이션은 Frontend 역할을 하며, 실제 데이터는 Backend API에서 가져옵니다.
- 단, TEST 환경에서 데이터는 Mocking 된 데이터를 사용합니다.

## 🐛 문제 해결

### Docker 빌드 실패
```bash
# Docker 캐시 삭제 후 재빌드
docker-compose -f docker-compose.dev.yml build --no-cache
```

### 포트 충돌
```bash
# 5055 포트가 이미 사용 중인 경우, docker-compose.dev.yml에서 포트 변경
ports:
  - "5056:5000"  # 5055 -> 5056으로 변경
```

### 의존성 설치 실패
```bash
# pip 업그레이드
pip install --upgrade pip

# 의존성 재설치
pip install -r requirements.txt --force-reinstall
```

## 👥 기여자

Mission-Driven Team

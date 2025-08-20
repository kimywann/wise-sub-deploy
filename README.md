# WiseSub - 구독 관리 웹 서비스

<div align="center">
  <img src="public/logo.svg" alt="WiseSub Logo" width="100"/>
</div>

## 📋 프로젝트 소개

구독 서비스가 늘어나면서 '이건 언제 결제되더라?', '내가 어떤 서비스를 구독 중이지?' 같은 고민이 생기곤 합니다.  
WiseSub은 사용자가 모든 구독 내역과 결제 일정을 한곳에서 확인할 수 있도록 돕는 서비스입니다.  
이를 통해 불필요한 지출을 줄이고, 앞으로의 소비를 계획적으로 관리할 수 있습니다.

[포트폴리오](https://www.canva.com/design/DAGhtrebMj4/fr96Y9hBM3LmPLsSwQpulg/view?utm_content=DAGhtrebMj4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h46fd2eef7c)

<br />

### 프로젝트 구조

```bash
src/
├── common/ # 공통 컴포넌트(헤더, 버튼, 레이아웃)
├── features/ # 기능별 모듈화된 구조
│ ├── auth/ # 로그인, 회원가입 인증 관련
│ ├── home/ # 메인 홈페이지
│ └── subscription/ # 구독 관리 (핵심 기능)
└── assets/ # 정적 리소스
```

### 주요 기능

- **📊 대시보드**: 월별 구독 비용 및 결제일 시각화
- **📅 월별 관리**: 월별 구독 서비스 목록 및 비용 추적

### 해결하는 문제

- 여러 구독 서비스의 결제일을 놓치는 문제
- 월별 구독 비용을 정확히 파악하지 못하는 문제
- 결제 후에야 어떤 구독 서비스를 사용했는지 깨닫는 문제

<br />

## 기술 스택

- **Frontend**
  - React
  - TypeScript
  - Tailwind CSS

- **Backend**
  - Supabase

- **Development Tools**
  - Vite
  - Git
  - GitHub
  - Vercel (배포)

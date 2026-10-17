
# SkillForge — System Architecture

## 1. Overview

SkillForge is a skill intelligence and career-readiness platform that helps users understand their current skills, identify gaps for a target role, collect practical evidence, and follow a personalized learning roadmap.

## 2. Technology Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Recharts or another charting library

### Backend
- Python
- FastAPI
- Pydantic
- SQLAlchemy

### Database
- SQLite for local development
- PostgreSQL recommended for production

### Integrations
- GitHub API for repository metadata
- AI/LLM provider for optional semantic analysis and explanations

## 3. Architecture Layers

### Presentation Layer
The React frontend provides dashboards, skill maps, job comparisons, assessments, recommendations, and learning roadmaps.

### API Layer
FastAPI routes handle HTTP requests, authentication, input validation, and responses.

### Service Layer
Services implement business logic:
- Skill normalization and catalog operations
- Skill prerequisite graph
- Job analysis and gap calculation
- Readiness estimation
- Evidence management
- Recommendation generation
- Roadmap generation

### AI Layer
AI modules extract skills from text, compare semantic similarity, and generate explanations. AI output should be validated before it influences recommendations.

### Integration Layer
External integrations retrieve permitted GitHub repository information and other supported data.

### Persistence Layer
SQLAlchemy models represent users, skills, jobs, evidence, projects, assessments, roadmaps, and progress.

## 4. Request Flow

1. The user interacts with the React interface.
2. The frontend sends a request to the FastAPI backend.
3. The API validates the request and checks authentication.
4. The relevant service processes the request.
5. The service reads or writes database records.
6. The API returns a validated response.
7. The frontend renders the result.

## 5. Core Feature Flow

For job-specific skill-gap analysis:

1. Select a target job or role.
2. Load its required skills and importance weights.
3. Load the user's declared proficiency and available evidence.
4. Calculate weighted gaps.
5. Rank skills by estimated learning priority.
6. Generate suggested learning actions.
7. Build a roadmap that the user can review and modify.

## 6. Security Principles

- Hash passwords; never store plaintext passwords.
- Validate inputs using Pydantic.
- Protect private endpoints using authenticated user identity.
- Enforce ownership checks for user-specific records.
- Keep API keys in environment variables.
- Never expose secrets in frontend code or logs.
- Apply rate limits and safe upload limits in production.
- Do not treat AI-generated results as verified facts.

## 7. Development and Production

Local development can use SQLite and automatic table creation.

Production should use PostgreSQL, Alembic migrations, environment-based configuration, secure secret management, structured logging, backups, and HTTPS.

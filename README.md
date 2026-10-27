# SkillForge
### Turn your skills into career opportunities.

SkillForge is an intelligent, evidence-driven career development platform that helps students and aspiring professionals understand their skill gaps, build practical experience, and prepare for their target roles.

Instead of simply recommending courses, SkillForge connects skills, job requirements, projects, assessments, and learning roadmaps to help users make informed career decisions.

---

## The Problem

Students often struggle to understand which skills employers expect, how their current abilities compare with job requirements, and what they should learn next.

Traditional learning platforms focus on completing courses, while job platforms focus on vacancies. Neither necessarily provides a unified view of a person's skills, practical evidence, and career readiness.

## Our Solution

SkillForge connects career goals with measurable skill development.

It helps users understand their current capabilities, identify missing skills, collect evidence of what they can do, and organize their learning into actionable steps.

## Key Features

### 1. Intelligent Skill Mapping
- Maintain a structured inventory of technical and professional skills.
- Normalize different names and aliases for the same skill.
- Explore relationships and dependencies between skills.
- Track proficiency and skill development.

### 2. Skill Gap Analysis
- Compare existing skills with target job or career-role requirements.
- Identify missing or underdeveloped skills.
- Prioritize learning based on relevance and importance.
- Understand why particular skills matter for a target role.

### 3. Evidence-Based Skill Profiles
- Connect skills to projects, certifications, assessments, and other evidence.
- Build a more informative profile than a list of self-declared skills.
- Track practical accomplishments over time.

### 4. Resume Analysis
- Upload a resume for skill extraction and analysis.
- Identify relevant skills and experience.
- Compare resume content with target-role requirements.
- Discover opportunities to improve skill coverage.

### 5. GitHub Project Analysis
- Connect a GitHub account or public repositories.
- Analyze repository metadata and project technologies.
- Associate project evidence with relevant skills.
- Discover areas where additional practical work may help.

### 6. Personalized Learning Roadmaps
- Organize skill gaps into learning milestones.
- Explore learning resources and project recommendations.
- Follow a structured path toward a selected career role.
- Monitor progress toward learning goals.

### 7. Assessments and Progress Tracking
- Evaluate knowledge through assessments.
- Track learning progress and recorded achievements.
- Review activity and skill development over time.

### 8. Career Insights and Recommendations
- Explore job requirements and role comparisons.
- Identify skills relevant to target opportunities.
- Receive explanations for recommendations.
- Use market insights to guide learning priorities.

---

## What Makes SkillForge Different?

| Traditional Approach | SkillForge Approach |
|---|---|
| Collect certificates | Connect skills to practical evidence |
| Learn without a clear target | Start with a target role |
| Browse long lists of courses | Prioritize relevant skill gaps |
| Track completed lessons | Track skills, projects, and milestones |
| Use a generic career roadmap | Build a roadmap around identified gaps |
| List technologies on a resume | Connect technologies to demonstrable work |

**Core idea:** Career development should be based not only on what you have learned, but also on what you can demonstrate and what you need to learn next.

## Technology Stack

**Frontend**
- React
- Vite
- React Router
- JavaScript
- CSS

**Backend**
- Python
- FastAPI
- SQLAlchemy
- Alembic

**Database**
- PostgreSQL

**AI and Analysis**
- Resume and job-description parsing
- Skill extraction and normalization
- Skill matching and gap analysis
- Recommendation and explanation engines
- Optional LLM integration

**Integrations and Deployment**
- GitHub API integration
- Docker
- Docker Compose
- Nginx

## Getting Started

### Prerequisites

Install the following tools:

- Python 3.12+
- Node.js 22+
- npm
- PostgreSQL, or Docker Desktop with Docker Compose

### Option 1: Run with Docker

**1. Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/skillforge.git
cd skillforge
```

**2. Configure environment variables**

Copy `.env.example` to `.env` and configure your database password, application secret, and any optional integration credentials.

```bash
cp .env.example .env
```

Use a strong, unique secret and password. Never commit `.env`.

**3. Build and start the services**

```bash
docker compose up --build
```

**4. Open the application**

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API documentation: http://localhost:8000/docs

These addresses assume the ports and routes in the Docker configuration remain unchanged.

### Option 2: Run Locally

**Backend**

```bash
cd backend
python -m venv .venv
```

Activate the environment.

macOS/Linux:

```bash
source .venv/bin/activate
```

Windows:

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure your environment variables and start PostgreSQL. Then launch the API:

```bash
uvicorn app.main:app --reload
```

**Frontend**

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local development URL printed by Vite.

> Ensure your frontend API base URL, backend configuration, database connection, and CORS settings are configured for local development.

## Configuration

Common environment variables include:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Database connection string |
| `SECRET_KEY` | Application signing secret |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Authentication token lifetime |
| `GITHUB_CLIENT_ID` | Optional GitHub OAuth client |
| `GITHUB_CLIENT_SECRET` | Optional GitHub OAuth secret |
| `OPENAI_API_KEY` | Optional AI provider key |

Your actual application may require additional variables. Refer to `.env.example` and `backend/app/core/config.py` for the authoritative configuration.

## Development Roadmap

- [x] Define the full-stack project architecture.
- [x] Establish frontend and backend folder structures.
- [ ] Complete authentication and user profiles.
- [ ] Build the skill catalog and normalization system.
- [ ] Implement role-based skill gap analysis.
- [ ] Add resume parsing and analysis.
- [ ] Integrate GitHub repository analysis.
- [ ] Develop evidence-based recommendations.
- [ ] Build personalized learning roadmaps.
- [ ] Add assessments and progress analytics.
- [ ] Add automated tests and deployment configuration.

## Security and Privacy

- Store credentials and API keys in environment variables.
- Hash passwords using an established password-hashing library.
- Protect private endpoints with authentication and authorization.
- Validate uploaded files and restrict accepted file types and sizes.
- Respect GitHub API permissions and rate limits.
- Avoid logging passwords, access tokens, or sensitive resume contents.
- Configure production CORS, HTTPS, and secure secret management.

## Contributing

Contributions, bug reports, and feature suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and add relevant tests.
4. Submit a pull request describing your changes.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

**SkillForge — Learn with purpose. Build with evidence. Grow with direction.**


# SkillForge — Deployment Guide

## 1. Prerequisites

- Python 3.12
- Node.js and npm
- Git
- A database supported by the configured SQLAlchemy URL

Docker is optional for local development.

## 2. Backend Setup

From the repository root:

```bash
cd backend

python -m venv .venv
```

Activate the environment.

macOS/Linux:

```bash
source .venv/bin/activate
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a local environment file using the project's `.env.example`. Set a strong secret key and the required database URL.

Start the API from the backend directory:

```bash
uvicorn main:app --reload
```

Useful local URLs:

- API: http://127.0.0.1:8000/
- Health check: http://127.0.0.1:8000/health
- Interactive API documentation: http://127.0.0.1:8000/docs

## 3. Run Tests

From the backend directory:

```bash
pytest -v
```

Run coverage:

```bash
pytest --cov=app --cov-report=term-missing
```

## 4. Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
```

Configure the frontend API URL in its environment file. For local development, it should point to:

```text
http://127.0.0.1:8000/api
```

Start the development server:

```bash
npm run dev
```

Open the URL printed by Vite, usually http://localhost:5173.

## 5. Docker

Build the backend image:

```bash
docker build -t skillforge-backend ./backend
```

Run it:

```bash
docker run --rm -p 8000:8000 \
  --env-file backend/.env \
  skillforge-backend
```

For production, configure persistent database storage and use PostgreSQL rather than relying on a container-local SQLite file.

## 6. Production Checklist

- Use HTTPS.
- Configure production CORS origins.
- Set a strong, unique application secret.
- Use PostgreSQL and apply Alembic migrations.
- Disable development-only automatic schema creation.
- Keep credentials out of Git.
- Configure logging, monitoring, and database backups.
- Test authentication and record ownership protections.
- Restrict upload types and sizes.
- Verify third-party API terms and rate limits.
- Run automated tests before deployment.

## 7. Troubleshooting

### ModuleNotFoundError

Run commands from the correct directory and confirm dependencies are installed in the active virtual environment.

### Database errors

Check the database URL, model imports, migration state, and database permissions.

### CORS errors

Ensure the frontend origin is explicitly allowed by the backend configuration.

### Authentication failures

Check token expiry, password hashing, the Authorization header, and the JWT secret configuration.

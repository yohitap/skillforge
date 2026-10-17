
# SkillForge — Database Design

## 1. Overview

SkillForge uses relational data to connect users, skills, job requirements, evidence, assessments, and learning progress.

SQLAlchemy models define the database tables. Alembic manages schema migrations.

## 2. Main Entities

### User
Stores account information, password hashes, and the user's target career role.

### Role
Stores supported career roles and their descriptions.

### Skill
Stores canonical skill names, categories, descriptions, and difficulty levels.

### SkillAlias
Maps alternative skill names to canonical skills. For example, JS can map to JavaScript.

### SkillDependency
Represents prerequisite relationships between skills.

### Job
Stores job title, company, location, description, and source information.

### JobSkill
Associates jobs with required skills and importance weights.

### UserSkill
Associates users with skills and their self-reported proficiency.

### Evidence
Stores projects, labs, certifications, assessments, and other supporting evidence.

### Project
Stores a user's projects and related repository or live-demo links.

### Assessment
Stores assessment definitions or attempts, depending on the implemented model.

### AssessmentResult
Stores individual assessment results where the implementation separates results from assessments.

### Roadmap
Stores a user's learning roadmap and target role.

### Progress
Tracks roadmap tasks and learning completion.

### LearningResource
Stores links to learning materials.

### GitHubRepository
Stores repository metadata imported for a connected GitHub account.

### Resume
Stores resume metadata and any supported analysis results.

### Notification
Stores user-facing alerts and updates.

### Activity
Records relevant application activity.

## 3. Relationships

- A user can track many skills.
- A user can create many projects and evidence records.
- A job can require many skills through JobSkill.
- A skill can be required by many jobs.
- A skill can depend on prerequisite skills.
- A user can maintain multiple roadmaps.
- A roadmap can contain multiple progress tasks.
- Assessment attempts can be linked to users and skills.

## 4. Data Integrity

- Use foreign keys for relational references.
- Add uniqueness constraints for canonical skill names and user-skill pairs.
- Validate proficiency and importance values.
- Use indexes for commonly queried foreign keys.
- Define deletion behavior carefully to avoid unintended data loss.
- Store password hashes, never plaintext passwords.

## 5. Database Environments

Development:
- SQLite
- Local environment configuration

Production:
- PostgreSQL
- Managed credentials
- Alembic migrations
- Automated backups
- Restricted database access

## 6. Migration Workflow

1. Update SQLAlchemy model definitions.
2. Generate a migration with Alembic.
3. Review the generated migration.
4. Test the migration on a development database.
5. Apply it to the target environment.
6. Verify the application and database remain compatible.

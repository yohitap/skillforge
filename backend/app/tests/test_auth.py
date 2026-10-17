
import uuid

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def unique_email():
    return f"test_{uuid.uuid4().hex[:12]}@example.com"


def test_register_user():
    response = client.post(
        "/api/auth/register",
        json={
            "name": "Test User",
            "email": unique_email(),
            "password": "TestPassword123!",
            "target_role": "Python Developer",
        },
    )

    assert response.status_code in (200, 201), response.text

    data = response.json()
    assert "user" in data
    assert data["user"]["name"] == "Test User"
    assert data["user"]["email"].endswith("@example.com")


def test_register_rejects_invalid_email():
    response = client.post(
        "/api/auth/register",
        json={
            "name": "Test User",
            "email": "not-an-email",
            "password": "TestPassword123!",
        },
    )

    assert response.status_code == 422


def test_login_and_current_user():
    email = unique_email()
    password = "TestPassword123!"

    registration = client.post(
        "/api/auth/register",
        json={
            "name": "Login Test",
            "email": email,
            "password": password,
            "target_role": "Cybersecurity Analyst",
        },
    )

    assert registration.status_code in (200, 201), registration.text

    login = client.post(
        "/api/auth/login",
        data={
            "username": email,
            "password": password,
        },
    )

    assert login.status_code == 200, login.text

    token = login.json()["access_token"]
    assert token

    profile = client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert profile.status_code == 200, profile.text
    assert profile.json()["email"] == email


def test_protected_profile_rejects_missing_token():
    response = client.get("/api/auth/me")

    assert response.status_code in (401, 403)

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_default():
    response = client.get("/")
    assert response.status_code == 200
    assert "response" in response.json()
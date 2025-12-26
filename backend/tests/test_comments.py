from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_comments_empty(client):
    response = client.get("/comments/")
    assert response.status_code == 200
    assert response.json() == []

def test_add_comment(client):
    payload = {
        "text": "Hello world",
        "image": None
    }

    response = client.post("/comments/", json=payload)

    assert response.status_code == 200
    data = response.json()

    assert data["text"] == "Hello world"
    assert data["image"] is None
    assert data["author"] == "Admin"
    assert "id" in data

def test_get_comments_after_insert(client):
    response = client.get("/comments/")
    assert response.status_code == 200

    data = response.json()
    assert len(data) == 1
    assert data[0]["text"] == "Hello world"

def test_update_comment(client):
    payload = {"text": "Updated text"}

    response = client.put("/comments/1", json=payload)

    assert response.status_code == 200
    assert response.json()["text"] == "Updated text"

def test_update_comment_not_found(client):
    payload = {"text": "Does not exist"}

    response = client.put("/comments/999", json=payload)

    assert response.status_code == 404

def test_delete_comment(client):
    response = client.delete("/comments/1")

    assert response.status_code == 200
    assert response.json() == {"message": "Comment deleted!"}

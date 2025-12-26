# Bobyard - Comments Application

This is the comments application made for the Bobyard coding assesement. The backend is built with FastAPI and PostgreSQL as the database. The frontend is built with React with Typescript and TailwindCSS.

https://github.com/user-attachments/assets/22a59e87-2d2f-4530-b590-4cf7f97e7e59


## Features

- **Create Comments**: Add new comments with text and optional images
- **View Comments**: Display all comments
- **Update Comments**: Edit existing comment text
- **Delete Comments**: Remove comments 

## Potential further improvements

Here are some things that I think would be worth adding:
- support for uploading images from files
- more complex image validation to prevent displaying broken images
- polling to fetch the latest comment state
- pagination for performance and scalability
- beautiful custom modals instead of the built-in confirm popups 
- more thorough backend data validation
- "like" feature

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python3 -m venv venv
```

3. Activate the virtual environment:
```bash
source venv/bin/activate
```

4. Install dependencies using requirements.txt
```bash
pip install -r requirements.txt
```

5. (Optional) Start PostgreSQL with Docker:
```bash
docker-compose up -d
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend

From the `backend` directory:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

API documentation (Swagger UI) will be available at `http://localhost:8000/docs`

### Start the Frontend

From the `frontend` directory:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Author

Celina Cywinska


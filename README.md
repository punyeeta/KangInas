# Project Setup Guide

**Step 1:** Clone the Repository  
git clone <repository-url>

**Step 2:** Navigate to the Frontend Folder  
cd frontend

**Step 3:** Create a .env file inside the frontend folder  
Inside the .env file, add:  
VITE_BACKEND_URL=http://127.0.0.1:8000/api

**Step 4:** Install frontend dependencies  
npm install

**Step 5:** Navigate to the Backend Folder  
cd backend

**Step 6:** Set up the Python virtual environment and install requirements  
python -m venv venv  
venv\Scripts\activate  
pip install -r requirements.txt

**Step 7:** Run the Frontend and Backend  

For frontend (inside frontend folder):  
npm run dev

For backend (inside backend folder):  
python manage.py runserver

Make sure both the frontend and backend are running for the system to work correctly.

The frontend will usually run at:  
http://localhost:5173

The backend will usually run at:  
http://127.0.0.1:8000

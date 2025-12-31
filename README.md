# Pastebin-Lite[https://pastebinlite-theta.vercel.app]

A lightweight Pastebin-like application where users can create text pastes, receive a shareable URL, and view pastes with optional constraints such as time-to-live (TTL) and maximum views.

## Deployed URLs

- **Frontend (Vercel):** [https://pastebinlite-theta.vercel.app](https://pastebinlite-theta.vercel.app)  
- **Backend (Render):** [https://pastebin-lite-backend-j0sw.onrender.com](https://pastebin-lite-backend-j0sw.onrender.com)  

## Features

- Create a paste with arbitrary text.
- Receive a shareable URL to view the paste.
- View a paste via the shared URL.
- Optional constraints:
  - Time-based expiry (`ttl_seconds`)
  - Maximum number of views (`max_views`)
- Combined constraints: paste becomes unavailable if either constraint triggers.
- Deterministic testing mode for TTL via `TEST_MODE=1` and `x-test-now-ms` header.

## Running Locally

1. Clone the repository:

```bash
git clone https://github.com/KarthigaP20/Pastebin-Lite.git
cd Pastebin-Lite

2. Install dependencies for backend:

cd server
npm install

3. Create a .env file in /server:

MONGO_URI=<Your MongoDB connection string>
PORT=3001
TEST_MODE=1
BASE_URL=http://localhost:3001

4. Start backend server:

npm start

5. Install dependencies for frontend:

cd ../client
npm install

6. Create a .env file in /client:

VITE_API_URL=http://localhost:3001

7. Start frontend development server:

npm run dev

Open http://localhost:5173 in your browser.

Persistence Layer

Database: MongoDB Atlas (cloud-hosted)

Used to store pastes with optional TTL and max view constraints.

Ensures data persists across requests and server restarts.

Design Decisions

Frontend: React + Vite + Tailwind CSS for fast development and responsive UI.

Backend: Node.js + Express + Mongoose for API routing and MongoDB interaction.

Deterministic testing: TEST_MODE=1 and x-test-now-ms support for automated tests of TTL logic.

Constraints: Both TTL and max views are optional and independently enforced.

Security: Paste content is escaped in HTML views to prevent XSS.

Usage

Go to frontend URL: https://pastebinlite-theta.vercel.app

Enter your text in the Paste Content box.

Optionally, include TTL (seconds) and max views in the UI (if implemented).

Click Create Paste.

Copy the shareable URL and open it to view the paste.

Repository

GitHub Repository: https://github.com/KarthigaP20/Pastebin-Lite

Author: KarthigaP([https://github.com/KarthigaP20])

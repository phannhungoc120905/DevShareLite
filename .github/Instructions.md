# DevShare Lite - Setup and Usage Instructions

## Project Overview

DevShare Lite is an online forum for IT professionals and enthusiasts to share knowledge, ask questions, and engage in technical discussions.

## Project Structure

- Frontend (React + TypeScript): Running on http://localhost:3000
- Backend (Laravel API): Running on http://localhost:8000

## Setup Instructions

### Backend Setup (Laravel)

1. Navigate to backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   composer install
   ```

3. Configure environment:

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Update .env with database settings:

   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=devshare
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. Create database and run migrations:

   ```bash
   php artisan migrate
   ```

6. Start the server:
   ```bash
   php artisan serve
   ```
   Backend will run on http://localhost:8000

### Frontend Setup (React)

1. Navigate to frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment:

   ```bash
   cp .env.example .env
   ```

   Ensure VITE_API_URL points to the backend:

   ```
   VITE_API_URL=http://localhost:8000
   ```

4. Start development server:
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:3000

## Features & Usage

### 1. User Authentication

- Register: Click "Register" in the navbar
  - Required: Name, Email, Password
- Login: Click "Login" in the navbar
  - Use email and password
- Logout: Available in user menu after login

### 2. Posts Management

- View Posts: Click "Posts" in the navbar
  - Posts are paginated, 10 per page
  - Filter by tags or search text
- Create Post: Click "Create Post" button
  - Title: Required, max 255 characters
  - Content: Supports Markdown formatting
  - Tags: Add relevant tags
  - Status: Draft or Published
- Edit/Delete: Available on your own posts

### 3. Comments System

- Add Comment: On any post detail page
- Reply to Comments: Click "Reply" on any comment
- View Threads: Comments are shown in threaded view

### 4. Search & Navigation

- Search Posts: Use the search bar
  - Searches in titles and content
- Filter by Tags: Click on tags
- Sort Options: Latest, Most Commented

### 5. User Profiles

- View Profile: Click username or avatar
- Edit Profile: Available on your own profile
- View Activity: See user's posts and comments

## API Documentation

### Authentication Endpoints

```
POST /api/register
Body: { name, email, password }

POST /api/login
Body: { email, password }

POST /api/logout
Header: Authorization Bearer Token
```

### Posts Endpoints

```
GET /api/posts
Query: { page, search, tag }

GET /api/posts/{id}

POST /api/posts
Body: { title, content, is_published, tags }

PUT /api/posts/{id}
Body: { title, content, is_published, tags }

DELETE /api/posts/{id}
```

### Comments Endpoints

```
GET /api/posts/{id}/comments

POST /api/comments
Body: { post_id, content }

POST /api/comments/{id}/reply
Body: { content }
```

### User Endpoints

```
GET /api/user/profile

GET /api/user/posts

GET /api/user/drafts
```

## Troubleshooting

1. Database Connection Issues:

   - Verify MySQL is running
   - Check credentials in .env
   - Ensure database exists

2. CORS Issues:

   - Verify frontend URL in backend .env
   - Check CORS configuration

3. Authentication Issues:
   - Clear browser cookies
   - Verify Sanctum setup

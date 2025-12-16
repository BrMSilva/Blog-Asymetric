# Blog-Asymetric
A fullstack blog with a React frontend and Node.js/Express backend, containerized with Docker, ready for deployment on AWS EC2 with images stored in ECR.

## Project Structure

/frontend # React application
/backend # Node.js API
/infra/script # Deployment and infrastructure scripts
docker-compose.yml


---

## Architecture

```text
          ┌───────────────┐
          │   AWS ECR     │
          │ (Docker Repo) │
          └──────┬────────┘
                 │ Pull images
                 ▼
       ┌────────────────────┐
       │   AWS EC2 Instance │
       │  Linux + Docker    │
       └──────┬─────────────┘
              │
   ┌──────────┴──────────┐
   │                     │
┌───────┐           ┌────────┐
│Backend│           │Frontend│
│Docker │           │Docker  │
│Container          │Container│
└───────┘           └────────┘
Backend exposes API on PORT=4000

Frontend serves the React app on port 80

SQLite database persisted in /home/ec2-user/data

Local Development

Clone the repository:

git clone <repo-url>
cd Blog-Asymetric


Create a .env file in the root:

ADMIN_TOKEN=<your_admin_token>
DB_PATH=/app/data/blog.sqlite
PORT=4000


Start containers locally:

docker-compose up --build


Frontend: http://localhost

Backend API: http://localhost:4000

Deployment (AWS EC2)

SSH into your EC2 instance.

Set environment variables:

export ADMIN_TOKEN=<your_admin_token>


Run the deployment script:

chmod +x infra/script/deploy.sh
./infra/script/deploy.sh


The script will:

Log in to AWS ECR

Pull the latest backend and frontend images

Stop old containers if they exist

Start new containers with --restart unless-stopped

API Endpoints
Method	Endpoint	Description
GET	/api/articles	List all articles
GET	/api/articles/:slug	Get a single article by slug
POST	/api/articles	Create a new article
PUT	/api/articles/:slug	Update an article
DELETE	/api/articles/:slug	Delete an article

Authentication: use ADMIN_TOKEN for write operations.

Environment Variables
Variable	Description
ADMIN_TOKEN	Secret token for admin operations
DB_PATH	Path for SQLite database
PORT	Backend port (default: 4000)
Technologies

React

Node.js / Express

SQLite (backend)

Docker / Docker Compose

AWS EC2 / ECR





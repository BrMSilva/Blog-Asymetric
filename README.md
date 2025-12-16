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


## Requirements

- Node.js >= 18
- Docker
- Docker Compose
- AWS CLI configured
- Git

## Local Setup

1. Clone the repository:

```bash
git clone <https://github.com/BrMSilva/Blog-Asymetric>
cd Blog-Asymetric

Create a .env file in the root directory:

ADMIN_TOKEN=<your_admin_token>
DB_PATH=/app/data/blog.sqlite
PORT=4000

Start the containers locally:

docker-compose up --build
The frontend will be available at http://localhost
 and the backend at http://localhost:4000
.

Deployment

Deployment is done via the deploy.sh script:

Set the environment variables:

export ADMIN_TOKEN=<your_admin_token>


Run the deployment script:

chmod +x infra/script/deploy.sh
./infra/script/deploy.sh


The script will:

Log in to AWS ECR

Pull the latest Docker images

Stop old containers

Start the backend and frontend in new containers

Technologies

React

Node.js / Express

SQLite (backend)

Docker / Docker Compose

AWS EC2 / ECR

License

MIT


If you want, I can also make **an enhanced version** with:

- Architecture diagram  
- API endpoints list  
- Environment-specific instructions (development vs production)  


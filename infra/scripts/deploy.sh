#!/bin/bash
set -eu

# --- Config ---
AWS_REGION="eu-north-1"
AWS_ACCOUNT_ID="592573568501"

# Repositórios separados
BACKEND_REPO="db.blog/backend"
FRONTEND_REPO="db.blog/frontend"

BACKEND_IMAGE="592573568501.dkr.ecr.eu-north-1.amazonaws.com/db.blog/backend:latest"
FRONTEND_IMAGE="592573568501.dkr.ecr.eu-north-1.amazonaws.com/db.blog/frontend:latest"

DATA_DIR="/home/ec2-user/data"

# --- Validações ---
if [ -z "${ADMIN_TOKEN:-}" ]; then
  echo "❌ ADMIN_TOKEN não definido"
  exit 1
fi

docker info >/dev/null 2>&1 || {
  echo "❌ Docker não está rodando"
  exit 1
}

# --- Login ECR ---
echo "🔐 Login no ECR..."
aws ecr get-login-password --region "$AWS_REGION" \
  | docker login --username AWS --password-stdin "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"

# --- Pull das imagens ---
echo "📥 Pull das imagens..."
docker pull "$BACKEND_IMAGE"
docker pull "$FRONTEND_IMAGE"

# --- Preparação ---
mkdir -p "$DATA_DIR"

# --- Stop containers antigos ---
echo "🛑 Parando containers antigos..."
docker stop blog-backend blog-frontend 2>/dev/null || true
docker rm blog-backend blog-frontend 2>/dev/null || true

# Backend
docker run -d \
  --name blog-backend \
  -p 4000:4000 \
  --restart unless-stopped \
  -e PORT=4000 \
  -e DB_PATH=/app/data/blog.sqlite \
  -e ADMIN_TOKEN="$ADMIN_TOKEN" \
  -v "/home/ec2-user/data:/app/data" \
  592573568501.dkr.ecr.eu-north-1.amazonaws.com/db.blog/backend:latest

# Frontend
docker run -d \
  --name blog-frontend \
  -p 3000:80 \
  --restart unless-stopped \
  592573568501.dkr.ecr.eu-north-1.amazonaws.com/db.blog/frontend:latest

echo "✅ Deploy finalizado"





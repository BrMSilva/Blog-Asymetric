#!/bin/bash
set -e

echo "🔄 Atualizando sistema..."
sudo yum update -y

echo "🐳 Instalando Docker..."
sudo yum install -y docker

echo "▶️ Iniciando Docker..."
sudo systemctl start docker
sudo systemctl enable docker

echo "👤 Adicionando usuário ec2-user ao grupo docker..."
sudo usermod -aG docker ec2-user

echo "📦 Instalando Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "☁️ Instalando AWS CLI v2..."
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

echo "🧹 Limpando arquivos temporários..."
rm -rf aws awscliv2.zip

echo "✅ EC2 pronta para deploy!"
echo "⚠️ Faça logout/login para aplicar permissões do Docker."

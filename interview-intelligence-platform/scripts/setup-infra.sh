#!/bin/bash

set -e

echo "======================================="
echo "TalentIQ AI Infrastructure Setup"
echo "======================================="

# ----------------------------------------
# Install PostgreSQL
# ----------------------------------------

echo "Installing PostgreSQL..."

brew install postgresql@16

echo "Starting PostgreSQL..."

brew services start postgresql@16

# ----------------------------------------
# Create Database
# ----------------------------------------

echo "Creating Database..."

createdb talentiq || true

# ----------------------------------------
# Install pipx
# ----------------------------------------

echo "Installing pipx..."

brew install pipx

pipx ensurepath

export PATH="$HOME/.local/bin:$PATH"

# ----------------------------------------
# Install ChromaDB
# ----------------------------------------

echo "Installing ChromaDB..."

pipx install chromadb

# ----------------------------------------
# Start ChromaDB
# ----------------------------------------

echo "Starting ChromaDB..."

~/.local/bin/chroma run --host localhost --port 8000 &

echo ""
echo "======================================="
echo "Services Started Successfully"
echo "======================================="
echo "PostgreSQL : localhost:5432"
echo "ChromaDB   : localhost:8000"
echo "Database   : talentiq"
echo "======================================="
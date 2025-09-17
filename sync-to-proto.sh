#!/bin/bash

# Moza AI Sync Script
# This script syncs changes from Moza-AI-MVP to Moza-AI-Proto

echo "🔄 Starting sync from Moza-AI-MVP to Moza-AI-Proto..."

# Define paths
MVP_PATH="/Users/isabellallamoza/Downloads/Moza-AI-MVP-main"
PROTO_PATH="/Users/isabellallamoza/Downloads/Moza-AI-Proto"

# Check if both directories exist
if [ ! -d "$MVP_PATH" ]; then
    echo "❌ Moza-AI-MVP directory not found: $MVP_PATH"
    exit 1
fi

if [ ! -d "$PROTO_PATH" ]; then
    echo "❌ Moza-AI-Proto directory not found: $PROTO_PATH"
    exit 1
fi

# Navigate to MVP directory
cd "$MVP_PATH"

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Uncommitted changes found in Moza-AI-MVP"
    echo "Please commit your changes first:"
    echo "  git add ."
    echo "  git commit -m 'Your message'"
    echo "  git push origin main"
    exit 1
fi

# Push MVP changes to GitHub
echo "📤 Pushing Moza-AI-MVP changes to GitHub..."
git push origin main

# Navigate to Proto directory
cd "$PROTO_PATH"

# Copy source files
echo "📋 Copying source files..."
cp -r "$MVP_PATH/src"/* src/

# Copy configuration files
echo "📋 Copying configuration files..."
cp "$MVP_PATH/package.json" package.json
cp "$MVP_PATH/index.html" index.html
cp "$MVP_PATH/tailwind.config.ts" tailwind.config.ts
cp "$MVP_PATH/vite.config.ts" vite.config.ts
cp "$MVP_PATH/tsconfig.json" tsconfig.json
cp "$MVP_PATH/tsconfig.app.json" tsconfig.app.json
cp "$MVP_PATH/tsconfig.node.json" tsconfig.node.json
cp "$MVP_PATH/postcss.config.js" postcss.config.js
cp "$MVP_PATH/eslint.config.js" eslint.config.js
cp "$MVP_PATH/vercel.json" vercel.json

# Check what changed
echo "🔍 Checking changes in Moza-AI-Proto..."
git status

# Add all changes
echo "➕ Adding changes to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "🔄 Sync latest changes from Moza-AI-MVP

- Updated source code
- Updated configuration files
- Synced with main development branch"

# Push to GitHub
echo "📤 Pushing Moza-AI-Proto changes to GitHub..."
git push origin main

echo "✅ Sync complete!"
echo "🌐 Moza-AI-MVP: https://github.com/andresllamoza/Moza-AI-MVP"
echo "🌐 Moza-AI-Proto: https://github.com/andresllamoza/Moza-AI-Proto"
echo "🚀 Vercel will automatically deploy both repositories"

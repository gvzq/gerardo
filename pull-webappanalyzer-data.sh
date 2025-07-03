#!/bin/bash

# Script to clone webappanalyzer repository and copy data files into Next.js project
# This ensures the data is available during build and runtime

set -e  # Exit on any error

echo "🔄 Cloning webappanalyzer repository and setting up data files..."

# Define repository URL and paths
REPO_URL="https://github.com/enthec/webappanalyzer"
TEMP_DIR="temp-webappanalyzer"
SOURCE_DIR="$TEMP_DIR/src"
CONSULTING_DIR="lib/webappanalyzer-data"

# Clean up any existing temp directory
if [ -d "$TEMP_DIR" ]; then
    echo "🧹 Cleaning up existing temp directory..."
    rm -rf "$TEMP_DIR"
fi

# Clean up existing webappanalyzer files to avoid permission issues
echo "🧹 Cleaning up existing webappanalyzer files..."

# Function to forcefully remove files/directories
force_remove() {
    local target="$1"
    if [ -e "$target" ]; then
        echo "   Removing $target..."
        # Try multiple approaches to remove stubborn files
        chmod -R u+rwx "$target" 2>/dev/null || true
        chmod -R 755 "$target" 2>/dev/null || true
        rm -rf "$target" 2>/dev/null || {
            echo "   Standard removal failed, trying with sudo..."
            sudo rm -rf "$target" 2>/dev/null || {
                echo "   ⚠️  Warning: Could not remove $target, continuing anyway..."
            }
        }
    fi
}

# Remove existing files
force_remove "$CONSULTING_DIR/categories.json"
force_remove "$CONSULTING_DIR/technologies"

# Clone the webappanalyzer repository
echo "📥 Cloning webappanalyzer repository..."
git clone "$REPO_URL" "$TEMP_DIR"

if [ ! -d "$TEMP_DIR" ]; then
    echo "❌ Error: Failed to clone repository from $REPO_URL"
    exit 1
fi

echo "✅ Repository cloned successfully"

# Create lib directory if it doesn't exist
mkdir -p "$CONSULTING_DIR"

# Check if source directory exists in cloned repo
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Error: Source directory '$SOURCE_DIR' not found in cloned repository!"
    echo "   Repository structure might have changed."
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Copy webappanalyzer data to lib folder
echo "📁 Copying webappanalyzer data to lib folder..."

# Copy categories.json
if [ -f "$SOURCE_DIR/categories.json" ]; then
    echo "📋 Copying categories.json to lib..."
    cp "$SOURCE_DIR/categories.json" "$CONSULTING_DIR/"
    chmod 644 "$CONSULTING_DIR/categories.json"
    echo "✅ categories.json copied to lib folder"
else
    echo "⚠️  Warning: categories.json not found in $SOURCE_DIR"
fi

# Copy technologies directory
if [ -d "$SOURCE_DIR/technologies" ]; then
    echo "🔧 Copying technologies directory to lib..."
    cp -r "$SOURCE_DIR/technologies" "$CONSULTING_DIR/"
    
    # Fix permissions properly
    echo "🔧 Setting proper permissions on technologies directory..."
    chmod 755 "$CONSULTING_DIR/technologies"  # Directory needs execute permission
    chmod -R 644 "$CONSULTING_DIR/technologies/"*.json  # JSON files need read permission
    
    echo "✅ technologies directory copied to lib folder"
    
    # Count the number of technology files copied
    TECH_COUNT=$(find "$CONSULTING_DIR/technologies" -name "*.json" | wc -l)
    echo "📊 Copied $TECH_COUNT technology definition files to lib"
else
    echo "⚠️  Warning: technologies directory not found in $SOURCE_DIR"
fi




# Clean up cloned repository
echo ""
echo "🧹 Cleaning up temporary files..."
rm -rf "$TEMP_DIR"
echo "✅ Temporary repository cleaned up"

# Final permission check and fix
echo ""
echo "🔧 Final permission verification..."
if [ -d "$CONSULTING_DIR/technologies" ]; then
    echo "   Ensuring technologies directory is accessible..."
    chmod 755 "$CONSULTING_DIR/technologies" 2>/dev/null || true
    chmod 644 "$CONSULTING_DIR/technologies/"*.json 2>/dev/null || true
fi

echo "✅ All permissions verified and set correctly"

echo ""
echo "🎉 webappanalyzer data setup and route reorganization completed!"
echo ""
echo "📥 Repository: $REPO_URL"
echo "📁 Files copied to:"
echo "   - $CONSULTING_DIR/ (main location)"
echo ""
echo "💡 You may need to update your webappanalyzer.js to use the new paths:"
echo "   - Data: $CONSULTING_DIR/categories.json"
echo "   - Technologies: $CONSULTING_DIR/technologies/"
echo ""
echo "📊 Technology patterns from: https://github.com/enthec/webappanalyzer"
echo "" 
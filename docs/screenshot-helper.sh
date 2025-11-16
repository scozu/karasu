#!/bin/bash
# Karasu Theme - Screenshot Helper Script
# This script helps prepare the environment for taking theme screenshots

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SAMPLE_CODE_DIR="$SCRIPT_DIR/sample-code"

echo "🎨 Karasu Theme Screenshot Helper"
echo "=================================="
echo ""

# Check if sample code directory exists
if [ ! -d "$SAMPLE_CODE_DIR" ]; then
    echo "❌ Sample code directory not found: $SAMPLE_CODE_DIR"
    exit 1
fi

echo "📁 Sample code files available:"
ls -1 "$SAMPLE_CODE_DIR" | sed 's/^/   - /'
echo ""

# Function to open file in editor
open_in_editor() {
    local file="$1"
    local editor="${EDITOR:-nvim}"
    
    echo "📝 Opening $file in $editor..."
    
    case "$editor" in
        nvim|vim)
            "$editor" "$file"
            ;;
        code|cursor)
            "$editor" "$file"
            ;;
        zed)
            zed "$file"
            ;;
        *)
            echo "⚠️  Unknown editor: $editor"
            echo "   Please open manually: $file"
            ;;
    esac
}

# Function to generate HTML from Neovim buffer
generate_html() {
    local file="$1"
    local output="${file%.*}.html"
    
    if command -v nvim &> /dev/null; then
        echo "🌐 Generating HTML from Neovim..."
        nvim -c "set termguicolors" -c "colorscheme karasu" -c "TOhtml" -c "wq" -c "q" "$file" 2>/dev/null || true
        
        if [ -f "${file}.html" ]; then
            mv "${file}.html" "$output"
            echo "✅ Generated: $output"
        fi
    else
        echo "⚠️  Neovim not found, skipping HTML generation"
    fi
}

# Function to check screenshot tools
check_tools() {
    echo "🔍 Checking available screenshot tools..."
    
    local tools=("flameshot" "scrot" "gnome-screenshot" "grim" "screencapture")
    local found=false
    
    for tool in "${tools[@]}"; do
        if command -v "$tool" &> /dev/null; then
            echo "   ✅ $tool found"
            found=true
        fi
    done
    
    if [ "$found" = false ]; then
        echo "   ⚠️  No screenshot tools found"
        echo "   Please install one: flameshot, scrot, gnome-screenshot, grim, or screencapture"
    fi
}

# Function to display screenshot checklist
show_checklist() {
    echo ""
    echo "📋 Screenshot Checklist:"
    echo "   [ ] Theme is set to Karasu"
    echo "   [ ] Font size is 14-16px"
    echo "   [ ] Window size is consistent (1920x1080 recommended)"
    echo "   [ ] Line numbers are visible"
    echo "   [ ] Code is properly formatted"
    echo "   [ ] No personal information visible"
    echo "   [ ] All syntax elements are visible"
    echo ""
}

# Main menu
show_menu() {
    echo "What would you like to do?"
    echo ""
    echo "1) Open sample code file in editor"
    echo "2) Generate HTML from Neovim (for web preview)"
    echo "3) Check available screenshot tools"
    echo "4) Show screenshot checklist"
    echo "5) List all sample files"
    echo "6) Exit"
    echo ""
    read -p "Enter choice [1-6]: " choice
    
    case "$choice" in
        1)
            echo ""
            echo "Available files:"
            ls -1 "$SAMPLE_CODE_DIR" | nl
            echo ""
            read -p "Enter file number: " file_num
            file=$(ls -1 "$SAMPLE_CODE_DIR" | sed -n "${file_num}p")
            if [ -n "$file" ]; then
                open_in_editor "$SAMPLE_CODE_DIR/$file"
            else
                echo "❌ Invalid file number"
            fi
            ;;
        2)
            echo ""
            echo "Available files:"
            ls -1 "$SAMPLE_CODE_DIR" | nl
            echo ""
            read -p "Enter file number: " file_num
            file=$(ls -1 "$SAMPLE_CODE_DIR" | sed -n "${file_num}p")
            if [ -n "$file" ]; then
                generate_html "$SAMPLE_CODE_DIR/$file"
            else
                echo "❌ Invalid file number"
            fi
            ;;
        3)
            check_tools
            ;;
        4)
            show_checklist
            ;;
        5)
            echo ""
            ls -lh "$SAMPLE_CODE_DIR"
            echo ""
            ;;
        6)
            echo "👋 Good luck with your screenshots!"
            exit 0
            ;;
        *)
            echo "❌ Invalid choice"
            ;;
    esac
}

# Run checks
check_tools
show_checklist

# Interactive menu loop
while true; do
    show_menu
    echo ""
done

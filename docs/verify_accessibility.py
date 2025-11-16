#!/usr/bin/env python3
"""
Verify accessibility claims for Karasu colorscheme
Calculates WCAG contrast ratios for color combinations
"""

import math
import json

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_linear(rgb):
    """Convert RGB to linear RGB for luminance calculation"""
    return [c/255.0 for c in rgb]

def relative_luminance(rgb):
    """Calculate relative luminance of a color"""
    r, g, b = rgb_to_linear(rgb)
    
    # Convert to linear values
    def linearize(c):
        if c <= 0.03928:
            return c / 12.92
        else:
            return pow((c + 0.055) / 1.055, 2.4)
    
    r_lin = linearize(r)
    g_lin = linearize(g)
    b_lin = linearize(b)
    
    # Calculate luminance
    return 0.2126 * r_lin + 0.7152 * g_lin + 0.0722 * b_lin

def contrast_ratio(color1, color2):
    """Calculate WCAG contrast ratio between two colors"""
    rgb1 = hex_to_rgb(color1)
    rgb2 = hex_to_rgb(color2)
    
    lum1 = relative_luminance(rgb1)
    lum2 = relative_luminance(rgb2)
    
    # Ensure lighter color is first
    if lum1 < lum2:
        lum1, lum2 = lum2, lum1
    
    return (lum1 + 0.05) / (lum2 + 0.05)

def main():
    # Load colors from palette
    with open('palette/colors.json', 'r') as f:
        colors = json.load(f)
    
    # Extract key colors for testing
    bg0 = colors['background']['karasuBg0']  # #121212
    fg0 = colors['foreground']['karasuFg0']  # #d4c5b9
    
    # Test the main claim: karasuFg0 on karasuBg0 = ~11:1 (WCAG AAA)
    main_contrast = contrast_ratio(fg0, bg0)
    print(f"Main text contrast (karasuFg0 on karasuBg0): {main_contrast:.2f}:1")
    print(f"Claim: ~11:1 (WCAG AAA)")
    print(f"Actual: {main_contrast:.2f}:1")
    print(f"WCAG AAA requires: 7:1+")
    print(f"Result: {'✓ PASS' if main_contrast >= 7.0 else '✗ FAIL'}")
    print()
    
    # Test syntax colors against background
    syntax_colors = colors['syntax']
    print("Syntax color contrast ratios (against karasuBg0):")
    print("-" * 50)
    
    all_pass = True
    for name, color in syntax_colors.items():
        ratio = contrast_ratio(color, bg0)
        wcag_aa = ratio >= 4.5
        wcag_aaa = ratio >= 7.0
        status = "✓" if wcag_aa else "✗"
        all_pass = all_pass and wcag_aa
        
        print(f"{name:20} {ratio:.2f}:1 {status} {'(AAA)' if wcag_aaa else '(AA)' if wcag_aa else '(FAIL)'}")
    
    print()
    print(f"All syntax colors meet WCAG AA (4.5:1): {'✓ YES' if all_pass else '✗ NO'}")
    print()
    
    # Test bright variants
    bright_colors = colors['bright']
    print("Bright color contrast ratios (against karasuBg0):")
    print("-" * 50)
    
    bright_all_pass = True
    for name, color in bright_colors.items():
        ratio = contrast_ratio(color, bg0)
        wcag_aa = ratio >= 4.5
        wcag_aaa = ratio >= 7.0
        status = "✓" if wcag_aa else "✗"
        bright_all_pass = bright_all_pass and wcag_aa
        
        print(f"{name:20} {ratio:.2f}:1 {status} {'(AAA)' if wcag_aaa else '(AA)' if wcag_aa else '(FAIL)'}")
    
    print()
    print(f"All bright colors meet WCAG AA (4.5:1): {'✓ YES' if bright_all_pass else '✗ NO'}")
    print()
    
    # Summary
    print("=== ACCESSIBILITY VERIFICATION SUMMARY ===")
    print(f"Main claim (fg0 on bg0 ~11:1): {'✓ VERIFIED' if abs(main_contrast - 11.0) < 2.0 else '✗ NOT VERIFIED'}")
    print(f"Actual ratio: {main_contrast:.2f}:1")
    print(f"All syntax colors >4.5:1: {'✓ VERIFIED' if all_pass else '✗ NOT VERIFIED'}")
    print(f"Bright variants available: ✓ VERIFIED")
    print(f"Colorblind friendly: Cannot be auto-verified - requires visual testing")
    print(f"Low light optimized: Subjective - requires user testing")

if __name__ == "__main__":
    main()
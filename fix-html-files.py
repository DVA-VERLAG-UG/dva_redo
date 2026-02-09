#!/usr/bin/env python3
"""
Auto-fix all HTML files for GitHub Pages - IMPROVED
Fixes navigation and blog paths correctly
"""

import os
import re

CURTAIN_BLOCKER = '''
    <style>
    /* CRITICAL: Block curtain completely on this page */
    body.no-curtain::before,
    body.no-curtain::after,
    body.no-curtain .curtain,
    body.no-curtain .curtain-left,
    body.no-curtain .curtain-right,
    body.no-curtain .curtain-text,
    body.no-curtain .curtain-word,
    body.no-curtain .curtain-content,
    body.no-curtain [class*="curtain"] {
      display: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
      visibility: hidden !important;
      height: 0 !important;
      width: 0 !important;
      overflow: hidden !important;
      position: absolute !important;
      left: -9999px !important;
    }
    body.no-curtain .curtain *,
    body.no-curtain [class*="curtain"] * {
      display: none !important;
      visibility: hidden !important;
    }
    </style>
    '''

def fix_de_file(filepath):
    """Fix files in /de/ folder"""
    print(f"📝 Fixing {filepath}...")
    
    if not os.path.exists(filepath):
        print(f"  ⚠️  File not found: {filepath}")
        return
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # 1. Fix floating brand link
    content = re.sub(r'href="(?:\.\./de/)?index\.html"', 'href="index.html"', content)
    
    # 2. Fix all /de/ absolute paths to relative
    content = content.replace('href="/de/', 'href="')
    content = content.replace('href="../de/', 'href="')
    
    # 3. Fix blog links - should be "blog/blog-index.html" (not just "blog/")
    content = re.sub(r'href="(?:\.\./de/)?blog/"', 'href="blog/blog-index.html"', content)
    content = re.sub(r'href="(?:\.\./de/)?blog/blog-index\.html"', 'href="blog/blog-index.html"', content)
    
    # 4. Fix onclick handlers - blog should be blog/blog-index.html
    content = re.sub(r"onclick=\"window\.location\.href='(?:\.\./de/)?blog/'\"", 
                     "onclick=\"window.location.href='blog/blog-index.html'\"", content)
    content = content.replace("onclick=\"window.location.href='../de/", 
                              "onclick=\"window.location.href='")
    
    # 5. Add curtain blocker if needed (not for index.html)
    if 'index.html' not in filepath and 'class="no-curtain"' in content:
        if CURTAIN_BLOCKER.strip() not in content:
            content = content.replace('<body class="no-curtain">', 
                                     f'<body class="no-curtain">\n{CURTAIN_BLOCKER}')
            print(f"  ✅ Added curtain blocker")
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✅ Paths fixed")
        
        # Show what was changed
        changes = []
        if '../de/' in original_content:
            changes.append("../de/ → relative")
        if '/de/' in original_content:
            changes.append("/de/ → relative")
        if changes:
            print(f"  📝 Changes: {', '.join(changes)}")
    else:
        print(f"  ℹ️  No changes needed")

def fix_blog_file(filepath):
    """Fix files in /de/blog/ folder"""
    print(f"📝 Fixing {filepath}...")
    
    if not os.path.exists(filepath):
        print(f"  ⚠️  File not found: {filepath}")
        return
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # 1. Fix floating brand - should go up TWO levels to reach /de/index.html
    content = re.sub(r'href="[./]*de/index\.html"', 'href="../index.html"', content)
    content = re.sub(r'href="../index\.html"', 'href="../index.html"', content)  # Keep correct ones
    
    # 2. Fix "back to blog" links
    content = re.sub(r'href="[./]*de/blog/blog-index\.html"', 'href="blog-index.html"', content)
    content = re.sub(r'href="[./]*de/blog/"', 'href="blog-index.html"', content)
    
    # 3. Fix navigation to other /de/ pages (need to go up one level)
    # From /de/blog/ to /de/kontakt.html etc.
    content = re.sub(r'href="kontakt\.html"', 'href="../kontakt.html"', content)
    content = re.sub(r'href="ueber-uns\.html"', 'href="../ueber-uns.html"', content)
    content = re.sub(r'href="konfigurator-page\.html"', 'href="../konfigurator-page.html"', content)
    content = re.sub(r'href="index\.html"(?!">)', 'href="../index.html"', content)  # But not in floating brand
    
    # Fix if they were already ../
    content = re.sub(r'href="\.\./\.\./(kontakt|ueber-uns|konfigurator-page)\.html"', r'href="../\1.html"', content)
    
    # 4. Fix ALL asset paths to use ../../ (two levels up from /de/blog/)
    # First, fix absolute paths
    content = re.sub(r'(src|href)="/assets/', r'\1="../../assets/', content)
    
    # Then fix single ../ to ../../
    content = re.sub(r'(src|href)="\.\./assets/', r'\1="../../assets/', content)
    
    # Make sure we don't have triple ../../.. 
    content = re.sub(r'(src|href)="(\.\./){3,}assets/', r'\1="../../assets/', content)
    
    # 5. Fix component fetches (in JavaScript)
    content = re.sub(r"fetch\(['\"]\/components/", "fetch('../../components/", content)
    content = re.sub(r"fetch\(['\"]\.\.\/components/", "fetch('../../components/", content)
    
    # 6. Fix imports (in JavaScript modules)
    content = re.sub(r"import\(['\"]\/assets/", "import('../../assets/", content)
    content = re.sub(r"import\(['\"]\.\.\/assets/", "import('../../assets/", content)
    
    # 7. Fix favicon specifically - MUST be ../../
    content = re.sub(r'href="[./]*assets/images/(branding/)?favicon\.png"',
                     'href="../../assets/images/branding/favicon.png"', content)
    
    # 8. Fix logo images
    content = re.sub(r'src="[./]*assets/images/branding/dva-logo\.png"',
                     'src="../../assets/images/branding/dva-logo.png"', content)
    
    # 9. Add curtain blocker if needed
    if 'class="no-curtain"' in content:
        if CURTAIN_BLOCKER.strip() not in content:
            content = content.replace('<body class="no-curtain">', 
                                     f'<body class="no-curtain">\n{CURTAIN_BLOCKER}')
            print(f"  ✅ Added curtain blocker")
    elif '<body>' in content:
        content = content.replace('<body>', 
                                 f'<body class="no-curtain">\n{CURTAIN_BLOCKER}', 1)
        print(f"  ✅ Added curtain blocker and no-curtain class")
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✅ Paths fixed")
        
        # Show what was changed
        changes = []
        if '../de/' in original_content:
            changes.append("../de/ → ../")
        if '/assets/' in original_content:
            changes.append("/assets/ → ../../assets/")
        if '../assets/' in original_content:
            changes.append("../assets/ → ../../assets/")
        if changes:
            print(f"  📝 Changes: {', '.join(changes)}")
    else:
        print(f"  ℹ️  No changes needed")

def fix_header():
    """Fix header.html component"""
    filepath = "components/header.html"
    print(f"📝 Fixing {filepath}...")
    
    if not os.path.exists(filepath):
        print(f"  ⚠️  File not found: {filepath}")
        return
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Fix all navigation links to be relative
    # These will be loaded into pages in /de/, so paths should be relative to /de/
    content = re.sub(r'href="/de/', 'href="', content)
    content = re.sub(r'href="(?:\.\./)?de/', 'href="', content)
    
    # Blog links should point to blog/blog-index.html
    content = re.sub(r'href="blog/"', 'href="blog/blog-index.html"', content)
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✅ Header navigation fixed")
    else:
        print(f"  ℹ️  No changes needed")

def main():
    print("🚀 AUTO-FIXING ALL HTML FILES (IMPROVED)...")
    print("")
    
    # Fix header first
    print("Fix components:")
    fix_header()
    
    print("")
    print("Fix /de/ files:")
    fix_de_file("de/index.html")
    fix_de_file("de/kontakt.html")
    fix_de_file("de/ueber-uns.html")
    fix_de_file("de/konfigurator-page.html")
    
    print("")
    print("Fix /de/blog/ files:")
    fix_blog_file("de/blog/blog-index.html")
    fix_blog_file("de/blog/post.html")
    
    print("")
    print("✅ ALL FILES FIXED!")
    print("")
    print("📋 Next steps:")
    print("1. Check changes: git diff")
    print("2. Test navigation:")
    print("   - From index.html → blog/ should work")
    print("   - From blog/ → ../index.html should work")
    print("   - Header navigation should work everywhere")
    print("3. Commit & push to GitHub")
    print("4. Check GitHub Pages")

if __name__ == "__main__":
    main()
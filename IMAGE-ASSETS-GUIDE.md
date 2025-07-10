# Image Assets Guide for Jess Recruiting Website

## Required Image Files

To complete your website setup, you need to add these image files to your project folder:

### 1. Header Background Image
- **Filename:** `smarter-way-to-apply.jpg`
- **Purpose:** Main hero section background
- **Recommended Size:** 1920x1080 pixels (Full HD)
- **Format:** JPEG
- **Description:** This should be your "Smarter Way to Apply" image

### 2. Company Logo
- **Filename:** `jess-recruiting-logo.png`
- **Purpose:** Company logo in the header
- **Recommended Size:** 400x200 pixels (or similar aspect ratio)
- **Format:** PNG (with transparent background preferred)
- **Description:** Your Jess Recruiting company logo

## How to Add Images

1. Place both image files in the same folder as your `index.html` file:
   ```
   smarterwaytoapply/
   ├── index.html
   ├── enhanced.js
   ├── sw.js
   ├── smarter-way-to-apply.jpg    ← Add this file
   ├── jess-recruiting-logo.png    ← Add this file
   └── other files...
   ```

2. If you have different filenames, update the HTML file:
   - For background: Change `url('smarter-way-to-apply.jpg')` in the CSS
   - For logo: Change `src="jess-recruiting-logo.png"` in the HTML

## Fallback Behavior

- **Background Image:** If `smarter-way-to-apply.jpg` is not found, the site will automatically use the current Unsplash automotive image as a fallback
- **Logo:** If `jess-recruiting-logo.png` is not found, the logo will simply not display (no broken image icon)

## Image Optimization Tips

- **Background Image:** Compress to balance quality and file size (aim for under 500KB)
- **Logo:** Use PNG format with transparency for best results
- **Test:** After adding images, refresh your browser to see the changes

## Deployment Note

When deploying to Azure Static Web Apps, make sure to include these image files in your deployment package.

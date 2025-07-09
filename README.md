# Jess Recruiting - A Smarter Way to Apply

A dynamic, engaging standalone website for automotive professionals to apply for jobs through Jess Recruiting.

## Features

- **Multi-step Application Form**: Intuitive 5-step process with real-time validation
- **Dynamic Animations**: Smooth transitions, loading states, and interactive elements
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Auto-rotating Testimonials**: Social proof from successful placements
- **Statistics Counter**: Animated counters showing company achievements
- **File Upload**: Drag & drop resume upload with validation
- **Progress Tracking**: Visual progress indicator and clickable navigation
- **Real-time Validation**: Instant feedback on form fields
- **Brand Consistency**: Matches Jess Recruiting's visual identity

## Technology Stack

- **Frontend**: HTML5, CSS3 (Tailwind CSS), Vanilla JavaScript
- **Animations**: AOS (Animate On Scroll) library
- **Icons**: Heroicons SVG icons
- **Fonts**: Google Fonts (Inter)
- **Backend Integration**: Microsoft Power Automate workflow

## Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start local server
npm start
```

### Azure Deployment

This site is optimized for Azure Static Web Apps:

1. **Automatic Deployment**: Connect your GitHub repository to Azure Static Web Apps
2. **Custom Domain**: Configure your domain in the Azure portal
3. **SSL/TLS**: Automatically provisioned SSL certificates
4. **CDN**: Global content delivery for fast loading

### Manual Azure Deployment

1. Zip the entire project folder
2. Upload to Azure App Service or Azure Static Web Apps
3. The `web.config` file handles routing and security headers

## File Structure

```
├── index.html          # Main application file
├── web.config          # Azure IIS configuration
├── package.json        # Project metadata and scripts
└── README.md          # This file
```

## Customization

### Brand Colors
The site uses CSS custom properties for easy theming:
- `--jess-yellow`: #E4C54B (Primary brand color)
- `--dark-blue`: #00008B (Secondary brand color)
- `--light-blue`: #1e3a8a (Accent color)

### Form Integration
Update the Power Automate URL in the JavaScript section to connect to your backend workflow.

### Content Updates
- Modify testimonials in the hero section
- Update statistics in the counter section
- Customize form fields as needed
- Update position options in the dropdown

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Features

- Optimized images and fonts
- Lazy loading animations
- Debounced form validation
- Efficient DOM manipulation
- CDN-delivered external libraries

## Security Features

- HTTPS enforcement
- XSS protection headers
- Content type validation
- File upload restrictions
- Form validation and sanitization

## SEO Optimized

- Semantic HTML structure
- Meta tags for social sharing
- Accessible form labels
- Fast loading times
- Mobile-friendly design

## Support

For technical issues or customization requests, contact the development team.

---

© 2024 Jess Recruiting. All rights reserved.

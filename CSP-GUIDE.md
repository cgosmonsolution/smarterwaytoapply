# Content Security Policy (CSP) Configuration

## Overview
This document explains the Content Security Policy (CSP) configuration for the Jess Recruiting "Smarter Way to Apply" application.

## Current CSP Configuration

The CSP is configured in `staticwebapp.config.json` and includes the following directives:

### Script Sources (`script-src`)
- `'self'` - Allow scripts from the same origin
- `https://unpkg.com` - Allow AOS (Animate On Scroll) library from unpkg CDN

### Style Sources (`style-src`)
- `'self'` - Allow styles from the same origin
- `https://fonts.googleapis.com` - Allow Google Fonts CSS
- `https://unpkg.com` - Allow AOS CSS from unpkg CDN

### Font Sources (`font-src`)
- `'self'` - Allow fonts from the same origin
- `https://fonts.gstatic.com` - Allow Google Fonts files

### Image Sources (`img-src`)
- `'self'` - Allow images from the same origin
- `data:` - Allow data URIs (for base64 images)
- `https://images.unsplash.com` - Allow hero background image from Unsplash

### Connection Sources (`connect-src`)
- `'self'` - Allow connections to the same origin
- `https://prod-69.eastus.logic.azure.com` - Allow form submissions to Power Automate

### Other Directives
- `default-src 'self'` - Default policy for unlisted resource types
- `base-uri 'self'` - Restrict base element URIs to same origin
- `form-action 'self'` - Only allow form submissions to same origin
- `frame-ancestors 'none'` - Prevent embedding in frames/iframes
- `object-src 'none'` - Block plugins like Flash
- `upgrade-insecure-requests` - Automatically upgrade HTTP to HTTPS

## Security Benefits

1. **XSS Prevention**: Blocks unauthorized script execution
2. **Data Injection Protection**: Prevents malicious data injection
3. **Clickjacking Protection**: Prevents embedding in malicious frames
4. **Mixed Content Protection**: Upgrades insecure requests to HTTPS
5. **Resource Control**: Only allows loading from trusted sources

## Testing Your CSP

1. **Browser Console**: Check for CSP violations in browser developer tools
2. **CSP Evaluator**: Use Google's CSP Evaluator (https://csp-evaluator.withgoogle.com/)
3. **Report-Only Mode**: For testing, you can use `Content-Security-Policy-Report-Only` header

## Troubleshooting

### Common Issues and Solutions

1. **Blocked Inline Styles**: Move all CSS to external files
2. **Blocked Inline Scripts**: Move all JavaScript to external files
3. **Blocked External Resources**: Add domains to appropriate CSP directives
4. **AJAX/Fetch Errors**: Ensure target URLs are in `connect-src`

### Adding New External Resources

If you need to add new external resources:

1. **Scripts**: Add domain to `script-src`
2. **Styles**: Add domain to `style-src`
3. **Images**: Add domain to `img-src`
4. **Fonts**: Add domain to `font-src`
5. **API Calls**: Add domain to `connect-src`

## Example: Adding a New CDN

If you want to add jQuery from cdnjs.cloudflare.com:

```json
"script-src": "'self' https://unpkg.com https://cdnjs.cloudflare.com"
```

## Backup Configurations

- `staticwebapp.config.json` - Production configuration (strict)
- `staticwebapp-strict-csp.config.json` - Backup of strict configuration

## Deployment Notes

- CSP headers are applied automatically by Azure Static Web Apps
- Changes to `staticwebapp.config.json` require redeployment
- Test CSP changes in a staging environment first

## Monitoring

Monitor CSP violations by:
1. Checking browser console for blocked resources
2. Setting up CSP violation reporting (optional)
3. Using Azure Application Insights for error tracking

## References

- [MDN CSP Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Azure Static Web Apps Configuration](https://docs.microsoft.com/en-us/azure/static-web-apps/configuration)
- [CSP Best Practices](https://web.dev/csp/)

# Azure Deployment Guide

## Option 1: Azure Static Web Apps (Recommended)

### Prerequisites
- Azure account
- GitHub repository containing your code

### Steps
1. **Prepare Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/jess-recruiting-app.git
   git push -u origin main
   ```

2. **Create Static Web App**
   - Go to Azure Portal (portal.azure.com)
   - Create new resource → Static Web Apps
   - Connect to your GitHub repository
   - Set build details:
     - App location: `/`
     - Output location: `/`
   - Deploy

3. **Custom Domain (Optional)**
   - In Azure Portal, go to your Static Web App
   - Navigate to Custom domains
   - Add your domain and configure DNS

### Automatic Deployment
- Any push to `main` branch automatically deploys
- Preview branches for staging environments

## Option 2: Azure App Service

### Steps
1. **Create App Service**
   ```bash
   az webapp create --name jess-recruiting-app --resource-group myResourceGroup --plan myAppServicePlan
   ```

2. **Deploy Files**
   ```bash
   # Zip deployment
   zip -r app.zip *
   az webapp deployment source config-zip --resource-group myResourceGroup --name jess-recruiting-app --src app.zip
   ```

## Option 3: Azure Blob Storage + CDN

### Steps
1. **Create Storage Account**
   ```bash
   az storage account create --name jessrecruitingapp --resource-group myResourceGroup --location eastus --sku Standard_LRS
   ```

2. **Enable Static Website**
   ```bash
   az storage blob service-properties update --account-name jessrecruitingapp --static-website --index-document index.html
   ```

3. **Upload Files**
   ```bash
   az storage blob upload-batch --account-name jessrecruitingapp --destination '$web' --source .
   ```

4. **Configure CDN**
   ```bash
   az cdn profile create --name jessrecruitingcdn --resource-group myResourceGroup --sku Standard_Microsoft
   az cdn endpoint create --name jessrecruiting --profile-name jessrecruitingcdn --resource-group myResourceGroup --origin yourstorageaccount.z13.web.core.windows.net
   ```

## Environment Variables

Set these in Azure Portal under Configuration:

- `POWER_AUTOMATE_URL`: Your Power Automate webhook URL
- `ENVIRONMENT`: production
- `ANALYTICS_ID`: Google Analytics ID (if needed)

## Performance Optimization

1. **Enable Compression**
   - Automatically enabled in Static Web Apps
   - For App Service: Enable in Configuration → General Settings

2. **CDN Configuration**
   - Cache static assets for 1 year
   - Cache HTML for 1 hour

3. **Monitoring**
   - Enable Application Insights
   - Monitor form submission success rates
   - Track user interactions

## Security Configuration

1. **HTTPS Enforcement**
   - Automatically enabled in Static Web Apps
   - Configure redirect rules in `web.config`

2. **Custom Headers**
   - Configured in `staticwebapp.config.json`
   - Additional security via Azure Application Gateway

3. **CORS Settings**
   ```json
   {
     "allowedOrigins": ["https://jessrecruiting.com"],
     "allowedMethods": ["GET", "POST"],
     "allowedHeaders": ["Content-Type"]
   }
   ```

## Monitoring & Analytics

1. **Azure Application Insights**
   ```javascript
   // Add to index.html
   import { ApplicationInsights } from '@microsoft/applicationinsights-web'
   const appInsights = new ApplicationInsights({ config: {
     instrumentationKey: 'YOUR_INSTRUMENTATION_KEY'
   }});
   ```

2. **Custom Events**
   ```javascript
   // Track form submissions
   appInsights.trackEvent({name: 'FormSubmitted', properties: {step: currentStep}});
   
   // Track errors
   appInsights.trackException({exception: new Error('Form submission failed')});
   ```

## Testing

1. **Local Testing**
   ```bash
   npm start
   # Test on http://localhost:3000
   ```

2. **Staging Environment**
   - Use Azure Static Web Apps preview branches
   - Test with real Power Automate integration

3. **Performance Testing**
   ```bash
   # Use Lighthouse CLI
   npm install -g lighthouse
   lighthouse https://your-app.azurestaticapps.net --view
   ```

## Troubleshooting

### Common Issues

1. **404 Errors on Refresh**
   - Ensure `staticwebapp.config.json` routing is configured
   - Check `web.config` rewrite rules

2. **Form Submission Failures**
   - Verify Power Automate URL
   - Check CORS settings
   - Monitor Network tab in browser

3. **Slow Loading**
   - Enable CDN
   - Optimize images
   - Check bundle sizes

### Monitoring Commands

```bash
# Check deployment status
az staticwebapp show --name jess-recruiting-app

# View logs
az webapp log tail --name jess-recruiting-app --resource-group myResourceGroup

# Monitor performance
az monitor metrics list --resource /subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Web/sites/jess-recruiting-app
```

## Backup & Recovery

1. **Source Control**
   - All code in GitHub
   - Automated daily backups

2. **Configuration Backup**
   ```bash
   # Export app settings
   az webapp config appsettings list --name jess-recruiting-app --resource-group myResourceGroup > backup-settings.json
   ```

3. **Database Backup** (if applicable)
   - Power Automate handles data storage
   - Export data regularly from Power Platform

## Cost Optimization

1. **Static Web Apps**
   - Free tier includes: 100GB bandwidth, custom domains, SSL
   - Pay only for premium features

2. **App Service**
   - Use Basic tier for production
   - Scale down during low traffic

3. **CDN**
   - Reduces bandwidth costs
   - Improves global performance

## Support Contacts

- **Azure Support**: Create ticket in Azure Portal
- **Power Automate**: Power Platform Admin Center
- **Domain/DNS**: Contact domain provider
- **Development**: Internal team contacts

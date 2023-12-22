# SDK Sample Apps

## Overview
Explore the capabilities of SDK products through this sample application.
## Getting Started with the Application

### Logging In:
1. **Choosing the Domain**:
   - Select your desired domain.

2. **Entering SSO Token and Host ID**:
   - Input your SSO token and host ID.
   - Click on `Submit` to proceed.

3. **Entering the Access Code**:
   - For the Simple Meeting Sample App, an access code is required. The access code is the conference number found in the `Meet` dashboard.  
    
4. **Using the Application**:
   - Once logged in, you're ready to explore the various features of the Iotum product suite through the Menu page.

> **Note:** For guidance on retrieving the SSO Token and Host ID via Postman, refer to the project's [Postman Documentation](https://github.com/shirleyfyx/iotum-samples/wiki/Get-SSO-Token-and-Host-ID-from-Postman).

### Running a Sample App Locally:
1. Modify your system's hosts file by adding "127.0.0.1 localhost.callbridge.com".

2. Install [Node.js](https://nodejs.org/en).

3. On Windows, install [Git](https://git-scm.com/downloads).
4. Clone the repository: `git clone https://github.com/iotum/iotum-samples.git`.
5. Run `npm install` in the terminal or Git Bash.
6. Start the web app with `npm start`.

## Publishing a Sample App to GitHub Pages 
- The Sample App utilizes a GitHub Actions Workflow script for automatic build and deployment. Pushing changes to the main branch will automatically update the GitHub Pages site.

## Troubleshooting Guide 
- If widgets do not load properly, try running the app with the command: `HTTPS=true npm start`.

# Passwordless Auth with Email using Cognito User Pool connected to Lambda Backend triggers as part of 'auth flow' designated in Cognito. Uses SES in background to send OTP to user registering with email

### Pre-requisites

1. Set up Cognito User Pool with App client 
2. Lambda Trigger functions for actions created in AWS

### Run the web app
1. Replace the variables in `src/environments/environment.ts`
2. run `yarn install && yarn start`


The web app should be running at http://localhost:4200

## License Summary

This sample code is made available under a modified MIT license. See the LICENSE file.

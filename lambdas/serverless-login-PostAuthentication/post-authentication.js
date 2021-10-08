"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const cup = new aws_sdk_1.CognitoIdentityServiceProvider();
exports.handler = async (event) => {
    if (event.request.userAttributes.email_verified !== 'true') {
        const params = {
            UserPoolId: event.userPoolId,
            UserAttributes: [{
                    Name: 'email_verified',
                    Value: 'true',
                }],
            Username: event.userName,
        };
        await cup.adminUpdateUserAttributes(params).promise();
    }
    return event;
};

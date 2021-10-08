"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_secure_random_digit_1 = require("crypto-secure-random-digit");
const aws_sdk_1 = require("aws-sdk");
const ses = new aws_sdk_1.SES();
exports.handler = async (event) => {
    let secretLoginCode;
    if (!event.request.session || !event.request.session.length) {
        secretLoginCode = crypto_secure_random_digit_1.randomDigits(6).join('');
        await sendEmail(event.request.userAttributes.email, secretLoginCode);
    }
    else {
        const previousChallenge = event.request.session.slice(-1)[0];
        secretLoginCode = previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1];
    }
    // This is sent back to the client app
    event.response.publicChallengeParameters = { email: event.request.userAttributes.email };
    // verified by the "Verify Auth Challenge Response" trigger
    event.response.privateChallengeParameters = { secretLoginCode };
    event.response.challengeMetadata = `CODE-${secretLoginCode}`;
    return event;
};
async function sendEmail(emailAddress, secretLoginCode) {
    const params = {
        Destination: { ToAddresses: [emailAddress] },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `<html><body><p>This is your super secret login code:</p>
                           <h3>${secretLoginCode}</h3></body></html>`
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: `Your super secret login code: ${secretLoginCode}`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Your super secret login code'
            }
        },
        Source: "atomekpolak@gmail.com"
    };
    await ses.sendEmail(params).promise();
}

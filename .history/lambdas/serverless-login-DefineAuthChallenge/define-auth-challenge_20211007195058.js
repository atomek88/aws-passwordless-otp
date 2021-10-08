"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = async (event) => {
    if (event.request.session &&
        event.request.session.find(attempt => attempt.challengeName !== 'CUSTOM_CHALLENGE')) {
        event.response.issueTokens = false;
        event.response.failAuthentication = true;
    }
    else if (event.request.session &&
        event.request.session.length >= 3 &&
        event.request.session.slice(-1)[0].challengeResult === false) {
        event.response.issueTokens = false;
        event.response.failAuthentication = true;
    }
    else if (event.request.session &&
        event.request.session.length &&
        event.request.session.slice(-1)[0].challengeName === 'CUSTOM_CHALLENGE' && 
        event.request.session.slice(-1)[0].challengeResult === true) {
        event.response.issueTokens = true;
        event.response.failAuthentication = false;
    }
    else {
        // presents challenge to verify auth
        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        event.response.challengeName = 'CUSTOM_CHALLENGE';
    }
    return event;
};

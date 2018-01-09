// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const { DialogflowApp } = require('actions-on-google');
const functions = require('firebase-functions');

exports.yourAction = functions.https.onRequest((request, response) => {
  const app = new DialogflowApp({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  // Fulfill action business logic
  function responseHandler (app) {
    // Complete your fulfillment logic and send a response
    var speechStr = "";
    const uidStr = JSON.stringify(request.body.result.parameters.MakeIncident);
    var uid = uidStr.replace(/\"/g, "");
    if (uid === "1") {
      speechStr = "インシデントを登録します。";
    } else if (uid === "2") {
      speechStr = "インシデントは3件です。";
    } else {
          speechStr = "該当するグループはありません。";
    }
    app.tell(speechStr);
  }

  const actionMap = new Map();
  actionMap.set('action.sn_response', responseHandler);

  app.handleRequest(actionMap);
});

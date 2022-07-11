## Introduction

### Objectives

The gest API is used to interface a client information system, an application, a webapp, a mobile app etc. with the WIS platform following the HTTP protocol.

[REST](https://en.wikipedia.org/wiki/Representational_state_transfer) is a style of architecture used to build Web applications by using endpoints URLs and referencing resources to be exploited according to the verbs of the HTTP protocol (GET, POST, PUT, DELETE, etc.).

### Principles

Our API contains predictable resource-oriented URLs, that accept request bodies encoded in JSON format and returns encoded responses JSON and that uses standard HTTP responses codes (200, 404, etc.), with an HTTP authentication using headers and HTTP verbs (GET, POST, etc.).

'Client' applications that use the gest API can enrich/enhance their Information System with data and processes provided and developed by gest in a secure and very flexible manner.

### Use Cases

The gest API can be used by any system which can interact through the Internet, like:

-   Web Applications
-   Mobile Applications
-   Business Applications
-   ERP systems or any Enterprise Platform (SAP, SalesForce...)
-   API connectors (Zapier, ZohoCRM, etc.)
-   Any software that consumes REST

## How it works ?

### Authentication

Authentication is made with the login route, with login (email) and password as parameters. It will return a token that will be needed as a parameter for all other routes and services.

POST <url>/login route does not use any authorization (Auth Type : No Auth).
POST <url>/myself route does not use any authorization (Auth Type : No Auth).
POST <url>/waiter route does not use any authorization (Auth Type : No Auth).

All other routes use a Bearer Token (Authorization type : Bearer Token).

### translations

To get error messages or taxonomies, in the correct language you should use the 'content-language' or 'Content-Language' header with one of the supported values. Supported values will be 'fr', 'en', 'ar', 'ru'.

### Use the services

Once authenticated, you might or might not be allowed to use route, depending on your PermissionType. If you are not allowed, you will receive an Authentication Error 401.

# Sri Lanka Voting System

A simple voting system demo for Sri Lanka built with HTML, CSS, and JavaScript.

## Features

- Voter registration with name, NIC, district
- Candidate ballot selection
- Vote submission and one-vote-per-voter enforcement
- Vote summary and live count display
- Local browser storage for demo persistence

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm start
```

3. Open the browser at `http://127.0.0.1:5500`

## Storage

This app uses browser `localStorage` for voter registration, verification, vote submission, and admin accounts.

- Registered voters are stored under the `voters` key.
- Verified voter state is stored under `verifiedVoter`.
- Submitted votes are stored under the `votes` key.
- Admin accounts are stored under the `admins` key.
- Admin sessions are stored under the `adminSession` key.

## Pages

- `index.html`: vote page and live vote results
- `register.html`: voter registration
- `verify.html`: voter verification
- `admin.html`: admin registration and login
- `dashboard.html`: admin dashboard for registering voters and generating reports

## Notes

This demo is intended for local usage and educational purposes. Data is persisted only in the browser and will not sync between devices.

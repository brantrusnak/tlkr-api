# tlkr. api

## Dependencies
- NodeJS
- NPM
- node-gyp
- MySQL

## Setup
1. Clone this repo
2. Run `npm install` from a terminal
3. Duplicate `dot.env` and rename to `.env`
4. Update information in `.env`
5. Create a database named `tlkr` in MySQL.
6. Run API
    1. For development, run `npm run start`
    2. For production, run `npm run build`

## Todo
- [ ] Clean up / standardize all responses.
- [X] Implement a timeline (posts from following users ordered by date)
# tlkr. api

## Dependencies
- NodeJS
- NPM
- node-gyp
- MySQL (default / or similar)

## Setup
1. Clone this repo
2. Run `npm install` from a terminal
3. Duplicate `dot.env` and rename to `.env`
4. Update information in `.env`
5. Create a database named `tlkr` (default).
6. Run API
    1. For development, run `npm run dev`
    2. For production, run `npm run build` and then `npm run start`

## Todo
- [X] Implement a timeline (posts from following users ordered by date)
- [ ] Clean up / standardize all responses.
- [ ] Favorite/unfavorite check
- [ ] Follow/unfollow check 
- [ ] Posts/Timeline pagination/limit.
- [ ] Figure out Notification stuff. Want to use WebSocket.
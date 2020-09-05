# Tutorial KBMTI Plan
## Repository Plan untuk Pengajaran di KBMTI Ngobar

1. Clone this repository by typing `https://github.com/adiatma85/Tutorial_KBMTI_Plan.git`,
2. Type `npm install`
3. Copy the .env.example to .env. Type `cp .env.example .env`
4. Type `nodemon` if you have `nodemon` installed globally, or you can just type `node index.js`

## AVAIBLE ROUTES
### users
 * @get /users/             => to get index message
 * @get /users/all          => to get all users in database
 * @get /users/:id          => to get specific user within given id
 * @post /register          => to register a user. Need `first_name`, `last_name`, and `password` field
 * @put /users/:id          => to update specific users within given id. Need `first_name` and `last_name`
 * @delete /users/:id       => to delete specific user within given id

### articles
 * @get /articles/all       => to get all articles in database
 * @get /articles/:id       => to get specific articles within given id
 * @post /articles/store    => to add new articles. Need `title`, `content`, and `user_id` field.
 * @put /articles/:id       => to update specific articles within given id. Need `title` and `content`
 * @delete /articles:id     => to delete specific articles within given id


##
* You can test the API with `mocha`. Right now, it just `users` though. To run test, type `npm test`
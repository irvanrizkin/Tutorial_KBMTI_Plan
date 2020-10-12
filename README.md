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

## FRONTEND ROUTES
### users
 * /users/register-page      => to show register page
 * /users/login-page         => to show login page

### articles
 * /articles/list           => to show article's CRUD panel
 * /articles/add-article    => to show page to add new articles (POST) (Still bugged, refer to temp)
 * /articles/edit-article   => to show page to update specific articles (PUT) (Still bugged, refer to temp)
 * /articles/show-article   => to show page to specific artciels (GET) (Still bugged, refer to temp)

### homepage
 * /                        => to show homepage

### temp (For temporary purpose only due to articles bug)
 * /temp/add-article        => to show page to add new articles (POST)
 * /temp/edit-article       => to show page to update specific articles (PUT)
 * /temp/show-article       => to show page to specific artciels (GET)

##
* You can test the API with `mocha`. Right now, it just `users` though. To run test, type `npm test`
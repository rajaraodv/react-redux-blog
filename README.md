# React Redux CRUD App

**Note: As of Jul 29th 2018, the code has been updated to work w/ latest versions of its dependencies!**

<img src='https://david-dm.org/rajaraodv/react-redux-blog.svg' />

#Local Installation
1. Install <a href="https://nodejs.org" target="_blank">Node.js</a> 
2. Install <a target="_blank" href="https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition-with-homebrew">MongoDB</a>
3. `git clone https://github.com/aldomonteiro/react-redux-blog.git`
4. `cd react-redux-blog`
5. `yarn`
6. Create a free <a href="https://postmarkapp.com" target="_blank">PostMark</a> account for sending (confirm email, forgot pwd) emails.
  * Export Postmark credentials to environment
  * `export POSTMARK_API_TOKEN=<getApiTokenFromWInPostmark>`
  * Alternatively, you can run the app on Heroku, add Postmark addon (which adds a free account and sets `POSTMARK_API_TOKEN` to the app running on Heroku). You can then get that `POSTMARK_API_TOKEN` by running: `heroku config:get POSTMARK_API_TOKEN` and then export the token to the terminal. This will now allow you to send email from localhost.

####Preventing Emails From Getting Blocked by GMail, Yahoo etc.
NOTE: In order to send email via PostMark or Sendgrid, you need to verify sender's email(from address). In PostMark you can do that by setting your company or other private email(e.g. raja@rao.com) and verifying that. Then you can use **THAT** company or private email(e.g. raja@rao.com) in the FROM address.

#Running Locally
*You need two terminal windows open*, one for client and the other for server.

####Development
1. In terminal 1, 
	1. `export JWT_SECRET=somesecretstring` <-- This is used to generate JWT tokens.
	2. `export POSTMARK_API_TOKEN=<getApiTokenFromWInPostmark>` <-- Email
	3. `export FROM_EMAIL=<yourFromEmailThatIsRegisteredInPostMark> <-- "From"-Email Address that you verified w/ PostMark
	4. run `yarn start`. This runs the app server (Express). 
2. In terminal 2, run: `yarn run dev`. This runs the development server(webpack-dev-server).
3. Open browser and go to: `localhost:8080`

```
export JWT_SECRET=somesecret
export POSTMARK_API_TOKEN=bla-bla-bla-9619-a6d1185548cd
export FROM_EMAIL=yourcompanyemail@company.com
export NODE_ENV=development
```


####Note: If you open `localhost:3000` in browser, you'll see a "stale" production app, so while in development, **always go to `localhost:8080`**

####Production
In production, we need to compile the **latest** client js and place it to `public` folder. This allows the main app server(Express) to also show the final app.

1. Generate latest React app: `yarn run build`.
2. In terminal 1, run `yarn start`. It will be running both the server and the client.
3. Open browser and go to : `localhost:3000`.




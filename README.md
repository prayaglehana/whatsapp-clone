# Whatsapp Clone App

website : https://whatsapp-clone-mern-9b47c.web.app/

## FRONTEND + BACKEND + PUSHER as websocket === MERN

In the project directory, you can run:

### `Tech`

fronend hosted on firebase : https://whatsapp-clone-mern-9b47c.web.app/
backend deployed on heroku : https://whatsapp-clone-mern-server.herokuapp.com/
Authentication : google

front-end ( react ) ====push-message===> nodejs server ====> mongoDB update
====> update pusher ( used as a websocket for streaming)====> tells front-end to re-render

### `onboard yourself to google authentication`

add your email id as new test users :
https://console.cloud.google.com/apis/credentials/consent?project=whatsapp-mern-343719

modify login.js & App.js

for google login based on localhost or firebase-web-host

### heroku deploy server to : https://whatsapp-clone-mern-server.herokuapp.com/

1. heroku login
2. git add .
3. git commit -am "make it better"
4. git push heroku master

### firebase deploy web app to : https://whatsapp-clone-mern-9b47c.web.app/

1. npm run build
2. firebase deploy

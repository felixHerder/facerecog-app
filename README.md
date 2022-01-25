Dashboard for the Clarifai image clothing clasifier. Please be patient while the heroku backend spins up.

Frontend is react built with create-react-app and tachyons. Backend is build with node and express with postgresql for user auth and redis for jwt authentication

The submited image url is sent to the express backend which sends a post request to the Clarifai api. The frontend is hosted on github pages and the backend on heroku.

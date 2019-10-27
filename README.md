Simple example of reading data from an API and storing to a database using
Node.js, PostgreSQL, pgAdmin, and Docker.

Start database using docker:

  docker/all-hardreset

This will launch an instance of PostgreSQL listening on port 5433 and an
instance of pgAdmin on port 6544. See the docker/.env file for username
and password details.

The database is initialized with a single table and a user (see the file
docker/db-init/0000-base.sql). 

Open http://localhost:6544 to access the pgAdmin instance, and create a
new server connection to localhost:5433. The table can be found in the
'public' schema.

Run the Node.js script:

  ./app.js

The app.js Node.js script will fetch intraday stock prices from the 
worldtradingdata.com API using an API key stored in the environment
variable 'API_KEY' (register on the worldtradingdata.com site to get a key).

For testing, and by default, the code has embedded data matching the 
schema of the data returned by the worldtradingdata.com API.

After fetching the data app.js stores the data in the database table.
Note that error handling is minimal, and the schema is denormalized and
unindexed. The database connection details are hard-coded in app.js and
must match the values define in the docker .env and 0000-base.sql files.

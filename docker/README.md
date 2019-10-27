# Docker files for running PostgreSQL and pgAdmin servers

The files in this directory run instances of PostgreSQL and pgAdmin servers.

## Directory layout
```
.
├── .env                    values for docker-compose.yml variables
├── all-hardreset           script to delete and recreate the servers
├── all-remove              script to delete the servers
├── db-hardreset            script to delete and recreate the PostgreSQL server
├── docker-compose.yml      docker-compose file
├── README.md               this file
└── db-init                 directory for files used to initialize PostgreSQL
    └── 0000-base.sql       file for creating base schema and user
```

## Usage

The containers may be started with ```docker-compose up``` or with ```./all-hardreset```.
Upon initial start the PostgreSQL server will run .sql files and .sh files in the ```db-init```
directory with the execution order determined by the sort-order of the file names.

The ```./all-remove``` script will stop and remove all the containers.

The ```./all-hardreset``` script will stop, remove, and recreate all the containers. It does not remove the pgAdmin settings directory (the default location defined in .env is /tmp/pgadmin-docker/), so settings and servers configured within pgAdmin will be retained during reset.

The ```./db-hardreset``` script will recreate the PostgreSQL server and run the init files.
When the database server is reset connections from pgAdmin will be broken and will need to be reset. 

Servers may be paused and restarted without deleting data with ```docker-compose stop``` and ```docker-compose up```.

The pgAdmin server is useful for PostgreSQL servers. For other database servers the 'adminer' image can be used by replacing the pgadmin section in the docker-compose.yml file:

```
  adminer:
    image: adminer
    ports:
      - 8080:8080
```

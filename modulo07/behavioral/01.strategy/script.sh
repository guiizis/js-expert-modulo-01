docker run \
      --name postgres \
      -e POSTGRES_USER=guiModa \
      -e POSTGRES_PASSWORD="senha0001" \
      -e POSTGRES_DB=heroes \
      -p 5432:5432 \
      -d \
      postgres
  
docker logs postgres
docker exec -it postgres psql --username guiModa --dbname heroes
# CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);
# SELECT * FROM warriors;

#mongoDB

docker run \
      --name mongodb \
      -e MONGO_INITDB_ROOT_USERNAME=guiModa \
      -e MONGO_INITDB_ROOT_PASSWORD=senhaAdmin \
      -p 27017:27017 \
      -d \
      mongo:4

docker logs mongodb
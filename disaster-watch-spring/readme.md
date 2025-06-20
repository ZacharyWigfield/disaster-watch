The spring boot application requires a .env file in the root directory with the following keys:

SPRING_DATASOURCE_URL=

SPRING_DATASOURCE_USERNAME=

SPRING_DATASOURCE_PASSWORD=

These are used in the application.yaml to connect to the datasource. 


build and run docker image:

docker build -t disaster-watch .

docker run --env-file .env -p 8080:8080 disaster-watch

compose docker:

docker-compose up --build
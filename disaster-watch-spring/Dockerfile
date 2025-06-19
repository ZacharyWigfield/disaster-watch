# Stage 1: Build the application
FROM eclipse-temurin:24-jdk-alpine AS builder

WORKDIR /app

# Copy the Maven wrapper and build files
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Pre-download dependencies
RUN ./mvnw dependency:go-offline

# Copy the full source code
COPY src ./src

# Build the application
RUN ./mvnw package -DskipTests

# Stage 2: Run the application with only the JAR
FROM eclipse-temurin:24-jre-alpine

WORKDIR /app

# Copy the JAR from the builder stage
COPY --from=builder /app/target/disaster-watch-0.0.1-SNAPSHOT.jar app.jar

# Expose the port Spring Boot runs on
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]

#docker build -t disaster-watch .
#docker run --env-file .env -p 8080:8080 disaster-watch
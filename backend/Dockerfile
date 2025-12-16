FROM eclipse-temurin:21-jdk-alpine

WORKDIR /src

COPY out/app.jar /src/app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /src

COPY target/app.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
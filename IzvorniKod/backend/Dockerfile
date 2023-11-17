# Container za izgradnju (build) aplikacije
FROM openjdk:17-alpine AS builder

# Kopiranje izvornog koda u container
COPY /.mvn .mvn
COPY /mvnw .
COPY /pom.xml .
COPY /src src

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

# Stvaranje containera u kojem ce se vrtiti aplikacija
FROM openjdk:17-alpine

# Kopiranje izvrsnog JAR-a iz build containera u izvrsni container
COPY --from=builder target/*.jar /app.jar

# Izlaganje porta
EXPOSE 8080

# Naredba kojom se pokrece aplikacija
ENTRYPOINT ["java","-jar","/app.jar"]
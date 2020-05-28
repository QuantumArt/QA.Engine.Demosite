FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
LABEL stage=intermediate

#RUN apt-get install -y \
#    && curl -sL https://deb.nodesource.com/setup_10.x | bash \
#    && apt-get install -y nodejs \
#	&& apt-get install unzip

WORKDIR /src
COPY *.sln nuget.config ./
ADD projectfiles.tar .
RUN dotnet restore

COPY . .

WORKDIR /src/QA.Demosite.API
RUN dotnet publish "QA.Demosite.API.csproj" -c Release -o /app/out -f netcoreapp3.1

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME:-QA.Demosite.API}

ARG SERVICE_VERSION
ENV SERVICE_VERSION=${SERVICE_VERSION:-0.0.0.0}

WORKDIR /app
COPY --from=build-env /app/out .
EXPOSE 80
ENTRYPOINT ["dotnet", "QA.Demosite.API.dll"]

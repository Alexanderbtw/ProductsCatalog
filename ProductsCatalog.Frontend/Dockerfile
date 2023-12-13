FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

WORKDIR /app
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash - 
RUN apt-get install -y nodejs
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash - 
RUN apt-get install -y nodejs 
RUN apt-get install -y npm 
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["ProductsCatalog.Frontend/nuget.config", "ProductsCatalog.Frontend/"]
COPY ["ProductsCatalog.Frontend/ProductsCatalog.Frontend.csproj", "ProductsCatalog.Frontend/"]
COPY ["ProductsCatalog.Business/ProductsCatalog.Business.csproj", "ProductsCatalog.Business/"]
COPY ["ProductsCatalog.DAL/ProductsCatalog.DAL.csproj", "ProductsCatalog.DAL/"]
RUN dotnet restore "./ProductsCatalog.Frontend/./ProductsCatalog.Frontend.csproj"
COPY . .
WORKDIR "/src/ProductsCatalog.Frontend"
RUN npm install
RUN npm run build:prod
CMD ["npm", "start"]
RUN dotnet build "./ProductsCatalog.Frontend.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ProductsCatalog.Frontend.csproj" -c $BUILD_CONFIGURATION -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProductsCatalog.Frontend.dll"]
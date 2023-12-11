#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["ProductsCatalog.Frontend/ProductsCatalog.Frontend.csproj", "ProductsCatalog.Frontend/"]
COPY ["ProductsCatalog.Business/ProductsCatalog.Business.csproj", "ProductsCatalog.Business/"]
COPY ["ProductsCatalog.DAL/ProductsCatalog.DAL.csproj", "ProductsCatalog.DAL/"]
RUN dotnet restore "./ProductsCatalog.Frontend/./ProductsCatalog.Frontend.csproj"
COPY . .
WORKDIR "/src/ProductsCatalog.Frontend"
RUN dotnet build "./ProductsCatalog.Frontend.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ProductsCatalog.Frontend.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProductsCatalog.Frontend.dll"]
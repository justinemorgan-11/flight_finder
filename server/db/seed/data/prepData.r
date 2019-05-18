
setwd("/Users/justinemorgan/Documents/Projects/senior-phase/flight_finder/server/seed/data/")
library(jsonlite)

### Prep seed data for flight_finder

## 1. airport data:
airports <- read.csv("./airports.csv", header = TRUE)
regions <- read.csv("./regions.csv", header = TRUE)

airports <- merge(x = airports, y = regions, by = "country")

airport_json <- toJSON(airports, pretty = TRUE)
airport_json <- paste0("module.exports = ", airport_json)

writeLines(airport_json, "./seedAirports.js")

## 2. Loyalty flight data:
flights <- read.csv("./flights.csv", header = TRUE)

flights_json <- toJSON(flights, pretty = TRUE)
flights_json <- paste0("module.exports = ", flights_json)

writeLines(flights_json, "./seedFlights.js")

## 3. User wallet:
wallets <- read.csv("./wallets.csv", header = TRUE)

wallets_json <- toJSON(unique(wallets), pretty = TRUE)
wallets_json <- paste0("module.exports = ", wallets_json)

writeLines(wallet_json, "./seedWallets.js")


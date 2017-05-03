# Indego Bike Ridership and Gentrification Visualization
As a public policy enthusiast, I am interested in visualizing the typical ridership of Philly's Indego Bike Share program on a map of Philadelphia that highlights markers of income inequality and markers of gentrification.

Bike share programs are great services, but there seems to be indications that they are not as frequently used by lower income communities.

## MVP
- Animate a day of ridership for Indego Bike Share
- Overlay map of Philly with income inequality data, with toggle functionality.

## Technologies & APIs
* Google Maps API
* Indego Bike API
* Javascript
* D3
* A publicly available dataset on property prices, income stats.

Indego Bike's API will provide much of the key data for this project.

Data provided by Citi Bike (to be stored in the database):
* Trip duration	(seconds)
* Start_time
* Starting coordinates (lat, lon)
* End_time
* Ending coordinates (lat, lon)

## Implementation Timeline
**Day 1: Interactive map of Philadelphia with inequality data**

Find a relevant public data set, figure out how to leverage Google Maps APIs and display data on map of Philadelphia.

**Day 2: Add toggles to map, explore Indego bike api**

Add toggles to the map, figure out how to integrate with Indego API, and visualize one trip.

**Day 3: Visualization multiple trips**
Expand visualization to include multiple trips


## Sources
https://www.rideindego.com/about/data/
http://www.spokemag.co/philly-bike-share-is-growing-but-will-its-ridership-diversify/
https://renthub.com/maps/cbsa_census_tract?cbsa=Philadelphia-Camden-Wilmington,%20PA-NJ-DE-MD
https://github.com/mallorybulkley/citi-bike-visualization

# GentriPages: Philadelphia
A socially-minded data visualization of income inequality and gentrification.

[Live Link](http://nicholaschar.com/gentriPages/)

For optimal viewing experience, please use Google Chrome.

## Background

Much like Brooklyn and other parts of New York, Philadelphia is a city that has been undergoing a rapid transformation over the past few years. As a developer with a background in public policy, as well as a Philadelphia native who has spent the past half decade living abroad, I was interested in creating a tool to visualize some of those changes.

This application visualizes information that tells us how much money people make on average in different parts of the city as well as how much of that money goes to paying for housing.

## Implementation

### Developer Toolkit
* Tech: The application was implemented using Leaflet.js, a lightweight JavaScript mapping library, JavaScript and jQuery.

* Data: the data for this project was scraped from the 2015 American Community Survey and then formatted into GeoJSON. This enabled the data to be more easily mapped onto the visualization.

### Data layers
* Median Income

* Median Rent as Percentage of Income

### Interactivity

I deployed event listeners on each census tract in each data layer to create a more interactive user experience.

```js
  function seedListeners(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }
```

When users hover their mouse over a particular area of the city, relevant data will display in a custom infographic in the top right hand corner of the map. In addition, mousing over a census tract will dynamically change the styling, informing the user that each tract is an actionable item.
```js

function highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    if (layer.feature.properties.B19013001) {
      incomeInfo.update(layer.feature.properties);
    } else {
      rentInfo.update(layer.feature.properties)
    }
}
```

## Future Direction

There are many more layers I would like to add to this project.

* Demographic data layers

In addition to being very stratified, Philadelphia is also very segregated. While the current visualization gives the user an intuitive sense of what parts of the city are struggling economically, it does that give you a sense of who is experiencing that.

* Visualization of access to good's and services based on user queries

Access to good's and services is often determined by the socio-economics of the neighborhood you live in. Adding this data would further enrich the visualization, as well as add more interactivity.

I would like to build out a lightweight backend with Express.js and then integrate with the Google Location API. User's would be able to enter queries for different kinds of businesses and services and have them render on the map, giving a sense of who that particular type of service is distributed in the city.

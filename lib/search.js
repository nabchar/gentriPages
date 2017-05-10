$(() => {
  let a = $.ajax({
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/place/radarsearch/',
    dataType: 'json',
    data: { key: 'AIzaSyBLbXbUu40JnLKrOu9RUoTUhRyBboWdsc8',
            location: {latitude: 39.9526, longitude: -75.1652},
            radius: 10000,
            keyword: 'grocery store' }
  });
});

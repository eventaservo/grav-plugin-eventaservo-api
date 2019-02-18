
var pinglo_senkolora = '<svg width="20mm" height="22mm" version="1.1" viewBox="0 0 20 22" xmlns="http://www.w3.org/2000/svg"><path class="pinglo" d="m10 22 5-3.5c8.8-7.0 5-18.5-5-18.5-9.94 0-13.8 11.9-5 18.5z" stroke-width=".3"/><path class="stelo" d="m10,5.5 1,3 h3 l-2.37,2 0.87,3 L10,11.68 7.6,13.47 8.4,10.445 6,8.5 9,8.48Z"/></svg>';

var greenIcon  = new L.divIcon({html: pinglo_senkolora, className: 'greenIcon'}),
    redIcon    = new L.divIcon({html: pinglo_senkolora, className: 'redIcon'}),
    orangeIcon = new L.divIcon({html: pinglo_senkolora, className: 'orangeIcon'});
    yellowIcon = new L.divIcon({html: pinglo_senkolora, className: 'yellowIcon'});
    blueIcon   = new L.divIcon({html: pinglo_senkolora, className: 'blueIcon'});

var map = L.map('map').setView([51.505, 13.1], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         'attribution':  'Kartendaten &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Mitwirkende',
         'useCache': true
}).addTo(map);

var pruneCluster = new PruneClusterForLeaflet();
pruneCluster.Cluster.Size = 100;

var minDate = moment("3000-01-01", "YYYY-MM-DD"),
    maxDate = moment("1800-01-01", "YYYY-MM-DD");

function renkontigxoJson2teksto(e) {
    var eTekst = "";

    if (e["retpaĝo"]){
      eTekst += '<a href="' + e["retpaĝo"] + '">';
    }
    eTekst += "<span class='event-titolo'>" + e["titolo"] + "</span>" ;
    if (e["retpaĝo"]){
      eTekst += '</a>';
    }
    eTekst += '<dt><b>Datoj:</b></dt><dd>';
    eTekst += moment(e.komenca_dato, "YYYY-MM-DD").format("Do MMMM YYYY");
    if (e["komenca_dato"] != e["fina_dato"]){
        eTekst += ' - ' + moment(e.fina_dato, "YYYY-MM-DD").format("Do MMMM YYYY");
    }
    eTekst += '</dd>';

    if (e["priskribo"]){
        eTekst += '<dt><b>Priskribo:</b></dt><dd>' + e["priskribo"] + '</dd>';
    }
    return eTekst;
}

//aldoni eventpinglojn
for (e of eventoj) {
    var komenca_dato = moment(e["komenca_dato"], "YYYY-MM-DD"),
        fina_dato = moment(e["fina_dato"], "YYYY-MM-DD");
    if (minDate>komenca_dato){
        minDate = komenca_dato;
    }
    if (maxDate>fina_dato){
        maxDate = fina_dato;
    }
    //////
    //mapo
    //////
    if (e.hasOwnProperty("loko") && e["loko"]  && e["loko"].hasOwnProperty("latitudo") && e["loko"].hasOwnProperty("longitudo")
        && e["loko"]["latitudo"] && e["loko"]["longitudo"]) {

          var marker = new PruneCluster.Marker(e["loko"]["latitudo"], e["loko"]["longitudo"]);
          var komenco = moment(e["komenca_dato"]), hodiaux = moment();
          var dif = komenco.diff(hodiaux, 'days');

          marker.data.popup = renkontigxoJson2teksto(e);

          if (dif==0) {
            marker.category = 0;
            marker.data.icon = greenIcon;
          } else if(dif<7){
            marker.category = 1;
            marker.data.icon = orangeIcon;
          } else if(dif<30){
            marker.category = 2;
            marker.data.icon = yellowIcon;
          } else {
            marker.category = 3;
            marker.data.icon = blueIcon;
          }
          pruneCluster.RegisterMarker(marker);
    }
}


pruneCluster.BuildLeafletClusterIcon = function(cluster) {
  var e = new L.Icon.MarkerCluster();
  e.stats = cluster.stats;
  e.population = cluster.population;
  return e;
};

var colors = ['#00a300', '#E3A21A', '#FFC40D', '#2D89EF'],
pi2 = Math.PI * 2;
L.Icon.MarkerCluster = L.Icon.extend({
  options: {
    iconSize: new L.Point(44, 44),
    className: 'prunecluster leaflet-markercluster-icon'
  },
  createIcon: function () {
    // based on L.Icon.Canvas from shramov/leaflet-plugins (BSD licence)
    var e = document.createElement('canvas');
    this._setIconStyles(e, 'icon');
    var s = this.options.iconSize;
    e.width = s.x;
    e.height = s.y;
    this.draw(e.getContext('2d'), s.x, s.y);
    return e;
  },
  createShadow: function () {
    return null;
  },
  draw: function(canvas, width, height) {
    var lol = 0;
    var start = 0;
    for (var i = 0, l = colors.length; i < l; ++i) {
      var size = this.stats[i] / this.population;
      if (size > 0) {
        canvas.beginPath();
        canvas.moveTo(22, 22);
        canvas.fillStyle = colors[i];
        var from = start + 0.14,
        to = start + size * pi2;
        if (to < from) {
          from = start;
        }
        canvas.arc(22,22,22, from, to);
        start = start + size*pi2;
        canvas.lineTo(22,22);
        canvas.fill();
        canvas.closePath();
      }
    }
    canvas.beginPath();
    canvas.fillStyle = 'white';
    canvas.arc(22, 22, 18, 0, Math.PI*2);
    canvas.fill();
    canvas.closePath();
    canvas.fillStyle = '#555';
    canvas.textAlign = 'center';
    canvas.textBaseline = 'middle';
    canvas.font = 'bold 12px sans-serif';
    canvas.fillText(this.population, 22, 22, 40);
  }
});

map.addLayer(pruneCluster);


function initCalendar(renoj){
    //transformi json 2 calenderkonfirmajn datumojn
    var calendarEvents = [];
    for (var ren of renoj){
        evento = {
            title  : ren.titolo,
            start  : ren.komenca_dato,
            description: renkontigxoJson2teksto(ren)
        }
        if (ren.hasOwnProperty("fina_dato")) {
          evento.end = ren.fintempo
        }
        calendarEvents.push(evento);
    }

    //setup Calendar kaj aldonu eventojn
    $('#calendar').fullCalendar({
        locale:"eo",
        minDate: minDate,
        maxDate: maxDate,
        header: {
            left: '',
            center: 'title',
            right: 'prev,next'
        },
        events: calendarEvents,
        eventRender: function(event, element) {
            element.qtip({
                content: event.description,
                hide: {
                    fixed: true,
                    delay: 300
                }
            });
        }
    }).fullCalendar( 'gotoDate', minDate );
}

initCalendar(eventoj);

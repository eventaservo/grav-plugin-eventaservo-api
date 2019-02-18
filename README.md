# Eventaservo [API](https://github.com/eventaservo/eventaservo/wiki/API) Aldonaĵo/ Eventaservo [API](https://github.com/eventaservo/eventaservo/wiki/API) Plugin

Uzu la [eventaservo](eventaservo.org) [API](https://github.com/eventaservo/eventaservo/wiki/API) por montri viajn eventojn en via grav paĝaro.

---

Use the [eventaservo](eventaservo.org) [API](https://github.com/eventaservo/eventaservo/wiki/API) to embed some of your organizations or all events in your grav site.

The **Eventaservo Api** Plugin is for [Grav CMS](http://github.com/getgrav/grav). Montru mapon kaj kalendaron de eventaservo.org

## Instalado/Installation

Aŭ instalu mane per .zip arkivo aŭ per la GPM (Grav Package Manager).

Installing the Eventaservo Api plugin can be done in one of two ways. The GPM (Grav Package Manager) installation method enables you to quickly and easily install the plugin with a simple terminal command, while the manual method enables you to do so via a zip file.

La Eventaservo Api aldonaĵo estos en la `/user/plugins/eventaservo-api` dosierujo de via grav instalo post ajna formo de instalado.

This will install the Eventaservo Api plugin into your `/user/plugins` directory within Grav. Its files can be found under `/your/site/grav/user/plugins/eventaservo-api` after any of the installation methods.

### GPM instalado (preferata)/GPM Installation (Preferred)

En la grav dosierujo instalu per:

The simplest way to install this plugin is via the [Grav Package Manager (GPM)](http://learn.getgrav.org/advanced/grav-gpm) through your system's terminal (also called the command line).  From the root of your Grav install type:

    bin/gpm install eventaservo-api

### Mana instalado/Manual Installation

To install this plugin, just download the zip version of this repository and unzip it under `/your/site/grav/user/plugins`. Then, rename the folder to `eventaservo-api`. You can find these files on [GitHub](https://github.com/11362032/grav-plugin-eventaservo-api) or via [GetGrav.org](http://getgrav.org/downloads/plugins#extras).

### Administracia aldonaĵo/Admin Plugin

Se vi uzas la administracia aldonaĵo instalu tie en la `Aldonaĵo` rajdujo.

If you use the admin plugin, you can install directly through the admin plugin by browsing the `Plugins` tab and clicking on the `Add` button.

## Configuration

Kopiu `user/plugins/eventaservo-api/eventaservo-api.yaml` al `user/config/plugins/eventaservo-api.yaml` kaj aldonu vian retposxtadreson, api-ĉenon kaj la bezonatan filtron.

Before configuring this plugin, you should copy the `user/plugins/eventaservo-api/eventaservo-api.yaml` to `user/config/plugins/eventaservo-api.yaml` and only edit that copy. Add your user mail, api token and custom filters to the config.

## Usage

Aldonu `<div id="map"></div>` kaj `<div id="calendar"></div>` elementon ie en la `/eventoj` artikolo por tie montri la mapon aŭ/kaj la kalendaro kun la eventoj de eventaservo.org

Add a `<div id="map"></div>` and `<div id="calendar"></div>` somewhere in your `/eventoj` route and add in the admin plugin your eventaservo api key, user mail and custom filters to display the events as a `leaflet` map or a `fullCalendar` with the events from eventaservo.org.

## To Do

- [ ] ebligu yaml-opciojn por montri eventojn en pluraj pagĝoj kun diversaj opcioj/make the events be embeddable in the yaml-header with different filters
- [ ] aldonu pli da uzaj ekzemploj/add some use case examples

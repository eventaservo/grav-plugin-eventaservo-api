<?php
namespace Grav\Plugin;

use Grav\Common\Grav;
use Grav\Common\Plugin;
use Grav\Common\Page\Header;
use Grav\Common\Twig\TwigExtension;
use Grav\Common\Language\LanguageCodes;
use RocketTheme\Toolbox\Event\Event;

/**
 * Class EventaservoApiPlugin
 * @package Grav\Plugin
 */
class EventaservoApiPlugin extends Plugin{
    public static function getSubscribedEvents(){
        return [
            'onPluginsInitialized' => ['onPluginsInitialized', 0]
        ];
    }

    public function onPluginsInitialized(){
        // Don't proceed if we are in the admin plugin
        if ($this->isAdmin()) {
            return;
        }
        // Enable the main events we are interested in
        $this->enable([
            'onAssetsInitialized' => ['onAssetsInitialized', 0]
        ]);
    }

    public function onAssetsInitialized(){
        //get event JSON
        $mail = $this->grav['config']->get('plugins.eventaservo-api.user_email');
        $api_key = $this->grav['config']->get('plugins.eventaservo-api.api_key');
        $filters = $this->grav['config']->get('plugins.eventaservo-api.url_filters');
        $url = "https://eventaservo.org/api/v1/events.json?user_email=$mail&user_token=$api_key&$filters";
        $json = file_get_contents($url);
        $obj = json_decode($json);
        $json_string = json_encode($obj, JSON_UNESCAPED_UNICODE);
        $this->grav['assets']->addInlineJs("var eventoj = $json_string;");
        //add assets
        $PLUGIN_DIR = 'plugin://eventaservo-api';
        $NODE_PATH =  "$PLUGIN_DIR/node_modules";

        //MAPO
        $this->grav['assets']->addCss("$NODE_PATH/leaflet/dist/leaflet.css");
        $this->grav['assets']->addCss("$PLUGIN_DIR/css/LeafletStyleSheet.css");
        $this->grav['assets']->addJs("$NODE_PATH/leaflet/dist/leaflet.js", ['group' => 'bottom']);
        $this->grav['assets']->addJs("$NODE_PATH/prunecluster/dist/PruneCluster.js", ['group' => 'bottom']);
        //KALENDARO
        $this->grav['assets']->addCss("$NODE_PATH/fullcalendar/dist/moment.min.css");
        $this->grav['assets']->addCss("$NODE_PATH/fullcalendar/dist/fullcalendar.min.css");
        $this->grav['assets']->addCss("$NODE_PATH/qtip2/dist/jquery.qtip.min.css");
        $this->grav['assets']->addJs("$NODE_PATH/moment/moment.js", ['group' => 'bottom']);
        //TODO add self-served locales
        $this->grav['assets']->addJs("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/eo.js", ['group' => 'bottom']);
        $this->grav['assets']->addJs("$NODE_PATH/qtip2/dist/jquery.qtip.min.js", ['group' => 'bottom']);
        $this->grav['assets']->addJs("$NODE_PATH/fullcalendar/dist/fullcalendar.min.js", ['group' => 'bottom']);
        //NIA KODO
        $this->grav['assets']->addCss("$PLUGIN_DIR/css/eventaservo-api.css");
        $this->grav['assets']->addJs("$PLUGIN_DIR/js/eventaservo-api.js", ['group' => 'bottom']);
    }
}
?>

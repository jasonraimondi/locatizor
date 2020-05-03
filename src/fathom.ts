// @ts-nocheck
import { IS_DEV_ENV } from "./environment";
import { ElectronSettingService } from "./main/settings_service";

const isOptOut = ElectronSettingService.has("analytics.opt-out") ?? false;
const allowAnalytics = !IS_DEV_ENV && !isOptOut;

if (allowAnalytics) {
    // tslint:disable-next-line:only-arrow-functions
    (function (f, a, t, h, o, m) {
        // tslint:disable-next-line:only-arrow-functions
        a[h] = a[h] || function () {
            (a[h].q = a[h].q || []).push(arguments);
        };
        o = f.createElement("script");
        m = f.getElementsByTagName("script")[0];
        o.async = 1;
        o.src = t;
        o.id = "fathom-script";
        m.parentNode.insertBefore(o, m);
    })(document, window, "https://analytics.designcanvas.digital/tracker.js", "fathom");
    fathom("set", "siteId", "BHMFW");
    fathom("trackPageview");
}

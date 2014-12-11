/**
 * Utility code for use in component demo pages.
 *
 * This script will attempt to load the demo.js file for the application if
 * SystemJS is loaded into the system (for example, from loading
 * StealJS). Otherwise, it'll fall back to the (assumed) pre-compiled
 * demo.css/demo.js files.
 *
 * The second case is most often hit if someone tries to visit the demo page for
 * a component without having bower_components/ available (for example, if
 * loading the demo directly from a CDN that serves the committed code).
 */
if (window.System) {
	System.import("demo/demo");
} else {
	var link = document.createElement("link");
	link.href = "dist/demo.css";
	link.rel = "stylesheet";
	document.body.appendChild(link);
	var script = document.createElement("script");
	script.src = "dist/demo.js";
	script.async = false;
	document.body.appendChild(script);
}

import can from "can";
import "can/view/stache/stache";

/**
 * Scans document for can.view-compatible script tags marked as autoload and
 * renders their contents after each script tag, with live binding.
 *
 * The script tags will also have `.scope()` accessible in order to fetch the
 * template's viewModel.
 *
 * Attributes on the script tag named with a "scope-" prefix will be added to
 * the initial template scope before rendering, with the string values of those
 * attributes as the values.
 */
export default function() {
	can.$(() => {
		can.$("script[autoload]").each((i, el) => {
			var $el = can.$(el);
			if ($el.scope()) { return; }
			var text = $el.html(),
				typeInfo = /\s*text\/({mustache|stache|ejs})\s*/.exec(
					$el.attr("type")),
				type = typeInfo && typeInfo[1];
			if (can[type]) {
				var scope = new can.Map();
				can.each(el.attributes||[], attr => {
					var match = /scope-(.+)/.exec(attr.name);
					if (match) {
						scope.attr(can.camelize(match[1].toLowerCase()),
								   $el.attr(attr.name));
					}
				});
				$el.data("scope", scope);
				$el.after(can[type](text)(scope));
			}
		});
	});
};

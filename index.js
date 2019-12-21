// Better to use your router's navigate function for portability. Use Svelte's `getContext('navigate')`.
exports.navigate = function navigate(uri, replace) {
  history[(replace ? 'replace' : 'push') + 'State'](uri, null, uri);
}

exports.Link = require("./Link.svelte");
exports.Router = require("./Router.svelte");
exports.Route = require("./Route.svelte");
exports.navaidHash = require("./navaid-hash");
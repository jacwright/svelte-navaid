// Better to use your router's navigate function for portability. Use Svelte's `getContext('navigate')`.
exports.navigate = function navigate(uri, replace) {
  history[(replace ? 'replace' : 'push') + 'State'](uri, null, uri);
}

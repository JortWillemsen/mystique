function managerEntries(entry = []) {
  return [...entry, require.resolve("./manager.js")]; //👈 Addon implementation
}

module.exports = { managerEntries }
module.exports = {
  extends: ["@commitlint/config-conventional"],
  // Optional: Hier können eigene Regeln ergänzt werden (z. B. max‐length o. Ä.)
  rules: {
    // Beispiel: Kein leeres Commit
    "header-max-length": [2, "always", 100]
  }
};

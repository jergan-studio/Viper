const express = require("express");
const router = express.Router();

/**
 * Viper AI Upgrade System
 * Handles version checks + upgrade info for client apps
 */

// Current backend version (change this when you update Viper)
const CURRENT_VERSION = "1.0.0";

// Available upgrades (you can later move this to a DB or JSON file)
const upgrades = [
  {
    version: "1.0.1",
    title: "Stability Patch",
    description: "Improved API response speed and fixed minor bugs.",
    critical: false,
  },
  {
    version: "1.1.0",
    title: "AI Response Upgrade",
    description: "Upgraded model routing and smarter response formatting.",
    critical: false,
  },
  {
    version: "2.0.0",
    title: "Viper Core Rewrite",
    description: "Major upgrade with new AI engine + streaming support.",
    critical: true,
  },
];

/**
 * GET /api/upgrade/check
 * Checks if user is outdated
 */
router.get("/check", (req, res) => {
  const clientVersion = req.query.version || "0.0.0";

  const hasUpdate = clientVersion !== CURRENT_VERSION;

  res.json({
    success: true,
    currentVersion: CURRENT_VERSION,
    clientVersion,
    hasUpdate,
    latest: upgrades[upgrades.length - 1],
  });
});

/**
 * GET /api/upgrade/list
 * Returns all available upgrades
 */
router.get("/list", (req, res) => {
  res.json({
    success: true,
    count: upgrades.length,
    upgrades,
  });
});

/**
 * GET /api/upgrade/latest
 * Returns only latest upgrade
 */
router.get("/latest", (req, res) => {
  res.json({
    success: true,
    latest: upgrades[upgrades.length - 1],
  });
});

module.exports = router;

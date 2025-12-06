const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Get the project root (apps/mobile directory)
const projectRoot = __dirname;
// Get the workspace root (two levels up)
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Configure watchFolders for monorepo support
config.watchFolders = [workspaceRoot];

// Ensure Metro resolves modules from the correct project root
config.projectRoot = projectRoot;

module.exports = config;

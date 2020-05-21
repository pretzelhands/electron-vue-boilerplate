"use strict";

const { resolve } = require("path");
const { readdirSync } = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const nodeModules = {};
readdirSync("node_modules").filter(mods => ![".bin", ".cache"].includes(mods)).forEach(mod => nodeModules[mod] = `require("${mod}")`);

module.exports = {
	mode: process.env.NODE_ENV,
	target: "electron-main",
	entry: resolve(__dirname, "src/mainProcess/main.ts"),
	output: {
		path: resolve(__dirname, "dist/mainProcess/")
	},
	externals: nodeModules,
	node: {
		__filename: false,
		__dirname: false
	},
	performance: {
		hints: false
	},
	module: {
		rules: [{
			enforce: "pre",
			test: /\.m?js$/i,
			exclude: /node_modules/,
			loader: "eslint-loader",
			options: {
				configFile: resolve(__dirname, ".eslintrc-mainProcess.js"),
				emitError: true,
				emitWarning: true,
				failOnError: true,
				failOnWarning: true
			}
		}, {
			test: /\.ts$/,
			use: 'ts-loader',
			exclude: /node_modules/,
		}, {
			test: /\.m?js$/i,
			loader: "babel-loader",
			options: {
				comments: false,
				minified: true
			}
		}]
	},
	plugins: [
		new CleanWebpackPlugin()
	],
	resolve: {
		extensions: [".js", ".ts", ".mjs", ".json"],
		alias: {
			"main": resolve(__dirname, "src/main/"),
			"shared": resolve(__dirname, "src/shared/"),
		}
	}
};

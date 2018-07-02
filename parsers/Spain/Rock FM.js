// Copyright (c) 2018 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

var get = require("../get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {

		if (err) {
			return callback(err, null, null);
		}

		try {
			var parsedResult = JSON.parse(result);
			parsedResult = JSON.parse(decodeURI(parsedResult.value));
		} catch(e) {
			console.log(result);
			return callback(e.message, null, null);
		}

		const artist = decodeURIComponent(parsedResult.author);
		const title = decodeURIComponent(parsedResult.title);

		const exturl2 = "http://player.rockfm.fm/rdsrock.php";

		get(exturl2, function(err, result2, corsEnabled) {

			if (err) {
				return callback(err, null, null);
			}

			const b1 = "@";
			const i1 = result2.indexOf(b1);
			const r1 = result2.slice(i1 + b1.length);
			const cover = "http://player.rockfm.fm/xml/img/" + r1;

			return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
		});
	});
}
var fs = require("fs");
var mm = require("musicmetadata");
var request = require("request");
var slugify = require("slugify");
var Promise = require('promise');
var FormData = require('form-data');

var BASE_URL = 'http://localhost:3000/api/';
var accessToken = 'Dxgu4Rp51lsRxLMKHoHvmFLY8f7PVQGfv8QEnVjSRa21CLrNU8l2luRmZSgOfqm7';

// var staticdir = 'static/';
// var artworkdir = 'artwork/';
// var musicdir = 'music/';
// var jsondir = 'json/';
// var musicpath = 'http://stream.suararadio.com/cyclone/public/dummy/music/';
// var artworkpath = 'http://stream.suararadio.com/cyclone/public/dummy/artwork/';
// var file = fs.readdirSync('static/music');
// var songlist = [];
// var filename = file[process.argv[2]];



function postMusicUpload(fileName, cb){
	// var options = { 
	//   	method: 'POST',
	//   	url: BASE_URL + 'musics/upload/audio',
	//   	headers: { 
	// 	    'cache-control': 'no-cache',
	// 	    authorization: accessToken,
	// 	    'content-type': 'multipart/form-data; boundary=---011000010111000001101001' 
	// 	},
	//   	formData: { 
	// 	  	file: { 
	// 	  		value: 'fs.createReadStream('+ fileName +')',
	// 	        options: { filename: { '0': {} }, contentType: null } 
	// 	    } 
	// 	} 
	// };

	// request(options, function (error, response, body) {
	//   	if (error) throw new Error(error);
	//   	console.log("Success : Music Audio Upload", body);
	//   	return(body);
	// });
	// var options = { 
	//   	method: 'POST',
	//   	url: BASE_URL + 'musics/upload/audio',
	//   	headers: { 
	// 	    'cache-control': 'no-cache',
	// 	    authorization: accessToken
	// 	}
	// };

	// var req = request(options, function (error, response, body) {
	//   	if (error) throw new Error(error);
	//   	console.log("Success : Music Upload", body);
	//   	return(body);
	// });
	// var form = req.form();
	// form.append('file', fs.createReadStream(fileName));
	var formData = {
		'file' : fs.createReadStream(fileName)
	};

	var options = { 
	  	method: 'POST',
	  	url: BASE_URL + 'musics/upload/audio',
	  	headers: { 
		    'cache-control': 'no-cache',
		    authorization: accessToken
		},
		formData: formData
	};

	request(options, function (error, response, body) {
	  	if (error) throw new Error(error);
	  	console.log("Success : Music Upload", body);
	  	return(body);
	});
};

function postArtistCoverUpload(fileName, cb){
	var options = { 
	  	method: 'POST',
	  	url: BASE_URL + 'artists/upload/coverArt',
	  	headers: { 
		    'cache-control': 'no-cache',
		    authorization: accessToken,
		    'content-type': 'multipart/form-data; boundary=---011000010111000001101001' 
		},
	  	formData: { 
		  	file: { 
		  		value: 'fs.createReadStream('+ fileName +')',
		        options: { filename: { '0': {} }, contentType: null } 
		    } 
		} 
	};

	request(options, function (error, response, body) {
	  	if (error) throw new Error(error);
	  	console.log("Success : Artist Cover Upload", body);
	  	return(body);
	});
};

function postAlbumCoverUpload(fileName, cb){
	var formData = {
		'file' : fs.createReadStream(fileName)
	};

	var options = { 
	  	method: 'POST',
	  	url: BASE_URL + 'albums/upload/coverArt',
	  	headers: { 
		    'cache-control': 'no-cache',
		    authorization: accessToken
		},
		formData: formData
	};

	request(options, function (error, response, body) {
	  	if (error) throw new Error(error);
	  	console.log("Success : Album Cover Upload", body);
	  	return(body);
	});
};

function postMusicCreate(name, audio, genre, albumId, cb){
	var options = { 
	  	method: 'POST',
	  	url: BASE_URL + 'musics',
	  	headers: { 
		    'cache-control': 'no-cache',
		    authorization: accessToken,
		    'content-type': 'application/json'
		},
	  	body: { 
	  		name: name,
     		audio: audio,
     		genre: genre,
     		albumId: albumId,
     		source: 'svara',
     		diskNo: 1 
     	},
     	json: true
	};

	request(options, function (error, response, body) {
	  	if (error) throw new Error(error);
	  	console.log("Success : Music Created", body);
	  	return(body);
	});
};

function postArtistCreate(name, genre, cb){
	var options = { 
	  	method: 'POST',
	  	url: BASE_URL + 'artists',
	  	headers: { 
		    'cache-control': 'no-cache',
		    authorization: accessToken,
		    'content-type': 'application/json'
		},
	  	body: {
		  "name": name,
		  "genre": genre,
		  "source": "svara"
		},
     	json: true
	};

	request(options, function (error, response, body) {
	  	if (error) throw new Error(error);
	  	console.log("Success : Artist Created", body);
	  	return(body);
	});
};

function postAlbumCreate(name, coverArtS, coverArtM, coverArtL, genre, cb){
	var options = { 
	  	method: 'POST',
	  	url: BASE_URL + 'albums',
	  	headers: { 
		    'cache-control': 'no-cache',
		    authorization: accessToken,
		    'content-type': 'application/json'
		},
	  	body: {
		  "name": name,
		  "coverArtS": coverArtS,
		  "coverArtM": coverArtM,
		  "coverArtL": coverArtL,
		  "genre": genre,
		  "source": "svara"
		},
     	json: true
	};

	request(options, function (error, response, body) {
	  	if (error) throw new Error(error);
	  	console.log("Success : Album Created", body);
	  	return(body);
	});
};

function relArtistAlbum(artistId, albumId, cb){
	var options = { 
	  	method: 'PUT',
	  	url: BASE_URL + '/albums/'+ albumId +'/artists/rel/' + artistId, 
	  	headers: { 
		    'cache-control': 'no-cache',
		    authorization: accessToken
		}
	};

	request(options, function (error, response, body) {
	  	if (error) throw new Error(error);
	  	console.log("Success : Relation between Album and Artist", body);
	  	return(body);
	});
};

function relAlbumArtist(artistId, albumId, cb){
	var options = { 
	  	method: 'PUT',
	  	url: BASE_URL + '/artists/'+ artistId +'/albums/rel/' + albumId, 
	  	headers: { 
		    'cache-control': 'no-cache',
		    authorization: accessToken
		}
	};

	request(options, function (error, response, body) {
	  	if (error) throw new Error(error);
	  	console.log("Success : Relation between Artist and Album", body);
	  	return(body);
	});
};

function relMusicArtist(artistId, musicId, cb){
	var options = { 
	  	method: 'PUT',
	  	url: BASE_URL + '/musics/'+ musicId +'/artists/rel/' + artistId, 
	  	headers: { 
		    'cache-control': 'no-cache',
		    authorization: accessToken
		}
	};

	request(options, function (error, response, body) {
	  	if (error) throw new Error(error);
	  	console.log("Success : Relation between Music and Artist", body);
	  	return(body);
	});
};

function relArtistMusic(artistId, musicId, cb){
	var options = { 
	  	method: 'PUT',
	  	url: BASE_URL + '/artists/'+ artistId +'/musics/rel/' + musicId, 
	  	headers: { 
		    'cache-control': 'no-cache',
		    authorization: accessToken
		}
	};

	request(options, function (error, response, body) {
	  	if (error) throw new Error(error);
	  	console.log("Success : Relation between Artist and Music", body);
	  	return(body);
	});
};

// check input
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

// start engine
console.log("=============================");
console.log("Music Uploader Engine Started");
console.log("=============================");
console.log("");
var path = process.argv[2];

fs.readdir(path, function(err, audioFiles) {
	console.log(audioFiles);
	audioFiles.forEach(function(audio, i){
		var audioPath = path + '/' + audio;
		var audioFile = audio;
		var slugAudioFile = slugify(audioFile);
		var audioBaseName = slugAudioFile.replace(".mp3", "");

		mm(fs.createReadStream(audioPath), function(err, metadata){
			if (err) throw err;

			console.log("Start: " + audioPath);

			var artistName = metadata['artist'][0],
				trackName = metadata['title'],
				albumName = metadata['album'],
				genre = metadata['genre'][0],
				artwork = metadata['picture'][0];

			new Promise(function(resolve, reject){
				resolve("next");
			}).then(function(res){
				console.log("stage 1");
				var p1 = new Promise(function(resolve, reject){
					resolve("next");
				}).then(function(res){
					// Extract album artwork and store it to a folder called artwork
					console.log("extract album art");
					artwork.filename =  audioBaseName + '.' + artwork.format;
				// 	var artworkPath = 'static/artwork/' + artwork.filename;
				// 	try {
				// 	    fs.writeFile(artworkPath, artwork.data);
				// 	    return(artworkPath);
				// 	} catch (err) {
				// 	    console.log("Problem reading or writing")
				// 	    process.exit(1);
				// 	}					
				// }).then(function(res){
					// upload artwork
					console.log("upload album art");
					//console.log(res);
					// postAlbumCoverUpload(res, function(err, results){
					// 	if(err) reject(err);
					// 	console.log(results);
					// 	return(results)
					// });
					var formData = {
						'file' : artwork.data
					};

					var options = { 
					  	method: 'POST',
					  	url: BASE_URL + 'albums/upload/coverArt',
					  	headers: { 
						    'cache-control': 'no-cache',
						    authorization: accessToken
						},
						formData: formData
					};

					request(options, function (error, response, body) {
					  	if (error) throw new Error(error);
					  	console.log("Success : Album Cover Upload", body);
					  	return(body);
					});
				}).then(function(res){
					// create new album and artist
					console.log("create new album and artist");
					var resCoverArtS = res.coverArtS,
						resCoverArtM = res.coverArtM,
						resCoverArtL = res.coverArtL;

					var pAlbumCreate = new Promise(function(resolve, reject){
						console.log("create album");
						postAlbumCreate(albumName, resCoverArtS, resCoverArtM, resCoverArtL, genre, function(err, results){
							if(err) reject(err);
							var resAlbumId = results.id;
							resolve(resAlbumId);
						});
					});
					var pArtistCreate = new Promise(function(resolve, reject){
						console.log("create artist");
						postArtistCreate(artistName, genre, function(err, results){
							if(err) reject(err);
							var resArtistId = results.id;
							resolve(resArtistId);
						});
					});
					return Promise.all([pAlbumCreate, pArtistCreate]);
				}).then(function(res){
					// relationship between artist and album
					console.log("relationship between artist and album");
					var albumId = res[0],
						artistId = res[1];

					var pRelAlbumArtist = new Promise(function(resolve, reject){
						console.log("relationship album");
						relAlbumArtist(artistId, albumId, function(err, results){
							if(err) reject(err);
							var resAlbumId = results.albumId;
							resolve(resAlbumId);
						});
					});
					var pRelArtistAlbum = new Promise(function(resolve, reject){
						console.log("relationship artist");
						relArtistAlbum(artistId, albumId, function(err, results){
							if(err) reject(err);
							var resArtistId = results.albumId;
							resolve(resArtistId);
						});
					});
					return Promise.all([pRelAlbumArtist, pRelArtistAlbum]);
				}).then(function(res){
					return(res);
				}).catch(function(err){
					throw(err);
				});
				return Promise.all(p1);
			}).then(function(res){
				console.log("stage2", res);
				var albumId = res[0],
					artistId = res[1];

				var p2 = new Promise(function(resolve, reject){
					// upload audio
					// postMusicUpload(audioPath, function(err, results){
					// 	if(err) reject(err);
					// 	var resAudio = results.audio;
					// 	resolve(resAudio);
					// });
					console.log("audiopath", audioPath);
					var readFiles = fs.readFile(audioPath);
					readFiles.then(function(res){
						var formData = {
							'file' : res
						};

						var options = { 
						  	method: 'POST',
						  	url: BASE_URL + 'musics/upload/audio',
						  	headers: { 
							    'cache-control': 'no-cache',
							    authorization: accessToken
							},
							formData: formData
						};
						request(options, function (error, response, body) {
						  	if (error) throw new Error(error);
						  	console.log("Success : Music Upload", body);
						  	return(body.audio);
						});
					});
				}).then(function(res){
					// create music with albumId
					var resAudio = res;
					postMusicCreate(name, resAudio, genre, albumId, function(err, results){
						if(err) reject(err);
						var resMusicId = results.id;
						resolve(resMusicId);
					});
				}).then(function(res){
					//relation between music and artist
					var resMusicId = res;
					var pRelMusicArtist = new Promise(function(resolve, reject){
						relMusicArtist(artistId, resMusicId, function(err, results){
							if(err) reject(err);
							var resMusidId = results.musicId;
							resolve(resMusicId);
						});
					});
					var pRelArtistMusic = new Promise(function(resolve, reject){
						relArtistMusic(artistId, resMusicId, function(err, results){
							if(err) reject(err);
							var resArtistId = results.artistId;
							resolve(resArtistId);
						});
					});
					return Promise.all([pRelMusicArtist, pRelArtistMusic]);
				}).then(function(res){
					return(res);
				}).catch(function(err){
					throw(err);
				});

				return Promise.all(p2);
			}).then(function(res){
				return("Add Music Successfully");
			}).catch(function(err){
				throw(err);
			});
		});
	});
});


// var filebasename = filename.replace(".mp3", "");
// var parser = mm(fs.createReadStream(staticdir + musicdir + filename), function(err, metadata){
// 	if (err) throw err;

// 	// Extract artwork 
// 	var artwork = metadata['picture'][0];
// 	artwork.filename =  filebasename + '.' + artwork.format;
// 	var artworkoutput = staticdir + artworkdir + artwork.filename;
// 	fs.writeFileSync(artworkoutput, artwork.data);
	
// 	var coverArt = artworkpath + artwork.filename;
// 	var audio = musicpath + filename;

// 	// Insert needed data to array
// 	var mmdata = {
// 		"artist": metadata['artist'][0],
// 		"name": metadata['title'],
// 		"album": metadata['album'],
// 		"genre": metadata['genre'][0],
// 		"private": false,
// 		"lyric": "dummy",
// 		"coverArt" : coverArt,
// 		"audio" : audio,
// 		"source" : "dummyfile"
// 	};

// 	console.log(JSON.stringify(mmdata));
// 	});

// //console.log(songlist);

import SpotifyWebApi from "spotify-web-api-node";

var spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

spotifyApi.setAccessToken(
	"BQBMoDrI6TEx_VmZQ1T3ZghSqRcPaen1hFZYEjz4j4InpQ70Wn1p49f8sie0jNifXjiddnxQtyW36mbkZPSp8MqZnj3CdZuc-uNmVgw_z83t44s-9IeAYdB86dnNRfDzip2HNnLeOOutLDKPRQ_YgHUQQdde31n4V1I-Qle_wiZCY-AzcM49VRywdHQn0d7iU83aC8M"
);

export default function handler(req, res) {
	// spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
	// 	function (data) {
	// 		console.log("Artist albums", data.body);
	// 		// res.status(200).json({ Status: "200 FETCHED" });
	// 		res.status(200).json(data.body.items);
	// 	},
	// 	function (err) {
	// 		console.error(err);
	// 	}
	// );
	spotifyApi.getMe().then(
		function (data) {
			// console.log("Some information about the authenticated user", data.body);
			res.status(200).json(data.body.followers);
		},
		function (err) {
			console.log("Something went wrong!", err);
		}
	);
}

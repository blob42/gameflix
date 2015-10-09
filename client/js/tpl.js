URL = function(){
    var player = new Player();
    var playlist = new Playlist();
    var source = '{{.}}';
    var mediaItem = new MediaItem("video", source);
    player.playlist = playlist; player.playlist.push(mediaItem);
    player.present();
}


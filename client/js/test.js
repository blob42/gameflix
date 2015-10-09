URL = function(){
    var player = new Player();
    var playlist = new Playlist();
    var source = 'https://r8---sn-i5onxoxu-cxgl.googlevideo.com/videoplayback?key=yt6&mt=1444352471&sparams=dur%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cupn%2Cexpire&ipbits=0&requiressl=yes&sver=3&expire=1444374166&upn=KYMs4Ure5nk&lmt=1444232227412042&source=youtube&mv=m&mime=video%2Fmp4&ms=au&signature=669F31B74CDC7DDA81117032A160B1E7356146B9.2127108744FF3CA824DD75995896008A2FF7CFB4&dur=1573.871&initcwndbps=2452500&id=o-ADKawbBBNej64FfEAyOIuE84-xdLEYlflFFJGV8QzQnN&pl=23&itag=22&mm=31&ip=92.228.97.61&mn=sn-i5onxoxu-cxgl&ratebypass=yes&fexp=9405349%2C9408710%2C9409069%2C9414764%2C9414904%2C9415031%2C9415365%2C9415485%2C9416023%2C9416126%2C9416557%2C9417707%2C9418203%2C9418214%2C9418401%2C9418448%2C9419444%2C9419788%2C9420348%2C9421013%2C9421293%2C9421560%2C9421655%2C9421922%2C9422115%2C9422124%2C9422372';
    var mediaItem = new MediaItem("video", source);
    player.playlist = playlist; player.playlist.push(mediaItem);
    player.present();
}


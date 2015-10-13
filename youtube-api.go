package main

import (
	"fmt"
	"log"
	"net/http"

	//"golang.org/x/net/context"
	//"golang.org/x/oauth2"
	//"golang.org/x/oauth2/google"
	"google.golang.org/api/googleapi/transport"
	youtube "google.golang.org/api/youtube/v3"
)

// Global variables
const (
	YOUTUBE_API_KEY     = "AIzaSyA8PdvfIetV1XqiLAGeAaDIWAmyCMn_Qj4"
	TEST_CHANNEL_HANDLE = "TotalHalibut"

	Y_THUMBNAIL_URL = "https://i.ytimg.com/vi/"
	Y_VIDEO_URL     = "https://www.youtube.com/watch?v="
)

var (
	Y_THUMBNAIL_MODES = map[string]string{
		"high":     "hqdefault.jpg",
		"standard": "sddefault.jpg",
		"maxres":   "maxresdefault.jpg",
	}
)

type YoutubeService func() *youtube.Service

type YVideo struct {
	ID          string
	Title       string
	Description string
}

func (v *YVideo) GetThumbnail(mode string) string {
	th := fmt.Sprint(Y_THUMBNAIL_URL, v.ID, "/", Y_THUMBNAIL_MODES[mode])
	return th
}

func (v *YVideo) GetVideoUrl() string {
	return fmt.Sprint(Y_VIDEO_URL, v.ID)
}

func getYoutubeService() YoutubeService {

	var youtubeService *youtube.Service

	return func() *youtube.Service {

		if youtubeService != nil {
			return youtubeService
		}

		client := &http.Client{
			Transport: &transport.APIKey{Key: YOUTUBE_API_KEY},
		}
		youtubeService, err := youtube.New(client)
		if err != nil {
			log.Panic(err)
		}
		return youtubeService
	}
}

func getVideosFromPlaylist(plId string, n int64) []YVideo {

	ySrv := getYoutubeService()()
	var videos []YVideo

	plItems, err := ySrv.PlaylistItems.List("id,snippet").PlaylistId(plId).MaxResults(n).Do()
	if err != nil {
		log.Panic(err)
	}

	for _, item := range plItems.Items {
		v := YVideo{
			ID:          item.Snippet.ResourceId.VideoId,
			Title:       item.Snippet.Title,
			Description: item.Snippet.Description,
		}

		videos = append(videos, v)
	}

	return videos
}

//func main() {

//channels, err := ySrv.Channels.List("id").ForUsername(TEST_CHANNEL_HANDLE).MaxResults(1).Do()
//if err != nil {
//t.Fatal(err)
//}

//cid := channels.Items[0].Id

//playlists, err := ySrv.Playlists.List("id").ChannelId(cid).MaxResults(10).Do()
//if err != nil {
//t.Fatal(err)
//}

//for _, pl := range playlists.Items {
//fmt.Printf("\n___ Playlist: %s ___\n", pl.Id)

//playListItems, err := ySrv.PlaylistItems.List("id,snippet").PlaylistId(pl.Id).MaxResults(10).Do()
//if err != nil {
//t.Fatal(err)
//}

//for _, vd := range playListItems.Items {
//fmt.Printf(" --> %s\n", vd.Snippet.ResourceId.VideoId)
//}

//}

//fmt.Printf("Id for TB is : %s\n", cid)

//return
//}

package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	//"golang.org/x/net/context"
	//"golang.org/x/oauth2"
	//"golang.org/x/oauth2/google"
	"google.golang.org/api/googleapi/transport"
	youtube "google.golang.org/api/youtube/v3"
)

// Global variables
const (
	YOUTUBE_API_KEY = "AIzaSyA8PdvfIetV1XqiLAGeAaDIWAmyCMn_Qj4"

	Y_THUMBNAIL_URL = "https://i.ytimg.com/vi/"
	Y_VIDEO_URL     = "https://www.youtube.com/watch?v="

	// For Testing
	TEST_CHANNEL_HANDLE = "TotalHalibut"
	TEST_CHANNEL_ID     = "UCy1Ms_5qBTawC-k7PVjHXKQ"
	TEST_PLAYLIST_ID    = "PLTFohR7GUZYe_b-6MgArbh6p0r1HrXFvv"
)

var (
	Y_THUMBNAIL_MODES = map[string]string{
		"high":     "hqdefault.jpg",
		"standard": "sddefault.jpg",
		"maxres":   "maxresdefault.jpg",
	}

	// TB PLS IDS
	Y_PLAYLIST_IDS = []string{
		"PLTFohR7GUZYcD8t4bbSKYpnsjMWf19Qgo",
		"PLFE010B0EEA9E5F06",
		"PLTFohR7GUZYe_b-6MgArbh6p0r1HrXFvv",
		"PLTFohR7GUZYdGIggZpSsd6dNSFPW7Kz7s",
	}
)

type YoutubeService func() *youtube.Service

type YVideo struct {
	ID          string
	Title       string
	Description string
}

type YPlaylist struct {
	ID          string
	Title       string
	Description string
	Thumbnails  interface{}
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

func getPlaylists(plIds []string) ([]YPlaylist, error) {

	ySrv := getYoutubeService()()
	var playlists []YPlaylist

	pls, err := ySrv.Playlists.List("id,snippet").Id(strings.Join(plIds, ",")).Do()
	if err != nil {
		log.Panic(err)
	}

	for _, item := range pls.Items {
		pl := YPlaylist{
			ID:          item.Id,
			Title:       item.Snippet.Title,
			Description: item.Snippet.Description,
			Thumbnails:  item.Snippet.Thumbnails,
		}

		playlists = append(playlists, pl)
	}

	return playlists, err

}

func getPlaylistsForChannel(channelId string) ([]YPlaylist, error) {

	ySrv := getYoutubeService()()
	var playlists []YPlaylist

	pls, err := ySrv.Playlists.List("id,snippet").ChannelId(channelId).Do()
	if err != nil {
		log.Panic(err)
	}

	for _, item := range pls.Items {
		pl := YPlaylist{
			ID:          item.Id,
			Title:       item.Snippet.Title,
			Description: item.Snippet.Description,
			Thumbnails:  item.Snippet.Thumbnails,
		}

		playlists = append(playlists, pl)
	}

	return playlists, err
}

func GetChannelId(username string) (string, error) {
	ySrv := getYoutubeService()()

	channels, err := ySrv.Channels.List("id").ForUsername(username).MaxResults(1).Do()

	if err != nil {
		log.Panic(err)
	}

	return channels.Items[0].Id, err
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

package main

import (
	"testing"
)

func TestGetPlaylists(t *testing.T) {

	playlists, err := getPlaylists(Y_PLAYLIST_IDS)
	if err != nil {
		t.Error(err)
	} else {

		if playlists[0].ID != Y_PLAYLIST_IDS[0] {
			t.Error("Playlist ID Mismatch")
		} else {
			t.Log("Passed")
		}
	}
}

func TestGetPlaylistsForChannel(t *testing.T) {
	playlists, err := getPlaylistsForChannel(TEST_CHANNEL_ID)
	if err != nil {
		t.Error(err)
	} else {

		if playlists[0].ID != TEST_PLAYLIST_ID {
			t.Error("Playlist ID Mismatch")
		} else {
			t.Log("Passed")
		}
	}

}

func TestGetChannelId(t *testing.T) {
	chId, err := GetChannelId(TEST_CHANNEL_HANDLE)

	if err != nil {
		t.Error("Getting channel ID")
	}

	if chId != TEST_CHANNEL_ID {
		t.Error("Channel ID mismatch")
	} else {
		t.Log("Passed")
	}
}

func TestGetVideosFromPlaylist(t *testing.T) {
	videos := getVideosFromPlaylist(TEST_PLAYLIST_ID, 1)
	t.Logf("Passed -> Playlist: %s ----- VideoID: %s", TEST_PLAYLIST_ID, videos[0].ID)

}

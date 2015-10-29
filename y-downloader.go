package main

import (
	//"fmt"
	"log"
	"os"
	"os/exec"
)

var (
	TEST_URL    = "https://m.youtube.com/watch?v=1Xo8WnJCdMA"
	DL_CMD      = "youtube-dl"
	SourceOnly  = "-g"
	getDuration = "--get-duration"
	UA          = "--user-agent"
	UAV         = "GameFlix/1 CFNetwork/758.1.6 Darwin/14.5.0"
	VQuality    = "-f 22"
)

type YoutubeDownloader struct {
	URL string
}

func NewYoutubeDownloader(url string) *YoutubeDownloader {
	return &YoutubeDownloader{
		URL: url,
	}
}

func (downloader *YoutubeDownloader) GetSourceVideo() []byte {

	dlArgs := []string{SourceOnly, getDuration, UA, UAV, VQuality, downloader.URL}

	c := exec.Command(DL_CMD, dlArgs...)
	c.Env = os.Environ()
	//c.Stderr = os.Stderr
	//c.Stdout = os.Stdin

	out, err := c.CombinedOutput()

	if err != nil {
		log.Panic(err)
	}
	c.Run()

	//return []byte{'a', 'b'}
	return out
}

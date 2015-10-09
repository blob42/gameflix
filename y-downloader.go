package main

import (
	//"fmt"
	"log"
	"os"
	"os/exec"
)

var (
	TEST_URL   = "https://m.youtube.com/watch?v=1Xo8WnJCdMA"
	DL_CMD     = "youtube-dl"
	SourceOnly = "-g"
	VQuality   = "-f 22"
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

	dlArgs := []string{SourceOnly, VQuality, downloader.URL}

	c := exec.Command(DL_CMD, dlArgs...)
	c.Env = os.Environ()

	out, err := c.CombinedOutput()

	if err != nil {
		log.Fatal(err)
	}
	c.Run()

	return out
}

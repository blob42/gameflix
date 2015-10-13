package main

// Example mobile youtube video
// https://m.youtube.com/watch?v=Bdw_ikz2hBY

import (
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"net/http"
)

func getSourceUrl(c *gin.Context) {

	url, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Fatal(err)
	}

	downloader := NewYoutubeDownloader(string(url))
	sourceUrl := string(downloader.GetSourceVideo())

	c.String(http.StatusOK, "%s", sourceUrl[:len(sourceUrl)-1])
}

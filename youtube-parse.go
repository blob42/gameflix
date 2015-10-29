package main

// Example mobile youtube video
// https://m.youtube.com/watch?v=Bdw_ikz2hBY

import (
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
)

func convertToSecs(time string) int {
	mins, err := strconv.Atoi(strings.Split(time, ":")[0])
	secs, err := strconv.Atoi(strings.Split(time, ":")[1])

	if err != nil {
		log.Panic(err)
	}

	return mins*60 + secs
}

func getSourceUrl(c *gin.Context) {

	//log.Println(c.Request.Header["User-Agent"])
	url, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Panic(err)
		c.String(http.StatusExpectationFailed, err.Error())
	} else {
		downloader := NewYoutubeDownloader(string(url))
		raw := string(downloader.GetSourceVideo())

		parts := strings.Split(raw, "\n")
		timing := parts[1]
		sourceUrl := parts[0]
		sourceUrl = strings.Trim(sourceUrl, " ")
		//log.Printf("<%s>|<%s>\n", sourceUrl, timing)

		c.JSON(http.StatusOK, gin.H{"url": sourceUrl,
			"duration": convertToSecs(timing)})
	}

}

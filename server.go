package main

import (
	//"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"net/http"
	//"strings"
	"text/template"
)

//View name -> address mappings
const (
	TEMPLATES_DIR = "client/templates/index.xml"
)

//var videos = []string{
//"https://www.youtube.com/watch?v=FDQx-guzx2s",
//}

var Views = map[string]string{
	"index":   "client/templates/index.xml",
	"catalog": "client/templates/catalog.xml",
}

func renderXMLTemplate(xmlpath string, c *gin.Context) {

	t, err := template.ParseFiles(xmlpath)

	if err != nil {
		c.Error(err)
	}

	err = t.Execute(c.Writer, nil)
	if err != nil {
		log.Fatal(err)
	}

}

func handleView(c *gin.Context) {

	viewName := c.Param("viewName")

	xmlpath := Views[viewName]

	renderXMLTemplate(xmlpath, c)
}

func getSourceUrl(c *gin.Context) {

	url, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Fatal(err)
	}

	downloader := NewYoutubeDownloader(string(url))
	sourceUrl := string(downloader.GetSourceVideo())

	c.String(http.StatusOK, "%s", sourceUrl[:len(sourceUrl)-1])
}

func main() {
	router := gin.Default()

	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	api := router.Group("/api")
	{
		api.GET("/test", func(c *gin.Context) {
			c.String(http.StatusOK, "OK")
		})

		api.POST("/youtube/getSourceUrl", getSourceUrl)
	}

	client := router.Group("/client")
	{
		client.Static("/js", "./client/js")
		client.Static("/vendor", "./client/vendor/")

		client.GET("/views/:viewName", handleView)
	}

	router.Run(":9042")
}

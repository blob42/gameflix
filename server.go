package main

import (
	//"fmt"
	"bufio"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"text/template"
)

//View name -> address mappings
const (
	TEMPLATES_DIR = "client/templates/index.xml"
)

var Views = map[string]string{
	"index": "client/templates/index.xml",
}

func renderXMLTemplate(xmlpath string, c *gin.Context) {
	t, err := template.ParseFiles(xmlpath)

	if err != nil {
		c.Error(err)
	}

	t.Execute(c.Writer, nil)
}

func handleView(c *gin.Context) {
	viewName := c.Param("viewName")
	xmlpath := Views[viewName]
	renderXMLTemplate(xmlpath, c)
}

func getSourceUrl(c *gin.Context) {

	//yPage := NewYoutubePage(c.Request)
	//fmt.Printf("%s", yPage.RawPage)

	url, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Fatal(err)
	}

	downloader := NewYoutubeDownloader(string(url))
	sourceUrl := string(downloader.GetSourceVideo())

	sourceFile := "client/js/test.js"

	t, err := template.ParseFiles("client/js/tpl.js")
	if err != nil {
		log.Fatal(err)
	}

	f, err := os.Create(sourceFile)
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	w := bufio.NewWriter(f)

	t.Execute(w, sourceUrl[:len(sourceUrl)-1])

	w.Flush()

	fmt.Println(sourceUrl)

	//c.String(http.StatusOK, "%s", sourceUrl)
	c.String(http.StatusOK, "%s", "test.js")
}

func main() {
	router := gin.Default()

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

package main

import (
	//"fmt"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
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
	body, _ := ioutil.ReadAll(c.Request.Body)

	fmt.Printf("content is: --> %s", body)
	c.String(http.StatusOK, "OK")
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

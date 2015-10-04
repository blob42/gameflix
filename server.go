package main

import (
	//"fmt"
	"github.com/gin-gonic/gin"
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
	t, _ := template.ParseFiles(xmlpath)
	t.Execute(c.Writer, nil)
}

func handleView(c *gin.Context) {
	viewName := c.Param("viewName")
	xmlpath := Views[viewName]
	renderXMLTemplate(xmlpath, c)
}

func main() {
	router := gin.Default()

	api := router.Group("/api")
	{
		api.GET("/test", func(c *gin.Context) {
			c.String(http.StatusOK, "OK")
		})
	}

	client := router.Group("/client")
	{
		client.Static("/js", "./client/js")
		client.GET("/views/:viewName", handleView)
	}

	router.Run(":9042")
}

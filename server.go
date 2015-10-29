package main

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"path"
	"reflect"
	"text/template"
)

//View name -> address mappings
const (
	TEMPLATES_DIR = "client/templates"
)

// Do data collection here and push a pointer to data
func IndexHandler(c *gin.Context) {

	// Get Videos
	//videos := getVideosFromPlaylist("PLTFohR7GUZYcD8t4bbSKYpnsjMWf19Qgo", 10)
	renderView(c, &struct{}{})
	//renderView(c, videos)
}

func HomeHandler(c *gin.Context) {
	//videos := getVideosFromPlaylist(TEST_PLAYLIST_ID, 10)
	playlists, _ := getPlaylists(Y_PLAYLIST_IDS)
	renderView(c, playlists)
}

var ViewHandlers = map[string]interface{}{
	"index":        IndexHandler,
	"home":         HomeHandler,
	"stack":        HomeHandler,
	"videoOverlay": HomeHandler,
}

func Call(m interface{}, name string, params ...interface{}) (result []reflect.Value, err error) {
	f := reflect.ValueOf(m)
	if len(params) != f.Type().NumIn() {
		err = errors.New("The number of params is not adapted.")
		return
	}
	in := make([]reflect.Value, len(params))
	for k, param := range params {
		in[k] = reflect.ValueOf(param)
	}
	result = f.Call(in)
	return
}

func handleView(c *gin.Context) {
	viewName := c.Param("viewName")

	if viewH, ok := ViewHandlers[viewName]; ok {
		Call(viewH, viewName, c)
	} else {
		http.NotFound(c.Writer, c.Request)
	}
}

func renderView(c *gin.Context, data interface{}) {
	viewName := c.Param("viewName")

	xmlPath := path.Join(TEMPLATES_DIR, fmt.Sprint(viewName, ".xml"))
	t, err := template.ParseFiles(xmlPath)

	if err != nil {
		log.Panic(err)
	}

	err = t.Execute(c.Writer, data)
	if err != nil {
		log.Panic(err)
	}
}

func getVideosHandler(c *gin.Context) {
	plId := c.Param("plId")
	videos := getVideosFromPlaylist(plId, 10)

	c.JSON(http.StatusOK, gin.H{"videos": videos})
}

func main() {
	router := gin.Default()

	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	api := router.Group("/api")
	{
		api.GET("/test", func(c *gin.Context) {
			fmt.Println(c.Request.Header.Get("User-Agent"))
			c.String(http.StatusOK, "OK")
		})

		api.GET("/youtube/videosFromPlaylist/:plId", getVideosHandler)

		api.POST("/youtube/getSourceUrl", getSourceUrl)
	}

	client := router.Group("/client")
	{
		client.Static("/js", "./client/js")
		client.Static("/vendor", "./client/vendor/")
		client.Static("/images", "./client/images/")

		client.GET("/views/:viewName", handleView)
	}

	router.Run(":9042")
}

//func main() {
//videos := getVideosFromPlaylist("PLTFohR7GUZYcD8t4bbSKYpnsjMWf19Qgo", 10)

//for _, v := range videos {
//fmt.Println(v.getThumbnail("maxres"))
//}
//return
//}

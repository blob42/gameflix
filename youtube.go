package main

// Example mobile youtube video
// https://m.youtube.com/watch?v=Bdw_ikz2hBY

import (
	encoding "github.com/sp4ke/lz-string-go"
	"io/ioutil"
	"net/http"
)

type YoutubePage struct {
	CompressedPage []byte
	CompressedLen  int64
	RawPage        string
	VideoSrcUrl    string
}

// YoutubePage constructor
func NewYoutubePage(req *http.Request) *YoutubePage {
	compressed, _ := ioutil.ReadAll(req.Body)

	p := YoutubePage{
		CompressedPage: compressed,
		CompressedLen:  req.ContentLength,
	}

	p.Uncompress()

	return &p
}

func (youtubePage *YoutubePage) GetSourceVideo() {
	youtubePage.VideoSrcUrl = "Test String"
}

func (youtubePage *YoutubePage) Uncompress() {
	strPage := string(youtubePage.CompressedPage[:youtubePage.CompressedLen])
	decoded, _ := encoding.DecompressFromEncodedUriComponent(strPage)
	youtubePage.RawPage = decoded
}

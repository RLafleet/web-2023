package main

import (
	"github.com/jmoiron/sqlx"
	"html/template"
	"log"
	"net/http"
)

type indexPage struct {
	FeaturedPosts []*featuredPostData
}

type featuredPostData struct {
	PostID      string `db:"post_id"`
	PostURL     string
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	Image       string `db:"image"`
	Author      string `db:"author"`
	AuthorImg   string `db:"authorImg"`
	PublishDate string `db:"publish_date"`
}

func index(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		featuredPosts, err := featuredPosts(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}
		ts, err := template.ParseFiles("pages/index.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		data := indexPage{
			FeaturedPosts: featuredPosts,
		}

		err = ts.Execute(w, data)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}
		log.Println("Request completed successfully")
	}
}

func featuredPosts(db *sqlx.DB) ([]*featuredPostData, error) {
	const query = `
		SELECT
		    post_id,
			title,       
			subtitle, 
			image,
			author,      
			authorImg,  
			publish_date 
		FROM 
			post
		WHERE featured = 1
	`
	var posts []*featuredPostData

	err := db.Select(&posts, query)
	if err != nil {
		return nil, err
	}
	for _, post := range posts {
		post.PostURL = "/post/" + post.PostID
	}

	return posts, nil
}

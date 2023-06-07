package main

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type indexPage struct {
	FeaturedPosts []*featuredPostData
	MostRecent    []*mostRecentData
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

type mostRecentData struct {
	PostID      string `db:"post_id"`
	PostURL     string
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	Image       string `db:"image"`
	Author      string `db:"author"`
	AuthorImg   string `db:"authorImg"`
	PublishDate string `db:"publish_date"`
}

type postData struct {
	Title    string `db:"title"`
	Subtitle string `db:"subtitle"`
	Image    string `db:"image"`
	Content  string `db:"content"`
}

type createPostRequest struct {
	Title         string `json:"title"`
	Subtitle      string `json:"subtitle"`
	Image         string `json:"image"`
	ImageName     string `json:"imageName"`
	Author        string `json:"author"`
	AuthorImg     string `json:"authorImg"`
	AuthorImgName string `json:"authorImgName"`
	PublishDate   string `json:"publishDate"`
	Content       string `json:"content"`
}

func index(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		featuredPosts, err := featuredPosts(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}
		mostResentPosts, err := mostRecent(db)
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
			MostRecent:    mostResentPosts,
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

func login(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		ts, err := template.ParseFiles("pages/login.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		data := indexPage{}

		err = ts.Execute(w, data)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}
		log.Println("Request completed successfully")
	}
}

func admin(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		ts, err := template.ParseFiles("pages/admin.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		data := indexPage{}

		err = ts.Execute(w, data)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}
		log.Println("Request completed successfully")
	}
}

func post(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		postIDStr := mux.Vars(r)["postID"]

		postID, err := strconv.Atoi(postIDStr)
		if err != nil {
			http.Error(w, "Invalid post id", 404)
			log.Println(err)
			return
		}

		post, err := postByID(db, postID)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "post not found", 404)
				log.Println(err)
				return
			}

			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		ts, err := template.ParseFiles("pages/post.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		err = ts.Execute(w, post)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
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

func mostRecent(db *sqlx.DB) ([]*mostRecentData, error) {
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
		WHERE featured = 0
	`
	var posts []*mostRecentData

	err := db.Select(&posts, query)
	if err != nil {
		return nil, err
	}
	for _, post := range posts {
		post.PostURL = "/post/" + post.PostID
	}

	return posts, nil

}
func postByID(db *sqlx.DB, postID int) (postData, error) {
	const query = `
		SELECT
			title,
			subtitle,
			image,
			content
		FROM
		   post
		WHERE
			post_id = ?
	`
	var post postData

	err := db.Get(&post, query, postID)
	if err != nil {
		return postData{}, err
	}

	return post, nil
}

func createPost(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		var req createPostRequest
		err = json.Unmarshal(body, &req)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}
		authorImg, err := base64.StdEncoding.DecodeString(req.AuthorImg)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}
		fmt.Println(req.AuthorImgName)

		fileAuthor, err := os.Create("static/image/" + req.AuthorImgName)

		if err != nil {
			fmt.Println("Unable to create file:", err)
			return
		}

		_, err = fileAuthor.Write(authorImg)

		defer fileAuthor.Close()

		fmt.Println("Done.")

		if err != nil {
			http.Error(w, "bd", 500)
			log.Println(err.Error())
			return
		}

		image, err := base64.StdEncoding.DecodeString(req.Image)
		if err != nil {
			http.Error(w, "img", 500)
			log.Println(err.Error())
			return
		}
		fileImage, err := os.Create("static/image/" + req.ImageName)
		if err != nil {
			fmt.Println("Unable to create file:", err)
			return
		}

		defer fileImage.Close()
		_, err = fileImage.Write(image)
		if err != nil {
			http.Error(w, "bd", 500)
			log.Println(err.Error())
			return
		}
		fmt.Println("Done.")
		req.PublishDate = formatDate(req.PublishDate)

		err = savePost(db, req)
		if err != nil {
			http.Error(w, "bd", 500)
			log.Println(err.Error())
			return
		}
		log.Println("Request completed successfully")

	}
}

func savePost(db *sqlx.DB, req createPostRequest) error {
	const query = `
		INSERT INTO
		post
		(
			title,       
			subtitle, 
			image,  
			author,      
			authorImg,  
			publish_date,
			content,
			featured
		)
		VALUES
		(
			?,
			?,
			CONCAT('/static/image/', ?),
			?,
			CONCAT('/static/image/', ?),
			?,
			?,
			?
		)
		`
	_, err := db.Exec(query, req.Title, req.Subtitle, req.ImageName, req.Author, req.AuthorImgName, req.PublishDate, req.Content, 0)

	return err
}

func formatDate(oldDate string) string {
	dateStr := strings.Split(oldDate, "-")
	newDateStr := dateStr[2] + "/" + dateStr[1] + "/" + dateStr[0]
	return newDateStr
}

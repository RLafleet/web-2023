package main

import (
	"database/sql"
	"html/template"
	"log"
	"net/http"
	"strconv"

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
	ImgModifier string `db:"imgModifier"`
	Author      string `db:"author"`
	AuthorImg   string `db:"authorImg"`
	PublishDate string `db:"publish_date"`
}

type mostRecentData struct {
	PostID      string `db:"post_id"`
	PostURL     string
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	ImgModifier string `db:"imgModifier"`
	Author      string `db:"author"`
	AuthorImg   string `db:"authorImg"`
	PublishDate string `db:"publish_date"`
}

type postData struct {
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	ImgModifier string `db:"imgModifier"`
	Content     string `db:"content"`
}

func index(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		featuredPosts, err := featuredPosts(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
			log.Println(err)
			return // Не забываем завершить выполнение ф-ии
		}
		mostResentPosts, err := mostRecent(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
			log.Println(err)
			return // Не забываем завершить выполнение ф-ии
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

func post(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		postIDStr := mux.Vars(r)["postID"] // Получаем postID в виде строки из параметров урла

		postID, err := strconv.Atoi(postIDStr) // Конвертируем строку postID в число
		if err != nil {
			http.Error(w, "Invalid post id", 404)
			log.Println(err)
			return
		}

		post, err := postByID(db, postID)
		if err != nil {
			if err == sql.ErrNoRows {
				// sql.ErrNoRows возвращается, когда в запросе к базе не было ничего найдено
				// В таком случае мы возвращем 404 (not found) и пишем в тело, что ордер не найден
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
			imgModifier,
			author,      
			authorImg,  
			publish_date 
		FROM 
			post
		WHERE featured = 1
	` // Составляем SQL-запрос для получения записей для секции featured-posts
	var posts []*featuredPostData // Заранее объявляем массив с результирующей информацией

	err := db.Select(&posts, query) // Делаем запрос в базу данных
	if err != nil {                 // Проверяем, что запрос в базу данных не завершился с ошибкой
		return nil, err
	}
	for _, post := range posts {
		post.PostURL = "/post/" + post.PostID // Формируем исходя из ID ордера в базе
	}

	return posts, nil
}

func mostRecent(db *sqlx.DB) ([]*mostRecentData, error) {
	const query = `
		SELECT
		    post_id,
			title,       
			subtitle,   
			imgModifier,
			author,      
			authorImg,  
			publish_date 
		FROM
			post
		WHERE featured = 0
	` // Составляем SQL-запрос для получения записей для секции featured-posts
	var posts []*mostRecentData // Заранее объявляем массив с результирующей информацией

	err := db.Select(&posts, query) // Делаем запрос в базу данных
	if err != nil {                 // Проверяем, что запрос в базу данных не завершился с ошибкой
		return nil, err
	}
	for _, post := range posts {
		post.PostURL = "/post/" + post.PostID // Формируем исходя из ID ордера в базе
	}

	return posts, nil

}
func postByID(db *sqlx.DB, postID int) (postData, error) {
	const query = `
		SELECT
			title,
			subtitle,
			imgModifier,
			content
		FROM
			` + "`post`" +
		`WHERE
			post_id = ?
	`
	// В SQL-запросе добавились параметры, как в шаблоне. ? означает параметр, который мы передаем в запрос ниже

	var post postData

	// Обязательно нужно передать в параметрах postID
	err := db.Get(&post, query, postID)
	if err != nil {
		return postData{}, err
	}

	return post, nil
}

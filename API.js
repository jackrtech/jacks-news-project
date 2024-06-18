import axios from "axios"

let url = 'https://jacks-nc-news-6.onrender.com/api/articles'

export const getArticles = () => {

    return axios
        .get(url)
        .then((response) => response.data)
        .catch((err) => console.log(err))
}



export const getArticleById = (article_id) => {

    return axios
        .get(url + `/${article_id}`)
        .then((response) => response.data)
        .catch((err) => console.log(err))

}



export const getCommentsByArticleId = (article_id) => {

    return axios
        .get(url + `/${article_id}/comments`)
        .then((response) => response.data)
        .catch((err) => console.log(err))
}




import axios from "axios"


export const getArticles = () => {

    let url = 'https://jacks-nc-news-6.onrender.com/api/articles'


    return axios
        .get(url)
        .then((response) => response.data)
        .catch((err) => console.log(err))
}
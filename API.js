import axios from "axios"

let url = 'https://jacks-nc-news-6.onrender.com/api'

export const getArticles = () => {

    return axios
        .get(url +`/articles`)
        .then((response) => response.data)
        .catch((err) => console.log(err))
}


export const getArticlesByTopic = (topic) => {

    const query = topic ? `?topic=${topic}` : '';

    return axios
        .get(url + `/articles${query}`)
        .then((response) => response.data)
        .catch((err) => console.log(err));
}


export const getArticleTopics = () => {

    return axios 
        .get(url + `/topics`)
        .then((response) => response.data)
        .catch((err) => console.log(err))

}


export const getUsers= () => {

    return axios  
        .get(url +`/users`)
        .then((response) => response.data)
        .catch((err) => console.log(err))
}



export const getArticleById = (article_id) => {

    return axios
        .get(url + `/articles/${article_id}`)
        .then((response) => response.data)
        .catch((err) => console.log(err))

}



export const getCommentsByArticleId = (article_id) => {

    return axios
        .get(url + `/articles/${article_id}/comments`)
        .then((response) => response.data)
        .catch((err) => console.log(err))
}



export const updateArticleVotes = (article_id, voteChange) => {

    return axios
        .patch(url + `/articles/${article_id}`, { votes: voteChange })
        .then((response) => response.data)
        .catch((err) => console.log(err));
};



export const updateArticleComments = (article_id, newComment) => {

    return axios   
        .post(url + `/articles/${article_id}/comments`, newComment)
        .then((response) => response.data)
        .catch((err) => {
            console.log(err)
        })
}



export const deleteArticleComments = (comment_id) => {

    return axios   
        .delete(url + `/comments/${comment_id}`)
        .then((response) => {
            return response.data
        })
        .catch((err) => console.log(err))
}
const axios = require('axios');
const domain = 'https://ncnewsromy.herokuapp.com/api/'

export const getAllArticles = () => {
    return axios.get(`${domain}articles/`)
    .then(res => res.data.articleDocs)
}

export const getAllUsers = () => {
    return axios.get(`${domain}users/`)
    .then(res => res.data.userDocs)
}

export const getCommentsByArticleId = (articleId) => { 
    return axios.get(`${domain}articles/${articleId}/comments`)
    .then(res => res.data.commentDocs)
}

export const getArticlesByTopic = (topic) => {
    return axios.get(`${domain}topics/${topic}/articles`)
    .then(res => res.data.articleDocs.map(article => {
        return article.belongs_to.slug === topic;
    }))
}

export const getUserById = (userId) => {
    return axios.get(`${domain}users/${userId}`)
    .then(res => res.data.userDoc)
}

export const getArticleById = (articleId) => {
    return axios.get(`${domain}articles/${articleId}`)
    .then(res => res.data.article)
}

export const updateVote = (increment, objectType, objectId) => {
    return axios.put(`${domain}${objectType}/${objectId}?vote=${increment}`)
    .then(res => res.data)
}

export const getArticlesBySearchInput = (searchString) => {
    return axios.get(`${domain}articles/title?=${searchString}`)
    .then(res => res.data.articleDocs.map(article => {
        return article.title.includes(searchString);
    }))
}

export const getUsersBySearchInput = (searchString) => {
    return axios.get(`${domain}users/username?=${searchString}`)
    .then(res => res.data)
}

export const getCommentsByUserId = (userId) => {
    return axios.get(`${domain}users/${userId}/comments`)
    .then(res => res.data.commentDocs)
}

export const postCommentByUserToArticle = (newComment, articleId) => {
    return axios.post(`${domain}articles/${articleId}/comments`, newComment)
    .then(res => res.data.newComment)
}
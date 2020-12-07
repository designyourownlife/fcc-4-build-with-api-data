const axios = require("axios");
const countries = require("./countries.json")
const format = require('date-fns/format');
const deLocale = require('date-fns/locale/de');  
require('dotenv').config();

const formattedDate = publishDate => {
  const stPattysDay = new Date(publishDate);
  return format(stPattysDay, 'dd.MM.yyyy, hh:mm', { locale: deLocale });
}
console.log(formattedDate('2020-12-07T10:26:00Z'));
//exports.formattedDate = formattedDate;

async function getNews(country) {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWS_API_KEY}&pageSize=5`);
    
    return {
      "country": country, 
      "articles": response.data.articles
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = async function() {
  
  let newsPromises = countries.map(getNews);
  return Promise.all(newsPromises).then( newsObjects => {
    newsObjects.forEach(obj => {
       obj.articles.forEach((article, index) => {
         article.publishedAt = formattedDate(article.publishedAt);
         //console.log(article.publishedAt)
       });
    });
    //console.log('newsObjects: ', newsObjects);
    return [].concat.apply([], newsObjects)
  })

};

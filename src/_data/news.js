const axios = require("axios");
const countries = require("./countries.json")
const format = require('date-fns/format');
const deLocale = require('date-fns/locale/de');  
require('dotenv').config();

const formattedDate = publishDate => {
  const stPattysDay = new Date(publishDate);
  return format(stPattysDay, 'dd MMMM yyyy', { locale: deLocale });
}

exports.formattedDate = formattedDate;

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
    console.log('newsObjects: ', newsObjects);
    return [].concat.apply([], newsObjects)
  })

};

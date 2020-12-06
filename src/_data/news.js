const axios = require("axios");
const format = require('date-fns/format');
const deLocale = require('date-fns/locale/de');  
require('dotenv').config();

const formattedDate = publishDate => {
  const stPattysDay = new Date(publishDate);
  return format(stPattysDay, 'dd MMMM yyyy', { locale: deLocale });
}

exports.formattedDate = formattedDate;


module.exports = async function() {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.API_KEY}&pageSize=5`);
    return response.data;
  } catch (error) {
    console.error(error);
  }

};

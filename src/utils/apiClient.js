import axios from 'axios'

const queryFeed = 'https://api.nasa.gov/neo/rest/v1/feed?';
const APIKEY = 'SPboJP8XCDF9nlUzSqcqzh0Mq9sJuy6Hf27FuTFl';

const request = (basePath, start_date, end_date, apiKey) => {
  return `${basePath}start_date=${start_date}&end_date=${end_date}&api_key=${apiKey}`;
}  

const headers = {
  'Qover-Api-Version': '1.0',
  'Contet-Type': 'application/json'
}

const requestCreator = (path, apiKey, method='get') => (start, end) => {
  return axios({ method, url: request(path, start, end, apiKey) })
}

export const fetchData = requestCreator(queryFeed, APIKEY);
'use strict';

// import axios from 'axios';

// const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
const baseURL = 'https://pixabay.com/api/';
const key = '&key=12880088-5f1634c62e30865f461701c2f';
const params = '?image_type=photo&orientation=horizontal&per_page=12';

// axios.defaults.baseURL = baseURL + params + key;

export default {
  page: 1,
  query: '',
  fetchArticles() {
    const requestParams = `&q=${this.query}&page=${this.page}`;

    return fetch(baseURL + params + key + requestParams)
      .then(response => response.json())
      .then(parsedResponse => {
        this.incrementPage();

        return parsedResponse.hits;
      })
      .catch(error => {
        throw error;
      });

      
    // return axios
    //   .get(requestParams)
    //   .then(response => {
    //     this.incrementPage();

    //     return response.data.hits;
    //   })
    //   .catch(error => {
    //     throw error;
    //   });
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};

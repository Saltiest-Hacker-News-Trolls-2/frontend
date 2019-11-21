/*******************************************************************************
  REMOTE
*******************************************************************************/

///external modules ///
import axios from "axios";

/// internal modules ///
import check from '../utils/is-type';

/*//////////////////////////////////////
  utils
//////////////////////////////////////*/
const ifFunction = (message , fun , args) => {
  if (check.isFunction (fun)) {
    console.log (message);
    console.log (...args);
    fun (...args);
  }
}

const handleGoodResponse = (handleResponse , handleData , initData) => (response) => {
  console.log ("--- success? ---");
  /// handle response ///
  ifFunction (
    '...handling response...' ,
    handleResponse , [response]
  );
  /// handle data ///
  ifFunction (
    '...handling data...' ,
    handleData , [{ ...initData , ...(response.data) }]
  );
}

const handleErrorResponse = (handleError , handleData , initData) => (error) => {
  console.log ("--- failure? ---");
  /// handle error ///
  ifFunction (
    '...handling error...' ,
    handleError , [error]
  );
  /// handle data ///
  ifFunction (
    '...handling data...' ,
    handleData , [{ ...initData , 'error' : error }]
  );
}

/*--------------------------------------
  handleAxiosError
----------------------------------------
  based on: <https://github.com/axios/axios#handling-errors>
--------------------------------------*/
export const handleAxiosError = (error) => {
  let message = {};

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log ('The server did respond, but with an error:');
    console.log ('- data:' , error.response.data);
    console.log ('- status:' , error.response.status);
    console.log ('- headers:' , error.response.headers);

    message = error.response.data;
  }
  else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log ('The server did not respond:');
    console.log ('- request:' , error.request);

    message.errors = [
      'The server did not respond.',
    ];
  }
  else {
    // Something happened in setting up the request that triggered an Error
    console.log ('An runtime error occured:');
    console.log ('- Error:', error.message);

    message.errors = {
      'oops' : error.message,
    };
  }
  console.log ('- config:' , error.config);

  return (message);
}

/***************************************
  REMOTE
***************************************/

export const remote = {
  /*******************
    GET
  *******************/
  get : ({
    handleResponse , handleError , handleData , initData
  }) => (query , config) => {
    console.log ("--- getting remote data... ---");
    axios
      .get (
        query , config
      )
      .then (
        handleGoodResponse (handleResponse , handleData , initData)
      )
      .catch (
        handleErrorResponse (handleError , handleData , initData)
      )
      .finally (() => {
        console.log ("--- done. ---");
      })
  },

  /*******************
    POST
  *******************/
  post : ({
    handleResponse , handleError , handleData , initData
  }) => (query , data , config) => {
    console.log ("--- posting remote data... ---");
    axios
      .post (
        query , data , config
      )
      .then (
        handleGoodResponse (handleResponse , handleData , initData)
      )
      .catch (
        handleErrorResponse (handleError , handleData , initData)
      )
      .finally (() => {
        console.log ("--- done. ---");
      })
  },

  /*******************
    PUT
  *******************/
  put : ({
    handleResponse , handleError , handleData , initData
  }) => (query , data , config) => {
    console.log ("--- putting remote data... ---");
    axios
      .put (
        query , data , config
      )
      .then (
        handleGoodResponse (handleResponse , handleData , initData)
      )
      .catch (
        handleErrorResponse (handleError , handleData , initData)
      )
      .finally (() => {
        console.log ("--- done. ---");
      })
  },

  /*******************
    DELETE
  *******************/
  delete : ({
    handleResponse , handleError , handleData , initData
  }) => (query , config) => {
    console.log ("--- deleting remote data... ---");
    axios
      .delete (
        query , config
      )
      .then (
        handleGoodResponse (handleResponse , handleData , initData)
      )
      .catch (
        handleErrorResponse (handleError , handleData , initData)
      )
      .finally (() => {
        console.log ("--- done. ---");
      })
  },
};

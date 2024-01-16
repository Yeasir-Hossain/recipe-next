import axios from "axios";

/**
 * Asynchronous function for making HTTP requests using Axios.
 * 
 * @async
 * @function
 * @param {object} options - Options for the HTTP request.
 * @param {string} options.method - The HTTP method for the request (default is 'GET').
 * @param {string} options.uri - The URI or URL for the request.
 * @param {string} options.body - The request body data (default is '{}').
 * @param {object} options.rest - Additional options for the Axios request.
 * @returns {Promise} - A promise that resolves with the data from the HTTP response or logs an error.
 */
export default async function req({ method = 'GET', uri, body = '{}', withCredentials = true, ...rest }) {
  try {
    // Construct the complete URL for the request
    let url = uri.startsWith('https://') ? uri : `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000/api'}/${uri}`;

    // Configure the payload for the Axios request
    var payload = {
      method,
      withCredentials,
      url,
      data: body,
      ...rest
    };

    // Make the Axios request and return the data from the response
    const response = await axios(payload);
    return response.data;
  } catch (err) {
    // Log any errors that occur during the request
    console.log(err.message);
  }
};

import axios from 'axios';

export default async function Client(payload, method) {
  const config = {
    method: method || "POST", // Default to POST if no method is provided
    url: "http://127.0.0.1:8080/med_api",
    headers: {
      'Content-Type': 'application/json', // Only include necessary headers
    },
  };

  // Include the payload for POST or PUT requests
  if (method === 'POST' || method === 'PUT') {
    config.data = payload; // Axios uses 'data' for request body
  }

  try {
    console.log(config, "Client -- before");
    const response = await axios(config);
    console.log(response, "Client -- after");
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error in Client function:', error);

    // Log detailed error information
    if (error.response) {
      console.error('Server Response:', error.response.data);
    } else if (error.request) {
      console.error('No response received from server:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }

    throw error; // Re-throw the error for further handling
  }
}

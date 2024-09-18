'use strict';
const sendResponse = (response, message, data, status, count=0) => {
    return response.status(status).json({message,data,count});
}

const sendError = (response,message,status) => {
    return response.status(status).json({ message });
}

export { sendResponse, sendError }
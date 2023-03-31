/* eslint-disable no-param-reassign */
import { useState } from "react";

import axios, { AxiosInstance } from "axios";

// Const Base Url
const baseURL = `http://178.63.13.157:8090/mock-api/api`;

// Construct axios instance for general requests
const makeRequest = axios.create({
	baseURL, // Initialize with base url
	timeout: 1 * 60 * 1000, // Set timeout at 60s
});

/** Make an api request call */
const useApiRequest = (): AxiosInstance => {
	return makeRequest;
};

export default useApiRequest;

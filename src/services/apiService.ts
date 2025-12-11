// src/services/apiService.ts

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { IUserRecord } from './models/auth-model';

// ====================================================================
// 1. Configuration and Base Setup
// ====================================================================

const BASE_URL: string = '/api';
const SCHOOL_ID: string = '1';

// Function to safely retrieve the authentication token
const getAuthToken = (): string | null => {
    const token = localStorage.getItem('authToken');
    // Retrieve token from storage (e.g., localStorage)
    return token;
};

// ====================================================================
// 2. Data Interfaces (Type Definitions)
// ====================================================================

// Interface for the address data structure
export interface IAddress {
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

// Interface for the data needed to create a school
export interface ISchoolCreateData {
    name: string;
    schoolCode: string;
    description: string;
    affiliationNumber: string;
    principalName: string;
    establishedYear: number;
    schoolType: 'INTERNATIONAL' | 'NATIONAL' | string; // Use literals if known
    board: 'IB' | 'CBSE' | 'ICSE' | string; // Use literals if known
    ownershipType: 'PRIVATE' | 'GOVERNMENT' | string;
    address: IAddress;
}

// Interface for login payload
export interface ILoginPayload {
    username: string;
    password: string;
}

// Interface for registration payload
export interface IRegisterPayload extends ILoginPayload {
    email: string;
}

// Interface for a successful Login response (customize based on actual API response)
export interface ILoginResponse {
    token: string;
    // Add other user details if returned
    userId: string;
    // ...
}

// Interface for the standardized API response
// T is the type of the successful data payload
export interface IApiResponse<T = any> {
    success: boolean;
    data: T | null;
    error: string | null;
    statusCode?: number;
}


// ====================================================================
// 3. Axios Instance and Interceptor Setup
// ====================================================================

// Create a custom Axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-School-Id': SCHOOL_ID,

    },
});

// Add a Request Interceptor to attach the Authorization token
apiClient.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        const endpoint = config.url || '';

        // Attach the token ONLY if it exists and the endpoint is NOT an auth endpoint
        if (
            token &&
            !endpoint.includes('authentication') &&
            !endpoint.includes('registration')
        ) {
            // Assuming the backend expects the 'Bearer ' prefix
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ====================================================================
// 4. Response Handler Utility
// ====================================================================

/**
 * Standardizes the handling of an Axios response or error into a simple IApiResponse structure.
 * This function allows services to return a single, predictable object for both success and failure.
 * @param apiCall - The Promise returned by an Axios request (e.g., apiClient.get('/users')).
 * @returns A Promise that resolves to a standardized IApiResponse object.
 */
const handler = async <T>(
    apiCall: Promise<AxiosResponse<T>>
): Promise<IApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await apiCall;

        // Successful API call (2xx status)
        return {
            success: true,
            data: response.data,
            error: null,
            statusCode: response.status,
        };
    } catch (error) {
        const axiosError = error as AxiosError;

        let errorMessage: string = 'An unknown error occurred.';
        let statusCode: number | undefined = undefined;

        if (axios.isAxiosError(axiosError) && axiosError.response) {
            // Server responded with a status code outside the 2xx range
            statusCode = axiosError.response.status;

            // Try to extract a specific error message from the response body
            // Common backend structure: { message: "Error details" }
            const errorData: any = axiosError.response.data;
            errorMessage = errorData?.message || `Request failed with status ${statusCode}.`;

            if (statusCode === 401) {
                // Optional: Handle unauthorized access globally (e.g., logout user)
                // console.error("Unauthorized access. Token might be expired.");
            }

        } else if (axios.isAxiosError(axiosError) && axiosError.request) {
            // The request was made but no response was received (e.g., network error)
            errorMessage = 'Network Error: Could not reach the server.';
        } else {
            // Something else happened while setting up the request
            errorMessage = axiosError.message;
        }

        // Return a standardized failure object
        return {
            success: false,
            data: null,
            error: errorMessage,
            statusCode: statusCode,
        };
    }
};

// ====================================================================
// 5. Common HTTP Methods (Now using the handler)
// ====================================================================

/**
 * Common GET Request function
 */
export const get = <T>(
    endpoint: string,
    params: Record<string, any> = {}
): Promise<IApiResponse<T>> => {
    return handler(apiClient.get<T>(endpoint, { params }));
};

/**
 * Common POST Request function
 */
export const post = <T, D = any>(
    endpoint: string,
    data: D
): Promise<IApiResponse<T>> => {
    return handler(apiClient.post<T>(endpoint, data));
};

/**
 * Common PUT Request function
 */
export const put = <T, D = any>(
    endpoint: string,
    data: D
): Promise<IApiResponse<T>> => {
    return handler(apiClient.put<T>(endpoint, data));
};

/**
 * Common DELETE Request function
 */
export const del = <T>(
    endpoint: string
): Promise<IApiResponse<T>> => {
    return handler(apiClient.delete<T>(endpoint));
};

// ====================================================================
// 6. Specialized Service Functions (Now return IApiResponse)
// ====================================================================

/**
 * Handles the user login process.
 */
export const loginUser = (
    payload: ILoginPayload
): Promise<IApiResponse<ILoginResponse>> => {
    // Since 'post' now uses the handler, this function is simplified
    return post<ILoginResponse, ILoginPayload>(
        '/authentication/login',
        payload
    );
};

/**
 * Handles the employee registration process.
 */
export const registerEmployee = (
    payload: IRegisterPayload
): Promise<IApiResponse<IUserRecord>> => {
    // Assuming registration returns an IUserRecord or similar
    return post<IUserRecord, IRegisterPayload>( // Corrected T to IUserRecord
        '/registration/employee/register',
        payload
    );
};

/**
 * Handles the creation of a new school (requires Authorization).
 */
export const createSchool = (
    data: ISchoolCreateData
): Promise<IApiResponse<any>> => {
    // The interceptor automatically adds the token here.
    return post<any, ISchoolCreateData>('/schools', data);
};
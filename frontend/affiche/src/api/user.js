import { client } from './client';
import { ENTER_SITE_URL, SIGN_IN_URL, SIGN_UP_URL, ALL_DATES_URL, SET_MIN_DAY_URL } from '../constants/api-urls';

export async function allDates() {
    try {
        const response = await axiosInstance.get(ALL_DATES_URL);
        
    } catch (error) {
        console.log('Error:', error);
    }
}

export async function setMinDay() {
    try {
        const response = await axiosInstance.get(SET_MIN_DAY_URL);
        
    } catch (error) {
        console.log('Error:', error);
    }
}

export async function enterSite() {
    try {
        const response = await axiosInstance.post(ENTER_SITE_URL);
        console.log(response.data);
    } catch (error) {
        console.log('Error:', error);
    }
}

export async function signIn() {
    try {
        const response = await axiosInstance.post(SIGN_IN_URL);
        
    } catch (error) {
        console.log('Error:', error);
    }
}

export async function signUp() {
    try {
        const response = await axiosInstance.post(SIGN_UP_URL);
        
    } catch (error) {
        console.log('Error:', error);
    }
}
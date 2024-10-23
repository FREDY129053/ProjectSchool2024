import { client } from './client';
import { EVENTS_URL, EVENTS_THEMES_URL, EVENTS_FILTERED_URL, EVENTS_FAVORITES_URL } from '../constants/api-urls';

export async function rmFav(eventId, accessToken) {
    try {
        const response = await client.delete(EVENTS_FAVORITES_URL);

    } catch (error) {
        console.log('Error:', error);
    }
}

export async function getFavs(accessToken) {
    try {
        const response = await client.get(EVENTS_FAVORITES_URL);

    } catch (error) {
        console.log('Error:', error);
    }
}

export async function addFav(eventId, accessToken) {
    try {
        const response = await client.post(EVENTS_URL);

    } catch (error) {
        console.log('Error:', error);
    }
}

export async function getEventsById(eventId) {
    try {
        const response = await client.get(EVENTS_URL);

    } catch (error) {
        console.log('Error:', error);
    }
}

export async function getEventsByTheme(themeId) {
    try {
        const response = await client.get(EVENTS_URL);

    } catch (error) {
        console.log('Error:', error);
    }
}

export async function getThemes() {
    try {
        const response = await client.get(EVENTS_THEMES_URL)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getFilteredEvents(themeId, startDate, endDate, tags, age) {
    try {
        const response = await client.get(EVENTS_FILTERED_URL);

    } catch (error) {
        console.log('Error:', error);
    }
}

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
export const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL
export const PROXY_URL = `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_GITHUB_OAUTH_URL}/access_token`
export const github_url = (client_id, redirect_uri) => (`${process.env.REACT_APP_GITHUB_OAUTH_URL}/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`)
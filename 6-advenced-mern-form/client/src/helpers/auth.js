import cookie from "js-cookie";


/* This is a helper function use to setCookie, 
removeCookie and save user Data or token in the localStorage */

// Set Data in to cookie
export const setCookie = (key, value) => {
    if(window !== 'undefined') {
        cookie.set(key, value, {
            // 1 Day
            expires: 1
        })
    }
}

// Remove Data from cookie
export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        })
    }
}

// Get cookie from local storage (like the user token)
export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key)
    }
}

// Set Token or user Data in to localStorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

// Remove Token or Data from localStorage
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key)
    }
}

// Function is use to Authenticate a user after they are login
export const authenticate = (response, next) => {
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next()
}

// signout / logout user
export const signout = next => {
    removeCookie('token')
    removeLocalStorage('user')
    next()
}

// Get user info from localStorage
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token')
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}

// update user data in localStorage
export const updateUser = (response, next) => {
    if (window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = response.data
        localStorage.setItem('user', JSON.stringify(auth))
        next()
    }
}
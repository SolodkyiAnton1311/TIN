export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

export function isAuthenticated() {

    const user = getCurrentUser()
    if (user) {
        return true
    }
    return false
}
export function isAdmin() {

    const user = getCurrentUser()

    if (user) {
        return user.userId;
    }
    return 0;
}
export function userToken() {

    const user = getCurrentUser()
    if (user) {
        return user.token;
    }
    return 0;
}

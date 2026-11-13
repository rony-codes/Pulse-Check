export function getAuthHeaders(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}
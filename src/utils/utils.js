export function convertTime(dataMinutes) {
    const hours = Math.floor(dataMinutes / 60);
    const minutes = dataMinutes % 60;
    if (hours === 0) {
        return `${minutes}м`;
    } else if (minutes === 0) {
        return `${hours}ч`;
    } else {
        return `${hours}ч ${minutes}м`;
    }
}

export function addToLocalStorage(name, action) {
    localStorage.setItem(name, action);
}

export function removeFromLocalStorage(name) {
    localStorage.removeItem(name);
}

export function getFromLocalStorage(name) {
    return localStorage.getItem(name);
}

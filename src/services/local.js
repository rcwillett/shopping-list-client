export default new class {
    get(name) {
        return localStorage.getItem(name);
    }
    set(name, value) {
        return localStorage.setItem(name, value);
    }
}
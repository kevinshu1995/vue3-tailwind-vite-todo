export default () => {
    function set(key, value) {
        value = JSON.stringify(value);
        window.localStorage.setItem(key, value);
    }

    function get(key) {
        const value = window.localStorage.getItem(key);
        return value !== undefined ? JSON.parse(value) : undefined;
    }

    return {
        set,
        get,
    };
};

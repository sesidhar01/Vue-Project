const storageItem = localStorage.getItem('items');
const items = storageItem ? JSON.parse(storageItem) : [];
export default {
    get(id) {
        return new Promise((resolve) => {
            if (id) {
                const job = items.find(item => item.id === id);
                return resolve({ job });
            }
            return resolve({ jobs: items });
        });
    },
    insert(data) {
        return new Promise((resolve) => {
            const job = {
                id: new Date().getTime(),
                ...data
            };
            items.push(job);
            localStorage.setItem('items', JSON.stringify(items));
            return resolve({ job });
        });
    },
    update(id, data) {
        return new Promise((resolve) => {
            const index = items.findIndex(item => item.id === id);
            const job = {
                ...items[index],
                ...data
            };
            items[index] = job;
            localStorage.setItem('items', JSON.stringify(items));
            return resolve({ job });
        });
    },
    delete(id) {
        return new Promise((resolve) => {
            const index = items.findIndex(item => item.id === id);
            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
            return resolve({});
        });
    }
}
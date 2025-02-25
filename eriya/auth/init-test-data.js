async function initializeTestData() {
    const testUsers = [
        {
            email: 'h230393f@hit.ac.zw',
            fullName: 'Emmanuel L I Chinjekure',
            password: await hashPassword('userpass123'),
            role: 'student',
            createdAt: new Date().toISOString(),
            lastLogin: null
        },
        {
            email: 'isheanesu2004@gmail.com',
            fullName: 'Mr Sumbureru',
            password: await hashPassword('qwerty123'),
            role: 'lecturer',
            createdAt: new Date().toISOString(),
            lastLogin: null
        },
        {
            email: 'admin@hit.ac.zw',
            fullName: 'admin',
            password: await hashPassword('Admin123'),
            role: 'admin',
            createdAt: new Date().toISOString(),
            lastLogin: null
        }
    ];

    const transaction = db.transaction(['users'], 'readwrite');
    const userStore = transaction.objectStore('users');

    for (const user of testUsers) {
        await userStore.put(user);
    }

    console.log('Test users initialized successfully');
}

// Call this after IndexedDB is initialized
request.onsuccess = (event) => {
    db = event.target.result;
    initializeTestData();
};

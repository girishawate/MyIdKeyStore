import { openDatabase } from 'react-native-sqlite-storage';

import { Category, CategoryDetails, KeyValueHeader, KeyValueDetails } from './dbModals';

const sqldb = openDatabase({ name: 'miks.db', location: 'default' });

const initDB = () => {


}

/* const initializeDatabase = (): Promise<SQLiteDatabase | null> => {
    return new Promise((resolve, reject) => {
        if (db) {
            resolve(db);
        } else {
            SQLite.openDatabase({ name: 'miks.db', location: 'default' }, (database) => {
                db = database;
                db.transaction(
                    (tx) => {
                        // Example: Create the 'User' table
                        tx.executeSql(
                            'CREATE TABLE IF NOT EXISTS User (userId INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL)',
                            [],
                            () => {
                                resolve(db);
                            },
                            (_, error) => {
                                console.error('Error creating User table:', error);
                                reject(null);
                            }
                        );
                        // Create the 'Category' table
                        tx.executeSql(
                            'CREATE TABLE IF NOT EXISTS Category (CatId INTEGER PRIMARY KEY, CatCode TEXT, CatDesc TEXT, CatActive INTEGER)',
                            [],
                            () => {
                                resolve(db);
                            },
                            (_, error) => {
                                console.error('Error creating User table:', error);
                                reject(null);
                            }
                        );

                        // Create the 'CategoryDetails' table
                        tx.executeSql(
                            'CREATE TABLE IF NOT EXISTS CategoryDetails (CDId INTEGER PRIMARY KEY, CDCatCode TEXT, CDFieldLabel TEXT, CDFieldType TEXT, CDFieldActive INTEGER)',
                            [],
                            () => {
                                resolve(db);
                            },
                            (_, error) => {
                                console.error('Error creating User table:', error);
                                reject(null);
                            }
                        );

                        // Create the 'KeyValueHeader' table
                        tx.executeSql(
                            'CREATE TABLE IF NOT EXISTS KeyValueHeader (KVId INTEGER PRIMARY KEY, KVDocName TEXT, KVCatCode TEXT, KVCatDesc TEXT, KVSearchTags TEXT)',
                            [],
                            () => {
                                resolve(db);
                            },
                            (_, error) => {
                                console.error('Error creating User table:', error);
                                reject(null);
                            }
                        );

                        // Create the 'KeyValueDetails' table
                        tx.executeSql(
                            'CREATE TABLE IF NOT EXISTS KeyValueDetails (KVDId INTEGER PRIMARY KEY, KVDKVId INTEGER, KVDCatFieldName TEXT, KVDCatFieldType TEXT, KVDFieldValue TEXT)',
                            [],
                            () => {
                                resolve(db);
                            },
                            (_, error) => {
                                console.error('Error creating User table:', error);
                                reject(null);
                            }
                        );
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });
        }
    });
};
 */

const checkIfUserRegistered = async (): Promise<boolean> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return false;
        }

        const results = await db.executeSql('SELECT * FROM User LIMIT 1', []);

        return results[0]?.rows?.length > 0;
    } catch (error) {
        console.error('Error checking if User is registered:', error);
        return false;
    }
};

const registerUser = async (userId: number, username: string, password: string): Promise<boolean> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return false;
        }

        if (db) {
            await db.executeSql('INSERT INTO User (userId, username, password) VALUES (?, ?, ?)', [
                userId,
                username,
                password,
            ]);
            return true;
        } else {
            console.error('Database not initialized');
            return false;
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return false;
    }
};

const loginUser = async (username: string, password: string): Promise<boolean> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return false;
        }

        if (db) {
            const results = await db.executeSql(
                'SELECT * FROM User WHERE username = ? AND password = ?',
                [username, password]
            );

            return results[0].rows.length > 0;
        } else {
            console.error('Database not initialized');
            return false;
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return false;
    }
};

const insertCategory = async (category: Category): Promise<number | undefined> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return;
        }

        if (db) {
            const anyResult: any = await db.transaction(async (tx) => {
                const [, resultSet] = await tx.executeSql(
                    'INSERT INTO Category (CatCode, CatDesc, CatActive) VALUES (?, ?, ?)',
                    [category.CatCode, category.CatDesc, category.CatActive ? 1 : 0]
                );

                return resultSet.insertId;
            });
            return anyResult;
        } else {
            console.error('Database not initialized');
        }
    } catch (error) {
        console.error('Error inserting category:', error);
        return undefined;
    }
};

const updateCategory = async (category: Category): Promise<void> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return;
        }

        if (db) {
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    'UPDATE Category SET CatCode = ?, CatDesc = ?, CatActive = ? WHERE CatId = ?',
                    [category.CatCode, category.CatDesc, category.CatActive ? 1 : 0, category.CatId]
                );
            });
        } else {
            console.error('Database not initialized');
        }
    } catch (error) {
        console.error('Error updating category:', error);
    }
};

const deleteCategory = async (catId: number): Promise<void> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return;
        }

        if (db) {
            await db.transaction(async (tx) => {
                await tx.executeSql('DELETE FROM Category WHERE CatId = ?', [catId]);
            });
        } else {
            console.error('Database not initialized');
        }
    } catch (error) {
        console.error('Error deleting category:', error);
    }
};

const insertCategoryDetails = async (categoryDetails: CategoryDetails): Promise<number | undefined> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return;
        }

        if (db) {
            const anyResult: any = await db.transaction(async (tx) => {
                const [, resultSet] = await tx.executeSql(
                    'INSERT INTO CategoryDetails (CDCatCode, CDFieldLabel, CDFieldType, CDFieldActive) VALUES (?, ?, ?, ?)',
                    [categoryDetails.CDCatCode, categoryDetails.CDFieldLabel, categoryDetails.CDFieldType, categoryDetails.CDFieldActive ? 1 : 0]
                );

                return resultSet.insertId;
            });

            return anyResult;
        } else {
            console.error('Database not initialized');
        }
    } catch (error) {
        console.error('Error inserting category details:', error);
        return undefined;
    }
};

const updateCategoryDetails = async (categoryDetails: CategoryDetails): Promise<void> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return;
        }

        if (db) {
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    'UPDATE CategoryDetails SET CDCatCode = ?, CDFieldLabel = ?, CDFieldType = ?, CDFieldActive = ? WHERE CDId = ?',
                    [categoryDetails.CDCatCode, categoryDetails.CDFieldLabel, categoryDetails.CDFieldType, categoryDetails.CDFieldActive ? 1 : 0, categoryDetails.CDId]
                );
            });
        } else {
            console.error('Database not initialized');
        }
    } catch (error) {
        console.error('Error updating category details:', error);
    }
};

const deleteCategoryDetails = async (cdId: number): Promise<void> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return;
        }

        if (db) {
            await db.transaction(async (tx) => {
                await tx.executeSql('DELETE FROM CategoryDetails WHERE CDId = ?', [cdId]);
            });
        } else {
            console.error('Database not initialized');
        }
    } catch (error) {
        console.error('Error deleting category details:', error);
    }
};

const insertKeyValueHeader = async (keyValueHeader: KeyValueHeader): Promise<number | undefined> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return;
        }

        if (db) {
            const anyResult: any = await db.transaction(async (tx) => {
                const [, resultSet] = await tx.executeSql(
                    'INSERT INTO KeyValueHeader (KVDocName, KVCatCode, KVCatDesc, KVSearchTags) VALUES (?, ?, ?, ?)',
                    [
                        keyValueHeader.KVDocName,
                        keyValueHeader.KVCatCode,
                        keyValueHeader.KVCatDesc,
                        keyValueHeader.KVSearchTags,
                    ]
                );

                return resultSet.insertId;
            });

            return anyResult;
        } else {
            console.error('Database not initialized');
            return undefined;
        }
    } catch (error) {
        console.error('Error inserting key value header:', error);
        return undefined;
    }
};

const updateKeyValueHeader = async (keyValueHeader: KeyValueHeader): Promise<void> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return;
        }

        if (db) {
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    'UPDATE KeyValueHeader SET KVDocName = ?, KVCatCode = ?, KVCatDesc = ?, KVSearchTags = ? WHERE KVId = ?',
                    [
                        keyValueHeader.KVDocName,
                        keyValueHeader.KVCatCode,
                        keyValueHeader.KVCatDesc,
                        keyValueHeader.KVSearchTags,
                        keyValueHeader.KVId,
                    ]
                );
            });
        } else {
            console.error('Database not initialized');
        }
    } catch (error) {
        console.error('Error updating key value header:', error);
    }
};

const deleteKeyValueHeader = async (kvId: number): Promise<void> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return;
        }

        if (db) {
            await db.transaction(async (tx) => {
                await tx.executeSql('DELETE FROM KeyValueHeader WHERE KVId = ?', [kvId]);
            });
        } else {
            console.error('Database not initialized');
        }
    } catch (error) {
        console.error('Error deleting key value header:', error);
    }
};

const insertKeyValueDetails = async (keyValueDetails: KeyValueDetails): Promise<number | undefined> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return;
        }

        if (db) {
            const anyResult: any = await db.transaction(async (tx) => {
                const [, resultSet] = await tx.executeSql(
                    'INSERT INTO KeyValueDetails (KVDKVId, KVDCatFieldName, KVDCatFieldType, KVDFieldValue) VALUES (?, ?, ?, ?)',
                    [
                        keyValueDetails.KVDKVId,
                        keyValueDetails.KVDCatFieldName,
                        keyValueDetails.KVDCatFieldType,
                        keyValueDetails.KVDFieldValue,
                    ]
                );

                return resultSet.insertId;
            });

            return anyResult;
        } else {
            console.error('Database not initialized');
            return undefined;
        }
    } catch (error) {
        console.error('Error inserting key value details:', error);
        return undefined;
    }
};

const updateKeyValueDetails = async (keyValueDetails: KeyValueDetails): Promise<void> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return;
        }

        if (db) {
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    'UPDATE KeyValueDetails SET KVDKVId = ?, KVDCatFieldName = ?, KVDCatFieldType = ?, KVDFieldValue = ? WHERE KVDId = ?',
                    [
                        keyValueDetails.KVDKVId,
                        keyValueDetails.KVDCatFieldName,
                        keyValueDetails.KVDCatFieldType,
                        keyValueDetails.KVDFieldValue,
                        keyValueDetails.KVDId,
                    ]
                );
            });
        } else {
            console.error('Database not initialized');
        }
    } catch (error) {
        console.error('Error updating key value details:', error);
    }
};

const deleteKeyValueDetails = async (kvdId: number): Promise<void> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return;
        }

        if (db) {
            await db.transaction(async (tx) => {
                await tx.executeSql('DELETE FROM KeyValueDetails WHERE KVDId = ?', [kvdId]);
            });
        } else {
            console.error('Database not initialized');
        }
    } catch (error) {
        console.error('Error deleting key value details:', error);
    }
};

const searchKeyValues = async (searchTerm: string): Promise<KeyValueHeader[]> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return;
        }

        if (db) {
            const results = await db.executeSql(
                'SELECT * FROM KeyValue WHERE KVDocName LIKE ? OR KVSearchTags LIKE ?',
                [`%${searchTerm}%`, `%${searchTerm}%`]
            );

            const keyValues: KeyValueHeader[] = [];

            for (let i = 0; i < results[0].rows.length; i++) {
                const row = results[0].rows.item(i) as KeyValueHeader; // Ensure the correct type
                keyValues.push(row);
            }

            return keyValues;
        } else {
            console.error('Database not initialized');
            return [];
        }
    } catch (error) {
        console.error('Error searching KeyValues:', error);
        return [];
    }
};

const getKeyValueWithDetails = async (kvId: number): Promise<KeyValueHeader | null> => {
    try {
        // Ensure that the database is initialized
        const db = await initializeDatabase();
        if (!db) {
            console.error('Database not initialized');
            return null;
        }

        if (db) {
            const results = await db.executeSql(
                `SELECT KeyValueHeader.*, KeyValueDetails.*
                FROM KeyValueHeader
                LEFT JOIN KeyValueDetails ON KeyValueHeader.KVId = KeyValueDetails.KVDKVId
                WHERE KeyValueHeader.KVId = ?`,
                [kvId]
            );

            if (results[0].rows.length > 0) {
                const keyValue: KeyValueHeader = results[0].rows.item(0) as KeyValueHeader;
                const keyValueDetails: KeyValueDetails[] = [];

                for (let i = 0; i < results[0].rows.length; i++) {
                    const row = results[0].rows.item(i) as KeyValueDetails; // Ensure the correct type
                    keyValueDetails.push(row);
                }

                keyValue.details = keyValueDetails; // Assuming you have a property named 'details' on KeyValue to store KeyValueDetails

                return keyValue;
            } else {
                return null; // No record found
            }
        } else {
            console.error('Database not initialized');
            return null;
        }
    } catch (error) {
        console.error('Error fetching KeyValue with details:', error);
        return null;
    }
};

export {
    sqldb,
    initDB,

    //    initializeDatabase,
    checkIfUserRegistered,
    registerUser,
    loginUser,
    insertCategory,
    updateCategory,
    deleteCategory,
    insertCategoryDetails,
    updateCategoryDetails,
    deleteCategoryDetails,
    insertKeyValueHeader,
    updateKeyValueHeader,
    deleteKeyValueHeader,
    insertKeyValueDetails,
    updateKeyValueDetails,
    deleteKeyValueDetails,
    searchKeyValues,
    getKeyValueWithDetails,
};
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../config/firebase'; // Import Firebase configuration
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
} from 'firebase/firestore';
import './ShoppingList.css';

const ShoppingList = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [editMode, setEditMode] = useState(null);
    const [editText, setEditText] = useState('');

    const shoppingListCollection = collection(db, 'ShoppingList');

    // Fetch shopping list items from Firestore
    const fetchItems = useCallback(async () => {
        try {
            const snapshot = await getDocs(shoppingListCollection);
            const fetchedItems = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setItems(fetchedItems);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }, [shoppingListCollection]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleAddItem = async () => {
        if (!newItem.trim()) return;
        try {
            await addDoc(shoppingListCollection, { name: newItem });
            setNewItem('');
            fetchItems();
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            const docRef = doc(db, 'ShoppingList', id);
            await deleteDoc(docRef);
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEditItem = (id, currentName) => {
        setEditMode(id);
        setEditText(currentName);
    };

    const handleUpdateItem = async (id) => {
        if (!editText.trim()) return;
        try {
            const docRef = doc(db, 'ShoppingList', id);
            await updateDoc(docRef, { name: editText });
            setEditMode(null);
            setEditText('');
            fetchItems();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className="shopping-list-container">
            <h1>Shopping List</h1>
            <div className="add-item">
                <input
                    type="text"
                    placeholder="Add a new item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <button onClick={handleAddItem} className="add">Add</button>
            </div>
            <ul className="shopping-list">
                {items.map((item) => (
                    <li key={item.id} className="shopping-item">
                        {editMode === item.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button
                                    className="edit"
                                    onClick={() => handleUpdateItem(item.id)}
                                >
                                    Save
                                </button>
                                <button
                                    className="cancel"
                                    onClick={() => {
                                        setEditMode(null);
                                        setEditText('');
                                    }}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <span>{item.name}</span>
                                <button
                                    className="edit"
                                    onClick={() => handleEditItem(item.id, item.name)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete"
                                    onClick={() => handleDeleteItem(item.id)}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingList;
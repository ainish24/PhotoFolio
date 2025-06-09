import { db } from '../config/FireBase.js';
import { collection, getDocs, addDoc } from "firebase/firestore";
export const componentMounting = async (setAlbums, setLoading) => {
    try {
        const albumRef = collection(db, "Album")
        const fetchedData = await getDocs(albumRef);
        const albumData = fetchedData.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        albumData.push("")
        setAlbums(albumData);
        setLoading(false);
        notifyFetch();
    } catch (error) {
        console.error("Error mounting component:", error);
    }
}

export const createNewAlbum = async (newAlbum, setAlbums, setLoading) =>{
    try {
        const albumRef = collection(db, "Album");
        await addDoc(albumRef, {
            name: newAlbum
        })
        componentMounting(setAlbums, setLoading);
    } catch (error) {
        console.error("Error creating new album:", error);
        
    }
}

import { toast, Slide } from 'react-toastify';
export const notifyFetch = () => toast("Albums fetched successfully!", {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
    transition: Slide,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
})
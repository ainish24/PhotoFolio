import { db } from '../config/FireBase.js';
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
export const componentMounting = async (setAlbums, setLoading, ifNOtify=true) => {
    try {
        const albumRef = collection(db, "Album")
        const fetchedData = await getDocs(albumRef);
        const albumData = fetchedData.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        albumData.push("")
        setAlbums(albumData);
        if(ifNOtify)
            notifyFetch();
        setLoading(false);
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
        notifyCreate()
        componentMounting(setAlbums, setLoading, false);
    } catch (error) {
        console.error("Error creating new album:", error);
        
    }
}

export const deleteAlbum= async(albumId, setAlbums, setLoading, e)=>{
    e.stopPropagation();
    try {
        const albumRef= doc(db, "Album", albumId);
        await deleteDoc(albumRef)
        notifyDelete()
        componentMounting(setAlbums, setLoading, false);
    } catch (error) {
        console.error("Error deleting album:", error);
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
export const notifyCreate = () => toast("Album Created successfully!", {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
    transition: Slide,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
})
export const notifyDelete = () => toast("Album Deleted successfully!", {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
    transition: Slide,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
})


import { db } from '../config/FireBase.js';
import { collection, getDocs, getDoc, addDoc, deleteDoc, doc, query, where } from "firebase/firestore";
export const componentMounting = async (setAlbums, setLoading, ifNOtify = true) => {
    try {
        const albumRef = collection(db, "Album")
        const fetchedData = await getDocs(albumRef);
        const albumData = fetchedData.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        albumData.push("")
        setAlbums(albumData);
        if (ifNOtify)
            notifyFetch();
        setLoading(false);
    } catch (error) {
        console.error("Error mounting component:", error);
    }
}

export const createNewAlbum = async (newAlbum, setAlbums, setLoading) => {
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

export const deleteAlbum = async (albumId, setAlbums, setLoading, e) => {
    e.stopPropagation();
    try {
        const albumRef = doc(db, "Album", albumId);
        await deleteDoc(albumRef)
        notifyDelete()
        componentMounting(setAlbums, setLoading, false);
    } catch (error) {
        console.error("Error deleting album:", error);
    }
}


export const showPhoto = async (showPhotoFunctionParams, showAlert = true) => {
    const {
        albumId,
        setPhotoArray,
        setLoading,
        setShowAlbumList,
        setAlbumData,
        setShowModal,
        setShowImagesList
    } = showPhotoFunctionParams;
    try {
        setShowAlbumList(false);
        setLoading(true);
        const albumRef = doc(db, "Album", albumId)
        const albumSnapshot = await getDoc(albumRef)
        const albumName = albumSnapshot.data().name;
        setAlbumData({
            id: albumId,
            name: albumName
        });
        const photoQuery = query(collection(db, "Photos"), where("albumRef", "==", albumRef));
        const snapshot = await getDocs(photoQuery)
        const photos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        setPhotoArray(photos);
        console.log(photos);
        setLoading(false);
        if (photos.length !== 0) {
            setShowModal(true);
            if (showAlert)
                notifyFetchPhoto(albumName)
        } else {
            toast.error("No photos found in this album!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                transition: Slide,
                pauseOnHover: true,
                closeOnClick: true,
                draggable: true,
            });
            setShowModal(false);
        }
        setShowImagesList(true);
    } catch (error) {
        console.error("Error showing photos:", error);
    }
}

export const addNewPhoto = async (imageName, imageUrl, albumData, showPhotoFunctionParams) => {
    try {
        const albumId = albumData.id;
        const albumRef = doc(db, "Album", albumId);
        const photoRef = collection(db, "Photos");
        const photoData = {
            name: imageName,
            imageURL: imageUrl,
            albumRef: albumRef
        }
        await addDoc(photoRef, photoData);
        notifyAddPhoto();
        showPhoto(showPhotoFunctionParams, false); // Refresh the photos after adding a new one
    } catch (error) {
        console.error("Error adding new photos:", error);
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
export const notifyFetchPhoto = (albumName) => toast(`${albumName}'s Photos Fetched successfully!`, {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
    transition: Slide,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
})

export const notifyAddPhoto = () => {
    toast.success("Photo added successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Slide,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
    });
}

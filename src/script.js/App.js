import { db } from '../config/FireBase.js';
import { collection, getDocs, getDoc, addDoc, deleteDoc, updateDoc, doc, query, where } from "firebase/firestore";

export const componentMounting = async (setAlbums, setLoading, ifNOtify = true) => {
    try {
        const albumRef = collection(db, "Album")
        const fetchedData = await getDocs(albumRef);
        const albumData = fetchedData.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        albumData.push("")
        setAlbums(albumData);
        if (ifNOtify)
            notifyMessage("Albums fetched successfully!", false);
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
        notifyMessage("Album Created successfully!", false)
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
        notifyMessage("Album Deleted successfully!", false)
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
                notifyMessage(`${albumName}'s Photos Fetched successfully!`, false);
        } else {
            if (showAlert)
                notifyError("No photos found in this album!", false);
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
        notifySuccess("Photo added successfully!", false);
        showPhoto(showPhotoFunctionParams, false); // Refresh the photos after adding a new one
    } catch (error) {
        console.error("Error adding new photos:", error);
    }
}

export const deletePhoto = async (photo, showPhotoFunctionParams) => {
    try {
        const photoRef = doc(db, "Photos", photo.id);
        await deleteDoc(photoRef);
        notifyError("Photo deleted successfully!", false);
        showPhoto(showPhotoFunctionParams, false); // Refresh the photos after deletion
    } catch (error) {
        console.error("Error deleting photo:", error);

    }
}

export const editPhoto = async (setImageName, setImageUrl, setCurrentImage, setEditMode, currentImage, imageName, imageUrl, showPhotoFunctionParams) => {
    try {
        const photoRef = doc(db, "Photos", currentImage.id);
        const updatedData = {
            name: imageName,
            imageURL: imageUrl
        }
        await updateDoc(photoRef, updatedData);
        showPhoto(showPhotoFunctionParams, false);
        notifySuccess("Photo edited successfully!", false);

        // Reset the form fields and states after editing
        setEditMode(false);
        setCurrentImage({});
        setImageName("");
        setImageUrl("");
        console.log("Editing photo...");

    } catch (error) {
        console.error("Error editing photo:", error);
    }
}

//On submitting, set the editMode to false, and also clear the data populated in the currentImage state

export const showEditPhotoForm = async (setShowImageForm, setEditMode) => {
    try {
        setEditMode(true);
        setShowImageForm(true);
    } catch (error) {
        console.error("Error editing photo:", error);

    }
}

import { toast, Slide } from 'react-toastify';

export const notifyMessage = (message, toastLock = true) => {
    if (toastLock) {
        return;
    }
    toast(message, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Slide,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
    })
}

export const notifySuccess = (message, toastLock = true) => {
    if (toastLock) {
        return;
    }
    toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Slide,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
    });
}

export const notifyError = (message, toastLock = true) => {
    if (toastLock) {
        return;
    }
    toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Slide,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
    });
}
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useAssetsLoadedState = (ref) => {
    const [imagesLoadedState, setImagesLoadedState] = useState(false);
    const [webFontsReady, setWebFontsReady] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        document.fonts.ready
            .then(() => {
                setWebFontsReady(true);
            })
            .catch((e) => {
                console.log(e, 'fonts not loaded');
            });
    }, []);

    useEffect(() => {
        const updateStatus = (images) => {
            setImagesLoadedState(images.map((image) => image.complete).every((item) => item));
        };
        if (!ref) return;
        const images = Array.from(ref.querySelectorAll('img'));

        if (!images || !images.length) {
            setImagesLoadedState(true);
            return;
        }

        const notLoadedImages = images.filter((item) => !item.complete);

        if (notLoadedImages && notLoadedImages.length) {
            notLoadedImages.forEach((image) => {
                image.addEventListener('load', () => updateStatus(images), {
                    once: true,
                });
                image.addEventListener('error', () => updateStatus(images), {
                    once: true,
                });
            });
        } else {
            setImagesLoadedState(true);
        }
    }, [ref, pathname]);

    return {
        assetsIsLoaded: imagesLoadedState && webFontsReady,
    };
};

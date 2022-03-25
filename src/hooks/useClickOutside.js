import { useState, useRef, useEffect } from 'react';

export const useClickOutside = () => {
    const ref = useRef(null);
    const [state, setState] = useState({
        hasClickedOutside: false,
    });

    function handleEvent(e) {
        if (ref && ref.current) {
            if (typeof ref.current.contains === 'function' && ref.current.contains(e.target)) {
                setState({ hasClickedOutside: false });
            } else {
                setState({ hasClickedOutside: true });
            }
        }
    }

    useEffect(() => {
        if (window.PointerEvent) {
            document.addEventListener('pointerdown', handleEvent);
        } else {
            document.addEventListener('mousedown', handleEvent);
            document.addEventListener('touchstart', handleEvent);
        }

        return () => {
            if (window.PointerEvent) {
                document.addEventListener('pointerdown', handleEvent);
            } else {
                document.removeEventListener('mousedown', handleEvent);
                document.removeEventListener('touchstart', handleEvent);
            }
        };
    }, []);

    return [ref, state.hasClickedOutside];
};

export default useClickOutside;

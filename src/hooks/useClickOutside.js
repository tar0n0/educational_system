import { useState, useRef, useEffect, useMemo } from 'react';

export const useClickOutside = () => {
    const ref = useRef();
    const [state, setState] = useState({
        target: null,
        hasClickedOutside: false,
    });

    function handleEvent(e) {
        const { target } = e;
        setState({ hasClickedOutside: false, target });
        if (ref && ref.current) {
            setState({ hasClickedOutside: !ref.current.contains(target), target });
        }
    }

    const currentEvent = useMemo(() => {
        if (window.MouseEvent) return 'mousedown';
        if (window.PointerEvent) return 'pointerdown';
        if (window.TouchEvent) return 'touchstart';
    }, []);

    useEffect(() => {
        document.addEventListener(currentEvent, handleEvent);
        return () => {
            document.removeEventListener(currentEvent, handleEvent);
        };
    }, [currentEvent]);

    return [ref, state.hasClickedOutside, state.target];
};

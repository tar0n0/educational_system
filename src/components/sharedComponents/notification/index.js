import React, { useEffect } from 'react';
import { Button } from '@bet-core/ui';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';
import { notificationConfig } from '../../constants/ui.constants';

import './notification.scss';


const Notification = props => {
    const {
        data: {
            id,
            show,
            title,
            onApply,
            message,
            applyText,
            closeText = 'Cancel',
            timeout,
            mode = notificationConfig.mode[0],
            type = notificationConfig.type[0],
        },
        onClose,
        onMessageHide,
    } = props;

    const [ref, hasClickedOutside] = useClickOutside();

    useEffect(() => {
        if (mode === 'persistent' && hasClickedOutside) {
            onMessageHide(id, 0);
        }
    }, [hasClickedOutside]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const handleClose = () => onMessageHide(id, 0);
        const element = ref.current;

        element && element.addEventListener('wheel', handleClose);
        return () => element && element.removeEventListener('wheel', handleClose);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (mode === 'persistent' && show) return;
        show ? onMessageHide(id, timeout) : onClose(id);
    }, [show, mode]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <li className={classnames({ show })} key={id} ref={ref}>
            <div className={`notification-holder t-${type}`}>
                <ul>
                    <li>
                        <h2>{title || type}</h2>
                        {message && (
                            <p>{message}</p>
                        )}
                    </li>
                    {mode === 'default' && (
                        <li>
                            <Button
                                onClick={() => onMessageHide(id, 0)}
                                appearance="minimal"
                                color="default"
                                icon="icon-clear"
                            />
                        </li>
                    )}
                </ul>
                {onApply && typeof onApply === 'function' && (
                    <div className="notification-actions">
                        <Button
                            appearance="minimal"
                            color="default"
                            onClick={() => onMessageHide(id, 0)}
                            flexibility="default"
                            size="medium"
                            title="Close"
                        >
                            {closeText}
                        </Button>
                        <Button
                            onClick={() => {
                                onApply();
                                onMessageHide(id, 0);
                            }}
                            flexibility="default"
                            size="medium"
                            title={applyText}
                        >
                            {applyText}
                        </Button>
                    </div>
                )}
            </div>
        </li>
    );
};

Notification.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        message: PropTypes.string,
        type: PropTypes.oneOf(notificationConfig.type),
        mode: PropTypes.oneOf(notificationConfig.mode),
        onApply: PropTypes.func,
        onClose: PropTypes.func,
        applyText: PropTypes.string,
        timeout: PropTypes.number
    }),
    onMessageHide: PropTypes.func
};

export default Notification;

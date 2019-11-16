import React, { useEffect  } from 'react'
import { useInView } from 'react-intersection-observer'
import clsx from 'clsx'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'


function NotificationListItem({ classes, listRef, notification, index, onRead }) {

    const [ ref, inView ]= useInView({
        root: listRef.current,
        threshold: 0.9,
        triggerOnce: true,
    })

    useEffect(() => {
        if (inView) {
            onRead(notification, index)
        }
    }, [inView])

    return (
        <ListItem
            ref={ref}
            className={clsx(classes.item, (inView || notification.read) && classes.item_read)}
        >

            <ListItemAvatar>
                <Avatar>
                    A
                </Avatar>
            </ListItemAvatar>

            <ListItemText
                primary={notification.name}
                secondary={notification.description}
            />

        </ListItem>
    )
}

export default NotificationListItem

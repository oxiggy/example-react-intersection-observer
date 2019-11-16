import React, { useRef, useState } from 'react'
import { withStyles, fade } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import NotificationListItem from './NotificationListItem'

function NotificationList({ classes, notifications, onRead }) {
    const ref= useRef(null)
    return (
        <List
            ref={ref}
            className={classes.root}
        >
            {notifications.map((notification, i) => (
                <NotificationListItem
                    key={notification.id}
                    classes={classes}
                    listRef={ref}
                    notification={notification}
                    index={i}
                    onRead={onRead}
                >
                    notif
                </NotificationListItem>
            ))}
        </List>
    )
}

const styles= (theme) => ({
    root: {
        flexGrow: 1,
        overflowY: 'auto',
        padding: 0,
    },
    item: {
        backgroundColor: fade(theme.palette.primary.light, 0.23),
    },
    item_read: {
        backgroundColor: theme.palette.background.paper,
    },
})

export default withStyles(styles)(
    NotificationList
)
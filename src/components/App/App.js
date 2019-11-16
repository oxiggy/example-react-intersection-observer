import React, { useRef, useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AddAlertIcon from '@material-ui/icons/AddAlert'
import Popover from '@material-ui/core/Popover'
import Fab from '@material-ui/core/Fab'
import Badge from '@material-ui/core/Badge'
import NotificationList from '../Notifications/NotificationList'
import { createNotification } from '../../services/NotificationsService'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'

function App({ classes }) {
    const ref= useRef(null)
    const [ notificationsOpen, setNotificationsOpen ]= useState(false)
    const [ notifications, setNotifications ]= useState([])
    const [ unreadNotificationsCount, setUnreadNotificationsCount ]= useState(0)
    useEffect(() => {
        let count= 0
        notifications.forEach((notification) => {
            if (!notification.read) {
                count++
            }
        })
        setUnreadNotificationsCount(count)
    }, [notifications])
    return (
        <div>
            <AppBar className={classes.header}>
                <Container maxWidth={false}>
                    <Toolbar disableGutters>
                        <Typography className={classes.heading} variant="h6">Intersection Observer API</Typography>
                        <IconButton
                            ref={ref}
                            color="inherit"
                            edge="end"
                            onClick={() => {
                                setNotificationsOpen(!notificationsOpen)
                            }}
                        >
                            <Badge color="secondary" badgeContent={unreadNotificationsCount}>
                                {unreadNotificationsCount > 0 ? (
                                    <NotificationsIcon />
                                ) : (
                                    <NotificationsOutlinedIcon/>
                                )}
                            </Badge>
                        </IconButton>
                        <Popover
                            classes={{
                                paper: classes.notificationsPaper,
                            }}
                            anchorEl={ref.current}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            marginThreshold={8}
                            keepMounted={false}
                            open={notificationsOpen}
                            onClose={() => {
                                setNotificationsOpen(false)
                            }}
                        >
                            <div className={classes.notificationsHeading}><Typography variant="h6">Notifications</Typography></div>
                            <NotificationList
                                notifications={notifications}
                                onRead={(notification, i) => {
                                    const newNotifications= [...notifications]
                                    newNotifications[i]= {
                                        ...newNotifications[i],
                                        read: true,
                                    }
                                    setNotifications(newNotifications)
                                    //setUnreadNotificationsCount(unreadNotificationsCount - 1)
                                }}
                            />
                        </Popover>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container className={classes.content} maxWidth={false}>
                <Typography variant="h4" paragraph>
                    Пример использования
                </Typography>
                <Typography variant="body1" paragraph>
                    Intersection Observer API позволяет веб-приложениям асинхронно следить за изменением пересечения элемента с его родителем или областью видимости документа.
                </Typography>
                <Typography variant="body1" paragraph>
                    Исторически обнаружение видимости отдельного элемента или видимости двух элементов по отношению друг к другу было непростой задачей. Варианты решения этой задачи были ненадежными и замедляли работу браузера. К несчастью, по мере того как веб «взрослел», потребность в решении этой проблемы только росла.
                </Typography>
                <Typography variant="body1" paragraph>
                    В прошлом реализация обнаружения пересечения элементов подразумевала использование обработчиков событий и циклов, вызывающих методы типа Element.getBoundingClientRect(), чтобы собрать необходимую информацию о каждом затронутом элементе. Поскольку весь этот код работает в основном потоке, возникают проблемы с производительностью.
                </Typography>
                <Typography variant="body1" paragraph>
                    Intersection Observer API даёт возможность зарегистрировать callback-функцию, которая выполнится при пересечении наблюдаемым элементом границ другого элемента (или области видимости документа viewport), либо при изменении величины пересечения на опредённое значение. Таким образом, больше нет необходимости вычислять пересечение элементов в основном потоке, и браузер может оптимизировать эти процессы на своё усмотрение.
                </Typography>
                <Typography variant="body1" paragraph>
                    Observer API не позволит узнать точное число пикселей или определить конкретные пиксели в пересечении; однако, его использование покрывает наиболее частые сценарии вроде «Если элементы пересекаются на N%, сделай то-то».
                </Typography>
                <Link variant="body1" paragraph href="https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API">
                    Intersection Observer API...
                </Link>
            </Container>
            <Fab
                className={classes.fab}
                color="primary"
                onClick={() => {
                    setNotifications([
                        createNotification(),
                        ...notifications,
                    ])
                }}
            >
                <AddAlertIcon/>
            </Fab>
        </div>
    )
}

const styles= (theme) => ({
    header: {

    },
    content: {
        paddingTop: 56 + 16,
        paddingBottom: 16,
        '@media (min-width: 0px) and (orientation: landscape)': {
            paddingTop: 48 + 16,
        },
        '@media (min-width: 600px)': {
            paddingTop: 64 + 16,
        },
    },
    heading: {
        flexGrow: 1,
    },
    notificationsPaper: {
        width: 420,
        maxHeight: '73vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    notificationsHeading: {
        flexShrink: 0,
        padding: theme.spacing(1, 2)
    },
    notificationsContent: {
        flexGrow: 1,
        overflowY: 'auto',
    },
    fab: {
        position: 'fixed',
        bottom: 32,
        right: 32,
    }
})

export default withStyles(styles)(
    App
)

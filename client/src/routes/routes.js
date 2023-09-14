import ViewEmail from '../components/ViewEmail';
import Main from '../pages/Main';
import Emails from '../components/Emails';

const routes = {
    main: {
        path: '/',
        element: Main
    },
    emails: {
        path:'/emails',
        element: Emails
    },
    view:{
        path: '/view',
        element: ViewEmail
    },
    invalid: {
        path: '/*',
        element: Emails
    }
}

export { routes };
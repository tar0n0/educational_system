import Login from '../components/auth/login';
import UserForm from '../components/auth/pieces/formsForUserTypes/userForm';
import UserPage from '../components/pages/rolePages/user';
import CompanyPage from '../components/pages/rolePages/company';
import UniversityPage from '../components/pages/rolePages/university';
import SignUp from '../components/auth/signUp';
import About from '../components/pages/about';
import Companies from '../components/pages/companies';
import Contact from '../components/pages/contacts';
import Home from '../components/pages/home';
import Universities from '../components/pages/universities';

export const routesConfig = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/universities',
        element: <Universities />,
    },
    {
        path: '/companies',
        element: <Companies />,
    },
    {
        path: 'contacts',
        element: <Contact/>,
    },
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/sign-up/user',
        element: <UserForm />
    },
    {
        path: '/sign-up/university',
        element: <UserForm />
    },
    {
        path: '/sign-up/company',
        element: <UserForm />
    },
    {
        path: '/user-page',
        element: < UserPage/>
    },
    {
        path: '/company-page',
        element: <CompanyPage/>
    },
    {
        path: '/university-page',
        element: <UniversityPage/>,
    }
];

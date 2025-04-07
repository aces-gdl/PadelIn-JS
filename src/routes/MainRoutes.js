/* eslint-disable  no-unused-vars */

import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing

// utilities routing

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Ranking = Loadable(lazy(() => import('views/ranking')));
const Tournaments = Loadable(lazy(() => import('views/tournament')));
const Membership = Loadable(lazy(() => import('views/membership')));
const AccountInfoPage = Loadable(lazy(() => import('views/account/AccountInfoPage')));
const Results = Loadable(lazy(() => import('views/results')));



// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'sample-page',
            element: <SamplePage />
        },

        {
            path: 'views/ranking',
            element: <Ranking />
        },
        {
            path: 'views/tournament',
            element: <Tournaments />
        },

        {
            path: 'views/membership',
            element: <Membership />
        }, 
        {
            path: 'views/results',
            element: <Results />
        },
        {
            path: '/views/account-info',
            element: <AccountInfoPage />
        },

    ]
};

export default MainRoutes;

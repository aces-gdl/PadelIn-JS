import { IconChartBar, IconReceipt, IconTournament, IconPresentationAnalytics } from '@tabler/icons';

const icons = { IconReceipt, IconChartBar, IconTournament, IconPresentationAnalytics };

// ==============================|| MENU Adminstracion ||============================== //

const PlayersMenu = {
    id: 'Menu',
    title: 'Menú',
    type: 'group',
    children: [
        {
            id: 'Torneos',
            title: 'Torneos',
            type: 'item',
            url: 'views/tournament',
            icon: icons.IconTournament,
            breadcrums: true
        },
        {
            id: 'Membresia',
            title: 'Membresia',
            type: 'item',
            url: 'views/membership',
            icon: icons.IconReceipt,
            breadcrums: true
        },
        {
            id: 'Ranking',
            title: 'Ranking',
            type: 'item',
            url: 'views/ranking',
            icon: icons.IconChartBar,
            breadcrums: true
        },
        {
            id: 'Resultados',
            title: 'Resultados',
            type: 'item',
            url: 'views/results',
            icon: icons.IconPresentationAnalytics,
            breadcrums: true
        },
    ]
};



export { PlayersMenu };

export const administradorClubMenu = [
    {
        title: 'Dashboard',
        subItems: [
            { title: 'Vista general de la club', path: '/dashboard/club/' },
            { title: 'Estadísticas de la club', path: '/dashboard/club/estadisticas' }
        ]
    },
    {
        title: 'Usuarios',
        subItems: [
            { title: 'Ver usuarios', path: '/dashboard/club/usuarios/' },
            { title: 'Crear usuario', path: '/dashboard/club/usuarios/crear' },
        ]
    },
    {
        title: 'Cadetes',
        subItems: [
            { title: 'Listado de cadetes', path: '/dashboard/club/cadetes' },
            { title: 'Registrar nuevo cadete', path: '/dashboard/club/cadetes/registrar' },
            // { title: 'Asistencia', path: '/dashboard/club/cadetes/asistencia' },
            // { title: 'Calificaciones', path: '/dashboard/club/cadetes/calificaciones' }
        ]
    },
    // {
    //     title: 'Entrenadores',
    //     subItems: [
    //         { title: 'Registrar nuevo entrenador', path: '/dashboard/club/entrenadores/registrar' },
    //         { title: 'Listado de entrenadores', path: '/dashboard/club/entrenadores/listado' }
    //     ]
    // },
    // {
    //     title: 'Actividades y Eventos',
    //     subItems: [
    //         { title: 'Programar nuevo evento', path: '/dashboard/club/actividades/nuevo-evento' },
    //         { title: 'Calendario de actividades', path: '/dashboard/club/actividades/calendario' }
    //     ]
    // },
    // {
    //     title: 'Configuración',
    //     subItems: [
    //         { title: 'Ajustes de la club', path: '/dashboard/club/configuracion/ajustes' },
    //         { title: 'Perfil', path: '/dashboard/club/configuracion/perfil' }
    //     ]
    // }
];
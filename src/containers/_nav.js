export default [{
    _name: 'CSidebarNav',
    _children: [{
        _name: 'CSidebarNavItem',
        name: 'Thống kê',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
            color: 'primary',
            text: 'NEW'
        }
    },
    {
        _name: 'CSidebarNavItem',
        name: 'Quản lý nhóm',
        to: '/admin/quanlysanphamlist',
        icon: 'cil-cursor',
        badge: {
            color: 'primary',
            shape: 'pill'
        }

    },
    {
        _name: 'CSidebarNavItem',
        name: 'Quản lý tài khoản',
        to: '/account/quanlyaccount',
        icon: 'cil-people',
        badge: {
            color: 'primary',
            shape: 'pill'
        }
    },
    {
        _name: 'CSidebarNavItem',
        name: 'Quản lý sự kiện',
        to: '/blog',
        icon: 'cil-star',
        badge: {
            color: 'primary',
            shape: 'pill'
        }
    }
    ]
}]
export const adminMenu = [
    // { //Manage user
    //     name: 'menu.system.user', menus: [
    //         {
    //             name: 'menu.system.user',
    //             subMenus: [
    //                 { name: 'menu.system.manage-user.inside', link: '/system/user-inside' },
    //                 { name: 'menu.system.manage-user.outside', link: '/system/user-outside' },
    //             ]
    //         },
    //     ],
    // },
    // { //Manage Article
    //     name: 'menu.system.article', menus: [
    //         {
    //             name: 'menu.system.article',
    //             subMenus: [
    //                 { name: 'menu.system.manage-article.approve-article', link: '/system/approve-article' },
    //                 { name: 'menu.system.manage-article.create-article', link: '/system/create-article' },
    //                 { name: 'menu.system.manage-article.list-article', link: '/system/list-article' },
    //             ]
    //         },
    //     ],
    // },
    // {
    //     name: 'menu.system.category', menus: [
    //         {
    //             name: 'menu.system.category',
    //             subMenus: [
    //                 { name: 'menu.system.manage-category.create&manage-category', link: '/system/manage-category' },
    //             ]
    //         }
    //     ]
    // },
    {
        name: 'menu.system.authentication-digital.import-data',
        menus: [
            { name: 'menu.system.authentication-digital.import-data', link: '/' }
        ]
    },
    {
        name: 'menu.system.authentication-digital.generate-signature',
        menus: [
            { name: 'menu.system.authentication-digital.generate-signature', link: '/system/authentication-digital/generate-signature' }
        ]
    },
    {
        name: 'menu.system.authentication-digital.verify-signature',
        menus: [
            { name: 'menu.system.authentication-digital.verify-signature', link: '/system/authentication-digital/verify-signature' }
        ]
    },
    {
        name: 'menu.system.authentication-digital.encrypt-data',
        menus: [
            { name: 'menu.system.authentication-digital.encrypt-data', link: '/system/authentication-digital/encrypt-data' }
        ]
    },
    {
        name: 'menu.system.authentication-digital.decrypt-data',
        menus: [
            { name: 'menu.system.authentication-digital.decrypt-data', link: '/system/authentication-digital/decrypt-data' }
        ]
    },
];
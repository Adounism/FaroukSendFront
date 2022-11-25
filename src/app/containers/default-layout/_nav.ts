import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Contacts'
  },
  {
    name: 'Gestion Client',
    url: '/base/listcustomers',
    iconComponent: { name: 'cil-people' }
  },
  {
    name: 'Gestion Fournisseur',
    // url: '/base/suppliers',
    url: '/base/listsuppliers',
    iconComponent: { name: 'cil-bookmark' }
  },

  // {
  //   name: 'Opérations',
  //   title: true
  // },

  // {
  //   name: 'Opération',
  //   url: '/base',
  //   iconComponent: { name: 'cil-share' },
  //   children: [
  //     {
  //       name: 'Ajouter Opération',
  //       url: '/base/addoperation'
  //     },

  //     {
  //       name: 'Liste Opération',
  //      url: '/base/operation'
  //     },
  //   ]
      
  // },


  {
    name: 'Vente Crédit',
    url: '/vente-credit',
    iconComponent: { name: 'cil-send' },
    children: [
      {
        name: 'Ajouter un Envoi de crédit',
        url: '/vente-credit/addtransaction'
      },

      {
        name: 'Liste des Envois',
       url: '/vente-credit/transaction'
      },
    ]
  },
  // {
  //   name: 'Vente Crédit',
  //   url: '/base',
  //   iconComponent: { name: 'cil-send' },
  //   children: [

      // {
      //   name: 'Edit customer',
      //   url: '/base/editcustomer/:id'
      // },
      // {
      //   name: 'Liste des transactions',
      //   url: '/base/breadcrumbs'
      // },
      // {
      //   name: 'Historique clients',
      //   url: '/base/historique'
      // },

      // {
      //   name: 'Collapse',
      //   url: '/base/collapse'
      // },
      // {
      //   name: 'List Group',
      //   url: '/base/list-group'
      // },
      // {
      //   name: 'Pagination',
      //   url: '/base/pagination'
      // },
      // {
      //   name: 'Add Transaction',
      //   url: '/base/addTransaction'
      // },
      // {
      //   name: 'Popovers',
      //   url: '/base/listeachats'
      // },

      // {
      //   name: 'Spinners',
      //   url: '/base/spinners'
      // },
      // {
      //   name: 'Tables',
      //   url: '/base/tables'
      // },
      // {
      //   name: 'Tabs',
      //   url: '/base/tabs'
      // },
      // {
      //   name: 'Tooltips',
      //   url: '/base/tooltips'
      // }
  //   ]
  // },

   {
    name: 'Ventes des cartes',
    url: '/vente-carte',
    iconComponent: { name: 'cil-credit-card' },
    children: [
      {
        name: 'ajouter un vente de carte',
        url: '/vente-carte/addcardsale'
      },

      {
        name: 'Liste des ventes',
       url: '/vente-carte/printcardsale'
      },
    ]

  },
  {
    name: 'Transfert Mobile',
    iconComponent: { name: 'cil-Phone' },
    url: '/icons',
    children: [
      {
        name: 'Ajouter un Envoi',
        url: '/icons/addmobiletransaction'
      },

      {
        name: 'Liste des Envois',
       url: '/icons/printmobiletransaction'
      },
      
      {
        name: "Ajouter retour d'envoi",
       url: '/icons/addreturnshipment'
      },
      
      {
        name: "Liste des retours d'envoi",
       url: '/icons/printreturnshipment'
      },
      {
        name: "Encaissement",
       url: '/icons/encaissement'
      },
      {
        name: "Décaissement",
       url: '/icons/decaissement'
      },
    ]

  },



 
  {
    name: 'Achat',
    url: '/buttons',
    iconComponent: { name: 'cil-dollar' },
    children: [
      {
        name: 'Liste des Achat crédit',
        url: '/buttons/printcreditpurchase'
      },

      //  {
      //   name: 'Ajouter un achat',
      //   url: '/buttons/addpurchase'
      // },

      {
        name: 'Liste des Achats cartes',
        url: '/buttons/printcartepurchase'
      },

       {
        name: 'Achats de transfert mobile',
        url: '/buttons/printmobiletransfertpurchase'
      },
      // {
      //   name: 'Dropdowns',
      //   url: '/buttons/dropdowns'
      // },
    ]
  },
  {
    name: 'Rapports',
    title: true
  },
  {
    name: 'Rapports',
    url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Rapport des clients',
        url: '/forms/form-control'
      },
      {
        name: 'Rapport des fournisseurs',
        url: '/forms/select'
      },
      {
        name: 'Rapport des transactions',
        url: '/forms/checks-radios'
      },
      {
        name: "Rapport d'Achat",
        url: '/forms/range'
      },
      // {
      //   name: 'Input Group',
      //   url: '/forms/input-group'
      // },
      // {
      //   name: 'Floating Labels',
      //   url: '/forms/floating-labels'
      // },
      // {
      //   name: 'Layout',
      //   url: '/forms/layout'
      // },
  //     {
  //       name: 'Validation',
  //       url: '/forms/validation'
  //     }
    ]
  },

  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   iconComponent: { name: 'cil-bell' },
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges'
  //     },
  //     {
  //       name: 'Modal',
  //       url: '/notifications/modal'
  //     },
  //     {
  //       name: 'Toast',
  //       url: '/notifications/toasts'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   iconComponent: { name: 'cil-calculator' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Extras'
  // },
  // {
  //   name: 'Pages',
  //   url: '/login',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500'
  //     }
  //   ]
  // },
];

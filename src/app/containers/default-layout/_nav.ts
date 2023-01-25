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
  // {
  //   title: true,
  //   name: 'Contacts'
  // },

    {
    name: 'Contacts',
    url: '/widgets',
    iconComponent: { name: 'cil-address-book' },
    children:[
      {
        name: 'Gestion Client',
        url: '/widgets/listcustomers',
        iconComponent: { name: 'cil-people' },
      },
      {
        name: 'Gestion Fournisseur',
        url: '/widgets/listsuppliers',
        iconComponent: { name: 'cil-bookmark' }
      },


    ]
  },
  // {
  //   name: 'Gestion Client',
  //   url: '/base/listcustomers',
  //   iconComponent: { name: 'cil-people' }
  // },
  // {
  //   name: 'Gestion Fournisseur',
  //   url: '/base/listsuppliers',
  //   iconComponent: { name: 'cil-bookmark' }
  // },

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
        url: '/vente-credit/addtransaction',
        iconComponent: { name: 'cil-arrow-right' },
      },

      {
        name: 'Liste des Envois',
       url: '/vente-credit/transaction',
       iconComponent: { name: 'cil-arrow-right' },
      },
      {
        name: 'Ventes importer',
       url: '/vente-credit/importedtransaction',
       iconComponent: { name: 'cil-arrow-right' },
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
        url: '/vente-carte/addcardsale',
        iconComponent: { name: 'cil-arrow-right' },
      },

      {
        name: 'Liste des ventes',
       url: '/vente-carte/printcardsale',
       iconComponent: { name: 'cil-arrow-right' },
      },
      {
        name: 'Liste des Cartes',
       url: '/vente-carte/cartetype',
       iconComponent: { name: 'cil-arrow-right' },
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
        url: '/icons/addmobiletransaction',
        iconComponent: { name: 'cil-arrow-right' },
      },

      {
        name: 'Liste des Envois',
       url: '/icons/printmobiletransaction',
       iconComponent: { name: 'cil-arrow-right' },
      },

      // {
      //   name: "Ajouter retour d'envoi",
      //  url: '/icons/addreturnshipment',
      //  iconComponent: { name: 'cil-arrow-right' },
      // },

      // {
      //   name: "Liste des retours d'envoi",
      //  url: '/icons/printreturnshipment',
      //  iconComponent: { name: 'cil-arrow-right' },
      // },
      // {
      //   name: "Encaissement",
      //  url: '/icons/encaissement',
      //  iconComponent: { name: 'cil-arrow-right' },
      // },
      // {
      //   name: "Décaissement",
      //  url: '/icons/decaissement',
      //  iconComponent: { name: 'cil-arrow-right' },
      // },
    ]

  },




  {
    name: 'Achats',
    url: '/buttons',
    iconComponent: { name: 'cil-dollar' },
    children: [
      {
        name: 'Liste des Achat crédit',
        url: '/buttons/printcreditpurchase',
        iconComponent: { name: 'cil-arrow-right' },
      },

      //  {
      //   name: 'Ajouter un achat',
      //   url: '/buttons/addpurchase'
      // },

      {
        name: 'Liste des Achats cartes',
        url: '/buttons/printcartepurchase',
        iconComponent: { name: 'cil-arrow-right' },
      },

       {
        name: 'Achats de transfert mobile',
        url: '/buttons/printmobiletransfertpurchase',
        iconComponent: { name: 'cil-arrow-right' },
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
        url: '/forms/form-control',

        iconComponent: { name: 'cil-arrow-right' },
      },
      {
        name: 'Rapport des fournisseurs',
        url: '/forms/select',
        iconComponent: { name: 'cil-arrow-right' },
      },
      {
        name: 'Rapport  vente de crédit',
        url: '/forms/checks-radios',
        iconComponent: { name: 'cil-arrow-right' },
      },
      {
        name: "Rapport  vente de carte",
        url: '/forms/range',
        iconComponent: { name: 'cil-arrow-right' },
      },
      {
        name: 'Rapport  Transfert mobile',
        url: '/forms/input-group',
        iconComponent: { name: 'cil-arrow-right' },
      },
      {
        name: 'Rapport  Achat de carte',
        url: '/forms/floating-labels',
        iconComponent: { name: 'cil-arrow-right' },
      },
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

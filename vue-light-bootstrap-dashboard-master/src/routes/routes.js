import DashboardLayout from '../layout/DashboardLayout.vue'
import LayoutMembre from '../layout/LayoutMembre.vue'
import Index from '../layout/Index.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import AjouterObjet from 'src/pages/AjouterObjet.vue'

import AjouterType from 'src/pages/AjouterType.vue'
import TableList from 'src/pages/TableList.vue'
import AfficherObjet from 'src/pages/AfficherObjet.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'
import AfficherGroupe from 'src/pages/AfficherGroupe.vue'
import AjouterGroupe from 'src/pages/AjouterGroupe.vue'
import modifierGroupe from 'src/pages/modifierGroupe.vue'
const routes = [
  {
    path: '/',
    component: Index,
    name: 'index'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'objetadd',
        name: 'Ob',
        component: AjouterObjet
      },
      {
        path: 'objet',
        name: 'Objetaff',
        component: AfficherObjet
      },
      {
        path: 'groupe',
        name: 'Groupeaff',
        component: AfficherGroupe
      },
      {
        path: 'ajouterGroupe',
        name: 'Groupeadd',
        component: AjouterGroupe
      },
      {
        path: 'modifierGroupe/:id',
        name: 'Groupeupdate',
        component: modifierGroupe
      },
      {
        path: 'ajouterType',
        name: 'typeaj',
        component: AjouterType
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  {
    path: '/membre',
    component: LayoutMembre,
    redirect: '/membre/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      }]}
      ,
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes

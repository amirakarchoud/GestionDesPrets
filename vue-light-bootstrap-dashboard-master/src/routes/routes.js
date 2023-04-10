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
import AfficherPret from 'src/pages/AfficherPret.vue'
import AfficherPretRetourne from 'src/pages/AfficherPretRetourne.vue'
import AfficherPretNonRetourne from 'src/pages/AfficherPretNonRetourne.vue'
import AfficherPretAssigne from 'src/pages/AfficherPretAssigne.vue'
import AfficherPretByid from 'src/pages/AfficherPretByid.vue'
import AfficherDemande from 'src/pages/AfficherDemande.vue'
import AfficherDemandeById from 'src/pages/AfficherDemandeById.vue'
import ValiderDemande from 'src/pages/ValiderDemande.vue'
import AfficherDemandeMember from 'src/pages/AfficherDemandeMember.vue'
import AfficherPretMembre from 'src/pages/AfficherPretMembre.vue'
import AfficherPretByidMembre from 'src/pages/AfficherPretByidMembre.vue'
import AfficherDemandeByIdMembre  from 'src/pages/AfficherDemandeByIdMembre.vue'

import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'

const routes = [
  {
    path: '/',
    component: Index,
    name: 'index'
  },
   //Declaration des chemins pour le membre
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
        path: 'pret',
        name: 'Pretaff',
        component: AfficherPret
      },
      {
        path: 'pretRetourne',
        name: 'PretRetourneaff',
        component: AfficherPretRetourne
      },
      {
        path: 'pretNonRetourne',
        name: 'PretNonRetourneaff',
        component: AfficherPretNonRetourne
      },
      {
        path: 'pretAssigne',
        name: 'PretAssigneaff',
        component: AfficherPretAssigne
      },
      {
        path: 'pretbyid/:id',
        name: 'PretById',
        component: AfficherPretByid 
      },
      {
        path: 'demande',
        name: 'Demandeaff',
        component: AfficherDemande
      },
      {
        path: 'demandebyid/:id',
        name: 'DemandeById',
        component: AfficherDemandeById 
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
  //Declaration des chemins pour le membre
  {
    path: '/membre',
    component: LayoutMembre,
    redirect: '/membre/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'pret',
        name: 'Pretaff',
        component: AfficherPretMembre
      },
      {
        path: 'pretbyidmembre/:id',
        name: 'PretByIdMembre',
        component: AfficherPretByidMembre 
      },
      {
        path: 'demande',
        name: 'Demandeaff',
        component: AfficherDemandeMember
      },
      {
        path: 'demandebyidmembre/:id',
        name: 'DemandeByIdMembre',
        component: AfficherDemandeByIdMembre 
      },
      {
        path: 'validerdemande',
        name: 'ValiderDemande',
        component: ValiderDemande
      },
    ]}
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

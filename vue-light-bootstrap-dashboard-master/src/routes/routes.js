import DashboardLayout from '../layout/DashboardLayout.vue'
import LayoutMembre from '../layout/LayoutMembre.vue'
import Index from '../layout/Index.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import OverviewMembre from 'src/pages/OverviewMembre.vue'
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


import ModifierObjet from 'src/pages/ModifierObjet.vue'

import ModifierType from 'src/pages/ModifierType.vue'

import AfficherObjetMembre from 'src/pages/AfficherObjetMembre.vue'
import AfficherType from 'src/pages/AfficherType.vue'
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
        path: 'objetmodif/:id',
        name: 'Obmod',
        component: ModifierObjet
      },
      {
        path: 'typemodif/:id',
        name: 'Typemod',
        component: ModifierType
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
},{
        path: 'type',
        name: 'Typeaff',
        component: AfficherType
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
  //Declaration des chemins pour le membre
  {
    path: '/membre',
    component: LayoutMembre,
    redirect: '/membre/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: OverviewMembre
      },
      {
        path: 'demande',
        name: 'Demandeaff',
        component: AfficherDemandeMember
      },
      {
        path: 'validerdemande',
        name: 'ValiderDemande',
        component: ValiderDemande
      },

      {
        path: 'objet',
        name: 'Objetaff',
        component: AfficherObjetMembre
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

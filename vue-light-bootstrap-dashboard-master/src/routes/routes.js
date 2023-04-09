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

import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'
import AjouterDemande from "@/pages/AjouterDemande.vue";
import EditDemande from "@/pages/UserProfile/EditDemande.vue";
import EditDemandeAdmin from "@/pages/UserProfile/EditDemandeAdmin.vue";
import EditLoanAdmin from "@/pages/UserProfile/EditLoanAdmin.vue";


const routes = [
  {
    path: '/',
    component: Index,
    name: 'index'
  },
  {
    path: '/admin',
    name: 'admin',
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
        name: 'DemandeByIdAdmin',
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
      },
      {
        path: 'edit/demande/:id',
        name: 'EditDemandeAdmin',
        component: EditDemandeAdmin
      },
      {
        path: 'edit/demande/:id',
        name: 'EditLoanAdmin',
        component: EditLoanAdmin
      },
    ]
  },
  {
    path: '/membre',
    name: 'membre',
    component: LayoutMembre,
    redirect: '/membre/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'demande',
        name: 'Demandeaff',
        component: AfficherDemandeMember
      },
      {
        path: 'demandeAdd',
        name: 'DemandeAdd',
        component: AjouterDemande
      },
      {
        path: 'demandebyid/:id',
        name: 'DemandeByIdMembre',
        component: AfficherDemandeById
      },
      {
        path: 'edit/demande/:id',
        name: 'EditDemande',
        component: EditDemande
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

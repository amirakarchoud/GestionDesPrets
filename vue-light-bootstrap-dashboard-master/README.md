# Gestion des prêts

C'est une application frontale qui permet de consommer une API déjà développée pour la gestion des prêts.

## Entreprise

Cette application est dédiée au service du laboratoire d'Informatique de Paris Nord LIPN.
<div align="center">
  <a href="https://lipn.univ-paris13.fr/" target="_blank" rel="noreferrer">
    <img src="https://pbs.twimg.com/profile_images/1565267966987575297/sFSXlner_400x400.jpg" alt="logo lipn" width="140" height="140"/> 
  </a>
</div>


## Installation

Il est important de noter que la méthode à suivre pour l'installation varie en fonction de votre système d'exploitation et de la version de chaque dépendance. Assurez-vous de lire attentivement la documentation de chaque dépendance pour obtenir des instructions d'installation plus précises.

### Node.js

Vous pouvez télécharger Node.js sur leur site web : www.nodejs.org.

### Vue.js
Assurez-vous d'installer Node.js et npm avant d'installer Vue.js. 
Vous pouvez l'installer à l'aide de la commande :

```bash
  npm install vue
```

### Docker

Vous pouvez télécharger et installer Docker à partir de leur site web : www.docker.com.

## Démarrage

Clonez le projet avec la commande suivante ou en téléchargeant le projet en zip

```bash
  git clone https://github.com/amirakarchoud/GestionDesPrets.git
```

Naviguez vers le bon répertoire 

```bash
  cd my-project
```

Installez les dependences du projet

```bash
  npm install
```

Démarrez le serveur 

```bash
  npm run dev
```

Accédez à http://localhost:8080 pour accéder à l'application

## Structure des dossiers

Voici la structure de dossiers du projet :
```bash
|- public/
| |- img/
|- src/
| |- assets/
| | |- css/
| | |- fonts/
| | |- sass/
| |- components/
| | |- cards/
| | |- inputs/
| | |- notificationPlugin/
| | |- sidebarPlugin/
| |- directives/
| |- layout/
| |- pages/
| | |- UserProfile/
| |- routes/
| | |- routes.js
| |- App.vue
| |- main.js
|- README.md
```
### `public/`

Ce dossier contient les fichiers qui seront servis directement par le navigateur, tels que l'`index.html` et les images. Les fichiers des images sont également inclus pour ajouter des icônes ou des images au site.

### `src/`

Ce dossier contient le code source de notre application Vue JS.
Il est composé de plusieurs dossiers :

### `assets/`

Ce dossier contient les fichiers CSS, les polices et les fichiers Sass utilisés dans le projet. Principalement les fichiers du template utilisé.

### `Components/`

Ce dossier contient les composants réutilisables de l’application, tels que les cartes, les champs de saisie, les notifications et le menu latéral (side menu) . Il contient également des fichiers Vue JS pour les tableaux d’affichage, y compris Table.vue, TableGroupe.vue, TableObjet.vue et TableType.vue, ainsi qu'un fichier index.js pour importer les différents composants.

### `layout/`

Ce dossier contient les mises en page de l’application. Il contient des fichiers Vue JS pour les différents types de mise en page, notamment DashbordLayout.vue (pour le menu qui sera affiché pour le gestionnaire de l'application), LayoutMembre.vue (pour le menu qui sera affiché pour les membres de l'application), TopNavBar.vue, ContentFooter.vue et index.vue.

### `pages/`

Ce dossier contient les pages de l’application. Il contient des fichiers Vue JS pour les différentes pages, y compris Overview.vue (la page d'accueil), NotFound.vue (la page 404),ainsi que les pages d’ajout et de modification des différentes entités , par exemple ; AjouterDemande.vue, AjouterGroupe.vue, ModifierType.vue, ModifierGroupe.vue. 

Il contient également un dossier appelé UserProfile, qui contient des fichiers pour les différentes pages de formulaires utilisés , tels que FormObjet.vue, FormObjetModif.vue, FormType.vue, FormGroupe.vue et FormDemande.vue.

### `routes/`

Ce dossier contient un fichier routes.js qui définit les routes de l’application. Les routes sont utilisées pour déterminer quelles pages doivent être affichées lorsque l'utilisateur navigue sur votre site. Il est devise en deux parties : les routes pour la partie interface du gestionnaire et les routes pour l’interface du membre .

### `App.vue`

Le fichier App.vue est le composant racine de l’application. Il contient le code HTML de base de l’application, ainsi que le code JavaScript qui est exécuté lorsque l'application est chargée.

### `main.js`

Le fichier main.js est le point d'entrée du projet. Il importe le composant App.vue et définit l'instance de Vue qui sera utilisée pour l'application.

## Déploiement

Pour récupérer l'image Docker du projet 

```bash
  docker pull fatmakahloun/frontend_vue_vf1
```

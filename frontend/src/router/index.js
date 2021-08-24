import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Profile from '../views/Profile.vue';
import ProfileImage from '../views/ProfileImage.vue';
import ProfileInfo from '../views/ProfileInfo.vue';
import Post from '../views/Post.vue';
import { nextTick } from 'vue';


const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      title: 'Groupomania | Actualités',
      metaTags: [
        {
          name: 'description',
          content: 'Accueil au réseau interne de Groupomania'
        }
      ]
    },
  },
  {
    path: '/auth/signup/',
    name: 'Signup',
    component: Signup,
    meta: {
      title: 'Groupomania | Inscription',
      metaTags: [
        {
          name: 'description',
          content: 'Formulaire d\'inscription au réseau interne de Groupomania'
        }
      ]
    },
  },
  {
    path: '/auth/login/',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Groupomania | Se connecter',
      metaTags: [
        {
          name: 'description',
          content: 'Connexion au réseau interne de Groupomania'
        }
      ]
    },
  },
  {
    path: '/auth/account/:id(\\d+)/',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Groupomania | Espace utilisateur',
      metaTags: [
        {
          name: 'description',
          content: 'Informations de mon compte'
        }
      ]
    },
  },
  {
    path: '/auth/account/:id(\\d+)/avatar/',
    name: 'ProfileImage',
    component: ProfileImage,
    meta: {
      title: 'Groupomania | Modifier \'image à aficher',
      metaTags: [
        {
          name: 'description',
          content: 'Changement d\'image à afficher'
        }
      ]
    },
  }, 
  {
    path: '/account/:id(\\d+)/',
    name: 'ProfileInfo',
    component: ProfileInfo,
    meta: {
      title: 'Groupomania | Informations de mon collaborateur',
      metaTags: [
        {
          name: 'description',
          content: 'Montre les information d\'un autre utilisateur'
        }
      ]
    },
  },
  {
    path: '/posts/:id_post(\\d+)/',
    name: 'Post',
    component: Post,
    meta: {
      title: 'Groupomania | Information de la publication',
      metaTags: [
        {
          name: 'description',
          content: 'Montre les information d\'une publication'
        }
      ]
    },
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }
  // Remove any stale meta tags from the document using the key attribute set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next()
  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');
    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    });
    // Track which meta tags we create 
    tag.setAttribute('data-vue-router-controlled', '');
    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));
  next();
});


export default router;

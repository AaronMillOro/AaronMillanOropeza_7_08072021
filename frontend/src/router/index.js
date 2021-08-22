import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Groupomania | Inscription',
      metaTags: [
        {
          name: 'description',
          content: 'Formulaire d\'inscription au réseau interne de Groupomania'
        }
      ]
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'Groupomania | Se connecter',
      metaTags: [
        {
          name: 'description',
          content: 'Connexion au réseau interne de Groupomania'
        }
      ]
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)
  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title
  }
  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))
  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next()
  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')
    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })
    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '')
    return tag
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag))
  next()
})


export default router

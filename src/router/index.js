import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import { isAuthenticated } from '../auth'
import FirebaseSignInView from '@/views/FirebaseSignInView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import AdvancedQueryView from '@/views/AdvancedQueryView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPIView from '@/views/CountBookAPIView.vue'
import GetAllBooksAPIView from '@/views/GetAllBooksAPIView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true } // Mark as a protected route
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDeniedView
  }
  ,
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSignInView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  }
  ,
  {
    path: '/AddBook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/AdvancedQuery',
    name: 'AdvancedQuery',
    component: AdvancedQueryView
  }
  ,
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPIView,
    meta: { hideHeader: true } // This is the key for hiding the header
  },
  {
    path: '/GetAllBooksAPI',
    name: 'GetAllBooksAPI',
    component: GetAllBooksAPIView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated.value) {
      next({ name: 'AccessDenied' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
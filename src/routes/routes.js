
import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
import LoginPage from 'src/components/GeneralViews/LoginPage'
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import ListaSondaggi from 'src/components/Dashboard/Views/ListaSondaggi.vue'
import ListaPolicy from 'src/components/Dashboard/Views/ListaPolicy.vue'
import CreazioneSondaggi from 'src/components/Dashboard/Views/CreazioneSondaggio.vue'
import CompilaSondaggio from 'src/components/Dashboard/Views/CompilaSondaggio.vue'
import ResultsSondaggio from 'src/components/Dashboard/Views/ResultsSurvey.vue'

import store from '../store'
import { parseJwt } from "./../utils/jwt.js";
import {AUTH_SET_USER } from 'src/store/actions/auth'
import axios from 'axios'



const routes = [
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview,
        meta: {
        },
      },
      {
        path: 'SurveyList',
        name: 'Survey List',
        component: ListaSondaggi,
        meta: {
        },
      },
      {
        path: 'policyList',
        name: 'Policy List',
        component: ListaPolicy,
        meta: {
        },
      },
      {
        path: 'CreateSurvey',
        name: 'Create Survey',
        component: CreazioneSondaggi,
        meta: {
        },
      },
      {
        path: 'compileSurvey/:id',
        name: 'Compile Survey',
        component: CompilaSondaggio,
        meta: {
        },
      },
      {
        path: 'resultsSurvey/:id',
        name: 'Survey Results',
        component: ResultsSondaggio,
        meta: {
        },
      }
    ],
    redirect: '/overview'
  },
  {
    path: '*',
    name: 'Page reached in case of invalid url',
    component: NotFound
  }
  
]

export default routes

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { CityProvider } from './contexts/CityContext'
import { Suspense, lazy } from 'react'

import ProtectedRoute from './pages/ProtectedRoute'

const HomePage = lazy(() => import('./pages/HomePage'))
const Login = lazy(() => import('./pages/Login'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Product = lazy(() => import('./pages/Product'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))

import Spinner from './component/SpinnerFullPage'
import CityList from './component/CityList'
import CountryList from './component/CountryList'
import City from './component/City'
import Form from './component/Form'

function App() {
  return (
    <CityProvider>
      <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/pricing' element={<Pricing />} />
            <Route exact path='/product' element={<Product />} />
            <Route exact path='/app' element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate replace to='cities' />} />
              <Route exact path='cities/:id' element={<City />} />
              <Route exact path='cities' element={<CityList />} />
              <Route exact path='countries' element={<CountryList />} />
              <Route exact path='form' element={<Form />} />
            </Route>
            <Route exact path='*' element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </CityProvider>
  )
}

export default App

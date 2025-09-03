import { Link, useLocation } from 'react-router-dom'
import { BreadcrumbSeparator } from './breadcrumb-separator'
import { BreadcrumbItem } from './breadcrumb-item'
import { useBreadcrumb } from './use-breadcrumb'
import { Fragment, useEffect } from 'react'

export function Breadcrumb () {
  const { items, setItems } = useBreadcrumb()
  const location = useLocation()

  useEffect(() => {
    setItems()
  }, [location.pathname, setItems])

  return (
    <>
      {
        items != null && (
          <nav className='hidden md:flex flex-nowrap flex-row items-center gap-2 w-min rounded-lg bg-gray-200/50 dark:bg-gray-800/50'>
            <Link
              to='/'
              className='opacity-70 hover:opacity-100'
            >
              <svg className='w-4 h-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
              </svg>
            </Link>
            {
              items.map(({ label, detail, to }) => (
                <Fragment
                  key={label}
                >
                  <BreadcrumbSeparator />
                  <BreadcrumbItem
                    label={label}
                    detail={detail}
                    to={to}
                  />
                </Fragment>
              ))
            }
          </nav>
        )
      }
    </>
  )
}

import type { FC } from 'react'
import React, { useContext } from 'react'
import { context, NavLink } from 'dumi/theme'
import './SideMenu.less'

interface INavbarProps {
  location: any
  darkPrefix?: React.ReactNode
}

const SideMenu: FC<INavbarProps> = ({ location }) => {
  const {
    config: { mode },
    menu,
    meta
  } = useContext(context)
  const isHiddenMenus =
    Boolean((meta.hero || meta.features || meta.gapless) && mode === 'site') || meta.sidemenu === false || undefined

  if (isHiddenMenus) return null

  return (
    <div className='__dumi-default-menu'>
      <div className='__dumi-default-menu-inner'>
        <ul className='__dumi-default-menu-list'>
          {menu.map(item => {
            const hasChildren = item.children && Boolean(item.children.length)

            if (hasChildren) {
              return (
                <li key={item.path || item.title}>
                  <ul>
                    {item.children?.map(child => (
                      <li key={child.path}>
                        <NavLink to={child.path} exact>
                          <span>{child.title}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            } else {
              return (
                <li key={item.path}>
                  <NavLink to={item.path} exact>
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </div>
  )
}

export default SideMenu

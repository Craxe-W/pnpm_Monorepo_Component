import React, { useContext } from 'react'
import type { IRouteComponentProps } from '@umijs/types'
import { context } from 'dumi/theme'
import Navbar from '../components/Navbar'
import SideMenu from '../components/SideMenu'
import '../style/layout-default.less'
import '../style/global.less'
import styles from './index.less'

const Layout: React.FC<IRouteComponentProps> = ({ children, location }) => {
  const { meta } = useContext(context)
  const showSideMenu = meta.sidemenu !== false && !meta.gapless
  const showSlugs = Boolean(meta.slugs?.length) && (meta.toc === 'content' || meta.toc === undefined) && !meta.gapless
  const updatedTimeIns = new Date(meta.updatedTime)
  const updatedTime: any = `${updatedTimeIns.toLocaleDateString([], {
    hour12: false
  })} ${updatedTimeIns.toLocaleTimeString([], { hour12: false })}`

  return (
    <div
      className={styles.layout}
      data-route={location.pathname}
      data-show-sidemenu={String(showSideMenu)}
      data-show-slugs={String(showSlugs)}
      data-gapless={String(!!meta.gapless)}
    >
      <Navbar location={location} />
      {meta.full ? (
        <>{children}</>
      ) : (
        <div className={styles.content}>
          <div className={styles.side}>
            <SideMenu location={location} />
          </div>
          <div className={styles.main}>
            <div className={styles['main-inner']}>
              <article>{children}</article>
              {meta.filePath && !meta.gapless && (
                <div className='__dumi-default-layout-footer-meta'>
                  <span data-updated-text='最后更新时间：'>{updatedTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Layout

import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const collect: AppRouteModule = {
  path: '/home',
  name: 'HomePage',
  component: LAYOUT,
  redirect: '/home/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: t('routes.routes.home'),
    orderNo: 0,
  },
  children: [
    {
      path: 'index',
      name: 'HomePageIndex',
      component: () => import('/@/views/home-page/index.vue'),
      meta: {
        title: t('routes.routes.home'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default collect;

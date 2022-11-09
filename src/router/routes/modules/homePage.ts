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
    title: '首页',
    orderNo: 0,
  },
  children: [
    {
      path: 'index',
      name: 'HomePageIndex',
      component: () => import('/@/views/home/index.vue'),
      meta: {
        title: '首页',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default collect;

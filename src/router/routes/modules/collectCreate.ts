import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const collectCreate: AppRouteModule = {
  path: '/collect',
  name: 'CollectCreate',
  component: LAYOUT,
  redirect: '/collect/create',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: t('routes.collect.create'),
    orderNo: 1,
  },
  children: [
    {
      path: 'create',
      name: 'CollectCreatePage',
      component: () => import('/@/views/collect-create/index.vue'),
      meta: {
        title: t('routes.collect.create'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default collectCreate;

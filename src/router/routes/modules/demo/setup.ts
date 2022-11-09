import type { AppRouteModule } from '../../../../../../../vue-vben-admin/src/router/types';

import { LAYOUT } from '../../../../../../../vue-vben-admin/src/router/constant';
import { t } from '../../../../../../../vue-vben-admin/src/hooks/web/useI18n';

const setup: AppRouteModule = {
  path: '/setup',
  name: 'SetupDemo',
  component: LAYOUT,
  redirect: '/setup/index',
  meta: {
    orderNo: 90000,
    hideChildrenInMenu: true,
    icon: 'whh:paintroll',
    title: t('routes.demo.setup.page'),
  },
  children: [
    {
      path: 'index',
      name: 'SetupDemoPage',
      component: () => import('../../../../../../../vue-vben-admin/src/views/demo/setup/index.vue'),
      meta: {
        title: t('routes.demo.setup.page'),
        icon: 'whh:paintroll',
        hideMenu: true,
      },
    },
  ],
};

export default setup;

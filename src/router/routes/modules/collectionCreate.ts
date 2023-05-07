import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const collectionCreate: AppRouteModule = {
  path: '/collection',
  name: 'CollectionCreate',
  component: LAYOUT,
  redirect: '/collection/create',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: t('routes.routes.create'),
    orderNo: 1,
  },
  children: [
    {
      path: 'create',
      name: 'CollectCreatePage',
      component: () => import('/@/views/collection-create/index.vue'),
      meta: {
        title: t('routes.routes.create'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default collectionCreate;

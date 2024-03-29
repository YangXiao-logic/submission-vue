import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const collectionEdit: AppRouteModule = {
  path: '/collection-edit',
  name: 'CollectionEdit',
  component: LAYOUT,
  redirect: '/collection-edit/edit',
  meta: {
    hideMenu: true,
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: t('routes.routes.edit'),
    orderNo: 1,
  },
  children: [
    {
      path: 'edit/:collectionId',
      name: 'CollectEditPage',
      component: () => import('/@/views/collection-edit/index.vue'),
      meta: {
        title: t('routes.routes.edit'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
        carryParam: true,
      },
    },
  ],
};

export default collectionEdit;

import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const collectionDetail: AppRouteModule = {
  path: '/collection-detail',
  name: 'CollectionDetail',
  component: LAYOUT,
  redirect: '/collection-detail/detail',
  meta: {
    hideChildrenInMenu: true,
    hideMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: t('routes.routes.detail'),
    orderNo: 3,
  },
  children: [
    {
      path: 'detail/:collectionId',
      name: 'CollectionDetailPage',
      component: () => import('/@/views/collection-detail/index.vue'),
      meta: {
        title: t('routes.routes.detail'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default collectionDetail;

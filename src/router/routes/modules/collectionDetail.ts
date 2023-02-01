import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const collectionDetail: AppRouteModule = {
  path: '/collection-detail',
  name: 'CollectionDetail',
  component: LAYOUT,
  redirect: '/collection-detail/detail',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '收集详情',
    orderNo: 3,
  },
  children: [
    {
      path: 'detail/:collectionId',
      name: 'CollectionDetailPage',
      component: () => import('/@/views/collection-detail/index.vue'),
      meta: {
        title: '收集详情',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default collectionDetail;

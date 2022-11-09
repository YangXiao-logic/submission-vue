import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const collectDetail: AppRouteModule = {
  path: '/collect',
  name: 'CollectDetail',
  component: LAYOUT,
  redirect: '/collect/detail',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '收集详情',
    orderNo: 3,
  },
  children: [
    {
      path: 'detail',
      name: 'CollectDetailPage',
      component: () => import('/@/views/collect-detail/index.vue'),
      meta: {
        title: '收集详情',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default collectDetail;

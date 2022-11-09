import type { AppRouteModule } from '../../../../../../../vue-vben-admin/src/router/types';

import { LAYOUT } from '../../../../../../../vue-vben-admin/src/router/constant';
import { t } from '../../../../../../../vue-vben-admin/src/hooks/web/useI18n';

const charts: AppRouteModule = {
  path: '/flow',
  name: 'FlowDemo',
  component: LAYOUT,
  redirect: '/flow/flowChart',
  meta: {
    orderNo: 5000,
    icon: 'tabler:chart-dots',
    title: t('routes.demo.flow.name'),
  },
  children: [
    {
      path: 'flowChart',
      name: 'flowChartDemo',
      component: () => import('../../../../../../../vue-vben-admin/src/views/demo/comp/flow-chart/index.vue'),
      meta: {
        title: t('routes.demo.flow.flowChart'),
      },
    },
  ],
};

export default charts;

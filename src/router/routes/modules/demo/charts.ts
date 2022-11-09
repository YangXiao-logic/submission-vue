import type { AppRouteModule } from '../../../../../../../vue-vben-admin/src/router/types';

import { getParentLayout, LAYOUT } from '../../../../../../../vue-vben-admin/src/router/constant';
import { t } from '../../../../../../../vue-vben-admin/src/hooks/web/useI18n';

const charts: AppRouteModule = {
  path: '/charts',
  name: 'Charts',
  component: LAYOUT,
  redirect: '/charts/echarts/map',
  meta: {
    orderNo: 500,
    icon: 'ion:bar-chart-outline',
    title: t('routes.demo.charts.charts'),
  },
  children: [
    {
      path: 'baiduMap',
      name: 'BaiduMap',
      meta: {
        title: t('routes.demo.charts.baiduMap'),
      },
      component: () => import('../../../../../../../vue-vben-admin/src/views/demo/charts/map/Baidu.vue'),
    },
    {
      path: 'aMap',
      name: 'AMap',
      meta: {
        title: t('routes.demo.charts.aMap'),
      },
      component: () => import('../../../../../../../vue-vben-admin/src/views/demo/charts/map/Gaode.vue'),
    },
    {
      path: 'googleMap',
      name: 'GoogleMap',
      meta: {
        title: t('routes.demo.charts.googleMap'),
      },
      component: () => import('../../../../../../../vue-vben-admin/src/views/demo/charts/map/Google.vue'),
    },

    {
      path: 'echarts',
      name: 'Echarts',
      component: getParentLayout('Echarts'),
      meta: {
        title: 'Echarts',
      },
      redirect: '/charts/echarts/map',
      children: [
        {
          path: 'map',
          name: 'Map',
          component: () => import('../../../../../../../vue-vben-admin/src/views/demo/charts/Map.vue'),
          meta: {
            title: t('routes.demo.charts.map'),
          },
        },
        {
          path: 'line',
          name: 'Line',
          component: () => import('../../../../../../../vue-vben-admin/src/views/demo/charts/Line.vue'),
          meta: {
            title: t('routes.demo.charts.line'),
          },
        },
        {
          path: 'pie',
          name: 'Pie',
          component: () => import('../../../../../../../vue-vben-admin/src/views/demo/charts/Pie.vue'),
          meta: {
            title: t('routes.demo.charts.pie'),
          },
        },
      ],
    },
  ],
};

export default charts;

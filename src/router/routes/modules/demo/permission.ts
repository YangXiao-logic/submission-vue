import type { AppRouteModule } from '../../../../../../../vue-vben-admin/src/router/types';

import { getParentLayout, LAYOUT } from '../../../../../../../vue-vben-admin/src/router/constant';
import { RoleEnum } from '../../../../../../../vue-vben-admin/src/enums/roleEnum';
import { t } from '../../../../../../../vue-vben-admin/src/hooks/web/useI18n';

const permission: AppRouteModule = {
  path: '/permission',
  name: 'Permission',
  component: LAYOUT,
  redirect: '/permission/front/page',
  meta: {
    orderNo: 15,
    icon: 'ion:key-outline',
    title: t('routes.demo.permission.permission'),
  },

  children: [
    {
      path: 'front',
      name: 'PermissionFrontDemo',
      component: getParentLayout('PermissionFrontDemo'),
      meta: {
        title: t('routes.demo.permission.front'),
      },
      children: [
        {
          path: 'page',
          name: 'FrontPageAuth',
          component: () => import('../../../../../../../vue-vben-admin/src/views/demo/permission/front/index.vue'),
          meta: {
            title: t('routes.demo.permission.frontPage'),
          },
        },
        {
          path: 'btn',
          name: 'FrontBtnAuth',
          component: () => import('../../../../../../../vue-vben-admin/src/views/demo/permission/front/Btn.vue'),
          meta: {
            title: t('routes.demo.permission.frontBtn'),
          },
        },
        {
          path: 'auth-pageA',
          name: 'FrontAuthPageA',
          component: () => import('../../../../../../../vue-vben-admin/src/views/demo/permission/front/AuthPageA.vue'),
          meta: {
            title: t('routes.demo.permission.frontTestA'),
            roles: [RoleEnum.SUPER],
          },
        },
        {
          path: 'auth-pageB',
          name: 'FrontAuthPageB',
          component: () => import('../../../../../../../vue-vben-admin/src/views/demo/permission/front/AuthPageB.vue'),
          meta: {
            title: t('routes.demo.permission.frontTestB'),
            roles: [RoleEnum.TEST],
          },
        },
      ],
    },
    {
      path: 'back',
      name: 'PermissionBackDemo',
      component: getParentLayout('PermissionBackDemo'),
      meta: {
        title: t('routes.demo.permission.back'),
      },
      children: [
        {
          path: 'page',
          name: 'BackAuthPage',
          component: () => import('../../../../../../../vue-vben-admin/src/views/demo/permission/back/index.vue'),
          meta: {
            title: t('routes.demo.permission.backPage'),
          },
        },
        {
          path: 'btn',
          name: 'BackAuthBtn',
          component: () => import('../../../../../../../vue-vben-admin/src/views/demo/permission/back/Btn.vue'),
          meta: {
            title: t('routes.demo.permission.backBtn'),
          },
        },
      ],
    },
  ],
};

export default permission;

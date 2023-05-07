/**
 * @description: menu type
 */
export enum MenuTypeEnum {
  // top menu
  TOP_MENU = 'top-menu',
  // left menu
  SIDEBAR = 'sidebar',

  MIX_SIDEBAR = 'mix-sidebar',
  // mixin menu
  MIX = 'mix',
}

// 折叠触发器位置
export enum TriggerEnum {
  // 不显示
  NONE = 'NONE',
  // 菜单底部
  FOOTER = 'FOOTER',
  // 头部
  HEADER = 'HEADER',
}

export type Mode = 'vertical' | 'vertical-right' | 'horizontal' | 'inline';

// menu mode
export enum MenuModeEnum {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',

  VERTICAL_RIGHT = 'vertical-right',
  INLINE = 'inline',
}

export enum MenuSplitTyeEnum {
  NONE,
  TOP,
  LEFT,
}

export enum TopMenuAlignEnum {
  CENTER = 'center',
  START = 'start',
  END = 'end',
}

export enum MixSidebarTriggerEnum {
  HOVER = 'hover',
  CLICK = 'click',
}

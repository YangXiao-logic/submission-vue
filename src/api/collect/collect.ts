import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';

export function createCollect(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: '/collect/collect',
      params,
    },
    {
      errorMessageMode: mode,
      successMessageMode: 'modal',
    },
  );
}

export function getCollect(params) {
  return defHttp.get({
    url: '/collect/collect?collectionId=' + params,
  });
}

export function listCollect() {
  return defHttp.get({
    url: '/collect/collect/list',
  });
}

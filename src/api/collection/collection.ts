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

export function getCollectionApi(params) {
  return defHttp.get({
    url: '/collection?collectionId=' + params,
  });
}

export function getCollectionListApi() {
  return defHttp.get({
    url: '/collections',
  });
}

export function getNameListApi(params) {
  return defHttp.get({
    url: '/collections/name-list?collectionId=' + params,
  });
}

export function getRemainNameListApi(params) {
  return defHttp.get({
    url: '/collections/remain-name-list?collectionId=' + params,
  });
}

export function putNameListApi(collectionId, params) {
  return defHttp.put({
    url: '/collections/name-list?collectionId=' + collectionId,
    params: params,
  });
}

import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';

export function createCollectionApi(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: '/collections',
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
    url: '/collections/' + params,
  });
}

export function getCollectionListApi() {
  return defHttp.get({
    url: '/collections',
  });
}

export function stopCollectionApi(collectionId) {
  return defHttp.post(
    {
      url: '/collections/' + collectionId + '/stop',
    },
    {
      successMessageMode: 'modal',
    },
  );
}

export function updateCollectionApi(params, collectionId) {
  return defHttp.put(
    {
      url: '/collections/' + collectionId,
      params,
    },
    {
      successMessageMode: 'modal',
    },
  );
}

export function deleteCollectionApi(collectionId) {
  return defHttp.delete(
    {
      url: '/collections/' + collectionId,
    },
    {
      successMessageMode: 'modal',
    },
  );
}

export function getCollectionDetailApi(collectionId) {
  return defHttp.get({
    url: '/collections/' + collectionId + '/detail',
  });
}

export function getNameListApi(collectionId) {
  return defHttp.get({
    url: '/collections/' + collectionId + '/names',
  });
}

export function getRemainNameListApi(collectionId) {
  return defHttp.get({
    url: '/collections/' + collectionId + '/remain-names',
  });
}

export function addNameListApi(collectionId, params) {
  return defHttp.post({
    url: '/collections/' + collectionId + '/name-list',
    params: params,
  });
}

export function addNameApi(collectionId, nameId) {
  return defHttp.post({
    url: '/collections/' + collectionId + '/name-list',
    params: nameId,
  });
}

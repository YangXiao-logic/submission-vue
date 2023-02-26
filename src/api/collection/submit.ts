import { defHttp } from '/@/utils/http/axios';

export function createSubmissionApi(collectionId, params) {
  return defHttp.post({
    url: '/submit/' + collectionId,
    params,
  });
}

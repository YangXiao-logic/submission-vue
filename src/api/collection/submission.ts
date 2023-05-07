import { defHttp } from '/@/utils/http/axios';

export function getSubmissionListApi(collectionId) {
  return defHttp.get({
    url: '/collections/' + collectionId + '/submissions',
  });
}

export function getSubmissionAnswerApi(submissionId) {
  return defHttp.get({
    url: '/submissions/' + submissionId,
  });
}

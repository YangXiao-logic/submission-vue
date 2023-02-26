import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetSubmissionList = '/collections/submissions-list',
  GetSubmission = '/collections/submissions/',
}

export function getSubmissionListApi(collectionId) {
  return defHttp.get({
    url: '/collections/' + collectionId + '/submissions',
  });
}

export function getSubmissionAnswerApi(submissionId) {
  return defHttp.get({
    url: '/collections/' + '/submissions/' + submissionId,
  });
}

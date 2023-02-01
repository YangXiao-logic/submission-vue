import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetSubmissionList = '/collections/submissions-list',
  GetSubmission = '/collections/submissions/',
}

export function getSubmissionListApi(collectionId) {
  return defHttp.get({
    url: Api.GetSubmissionList + '?collectionId=' + collectionId,
  });
}

export function getSubmissionApi(submissionId) {
  return defHttp.get({
    url: Api.GetSubmission + '?submissionId=' + submissionId,
  });
}

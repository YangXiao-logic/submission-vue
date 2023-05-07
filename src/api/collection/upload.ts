import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}

export function getPolicyApi() {
  return defHttp.get({
    url: '/aliyun/oss/policy',
  });
}

export function myUploadApi(params) {
  return defHttp.myUploadFile(
    {
      url: 'https://submission.oss-cn-chengdu.aliyuncs.com',
    },
    params,
  );
}

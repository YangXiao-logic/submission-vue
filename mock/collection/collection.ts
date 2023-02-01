import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';
import { Question } from '/@/views/collection-create/question/question-type/Question';
import { NameRuleType } from '/@/views/collection-create/question/question-type/NameRuleType';

const collectionList = [
  {
    collectionId: '0',
    title: '收集标题',
    collectorName: '负责人',
  },
];

const collectionDetailList = [
  {
    collectionId: '0',
    title: '收集标题',
    releaseTime: '2022-1-1 01:01:01',
    closeTime: '2022-1-3 01:01:01',
    submissionCount: 1,
    fileCount: 2,
  },
];

export function createFakeCollectionList() {
  for (let i = 1; i < 30; i++) {
    collectionList.push({
      collectionId: '' + i,
      title: '收集标题',
      collectorName: '负责人',
    });
  }
}

export function createFakeCollectionDetailList() {
  for (let i = 1; i < 30; i++) {
    collectionDetailList.push({
      collectionId: '' + i,
      title: '收集标题' + i,
      releaseTime: '2022-1-1 01:01:01',
      closeTime: '2023-3-3 01:01:01',
      submissionCount: i,
      fileCount: 2 * i,
    });
  }
}
let nameList = [];
const remainNameList = [];
export function createFakeNameList() {
  for (let index = 0; index < 20; index++) {
    nameList.push('@first');
    remainNameList.push('@first');
  }
}

createFakeCollectionList();
createFakeCollectionDetailList();
createFakeNameList();
export default [
  {
    url: '/basic-api/collections',
    timeout: 200,
    method: 'get',
    response: () => {
      // @ts-ignore
      return resultSuccess(collectionList);
    },
  },
  {
    url: '/basic-api/collection',
    timeout: 200,
    method: 'get',
    response: ({ query }) => {
      const { collectionId } = query;
      return resultSuccess(collectionDetailList.find((item) => item.collectionId === collectionId));
    },
  },
  {
    url: '/basic-api/collections/name-list',
    timeout: 200,
    method: 'get',
    response: ({ query }) => {
      console.log(query);
      return resultSuccess(nameList);
    },
  },
  {
    url: '/basic-api/collections/remain-name-list',
    timeout: 200,
    method: 'get',
    response: ({ query }) => {
      console.log(query);
      return resultSuccess(nameList);
    },
  },
  {
    url: '/basic-api/collections/name-list',
    method: 'put',
    response: ({ query, body }) => {
      console.log(query);
      nameList = body;
      return resultSuccess(body);
    },
  },
] as MockMethod[];

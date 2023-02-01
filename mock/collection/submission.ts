import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

const submissionList = [
  {
    collectionId: '1',
    name: 'name1',
    fileNum: 2,
    submitTime: '2022-10-11 01:10:21',
  },
];
const answerList = [
  {
    questionId: '1',
    answerId: '12',
    answerContent: 'answer content',
  },
];
const submissionDetail = {
  collectionId: '1',
  answerList: answerList,
};

export default [
  {
    url: '/basic-api/collections/submissions-list',
    method: 'get',
    response: ({ query }) => {
      console.log(query);
      return resultSuccess(submissionList);
    },
  },
  {
    url: '/basic-api/collections/submissions/',
    method: 'get',
    response: ({ query }) => {
      console.log(query);
      return resultSuccess(submissionDetail);
    },
  },
] as MockMethod[];

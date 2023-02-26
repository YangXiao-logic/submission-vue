export interface Collection {
  collectionId?: string;
  title: string;
  collectorName: string;
  releaseTime: string;
  closeTime: string;
  description: string;
  questionList: Question[];
}

export interface Question {
  questionId?: string;
  name: string;
  questionOrder: number;
  description: string;
  type: string;

  fileNameRuleList?: any;
  optionList?: any;
}

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}

const result: PossibleTypesResultData = {
  possibleTypes: {
    UserOnSession: ["Customer", "SessionUser"],
  },
};

export default result;

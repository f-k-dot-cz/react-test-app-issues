import issues from "./data/issues.json";
import IIssue from "../types/issue"

const getIssues = () =>
  new Promise<IIssue[]>((resolve, reject): any => {
    if (!issues) {
      return setTimeout(() => reject(new Error("Issues not found")), 250);
    }

    setTimeout(() => resolve(Object.values(issues)), 250);
  });

const getIssueById = (id: string): any =>
  new Promise((resolve, reject) => {
    const issue = issues.filter((issue) => issue.issueGuid === id)[0];

    if (!issue) {
      return setTimeout(() => reject(new Error("Issue not found")), 250);
    }

    setTimeout(() => resolve(issues.filter((issue) => issue.issueGuid === id)[0]), 250);
  });

//Rewrite to ES6
export { getIssues, getIssueById };
import issues from "./data/issues.json";
import IIssue from "../types/issue"

const getIssues = () =>
  new Promise((resolve, reject): any => {
    if (!issues) {
      return setTimeout(() => reject(new Error("Issues not found")), 250);
    }

    setTimeout(() => resolve(Object.values(issues)), 250);
  });

const getIssueById = (id: number): any =>
  new Promise((resolve, reject) => {
    const issue = issues[id];

    if (!issue) {
      return setTimeout(() => reject(new Error("Issue not found")), 250);
    }

    setTimeout(() => resolve(issues[id]), 250);
  });

//Rewrite to ES6
export { getIssues, getIssueById };
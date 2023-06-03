import { namesApiClient } from "./nameApiClient";

export async function binarySearch(min = 0, max = 5000, condition) {
  let left = min;
  let right = max;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (await condition(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

async function isPageCountValid(pageCount, namespace) {
  try {
    await fetchNames(pageCount, namespace);
    return true;
  } catch (err) {
    // const { status } = err;
    // const { error } = (await err.json()) || {};
    // if (+status === 400 && error.toLowerCase() === "invalid page") {
    //   return false;
    // } else {
    //   console.log(`status code: ${status}, error: ${error}`);
    // }
    console.log(err);
  }
}
async function searchCondition(pageCount, namespace) {
  const condition = !(await isPageCountValid(pageCount, namespace));
  console.log(`checking for pageCount: ${pageCount}. Condition: ${condition}`);
  return condition;
}

export async function getAllNamespaces() {
  try {
    return (await namesApiClient.getAllNamespaces()).namespaces;
  } catch (error) {
    return [];
  }
}

async function fetchNames(pageCount, namespace) {
  console.log("namespace=======", namespace);
  return await namesApiClient.getNamespaceNames({
    page: pageCount,
    tld: namespace,
  });
}

export async function countNames(namespace) {
  console.log("namespace: ", namespace);
  let pageCount = 0;
  let nameCount = 0;
  const MAX_NUM_OF_RESULTS_PER_PAGE = 100;
  try {
    pageCount = (await binarySearch(0, 10000, searchCondition)) - 1; //binary search returns pagecount+1
    const namesOnFinalPage = (await fetchNames(pageCount, namespace)).length;
    nameCount =
      namesOnFinalPage + (pageCount - 1) * MAX_NUM_OF_RESULTS_PER_PAGE;
    console.log("Number of names: ", nameCount);
  } catch (err) {
    // const { status } = err;
    // const { error } = (await err.json()) || {};
    // errorText = `error in run status code: ${status}, error: ${error}`;
    // console.log(errorText);
    console.log(err);
  }
}

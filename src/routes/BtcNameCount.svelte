<script>
  import { namesApiClient } from "../lib/nameApiClient";
  import { binarySearch } from "../lib/utils";

  let nameCount = 0;
  let isCounting = false;
  let isErrorThrown = false;
  let errorText = "";

  async function fetchNames(pageCount) {
    return await namesApiClient.getAllNames({ page: pageCount });
  }

  async function isPageCountValid(pageCount) {
    try {
      await fetchNames(pageCount);
      return true;
    } catch (err) {
      const { status } = err;
      const { error } = (await err.json()) || {};
      if (+status === 400 && error.toLowerCase() === "invalid page") {
        return false;
      } else {
        console.log(`status code: ${status}, error: ${error}`);
      }
    }
  }

  async function searchCondition(pageCount) {
    const condition = !(await isPageCountValid(pageCount));
    console.log(
      `checking for pageCount: ${pageCount}. Condition: ${condition}`
    );
    return condition;
  }
  async function countNames() {
    let pageCount = 0;

    const MAX_NUM_OF_RESULTS_PER_PAGE = 100;
    try {
      isCounting = true;
      pageCount = (await binarySearch(0, 10000, searchCondition)) - 1; //binary search returns pagecount+1
      const namesOnFinalPage = (await fetchNames(pageCount)).length;

      nameCount =
        namesOnFinalPage + (pageCount - 1) * MAX_NUM_OF_RESULTS_PER_PAGE;
      console.log("Number of names: ", nameCount);

      isCounting = false;
    } catch (err) {
      const { status } = err;
      const { error } = (await err.json()) || {};
      errorText = `error in run status code: ${status}, error: ${error}`;
      console.log(errorText);
      isCounting = false;
    }
  }
</script>

<div class="countBoard">
  <div>
    <h2>Number of .BTC names</h2>
  </div>
  <div class="row">
    <h3 class="countDisplay border">
      {!isCounting ? nameCount : "Counting..."}
    </h3>

    <button class="button" on:click={countNames}>Start Count</button>
  </div>
  {#if isErrorThrown}
    <h3>
      {errorText}
    </h3>
  {/if}
</div>

<style>
  .countDisplay {
    width: 30rem;
  }
  .button {
    margin-left: 1rem;
    width: 10rem;
  }
  .border {
    border: 1px solid black;
  }
  .row {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .countBoard {
    display: flex;
    flex-direction: column;
  }
</style>

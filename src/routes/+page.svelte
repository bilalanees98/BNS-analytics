<script>
  import { onMount } from "svelte";
  import Chart from "./Chart.svelte";
  import NameCount from "./NameCount.svelte";
  import { countNames, getAllNamespaces } from "../lib/utils";

  let namespaces = [];
  // let count;

  onMount(async () => {
    console.log(await getAllNamespaces());
    namespaces = await getAllNamespaces();
    console.log("namespaces in onmount: ", namespaces[0]);
    let count = await countNames((await getAllNamespaces())[0]);
    console.log("count: ", count);
  });
</script>

<h1>BNS Analytics</h1>
<NameCount namespace="app" />
<NameCount namespace="btc" />

<!-- <Chart labels={namespaces && [namespaces[0]]} values={count && [count]} /> -->

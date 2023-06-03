<script>
  import Chart from "svelte-frappe-charts";

  export const labels = [];
  export const values = [];

  let data = {
    labels: labels,
    datasets: [
      {
        values: values,
      },
    ],
  };
</script>

<Chart {data} type="pie" />

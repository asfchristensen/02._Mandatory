<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain";

    let employees = [];

    onMount(async () => {
        const response = await fetch($BASE_URL + "/employees", {
            credentials: "include"
        });
        const { data: allEmployees } = await response.json();
        employees = allEmployees;
    });
</script>

<h2>See all employees</h2>
<h5>For admin only</h5>

{#each employees as employee}
    <div class="single-employee">
        <p><span class="headers">Name:</span> {employee.username}</p>
        <p><span class="headers">Email:</span> {employee.email}</p>
    </div>
{/each}


<style>
    .single-employee {
        border-style: solid;
        border-color: rgb(135, 117, 174);
        padding: 1em;
        margin-bottom: 1em;
        background-color: rgb(225, 237, 248);
    }

    .headers {
        font-weight: bold;
    }
</style>
<script>

    import { onMount } from "svelte";
    import { BASE_URL } from "../../store/urlDomain";

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
    <ul>
        <li>
            <h5>{employee.username}</h5>
            <h5>{employee.email}</h5>
        </li>
    </ul>
{/each}

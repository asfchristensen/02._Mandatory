<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { user } from "../../stores/user";

    export let navigate = useNavigate();
    export let location = useLocation();

    $: if (!$user) {
        navigate("/signin", {
            state: { from: $location.pathname },
            replace: true
        });
    }
</script>

<slot/>
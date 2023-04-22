<script>
    import { navigate, useLocation } from "svelte-navigator";
    import { user } from "../../store/user";

    let location = useLocation();

    $: if (!$user) {
        navigate("/login", {
            state: { from: $location.pathname },
            replace: true
        });
    }
</script>

<slot/>
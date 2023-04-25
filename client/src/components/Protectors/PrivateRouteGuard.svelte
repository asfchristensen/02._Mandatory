<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { user } from "../../store/user";

    export let navigate = useNavigate();
    export let location = useLocation();

    $: if (!$user) {
        navigate("/login", {
            state: { from: $location.pathname },
            replace: true
        });
    }
</script>

 <slot/>
<script>
    import { BASE_URL } from "../../store/urlDomain";
    import { user, mail, role } from "../../store/user.js";
    import { Link } from "svelte-navigator";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';

    
    async function handleLogout(){
        const logoutURL = $BASE_URL + "/auth/logout";

        const response = await fetch(logoutURL, {
            credentials: "include"
        });

        const data = await response.json();

        $user = null;
        $mail = null;
        $role = null;

        toastr.info("See you!");
    }

</script>

<Link to="/" on:click={handleLogout}>Log out</Link>
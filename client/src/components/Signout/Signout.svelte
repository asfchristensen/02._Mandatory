<script>
    import { BASE_URL } from "../../stores/urlDomain";
    import { user, mail, role } from "../../stores/user.js";
    import { Link } from "svelte-navigator";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';

    
    async function handleSignout(){
        const signoutURL = $BASE_URL + "/auth/signout";

        const response = await fetch(signoutURL, {
            credentials: "include"
        });

        const data = await response.json();

        $user = null;
        $mail = null;
        $role = null;

        if (data.message) {
            toastr.info("See you!");
        } else {
            toastr.error("Failed to log out. Please try again later.");
        }
    }

</script>

<Link to="/" on:click={handleSignout}>Sign out</Link>
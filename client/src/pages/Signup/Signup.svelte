<script>
    import { BASE_URL } from "../../store/urlDomain";
    import { navigate } from "svelte-navigator";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';

    toastr.options = {
        "positionClass": "toast-top-center",
        "timeOut": "1200"
    }

    let username = "";
    let password = "";
    let email = "";

    async function handleSignup(){
        const userToJSON = JSON.stringify({username, password, email});

        const signupURL = $BASE_URL + "/signup";

        const response = await fetch(signupURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: userToJSON,
            credentials: "include"
        });
        const data = await response.json();
        console.log(data);

        if (data.message === username) {
            toastr.success(`User successfully created. Welcome ${data.message}`);
        } else if (data.message === "error") {
            toastr.error("Account already exists");
        } else {
            toastr.error("Error creating user");
        }

        navigate("/login", { replace: true });

        username = "";
        password = "";
        email = "";
    }

</script>

<h2>Sign up page</h2>

<form on:submit|preventDefault={handleSignup}>
    <label for="username">Enter username: </label>
    <input type="text" placeholder="username" name="username" bind:value={username} required>

    <label for="password">Enter password: </label>
    <input type="password" placeholder="password" name="password" bind:value={password} required>

    <label for="email">Enter username: </label>
    <input type="email" placeholder="email" name="email" bind:value={email} required>

    <button type="submit">Sign up</button>
</form>
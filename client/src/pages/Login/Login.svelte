<script>
    import { BASE_URL } from "../../store/urlDomain.js";
    import { user } from "../../store/user.js";
    import { navigate } from "svelte-navigator";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';

    toastr.option = {
        "positionClass": "toast-top-center",
        "timeOut": "2000"
    }

    // for using the variables in login function
    let email = "";
    let password = "";

    async function validateLogin() {
        const userToJSON = JSON.stringify({email, password});

        const loginURL = $BASE_URL + "/auth/login";

        const response = await fetch(loginURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: userToJSON,
            credentials: "include"
        });
        const data = await response.json();
        console.log(data);

        if (data.email === email) {
            const authenticatedUser = data.email;
            $user = authenticatedUser; 
            console.log("$USER: ", $user);
            
            toastr.success(`Welcome ${authenticatedUser}`);
            setTimeout(() => {
                navigate("/contact", { replace: true });
            }, 2000)
        }

        email = "";
        password = "";
    }


</script>

<slot></slot>

<h2>Login page</h2>

<form on:submit|preventDefault={validateLogin}>

    <label for="email">Enter username: </label>
    <input type="text" placeholder="email" name="email" bind:value={email} required>

    <label for="password">Enter password: </label>
    <input type="password" placeholder="password" name="password" bind:value={password} required>

    <button type="submit">Login</button>
</form>

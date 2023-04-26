<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user, mail, role } from "../../stores/user.js";
    import { navigate } from "svelte-navigator";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';

    toastr.options = {
        "positionClass": "toast-top-center",
        "timeOut": "1200"
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

        if (data.email === email) {
            let authenticatedUsername = data.username;
            let authenticatedEmail = data.email;
            let authenticatedRole = data.role;
            $user = authenticatedUsername;
            $mail = authenticatedEmail;
            $role = authenticatedRole;
            
            toastr.success(`You logged in successfully, welcome back ${$user}`);
            setTimeout(() => {
                navigate("/profile", { replace: true });
            }, 2000)
        } else {
            toastr.error("Wrong email or password. Try again.");
        }

        email = "";
        password = "";
    }
</script>

<slot></slot>

<h2>Login page</h2>

<div class="form-login">
    <form on:submit|preventDefault={validateLogin}>
        <input type="email" placeholder="email" name="email" bind:value={email} required><br><br>

        <input type="password" placeholder="password" name="password" bind:value={password} required><br><br>

        <button type="submit">Login</button>
    </form><br><br>
</div>

<div class="cone">
    <img src="../../public/Images/cone.jpg" alt="an ice cream cone">
</div>



<style>
    .form-login {
        display: flex;
        justify-content: center;
        position: relative;
        border: solid;
        border-color: rgb(242, 242, 126);
        border-radius: 30em;
        background-color: rgb(247, 244, 204);
        padding: 3em; 
        margin: 0em 30em 0em 30em;
    }

    button {
        margin: 0em 1em 0em 2em;
    }

    .cone {
        display: flex;
        justify-content: center;
        position: relative;
      
    }
</style>
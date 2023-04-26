<script>
    import { BASE_URL } from "../../stores/urlDomain";
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

<div class="form-signup">
    <form on:submit|preventDefault={handleSignup}>
        <input type="text" placeholder="username" name="username" bind:value={username} required><br><br>

        <input type="password" placeholder="password" name="password" bind:value={password} required><br><br>

        <input type="email" placeholder="email" name="email" bind:value={email} required><br><br>

        <button type="submit">Sign up</button>
    </form>
</div>

<div class="cone">
    <img src="../../public/Images/cone.jpg" alt="an ice cream cone">
</div>

<style>
      .form-signup {
        display: flex;
        justify-content: center;
        position: relative;
        border: solid;
        border-color: rgb(149, 249, 153);
        border-radius: 30em;
        background-color: rgb(206, 247, 204);
        padding: 3em; 
        margin: 0em 30em 0em 30em;
    }

    button {
        margin: 0em 1em 0em 1.5em;
    }

    .cone {
        display: flex;
        justify-content: center;
        position: relative;
    }
</style>
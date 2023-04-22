<script>
    import { Router, Route, Link } from "svelte-navigator";
    import PrivateRoute from "./components/Private/PrivateRoute.svelte";
    import { user } from "./store/user";
    import Logout from "./pages/Logout/Logout.svelte";
    import Home from "./pages/Home/Home.svelte";
    import Login from "./pages/Login/Login.svelte";
    import Signup from "./pages/Signup/Signup.svelte";
    import Contact from "./pages/Contact/Contact.svelte";


    $: isAuthenticated = $user;
    
</script>

<Router>
    <header>
        {#if isAuthenticated}
        <nav>
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Logout/>
        </nav>
        {:else}
        <nav>
            <Link to="/">Home</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/contact">Contact</Link>
        </nav>
        {/if}
    </header>

    <main>
        <!-- Public routes -->
        <Route path="/" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>

        <!-- Private routes -->
        <PrivateRoute path="/contact">
            <Contact/>
        </PrivateRoute>
    </main>
</Router>


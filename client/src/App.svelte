<script>
    import { Router, Route, Link } from "svelte-navigator";
    import PrivateRoute from "./components/Protectors/PrivateRoute.svelte";
    import { user, role } from "./store/user";
    import Logout from "./pages/Logout/Logout.svelte";
    import Home from "./pages/Home/Home.svelte";
    import Login from "./pages/Login/Login.svelte";
    import Signup from "./pages/Signup/Signup.svelte";
    import Profile from "./pages/Profile/Profile.svelte";
    import Flavours from "./pages/Flavours/Flavours.svelte";
    import Employees from "./pages/Employees/Employees.svelte";
    import Expenses from "./pages/Expenses/Expenses.svelte";
    import Schedule from "./pages/Schedule/Schedule.svelte";
    import Salary from "./pages/Salary/Salary.svelte";
    import Review from "./pages/Review/Review.svelte";
    import WatchReviews from "./pages/WatchReviews/WatchReviews.svelte";

    // property that checks if the user has a specific role
    $: hasRole = $role;
    $: username = $user;
    
</script>

<Router>
    <header>
        <div class="navbar">
        <div class="nav-link">
        {#if hasRole === 1}
        <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/employees">Employees</Link>
            <Link to="/expenses">Expenses</Link>
            <Link to="/watchReviews">Reviews</Link>
            <Link to="/flavours">Flavours</Link>
            <Logout/>
        </nav>
        {:else if hasRole === 2}
        <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/schedule">Schedule</Link>
            <Link to="/salary">Salary</Link>
            <Link to="/flavours">Flavours</Link>
            <Logout/>
        </nav>
        {:else if hasRole === 3}
        <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/review">Review</Link>
            <Link to="/flavours">Flavours</Link>
            <Logout/>
        </nav>
        {:else}
            <Link to="/">Home</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/flavours">Flavours</Link>
        {/if}
        </div>
        <div class="nav-user">
            {#if username}
            <p>Logged in as: {username}</p>
            {:else}
            <p>The epic ice cream store</p>
            {/if}
        </div>
        </div>
    </header>

    <main>
        <!-- Public routes -->

        <Route path="/" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/flavours" component={Flavours}></Route>

        <!-- Private routes -->

        <!-- for all -->
        <PrivateRoute path="/profile">
            <Profile/>
        </PrivateRoute>

        <!-- for admin -->
        <PrivateRoute path="/employees">
            <Employees/>
        </PrivateRoute>

        <PrivateRoute path="/expenses">
            <Expenses/>
        </PrivateRoute>

        <PrivateRoute path="/watchReviews">
            <WatchReviews/>
        </PrivateRoute>

        <!-- for employee -->
        <PrivateRoute path="/schedule">
            <Schedule/>
        </PrivateRoute>

        <PrivateRoute path="/salary">
            <Salary/>
        </PrivateRoute>

        <!-- for guest -->
        <PrivateRoute path="/review">
            <Review/>
        </PrivateRoute>

    </main>
</Router>


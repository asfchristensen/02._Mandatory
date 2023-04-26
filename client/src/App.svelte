<script>
    import { Router, Route } from "svelte-navigator";
    import PrivateRoute from "./components/Protectors/PrivateRoute.svelte";
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
    import Navbar from "./components/Navbar/Navbar.svelte";
    import Footer from "./components/Footer/Footer.svelte";
</script>

<Router>
   
    <Navbar/>

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

<Footer/>


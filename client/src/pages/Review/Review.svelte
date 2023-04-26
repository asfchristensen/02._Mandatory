<script>
    import { reviews } from "../../stores/reviews.js";
    import { user, mail } from "../../stores/user.js"; 

    let subject = "";
    let message = "";

    $: username = $user;
    $: email = $mail;

    function handleWriteReview(){
        reviews.update((currentReview) => {
            let reviewObject = { handled: false, title: subject, content: message, from: username, sender: email };
            currentReview.push(reviewObject);
            return currentReview;
        });
        subject = "";
        message = "";
    }
</script>

<h2>Review</h2>
<h5>If you are loggind in, you can review the ice cream store's ice creams</h5>
<h5>Get iceeeeeed!</h5>

<label for="subject">Subject</label><br>
<input bind:value={subject}><br><br>

<label for="message">Message</label><br>
<textarea bind:value={message}></textarea><br><br>

<button on:click={handleWriteReview}>Send review</button>


<style>
    textarea {
        width: 50%;
        height: 20em; 
    }

    input {
        width: 25%;
    }
</style>
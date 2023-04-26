<script>

    import { reviews } from "../../store/reviews";


    function eraseReview() {
        reviews.update(review => review.filter(review => !review.handled));
    }


</script> 

<h2>Watch reviews</h2>
<h5>Here are all the reviews from the happy customers</h5>


{#each $reviews as review}
    <div class:handled={review.handled}>
        <p>Subject: {review.title}</p>
        <p>Message: {review.content}</p>
        <p>From: {review.from}</p>
        <p>Email: {review.sender}</p>
        Read review: <input type=checkbox bind:checked={review.handled}><br><br>

    </div>
{/each}

<button on:click={eraseReview}>Clear review-content</button>

<style>
    .handled {
        opacity: 20%;
    }
</style>

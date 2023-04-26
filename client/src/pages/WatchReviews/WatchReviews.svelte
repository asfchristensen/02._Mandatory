<script>
    import { reviews } from "../../stores/reviews";

    function eraseReview() {
        // reviews are a representation of the values in the reviews-store
        reviews.update(reviews => reviews.filter(review => !review.handled));
    }
</script> 

<h2>Watch reviews</h2>
<h5>Here are all the reviews from the happy customers</h5>

{#each $reviews as review}
    <div class:handled={review.handled}>
        <div class="single-review">
            <p><span class="headers">Subject:</span> {review.title}</p>
            <p><span class="headers">Review:</span> {review.content}</p>
            <p><span class="headers">From:</span> {review.from}</p>
            <p><span class="headers">Email:</span> {review.sender}</p>
            <hr>
            <span class="delete-header">Read review:</span> <input type=checkbox bind:checked={review.handled}><br><br>
        </div>
    </div>
{/each}

<button on:click={eraseReview}>Clear review-content</button>


<style>
    .handled {
        opacity: 20%;
    }

    .single-review {
        border-style: solid;
        border-color: rgb(216, 108, 108);
        padding: 1em;
        margin-bottom: 1em;
        background-color: rgb(239, 226, 239);
    }

    .headers {
        font-weight: bold;
    }

    .delete-header {
        font-weight: bold;
        color: rgb(208, 81, 81);
    }

    button {
        background-color: rgb(216, 108, 108);
    }

    button:hover {
        color: rgb(243, 200, 200);
    }
</style>

async function deleteFormHandler(event) {
    event.preventDefault();
    console.log(event.target);

    const postCard = event.target.parentElement;
    const id = postCard.getAttribute("data-post-id");

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        window.location.replace('/dashboard/')
    } else {
        alert(response.statusText);
    }
}

const deleteBtns = document.querySelectorAll('.delete-post-btn');
deleteBtns.forEach((btn) => {
    btn.addEventListener('click', deleteFormHandler)
})
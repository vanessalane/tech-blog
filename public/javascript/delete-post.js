async function deleteFormHandler(event) {
    event.preventDefault();

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

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
async function deleteFormHandler(event) {
    event.preventDefault();
    console.log(event.target);

    const postCard = event.target.parentElement;
    const id = postCard.getAttribute("data-post-id");

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    }
    else {
      // otherwise, get the data from the response and surface the error to the user
      response.json().then(data => {
        const latestError = data.message;
        document.querySelector(`#post-${id}-error`).textContent = latestError;
      })
    }
}

const deleteBtns = document.querySelectorAll('.delete-post-btn');
deleteBtns.forEach((btn) => {
    btn.addEventListener('click', deleteFormHandler)
})
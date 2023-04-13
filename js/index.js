document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        fetch(`https://api.github.com/search/users?q=${event.target.children[0].value}`)
            .then(function(response) {
                return response.json();
            })
            .then(function (data) {
                const information = Object.values(data)
                const userHeader = document.createElement('h3');
                userHeader.textContent = 'Users'
                document.getElementById('github-container').appendChild(userHeader);

                for (let i = 0; i <= 10; i++) {
                    const userName = document.createElement('li');
                    userName.textContent = information[2][i]['login'];
                    document.getElementById('user-list').appendChild(userName);
                    userName.addEventListener('click', () => {
                        fetch(`https://api.github.com/users/${event.target.children[0].value}/repos`)
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (data) {
                                const repoInfo = Object.values(data);
                                for (let i = 0; i < 11; i++) {
                                    const repoLineItem = document.createElement('li');
                                    repoLineItem.textContent = repoInfo[i+1]['full_name'];
                                    document.getElementById('repos-list').appendChild(repoLineItem);
                                }
                            })
                    })
                }
            })
    })
})


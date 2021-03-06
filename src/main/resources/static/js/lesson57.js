'use strict';

window.addEventListener('load', function () {

    const userAsJSON = localStorage.getItem('user');

    if (!userAsJSON) {
        showSplashScreen();
    } else {
        hideSplashScreen();
    }

    const BASE_URL = 'http://localhost:9393';

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', onLoginHandler);

    function onLoginHandler(e) {
        e.preventDefault();
        const form = e.target;
        const userFormData = new FormData(form);
        const user = Object.fromEntries(userFormData);
        fetchAuthorised(BASE_URL + "/page").then(
            response => {
                saveUser(user)
                hideSplashScreen()
            }, error => {

            }).catch(err => console.log(err))
    }

      function fetchAuthorised(url, options) {
        const settings = options || {};
        return   fetch(url, updateOptions(settings));
    }

    function updateOptions(options) {
        const update = {...options};
        update.mode = 'cors';
        update.headers = {...options.headers};
        update.headers['Content-Type'] = 'application/json';
        const user = restoreUser();
        if (user) {
            update.headers['Authorization'] = 'Basic ' + btoa(user.username + ':' + user.password);
        }
        return update;
    }

    function saveUser(user) {
        const userAsJSON = JSON.stringify(user)
        localStorage.setItem('user', userAsJSON);
    }

    function restoreUser() {
        const userAsJSON = localStorage.getItem('user');
        const user = JSON.parse(userAsJSON);
        return user;
    }

    const image1 = "data:image/jpeg;base64,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"
    let image2;
    let image3;

    class User {
        constructor(id, name, email) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.state = "unauthorized";
        }
    }

// Пост ссылается на User. Когда смотришь на посты, можно узнать  кому они принадлежат
    class Post {
        constructor(id, image, description, user, like) {
            this.id = id;
            this.image = image;
            this.description = description;
            this.user = user;
            this.like = like;
        }
    }

    class Comment {
        constructor(id, post, comment, user) {
            this.id = id,
                this.post = post,
                this.comment = comment,
                this.user = user;

        }
    }

    const user1 = new User(1, "ainura", "ai@mail.ru");
    const user2 = new User(2, "merim", "mm@mail.ru");
    const user3 = new User(3, "aisuluu", "ais@mail.ru");


    const post1 = new Post(1, image1, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum ad est cumque nulla voluptatem enim voluptas minima illum quis! Voluptatibus dolorem minus tempore aliquid corrupti nesciunt, obcaecati fuga natus officiis", user1, 5);
    const post2 = new Post(2, image2, "cool", user2, null);
    const post3 = new Post(3, image3, "good", user3, 5);

    const comment1 = new Comment(1, post2, "Lorem ipsum dolor sit amet," +
        "consectetur adipisicing elit. Ipsum ad est cumque nulla voluptatem" +
        "enim voluptas minima illum quis", user1);
    const comment2 = new Comment(2, post1, "Think good idea", user1);
// console.log(post1)
// console.log(post2)

    const postlist = [];

    function addPost() {
        postlist.push(post1)
        postlist.push(post2)
        postlist.push(post3)
    }

    // addPost()

// console.log(postlist)

    function stateChange(user) {
        if (user.state === 'unauthorized') {
            user.state = 'authorized'
        }
    }

    // stateChange(user1)

// console.log(user1)

    function likeChange(id) {
        postlist.forEach(post => {
            if (post.id === id) {
                if (post.like === null) {
                    post.like = 5
                } else {
                    delete post.like
                }
            }
        })

    }

    likeChange(2)

    function showSplashScreen() {
        document.querySelector(".page-splash").hidden = false;
        let body = document.querySelector("body");
        let card = document.querySelector(".my-3");
        body.classList.add("no-scroll");
        card.classList.add("none");
    }

    function hideSplashScreen() {
        document.querySelector(".page-splash").hidden = true;
        let body = document.querySelector("body");
        let card = document.querySelector(".my-3");
        card.classList.remove("none");
        body.classList.remove("no-scroll");
    }


    function createCommentElement(comment) {
        if (comment.publication) {
            const root = document.getElementById(comment.publication.id);
            let div = document.createElement('div');
            const h6 = document.createElement("h6");
            h6.innerHTML = comment.user && comment.user.name;
            const p = document.createElement("p");
            p.innerHTML = comment.comment;
            div.append(h6);
            div.append(p);

            root.append(div)
        }

    }

    createCommentElement(comment1)


    function createPostElement(post) {
        const div = document.createElement('div');
        div.setAttribute("id", post.id);
        const h2 = document.createElement('h2');
        h2.innerHTML = post.user.name;
        const p = document.createElement("p");
        const div2 = document.createElement('div');
        p.innerHTML = post.description;
        p.setAttribute('class', 'post-2');
        div2.setAttribute('class', 'main');
        const img = document.createElement("img");
        if (post.image) {
            img.setAttribute('src', "http://localhost:9393/images/" + post.image);
        } else {
            img.setAttribute('src', image1);
        }
        img.setAttribute('height', '200px');
        img.setAttribute('width', '200px');
        img.setAttribute('class', 'd-block w-100');
        const div1 = document.createElement('div');
        div1.setAttribute('class', 'd-flex justify-content-around');
        div1.setAttribute('margin-bottom', '20px');
        div1.setAttribute('margin-top', '20px');
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        const span3 = document.createElement("span");
        const span4 = document.createElement("span");
        const span5 = document.createElement("span");
        span1.setAttribute('class', 'h1 mx-2 muted');
        span2.setAttribute('class', 'h1 mx-2 muted');
        span3.setAttribute('class', 'mx-auto');
        span4.setAttribute('class', 'h1 mx-2 muted');
        const i1 = document.createElement("i");
        const i2 = document.createElement("i");
        const i3 = document.createElement("i");
        i1.setAttribute('class', 'far fa-heart');
        i2.setAttribute('class', 'far fa-comment');
        i3.setAttribute('class', 'far fa-bookmark');
        div.append(h2);
        div.append(img);
        span1.append(i1);
        span2.append(i2);
        span4.append(i3);
        div1.append(span1)
        div1.append(span2)
        div1.append(span3)
        div1.append(span4)
        div2.append(div1);
        div2.append(p);
        div.append(div2);
        div.addEventListener('click', function (e) {
            getId(post.id)
            // console.log(post.id)
        });


        return div;
    }


    function addPost(postElement) {
        const root = document.querySelector(".posts-container")
        root.append(postElement)

    }

    // addPost(createPostElement(post1))

//-------------------Task1-------------------------------
    const heart = document.getElementsByClassName('far fa-heart');
    for (let i = 0; i < heart.length; i++) {
        heart[i].addEventListener('click', function (event) {
            const el = heart[i].classList;
            let classes = el.toggle("fas");
            console.log(classes)


        });
    }

    //----------------Task2-----------------------------
    const img2 = document.getElementsByTagName('img');
    const twoClick = document.getElementsByClassName('far fa-heart');
    for (let i = 0; i < img2.length; i++) {
        img2[i].addEventListener('dblclick', function (event) {
            const el = twoClick[i].classList;
            let classes = el.toggle("fas");
            // console.log(classes)

        });
    }

    //----------------Task3-----------------------------
    const bookmark = document.getElementsByClassName('far fa-bookmark');
    for (let i = 0; i < bookmark.length; i++) {
        bookmark[i].addEventListener('click', function (event) {
            const bm = bookmark[i].classList;
            let classes = bm.toggle("fas");
            // console.log(classes)

        });
    }
    //----------------Task4-----------------------------
    // const button = document.getElementsByTagName("button");
    // for (let i = 0; i < button.length; i++) {
    //     button[i].addEventListener('click', function (event) {
    //         // console.log('button clicked');
    //         const b = button[i].classList;
    //         let hide = hideSplashScreen();
    //         let h = b.toggle(hide);
    //
    //     });
    // }

    //-------------------HW_60_Task1-------------------------------
    // comments post
    let publicId;

    function getId(id) {
        publicId = id;
    }

    const publications = fetch("http://localhost:9393/publication", {
        method: "GET"
    }).then(response => response.json())


    publications.then(result => {
        result.forEach(publication => {
            // console.log(publication);
            addPost(createPostElement(publication))
        })
    }).then(function () {
            // for comments form
            const comment = document.getElementsByClassName('far fa-comment');
            const form = document.getElementById('comment-form');
            for (let i = 0; i < comment.length; i++) {
                comment[i].addEventListener('click', function (event) {
                    form.classList.remove("none");
                   setTimeout(function () {
                       console.log(publicId);

                       fetch("http://localhost:9393/comment/" + publicId, {
                           method: "GET"
                       }).then(res => res.json()).then(
                           (comment) => {
                               comment.map(el => {
                                   createCommentElement(el)
                               })
                           }
                       )
                   },1000)
                })
            }


        }) .catch(err => console.log(err))


    const saveButton = document.getElementById("add-comment");
    saveButton.addEventListener("click", function () {
        const commentForm = document.getElementById("comment-form");
        let data = new FormData(commentForm);
        data.append("user", "1");
        data.append("publication", publicId);
        fetch("http://localhost:9393/comment", {
            method: 'POST',
            body: data
        }).then(r => r.json()).then(data => {
            const comments = fetch("http://localhost:9393/comment", {
                method: "GET"
            }).then(response => response.json());
            comments.then(result => {
                result.forEach(comment => {
                    createCommentElement(comment);
                })
            })
        }).catch(err => console.log(err))
    });



});

    



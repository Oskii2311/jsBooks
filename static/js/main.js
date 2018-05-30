const start = (function () {
    let _arrayHelper = arrayHelper,
        _httpHandler = httpHandler,
        _booksOrg = Array(),
        _inputValue = localStorage.inputValue,
        _sortingType = localStorage.sortingType;  
    
    function createElement(books) {
        document.getElementById('main').innerHTML = '';
        for (let i = 0; i < books.length; i++) {
            let newItem = document.createElement('div');
            newItem.className = 'item';
            newItem.innerHTML = "<div class='number'>" + (i + 1) + "</div>" +
                "<div class='img'>" +
                "<img class='booksImg' src='" + books[i].cover.small + "'>" +
                "<span class='nextTo'>" +
                "<p class='title'>" + books[i].title + "</p>" +
                "<hr width='20%'>" +
                "<p class='author'>" + "By " + books[i].author + "</p>" +
                "<ul class='info'>" +
                "<li>Relase Date: " + books[i].releaseDate + "</li>" +
                "<li class='pages'>Pages: " + books[i].pages + "</li>" +
                "<li>Link: <a href='" + books[i].link + "'>shop</a></li>" +
                "</ul>" +
                "</span>" +
                "</div>"
            document.getElementById('main').appendChild(newItem);
        }
    }

    function setRadioButtonAsChecked(sortingType) {
        switch (sortingType) {
            case 'pages':
                document.getElementById("sortByPage").checked = true;
                break;
            case 'author':
                document.getElementById("sortByAuthor").checked = true;
                break;
            case 'date':
                document.getElementById("sortByDate").checked = true;
                break;
        }
    }

    function getInputValueAndFiltr() {
        _inputValue = parseFloat(this.value);
        localStorage.setItem('inputValue', _inputValue);
        init(_sortingType, _inputValue);
    }

    function clear() {
        document.getElementsByClassName("amountPageInput")[0].value = '';
        let radioButtons = document.getElementsByName("sort");
        for (let i = 0; i < radioButtons.length; i++) {
            radioButtons[i].checked = false;
        }
        clearLocalStorage()
        init(undefined);
    }

    function clearLocalStorage() {
        localStorage.clear();
        _inputValue = localStorage.inputValue,
        _sortingType = localStorage.sortingType;  
    }

    function keyClearAction(e) {
        if (e.keyCode == 70 && e.altKey) {
            clear();
        }
    }

    function showPop(src) {
        let bigSrc = src.replace('cat.gif', 'lrg.jpg'),
            doc = document.documentElement,
            windowHeight = window.innerHeight / 3,
            top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0) + windowHeight;

        document.getElementById('pop').style.backgroundImage = "url(" + bigSrc + ")";
        document.getElementById('pop').style.top = top + 'px';
        document.getElementById('fullPop').style.display = 'inline';
        document.getElementsByTagName("body")[0].className += "stop-scrolling";
    }

    function hidePop() {
        document.getElementById('fullPop').style.display = 'none';
        document.getElementsByTagName("body")[0].classList.remove("stop-scrolling");
    }


    function addEventListenerToImg() {
        let imgs = document.getElementsByTagName("img");
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].addEventListener("click", function () {
                showPop(src = imgs[i].src);
            }, false);
        }
    }

    function addEventListinerToSortButton() {
        document.getElementById("sortByPage").addEventListener("click", function () {
            init(_sortingType = 'pages', _inputValue);
        }, false);
        document.getElementById("sortByDate").addEventListener("click", function () {
            init(_sortingType = 'date', _inputValue);
        }, false);
        document.getElementById("sortByAuthor").addEventListener("click", function () {
            init(_sortingType = 'author', _inputValue);
        }, false);
    }
    
    function addEventListinerToKeys() {
        document.getElementsByClassName("amountPageInput")[0].addEventListener('keyup', getInputValueAndFiltr);

        document.addEventListener("keydown", keyClearAction);
    }

    function addEventListinerToButtons() {
        document.getElementsByClassName("styledButton")[0].addEventListener("click", clear);

        document.getElementsByClassName("btn")[0].addEventListener("click", hidePop);
    }

    function addMainListeners() {
        addEventListinerToSortButton();
        addEventListinerToKeys();
        addEventListinerToButtons();
    }

    function init(sortingType, inputValue) {
        let books = Array();
        if (_booksOrg.length === 0) {

            addMainListeners();

            _httpHandler.loadJSON(function (response) {
                _booksOrg = JSON.parse(response);
                init(sortingType, inputValue);
            });
            
            return;
        }

        books = JSON.parse(JSON.stringify(_booksOrg));
        
        if (sortingType !== 'undefined') {
            arrayHelper.sortItem(books, sortingType);
            localStorage.setItem('sortingType', sortingType);
            setRadioButtonAsChecked(sortingType);
        }

        if (inputValue !== 'undefined' && !isNaN(inputValue)) {
            books = _arrayHelper.filterByPages(books, inputValue);
            document.getElementsByClassName("amountPageInput")[0].value = inputValue;
        }

        createElement(books);
        addEventListenerToImg();
    }

    init(_sortingType, _inputValue); 

})();
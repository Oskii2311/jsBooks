const arrayHelper = (function () {
    function compareSurname(a, b) {
        if (a.author.split(' ')[1] < b.author.split(' ')[1])
            return -1;
        if (a.author.split(' ')[1] > b.author.split(' ')[1])
            return 1;
        return 0;
    }

    function formatDate(dateToFormat) {
         return dateToFormat.split('/').reverse().join();
    }
    
    function compareDate(a, b) {
        if (formatDate(a.releaseDate) < formatDate(b.releaseDate))
            return -1;
        if (formatDate(a.releaseDate) > formatDate(b.releaseDate))
            return 1;
        return 0;
    }

    function comparePages(a, b) {
        return a.pages - b.pages;
    }

    function sortItem(books, sortingType) {
        if (!(books instanceof Array)) {
            throw new Error('Error thrown');
        }
        if (sortingType === 'pages') {
            books.sort(comparePages);
        } else if (sortingType === 'date') {
            books.sort(compareDate);
        } else if (sortingType === 'author') {
            books.sort(compareSurname);
        }
        return books;
    }

    function filterByPages(books, pages) {
        return books.filter(element => element.pages >= pages);
    }

    return {
        sortItem: sortItem,
        filterByPages: filterByPages
    };

})();
let assert = require('assert'),
    chai = require("chai"),
    expect = chai.expect,
    main = require('./arrayHelper.js'),
    testHelper = require('./testConst.js');

chai.use(require("chai-sorted"));

const books = JSON.parse(`[
		{
			"cover": {
				"large": "https://covers.oreillystatic.com/images/9780596517748/lrg.jpg",
				"small": "https://covers.oreillystatic.com/images/9780596517748/cat.gif"
			},
			"title": "JavaScript: The Good Parts",
			"author": "Douglas Crockford",
			"releaseDate": "12/2008",
			"pages": 172,
			"link": "http://shop.oreilly.com/product/9780596517748.do"
		},
		{
			"cover": {
				"large": "https://covers.oreillystatic.com/images/9780596000486/lrg.jpg",
				"small": "https://covers.oreillystatic.com/images/9780596000486/cat.gif"
			},
			"title": "JavaScript: The Definitive Guide",
			"author": "David Flanagan",
			"releaseDate": "11/2001",
			"pages": 936,
			"link": "http://shop.oreilly.com/product/9780596000486.do"
		},
		{
			"cover": {
				"large": "https://covers.oreillystatic.com/images/0636920025832/lrg.jpg",
				"small": "https://covers.oreillystatic.com/images/0636920025832/cat.gif"
			},
			"title": "Learning JavaScript Design Patterns",
			"author": "Addy Osmani",
			"releaseDate": "08/2012",
			"pages": 254,
			"link": "http://shop.oreilly.com/product/0636920025832.do"
		},
		{
			"cover": {
				"large": "https://covers.oreillystatic.com/images/0636920027713/lrg.jpg",
				"small": "https://covers.oreillystatic.com/images/0636920027713/cat.gif"
			},
			"title": "JavaScript Enlightenment",
			"author": "Cody Lindley",
			"releaseDate": "12/2012",
			"pages": 166,
			"link": "http://shop.oreilly.com/product/0636920027713.do"
		},
		{
			"cover": {
				"large": "https://covers.oreillystatic.com/images/0636920033141/lrg.jpg",
				"small": "https://covers.oreillystatic.com/images/0636920033141/cat.gif"
			},
			"title": "Programming JavaScript Applications",
			"author": "Eric Elliott",
			"releaseDate": "07/2014",
			"pages": 254,
			"link": "http://shop.oreilly.com/product/0636920033141.do"
		},
		{
			"cover": {
				"large": "https://covers.oreillystatic.com/images/0636920047124/lrg.jpg",
				"small": "https://covers.oreillystatic.com/images/0636920047124/cat.gif"
			},
			"title": "Practical Modern JavaScript",
			"author": "Nicolas Bevacqua",
			"releaseDate": "07/2017",
			"pages": 334,
			"link": "http://shop.oreilly.com/product/0636920047124.do"
		}
	]`);

describe('SortItem test', function () {

    // Arrange
    const _books = books

    it('returns sorted by page', function (done) {

        // Act
        const sortedItems = main.arrayHelper.sortItem(_books, "pages")

        // Assert
        expect(sortedItems).to.be.sortedBy("pages")
        done();
    });

    it('returns sorted by date', function (done) {

        // Act
        const sortedItems = main.arrayHelper.sortItem(_books, "date")

        // Assert
        expect(sortedItems).to.eql(testHelper.testConst.booksSortedByDate);
        done();
    });

    it('returns sorted by author', function (done) {

        // Act
        const sortedItems = main.arrayHelper.sortItem(_books, "author")

        // Assert
        expect(sortedItems).to.eql(testHelper.testConst.booksSortedByAuthor);
        done();
    });

    it('throws error', function (done) {

        // Act
        const actionToThrow = () => main.arrayHelper.sortItem('', "author")

        // Assert
        assert.throws(actionToThrow, Error, 'Error thrown');
        done();
    });

});

describe('Filter test', function () {

    // Arrange
    const _books = books

    it('returns array length 1', function (done) {

        // Act
        const filteredItems = main.arrayHelper.filterByPages(_books, 900)

        // Assert
        assert.equal(filteredItems.length, 1);
        done();
    });

    it('returns array length 6', function (done) {

        // Act
        const filteredItems = main.arrayHelper.filterByPages(_books, 0)

        // Assert
        assert.equal(filteredItems.length, 6);
        done();
    });

    it('returns array length 0', function (done) {

        // Act
        const filteredItems = main.arrayHelper.filterByPages(_books, 2000)

        // Assert
        assert.equal(filteredItems.length, 0);
        done();
    });

});
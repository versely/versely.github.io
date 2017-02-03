var app = angular.module('app', []);

app.controller('AppController', ['$scope', '$http', function($scope, $http) {

  $scope.bible = [];
  $scope.verses = [];
  $scope.correctVerse = 0;
  $scope.score = 0;
  $scope.loading = false;

  $scope.loadVerses = function() {
    var randomBg = Math.floor(Math.random()*4);
    randomBg++;
    $scope.loading = true;
    document.querySelector('body').classList.toggle('bg-' + randomBg);
  	$http.get('./bible.json').success(function(data) {
  		$scope.bible = data;
  		$scope.getVerse();
      $scope.loading = false;
  	});
  };

  $scope.randomVerse = function() {
  	var bookIndex = Math.floor(Math.random()*$scope.bible.length);
  	var book = $scope.bible[bookIndex];
  	var chapterIndex = Math.floor(Math.random()*book.chapters.length);
  	var chapterNum = chapterIndex + 1;
  	var chapter = book.chapters[chapterIndex];
  	var verseNum = Math.floor(Math.random()*Object.values(chapter[chapterNum]).length);
  	verseNum++;
    var verse = chapter[chapterNum][verseNum].replace(/}/g, '</i>').replace(/{/g, '<i>');

    return {
    	'bookIndex' : bookIndex,
    	'chapterIndex' : chapterIndex,
    	'abbr' : book.abbrev,
    	'book': book.book,
    	'chapter' : chapterNum,
    	'verse' : verseNum,
    	'ref' : book.book + " " + chapterNum + ":" + verseNum,
    	'verse' : verse
    };
  };

  $scope.getVerse = function() {

  	$scope.verses = [];
  	$scope.verses.push($scope.randomVerse());
  	$scope.verses.push($scope.randomVerse());
  	$scope.correctVerse = Math.floor(Math.random()*$scope.verses.length);

  	document.querySelector('.left-button').innerHTML = $scope.verses[0].ref;
  	document.querySelector('.right-button').innerHTML = $scope.verses[1].ref;
  	document.querySelector('.verse p').innerHTML = $scope.verses[$scope.correctVerse].verse;

  };

  $scope.chooseVerse = function(choice) {
  	if (choice === $scope.correctVerse) {
  		$scope.score++;
  	} else {
  		$scope.score = 0;
  	}
  	$scope.getVerse();
  };

  $scope.loadVerses();
  
}]);

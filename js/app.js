'use strict';
/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function import swal from 'sweetalert'from http://stackoverflow.com/a/2450976


var moveCount = 0;
var selectedCards = [];
var rightCount = 0;
var cardCSSArray = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle",
	"fa fa-diamond","fa fa-bomb","fa fa-leaf","fa fa-bomb","fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"];
var seconds = 0;
// var $example = $(".example");  定义Jquery搜寻到的元素为全局变量,避免多次使用$()耗资源


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function createRandomCard() {
	cardCSSArray = shuffle(cardCSSArray);
	$(document).ready(function(){
		$("li.card").each(function(index, element) {
		$(element).removeClass('open show match');
		$(element).context.innerHTML = '<i class="'+ cardCSSArray[index]  +'"></i>'
		});
	});
	return cardCSSArray;

}
function initialCard() {
	cardCSSArray = shuffle(cardCSSArray);
	$(document).ready(function(){
		for (const card of cardCSSArray) {
			$(".deck").append(`<li class="card"> <i class="${card}"></i> </li>`)
		}
		bindEvent()
	});
}
//the logic of star's show
function handleStar() {
	moveCount++;
	$('.moves').text(moveCount);
	// if (moveCount > 30) {
	// 	$('.stars').empty();
	// 	$('.stars').append('<li><i class="fa fa-star-o"></i></li>', '<li><i class="fa fa-star-o"></i></li>', '<li><i class="fa fa-star-o"></i></li>');
	// } else
	if (moveCount > 14) {
		$('.stars').empty();
		$('.stars').append('<li><i class="fa fa-star"></i></li>', '<li><i class="fa fa-star-o"></i></li>', '<li><i class="fa fa-star-o"></i></li>');
	} else if  (moveCount > 7)  {
		$('.stars').empty();
		$('.stars').append('<li><i class="fa fa-star"></i></li>', '<li><i class="fa fa-star"></i></li>', '<li><i class="fa fa-star-o"></i></li>');
	}
}
/*
判断卡片是否相同
#关于setTimeout的用法有点模糊,处理这块时写的代码觉得很奇怪,for(of)写了两次,是否有优化方法?
*/
function matchCard() {
	if (selectedCards[0].html() === selectedCards[1].html()) {
		for (const card of selectedCards){
			//const是块级作用域 var是函数作用域,用var setTimeout会出问题
			card.addClass('animated bounce');
			setTimeout(function(){
				// for (const card of selectedCards){
					card.removeClass('open show animated bounce').addClass('match')
					selectedCards = [];
				// }
			},1000)
			rightCount++;
			if (rightCount === cardCSSArray.length) {
					swal("恭喜", "你共花费了" + seconds + "秒,获得" + $('.fa-star').length + "颗星", "success", {
  						button: "重新开始",

				}).then(function(){
					restartGame();
				});
			}
			
			
		}
	} else {
		for (const card of selectedCards){
			card.addClass('animated shake error')
			setTimeout(function(){
			// for (const card of selectedCards){
				card.removeClass('open show animated shake error');
				selectedCards = [];
			// }
		},1000)
			
		}
	}
	
}
//bind restart button and card click event
function bindEvent() {
	//restart
	$('.restart').click(function() {
	restartGame();
	});
	//card
	$('.card').click(function() {
		if($(this).hasClass('match') || $(this).hasClass('open') || $(this).hasClass('show')) {
			//不执行操作
		} else {
			$(this).addClass('open show')
			selectedCards.push($(this));
			
			if (selectedCards.length > 1) {
				handleStar();
				matchCard();
				// setTimeout(matchCard, 1000);
			}	
		}
	});
}
//restart game,initial data
function restartGame(){
	createRandomCard();
	moveCount = 0;
	rightCount = 0;
	seconds = 0;
	selectedCards = [];
	$('.stars').empty();
    $('.stars').append('<li><i class="fa fa-star"></i></li>', '<li><i class="fa fa-star"></i></li>', '<li><i class="fa fa-star"></i></li>');
    $('.moves').text(moveCount);
}

//execute
initialCard();
setInterval(function(){
	seconds++;
	$('.seconds').text(seconds);
}, 1000)




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

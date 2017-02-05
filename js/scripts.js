$(function () {
    /**
     Przesunięcie pierwszego slajdu na koniec określoną liczbę razy
     @param count - liczba przesunięć
    */
    function moveFirstSlide(count) {
        for (var i=0; i<count; i++){
            var $firstItem = $carouselList.find('li:first'),
                $lastItem = $carouselList.find('li:last');
            $lastItem.after($firstItem);
        }
        $carouselList.css({marginLeft: '0'});
    }

    /**
     Przesunięcie ostatniego slajdu na początek określoną liczbę razy
     @param count - liczba przesunięć
    */
    function moveLastSlide(count) {
        for (var i=0; i<count; i++){
            var $firstItem = $carouselList.find('li:first'),
                $lastItem = $carouselList.find('li:last');
            $firstItem.before($lastItem);
        }
        var move = count * (-400);
        $carouselList.css({marginLeft: move});
    }
    
    /**
     Zmiana kontrolki wskazującej, który slajd jest aktualnie wyświetlany 
     @param number - numer kontrolki, na którą należy zmienić
    */
    function changeButtonTo(number) {
        $('.buttons li i').addClass('fa-circle-o').removeClass('fa-circle');
        $('.buttons').find('li[data-number="' + number + '"]').find('i').addClass('fa-circle').removeClass('fa-circle-o');        
    }
    
    /**
     Zmiana slajdu na następny. W przypadku ostatniego slajdu, zmiana na pierwszy slajd.
    */    
    function changeSlideToRight() {
        $carouselList.animate({'marginLeft': '-400px'}, 500, function() {
            moveFirstSlide(1);
            var number = $carouselList.find('li:first').attr('data-number');
            changeButtonTo(number);
        });
    }
  
    /**
     Zmiana slajdu na poprzedni. W przypadku pierwszego slajdu, zmiana na ostatni slajd.
    */    
    function changeSlideToLeft() {
        moveLastSlide(1);
        $carouselList.animate({'marginLeft': '0'}, 500, function() {
            var number = $carouselList.find('li:first').attr('data-number');
            changeButtonTo(number);
        });
    }

    /**
     Zmiana slajdu na wskazany
     @param newNumber - numer slajdu, który ma być widoczny
    */    
    function changeSlideTo(newNumber) {
        var number = $carouselList.find('li:first').attr('data-number');
        if (newNumber > number) {
            var countMove = newNumber - number,
                move = countMove * (-400);
            $carouselList.animate({'marginLeft': move}, 500, function() {
                moveFirstSlide(countMove);
                changeButtonTo(newNumber);
            });  
        } else if (newNumber < number) {
            var countMove = number - newNumber;
            moveLastSlide(countMove);
            $carouselList.animate({'marginLeft': '0'}, 500, function() {
                changeButtonTo(newNumber);
            });
        }
    }
    
    /**
     Slajdy zmieniają się co 3 sekundy. Wykonanie przez użytkownika jakiejkolwiek akcji związanej ze zmnianą slajdu, powoduje zatrzymania się automatycznej zmiany slajdów.
    */
    var $carouselList = $('#carousel ul.images');
    var timerChangeSlide = setInterval(changeSlideToRight, 3000); 
    $('.leftArrow').click(function () {
        clearInterval(timerChangeSlide);
        changeSlideToLeft();
    });
    $('.rightArrow').click(function () {
        clearInterval(timerChangeSlide);
        changeSlideToRight();
    });
    $('.buttons li').click(function () {
        var number = $(this).attr('data-number');
        clearInterval(timerChangeSlide);
        changeSlideTo(number);
    });
});


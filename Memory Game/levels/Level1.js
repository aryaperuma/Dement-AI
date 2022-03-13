import Level from './Level.js';
import Matrix from '../Matrix.js';
import RedTriangle from '../cards/RedTriangle.js';
import BlueCircle from '../cards/BlueCircle.js';

class Level1 extends Level {

    totalMatches = 2;
    welcomeMessage = "<p>Let's go over the basics. At the beginning of each level you'll click the 'Show Cards' button to view the placement of the cards. Take as long as you need to memorize the layout. After you have it burned into your memory, click the 'Start' button to play the level.</p><p>During play, click on a card to flip it over. Then click on its twin to complete the match. If you don't get it right the first time, don't fret, you can try again. Continue on until you complete all the matches.</p>";
    congratsMessage = "Congratulations, you did it! I think you can handle a few more cards.";

    constructor() {
        super();

        const arrayOfCards = [
            new RedTriangle(),
            new RedTriangle(),
            new BlueCircle(),
            new BlueCircle()
        ];

        this.matrix = new Matrix(2, 2, arrayOfCards);
    }

}

export { Level1 };
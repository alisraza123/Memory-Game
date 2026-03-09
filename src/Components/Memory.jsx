import React, { useEffect, useRef } from 'react';
import '../Css/memory.css';
import { arrays } from '../Data/Data';
import sound from '../assets/pulak.wav'
import pich from '../assets/pich.wav'
import overSound from '../assets/over.wav'
import dipSound from '../assets/dip.mp3'
import logo from '../Images/logo.png'
const Memory = () => {
    const cardSectionRef = useRef(null);
    //Step2: Duplication of Cards

    let newArray = arrays.concat(arrays);

    useEffect(() => {
        for (let i = 0; i < newArray.length; i++) {
            let r1 = Math.floor(Math.random() * newArray.length);
            let r2 = Math.floor(Math.random() * newArray.length);
            let temp = newArray[r1];
            newArray[r1] = newArray[r2];
            newArray[r2] = temp;
        }
        let clickCount = 1
        //Step1: Creation Of Cards 
        const parentDiv = cardSectionRef.current;
        if (parentDiv) {
            parentDiv.innerHTML = '';
            for (let i = 0; i < newArray.length; i++) {
                const childDiv = document.createElement('div');
                childDiv.classList.add('card');
                childDiv.dataset.name = newArray[i].name;
                childDiv.dataset.index = i;
                childDiv.style.backgroundImage = `url(${newArray[i].img})`
                childDiv.onclick = () => handleClick(childDiv);
                let fronDiv = document.createElement('div')
                fronDiv.classList.add('front')
                childDiv.append(fronDiv)
                let backDiv = document.createElement('div')
                backDiv.classList.add('back')
                childDiv.append(backDiv)
                parentDiv.append(childDiv);
            }
        }
    }, []);
    let clickCount = 1;
    let firstCard = "";
    let secondCard = "";
    let item2 = "";
    let item1 = "";
    let stopCount = 0
    let pulak = new Audio(sound);
    let pulak1 = new Audio(sound);
    let match = new Audio(pich);
    let over = new Audio(overSound);
    let dip = new Audio(dipSound);

    let handleClick = (item) => {
        console.log(Math.floor((arrays.length)));
        if (clickCount <= 2) {
            if (clickCount === 1) {
                firstCard = item.dataset.name;
                item1 = item
                pulak.play();
                // item.classList.add('border');
                item1.querySelector('.front').classList.add('open');
            }
            else {

                pulak1.play();
                secondCard = item.dataset.name;
                // item.classList.add('border');
                item2 = item;
                item2.querySelector('.front').classList.add('open');

            }
            if (firstCard !== "" && secondCard !== "") {

                // console.log(firstCard,secondCard)
                // console.log(item1.dataset.index,item2.dataset.index)
                // console.log(item1.dataset.index===item2.dataset.index)
                if (item1.dataset.index === item2.dataset.index) {
                    return;
                }
                if (firstCard === secondCard) {
                    setTimeout(() => {
                        match.play();
                    }, 500);
                    item1.classList.add('cardMatch')
                    item2.classList.add('cardMatch')
                    item1.querySelector('.front').classList.add('open');
                    item2.querySelector('.front').classList.add('open');
                    item1.style.pointerEvents="none";
                    item2.style.pointerEvents="none";
                    stopCount++;
                    clickCount = 0;
                    setTimeout(() => {
                        item1.classList.add('changeBackground')
                        item2.classList.add('changeBackground')
                        // item1.classList.remove('border');
                        // item2.classList.remove('border');
                        firstCard = "";
                        secondCard = "";
                    }, 200)
                }
                else {
                    clickCount = 0;
                    setTimeout(() => {
                        // item1.classList.remove('border');
                        // item2.classList.remove('border');
                        item1.querySelector('.front').classList.remove('open');
                        item2.querySelector('.front').classList.remove('open');
                        firstCard = ""
                        secondCard = ""
                    }, 200)
                    setTimeout(() => {
                        dip.play();
                    }, 500);
                }


            }
            clickCount++;

        }
        console.log("Stopcount Value", stopCount)
        setTimeout(() => {
            if (stopCount == Math.floor((arrays.length))) {
                alert("Congratulations!!! You've won the game")
                 
                let allCards = document.querySelectorAll('.card')
                allCards.forEach(card => card.classList.remove('cardMatch'))
                allCards.forEach(card => card.classList.remove('changeBackground'))
                over.play(); 
                allCards.forEach(card => card.querySelector('.front').classList.remove('open'))
                allCards.forEach(card => card.querySelector('.back').classList.remove('open'))
                stopCount = 0;
            }
        }, 500);

    }

    //Step3: Check Which Card is Triggered

    return (
        <div className="cardBox">
            <div className='textDiv'>
                <h1>Memory Game</h1>
                <img src={logo} alt="" />

            </div>
            <div className="cardSection" ref={cardSectionRef}></div>
            <h1 className='create'>Created by Ar Dev's</h1>
        </div>
    );
};

export default Memory;

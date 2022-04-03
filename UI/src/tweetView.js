"use script"

import { formatDate } from "./mainView.js";

export default class TweetView {
    constructor(containerId) {
        this.containerId = containerId;
    }

    display(tw) {
        if(!tw) {
            return '';
        }

        const tweetView = document.getElementById(this.containerId);
        if (tweetView) {
            tweetView.innerHTML =
            `
            <div class="user_info">
            <h1 class="user_name">${tw.author}</h1>
            </div>
        
                <div class="twit_date">${formatDate(tw.createdAt)}</div>
                <p>${tw.text}</p>
        
                <div class="twit_footer">
                <a href="#">
                <img src="images/chat.svg" alt="chat">
                </a>
                <span class="twit_comment_number">${tw.comments ? tw.comments.length : ''}</span>
                </div>
            `
        }
    }
}
"use strict"


class TweetCollection {

    static user = "";

    static maxTextLength = 280;

    _twscopy = [];

    get twscopy() {
        return this._twscopy;
    }

    set twscopy(tweets) {
      
        this._twscopy = tweets
    }

    constructor(tws) {
     
        this.twscopy = [];
        this.restore();
    }

    //////////////////////////////////////All helper methods for validate///////////////////////////////////////////

    static tweetRules(tw) {
        const { keys, types } = TweetCollection.validateConfig.tweet;
        const ruleByKeys = TweetCollection.validateTweetByKeys(tw, keys);
        const ruleByType = TweetCollection.validateTweetByType(tw, types);

        return ruleByKeys && ruleByType;
    }


    static commentRules(tw) {
        const { keys, types } = TweetCollection.validateConfig.comment;
        const ruleByKeys = TweetCollection.validateTweetByKeys(tw, keys);
        const ruleByType = TweetCollection.validateTweetByType(tw, types);

        return ruleByKeys && ruleByType;
    }


    static validateConfig = {
        tweet: {
            types: {
                id: (value) => typeof value === 'string',
                text: (value) => typeof value === 'string' && value.length <= TweetCollection.maxTextLength,
                createdAt: (value) => value instanceof Date,
                author: (value) => typeof value === 'string' && value.length != 0,
                comments: (value) => Array.isArray(value)
            },
            keys: ['id', 'text', 'createdAt', 'author', 'comments']
        },
        comment: {
            types: {
                id: (value) => typeof value === 'string',
                text: (value) => typeof value === 'string' && value.length <= TweetCollection.maxTextLength,
                createdAt: (value) => value instanceof Date,
                author: (value) => typeof value === 'string'
            },
            keys: ['id', 'text', 'createdAt', 'author']
        }
    };

    static validateTweetByKeys = (tw, validKeys) => {
        return !validKeys.some(key => !tw.hasOwnProperty(key));
    }


    static validateTweetByType = (tw, typeConfig) => {
        return !Object.entries(tw).some(([key, value]) => typeConfig[key] ? !typeConfig[key](value) : true);
    }

    static arrayClone(arr) {
        if (!arr) {
            return;
        }

        return JSON.parse(JSON.stringify(arr));
    }


    ///////////////////////////////////////////// end of helper methods for validate//////////////////////////////////////////////


    getPage = (skip = 0, top = 10, filterConfig = {}) => {

        let filteredTweets = TweetCollection.arrayClone(this.twscopy);


        if (filterConfig) {

            if (filterConfig.author) {

                filteredTweets = filteredTweets.filter((tweet) => {

                    if (tweet.author) {
                        return tweet.author.toLowerCase().includes(filterConfig.author.toLowerCase())
                    }
                    return false
                })

            }

            if (filterConfig.text) {
                filteredTweets = filteredTweets.filter((tweet) => {
                    if (tweet.text) {
                        return tweet.text.toLowerCase().includes(filterConfig.text.toLowerCase())
                    }
                    return false
                });
            }
            if (filterConfig.hashtags) {
    
                filteredTweets = filteredTweets.filter((tweet) => {
                    if (tweet.text) {
                        return tweet.text.toLowerCase().includes(`#${filterConfig.hashtags.toLowerCase()}`)
                    }
                    return false

                });

            }

            if (filterConfig.dateFrom) {
                filteredTweets = filteredTweets.filter(
                    (tweet) => tweet.createdAt > filterConfig.dateFrom
                );
            }

            if (filterConfig.dateTo) {
                filteredTweets = filteredTweets.filter(
                    (tweet) => tweet.createdAt < filterConfig.dateTo
                );
            }

        }

        let sortedTweets = filteredTweets.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });



        sortedTweets = sortedTweets.slice(skip, skip + top);

        return sortedTweets;


    }


    get(id) {
        return this.twscopy.find((tweet) => tweet.id === id);

    }

    getRandomInt() {
        return Math.floor(Math.random() * 11011).toString();
    }

    add = (text, user) => {

        const newTweet = {
            id: this.getRandomInt(),
            text: text,
            createdAt: new Date(),
            author: user,
            comments: [],
        }

        if (Tweet.validate(newTweet)) {
            this.twscopy.push(newTweet);
            this.save();
            return true;
        }
        return false;

    };



    edit = (id, txt) => {
        const tweet = this.get(id);

        console.log(tweet);

        if (Tweet.validate(tweet)) {
            if (TweetCollection.user === tweet.author && typeof txt === 'string'
                && txt.length <= TweetCollection.maxTextLength) {
                tweet.text = txt;
                this.save();
                return true;
            }
            return tweet.text;
        }
    };

    remove(id) {
        const tweet = this.get(id);
        if (tweet) {
            if (TweetCollection.user === tweet.author) {
                const index = this.twscopy.findIndex((tweet) => tweet.id === id);
                this.twscopy.splice(index, 1);
                this.save();
                return true;
            }
            return false;
        }
        return false;
    };

    save() {
        localStorage.setItem('tweets', JSON.stringify(this.twscopy));
    }

    restore() {
        if (localStorage.getItem('tweets')) this.twscopy = JSON.parse(localStorage.getItem('tweets'));

    }


    addAll(tws) {
        if (!tws) {
            return;
        }

        let novalidtweets = [];

        tws.forEach(tw => {
            if (Tweet.validate(tw)) {
                this.twscopy.push(tw);

            } else {
                novalidtweets.push(tw);
            }
        });
        return novalidtweets;
    }


    clear() {
        this.twscopy = [];
    }


    addComment = (id, comment) => {

        const tweet = this.get(id);
        const newСomment = new Comment(comment, null, new Date(), TweetCollection.user);
        if (Comment.validate(newСomment.comment)) {  // TO DO DOES NOT WORK
            tweet.comments.push(newСomment.comment)
            this.save();
            return true;
        }
        return false;
    };


}


const formatDate = (date) => {
    if (!date) {
        return;
    }

    const checkDate = (i) => {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };

    return `${checkDate(new Date(date).getDate())}.${checkDate(
        new Date(date).getMonth() + 1
    )}.${checkDate(new Date(date).getFullYear())}, ${checkDate(
        new Date(date).getHours()
    )}:${checkDate(new Date(date).getMinutes())}`;
}



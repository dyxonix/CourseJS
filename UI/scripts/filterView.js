/* eslint-disable max-classes-per-file */
/* eslint-disable lines-around-directive */
/* eslint-disable no-undef */

class TextAreaView {
  publishTweetEventFunc = () => { };
  confirmEditTweetEventFunc = () => { };
  resetTextAreaTweetEvent = () => { };


  constructor(containerId, user) {
    this.containerId = containerId;
    this.user = user;
  }

  display(text) {
    if (!text) {
      text = ""
    }
    const textView = document.getElementById(this.containerId);
    if (!this.user) {
      document.getElementById('write_area').style.display = 'none';
    }
    textView.innerHTML = `
      <form id="form_send" class="twit_write_area">
        <textarea name="text" class="main_textarea" maxlength="280"
         placeholder="Напишите что-нибудь ..." required>${text}</textarea>
          <hr>
          <div class="twit_actions">
          <button id="publish_btn" class="btn_blue" type="submit">Опубликовать</button>
          </div>
      </form>
    `;

    if (this.user) {
      this.bindPublishTweetEvent();
    }
  }

  bindPublishTweetEvent() {
    document.getElementById('form_send').
      addEventListener('submit', this.publishTweetEventFunc);
  }

}


class EditAreaView {
  confirmEditTweetEventFunc = () => { };
  resetEditTweetEventFunc = () => { };
  showEventFunc = () => { };

  enteredId = ''

  constructor(containerId) {
    this.containerId = containerId;
  }

  display(text, tweetId) {
    if (!text) {
      text = ""
    }
    const textView = document.getElementById(this.containerId);
    if (!this.user) {
      document.getElementById('write_area').style.display = 'none';
    }
    textView.innerHTML = `
    
    <button id="reset_btn" class="twit_back" type="button"><img src="images/left.svg" alt="back">Назад</button>
      <form id="form_edit" class="twit_write_area">
        <textarea name="text" class="main_textarea" maxlength="280"
         placeholder="Напишите что-нибудь ..." required>${text}</textarea>
          <hr>
          <div class="twit_actions">
          <button id="edit_btn" class="btn_blue" type="submit">Редактировать</button>
          
          </div>
      </form>
    `;
    this.enteredId = tweetId;
    this.bindConfirmEditPublishTweetEvent();
    this.bindBackEvent();
  }

  bindConfirmEditPublishTweetEvent() {
    document.getElementById('form_edit').
      addEventListener('submit', this.confirmEditTweetEventFunc);
  }

  bindBackEvent() {
    const back = document.getElementById('reset_btn')
    back.addEventListener('click', this.showEventFunc);
  }

}


class FiltersView {

  filterTweetEventFunc = () => { };

  constructor(containerId) {
    this.containerId = containerId;
  }

  display() {
    const filtersView = document.getElementById(this.containerId);

    filtersView.innerHTML = `
      <form class="filtration">
      <div class="filter_container"> 
      <div class="list_filter">
       <label id="show_filter">Автор</label>
       <div class="input_container"> 
       <select class="input" id="filter" class="list_filter">
        </select>
        </div>
        </div>
        <div class="list_filter">
        <label id="show_filter">Дата</label>
        <div class="input_container">        
        <input id="filter_date_from" class="input" type="date"/>                
          <input id="filter_date_to" class="input" type="date"/>
          </div>
          </div>               
          <div class="list_filter">
           <label id="show_filter">Текст</label>
          <div class="input_container"> 
          <input id="filter_text" class="input" type="text" name="text" placeholder="Введите текст"></input>
          </div> 
          </div>
          <div class="list_filter">
           <label id="show_filter">Хэштег</label>
           <div class="input_container"> 
         <input id="filter_tag" class="input" type="text" name="text" placeholder="Введите тэг"></input>
         </div>
         </div>
         </div>
         <label class="filter_btns">
         <button id="confirm" class="filter_confirm selector_name" type="submit">Применить</button>
         <button id="reset" class="filter_confirm selector_name" style= "color:gray" type="reset">Сбросить</button>
         </label>
      </form>
    `;

    this.bindFiltersTweetEvent();
    this.resetTweetEvent()

  }

  bindFiltersTweetEvent() {
    document.querySelector(".filtration").addEventListener('submit', this.filterTweetEventFunc);
  }

  resetTweetEvent() {
    document.getElementById("reset").addEventListener('click', () => {
      location.reload();
    });
  }



}

class FilterView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  // eslint-disable-next-line consistent-return
  display(author) {
    if (!author) {
      return '';
    }

    const filterAuthors = document.getElementById(this.containerId);

    if (filterAuthors) {
      filterAuthors.innerHTML = author
        .map(
          (item) => `
                <option class="list_item"><a class="item_filtration" href="#">${item}</a></option>`,
        )
        .join('\n');
    }
  }
  setAuthors(authors) {
    this.display(authors);
  }
}
